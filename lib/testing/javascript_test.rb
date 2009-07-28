require 'test_helper'

class JavascriptTest < ActionController::IntegrationTest
    
  # Initialize tests on this class for each html unit test page.
  # All the tests should be in the folder RAILS_ROOT/test/unit/javascript/
  def self.initialize_tests(test_cases=[])
    debug = ENV['JSHUB_DEBUG'] == 'true' ? true : false
    test_files_path = "#{RAILS_ROOT}/test/unit/javascript";

    puts "INITIALISING TESTS #{test_cases.inspect}" if debug  
    if test_cases.empty?
      Dir.foreach(test_files_path) do |filename|
        if /^([^\.].+).html.erb/.match(filename)
          test_cases << "#{test_files_path}/#{$~[1]}.html.erb"
        end
      end
      puts "FOUND TESTS #{test_cases.inspect}" if debug
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
    debug = ENV['JSHUB_DEBUG'] == 'true' ? true : false
    reports_path = "#{RAILS_ROOT}/test/reports";
    temp_path = "#{RAILS_ROOT}/tmp/test/javascript"
    test_runner = "#{RAILS_ROOT}/lib/testing/javascript_test_runner.js"

    puts "Executing #{test_case}" if debug

    # Create location for outputting the reports
    FileUtils.mkpath "#{reports_path}"
    
    # Request the HTML file to be tested and save it to the tmp folder for loading in Rhino
    assert_routing "/test/unit/#{test_case}", { :controller => 'javascript_test', 
      :action => 'unit', :path => test_case.split('/') }
    get "/test/unit/#{test_case}", {:view => 'min'}
    assert_response :success, "Test file #{test_case} not found"    
    FileUtils.mkpath(File.dirname("#{temp_path}/#{test_case}"))
    File.open "#{temp_path}/#{test_case}.html", "w" do |file|
      file.puts "#{@response.body}"
    end 
    
    # Load the JS Test Runner and HTML file in Rhino
    rhinojs = RhinoJS.new
    test_file = "#{temp_path}/#{test_case}.html"
    assert rhinojs.run(test_runner, [test_file, debug]), "At least one failure"
  end
end