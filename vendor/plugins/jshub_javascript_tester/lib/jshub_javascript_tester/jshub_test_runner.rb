# TODO work out why we have to use the main app test_helper file
require File.expand_path("#{File.dirname(__FILE__)}/../../../../../test/test_helper")

require 'rake'
require 'johnson'
require 'rubygems'
require 'pathname'

require 'envjs/options'

require 'johnson/tracemonkey'
require 'johnson/cli'
require 'envjs/runtime'

class JshubTestRunner < ActiveSupport::TestCase
  
  DEBUG = (ENV['JSHUB_DEBUG'] == 'true') 
  
  # Initialize tests on this class for each html unit test page.
  # All the tests should be in the folder RAILS_ROOT/test/unit/javascript/
  def self.initialize_tests(test_cases=[])

    # Define a test method for each test case HTML file supplied
    test_cases.each do |test_case|
      test_case.gsub!("/javascript","").gsub!(/\.html\.erb$/,"")
      puts "Defining method ##{test_case}" if DEBUG
      define_method "#{test_case}" do
        execute_test(test_case)
      end
    end
  end
  
  def execute_test(test_case)
    reports_path = "#{JSHUB_JAVASCRIPT_TESTER[:continuous_integration][:reports_path]}"
    base_url = "#{JSHUB_JAVASCRIPT_TESTER[:continuous_integration][:base_url]}"
    # TODO we should store and refer to these tests as 'test/javascripts' like similar plugins
    test_case_url = base_url + test_case
    puts "URL to Test Case #{test_case_url}" if DEBUG

    # Create location for outputting the reports in case ci:setup:unittest is not being used, e.g. on a developer machine
    FileUtils.mkpath "#{reports_path}"
    
    puts "Creating JavaScript runtime" if DEBUG
    runtime = Johnson::Runtime.new
    runtime.extend Envjs::Runtime
    runtime.load Envjs::ENVJS
    runtime.load File.join( File.dirname(__FILE__), "jshub_test_utils.js" )

    # Run the test
    runtime.evaluate <<-EOJS
      runTest("#{test_case_url}", #{DEBUG});
    EOJS
    
    puts "Got some results #{runtime[:results]}"
    puts "Test complete"
  end
end
