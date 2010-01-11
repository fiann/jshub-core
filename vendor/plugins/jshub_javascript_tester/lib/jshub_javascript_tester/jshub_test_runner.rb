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
  
  REPORTS_PATH = "#{JSHUB_JAVASCRIPT_TESTER[:continuous_integration][:reports_path]}"
  BASE_URL = "#{JSHUB_JAVASCRIPT_TESTER[:continuous_integration][:base_url]}"
  DEBUG = (ENV['JSHUB_DEBUG'] == 'true') 
  
  # Initialize tests on this class for each html unit test page.
  # All the tests should be in the folder RAILS_ROOT/test/unit/javascript/
  def self.initialize_tests(test_cases=[])

    # Run each HTML file supplied
    test_cases.each do |t|
      @test_case = t.gsub!("/javascript","").gsub!(/\.html\.erb$/,"")
      test_case_url = BASE_URL + @test_case
      puts "URL to Test Case #{test_case_url}" if DEBUG

      puts "Creating JavaScript runtime" if DEBUG
      runtime = Johnson::Runtime.new
      runtime.extend Envjs::Runtime
      runtime.load Envjs::ENVJS
      runtime.load File.join( File.dirname(__FILE__), "jshub_test_utils.js" )
      runtime[:results] = 'spud'
      runtime[:ruby_test_runner] = self
      
      # Run the test
      runtime.evaluate <<-EOJS
        runTest("#{test_case_url}", #{DEBUG});
      EOJS
#      puts "Defining method ##{test_case}" if DEBUG
#      define_method "#{@test_case}" do
#        execute_test(@test_case)
#      end
    end
  end
  
  def self.callback_test_complete(result)
    full_test_name = "#{@test_case}.#{result[:testCase][:name]}.#{result[:testName]}"
    puts "Defining method ##{full_test_name}" if DEBUG
    define_method full_test_name do
      if result[:type] == "pass" 
        assert true
      elsif result[:error][:name] == "ComparisonFailure"
        error = result[:error]
        assert_equal error[:expected], error[:actual], error[:message]
      elsif /Failure/i =~ result[:error][:name]
        flunk result[:error][:message]
      else
        fail result[:error][:message]
      end
    end
  end
  
end
