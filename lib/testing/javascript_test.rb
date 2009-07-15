require 'test_helper'

class JavascriptTest < ActionController::IntegrationTest
  
  # Initialize tests on this class for each html unit test page.
  # All the tests should be in the folder RAILS_ROOT/test/unit/javascript/
  def self.initialize_tests(test_cases=[])
    puts "INITIALISING TESTS #{test_cases.inspect}"
    
    # get a list of all files *.html.erb in the unit test folder
    if test_cases.empty?
      folder = "#{RAILS_ROOT}/test/unit/javascript"
      Dir.foreach(folder) do |filename|
        if /^([^\.].+).html.erb/.match(filename)
          test_cases << "#{folder}/#{$~[1]}.html.erb"
        end
      end
      puts "FOUND TESTS #{test_cases.inspect}"
    end

    # Define a test method for each test
    test_cases.each do |test_case|
      if test_case =~ /(test\/unit\/javascript\/)?(.+)\.html\.erb$/
        filename = Regexp.last_match[2]
        define_method "#{test_case}" do
          execute_test(filename)
        end
      end
    end
  end
  
  def execute_test(test_case)
    puts "Executing #{test_case}"
    
    assert_routing "/test/unit/#{test_case}", { :controller => 'javascript_test', 
      :action => 'unit', :path => test_case.split('/') }
    get "/test/unit/#{test_case}", {:view => 'min'}
    assert_response :success, "Test file #{test_case} not found"
    
    reports_folder = "#{RAILS_ROOT}/test/reports"
    FileUtils.mkpath reports_folder
    temp_folder = "#{RAILS_ROOT}/tmp/test/javascript"
    FileUtils.mkpath(File.dirname("#{temp_folder}/#{test_case}"))
    File.open "#{temp_folder}/#{test_case}.html", "w" do |file|
      file.puts "#{@response.body}"
    end 
    
    rhinojs = RhinoJS.new
    test_runner = "#{RAILS_ROOT}/lib/testing/javascript_test_runner.js"
    test_file = "#{temp_folder}/#{test_case}.html"
    debug = ENV['DEBUG'] ? 'debug' : ''
    assert rhinojs.run(test_runner, [test_file, debug]), "At least one failure"
  end
end