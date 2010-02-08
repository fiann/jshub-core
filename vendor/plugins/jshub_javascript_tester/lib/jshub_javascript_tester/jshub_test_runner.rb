# TODO work out why we have to use the main app test_helper file
require File.expand_path("#{File.dirname(__FILE__)}/../../../../../test/test_helper")

require 'rake'
require 'johnson'
require 'rubygems'
require 'pathname'
require 'net/http'

# Output to test/reports for continuous integration server to read 
require 'ci/reporter/rake/test_unit_loader'

require 'envjs/options'

require 'johnson/tracemonkey'
require 'johnson/cli'
require 'envjs/runtime'

require 'benchmark'

class JshubTestRunner < ActiveSupport::TestCase
  
  REPORTS_PATH = JSHUB_JAVASCRIPT_TESTER[:reports_path]
  BASE_URL = JSHUB_JAVASCRIPT_TESTER[:webserver][:base_url]
  DEBUG = JSHUB_JAVASCRIPT_TESTER[:debug] 
  
  # Initialize tests on this class for each html unit test page.
  # All the tests should be in the folder RAILS_ROOT/test/javascript/
  def self.initialize_tests(test_cases=[])
    
    time = Benchmark.realtime do  
    
      # Run each HTML file supplied
      test_cases.each_index do |i|
        @test_case = test_cases[i].gsub!(/\.html\.erb$/,"")
        test_case_url = BASE_URL + @test_case
        puts "(#{i}/#{test_cases.length}) Running #{@test_case}"
  
        puts "Creating JavaScript runtime" if DEBUG
        runtime = Johnson::Runtime.new
        runtime.extend Envjs::Runtime
        runtime.load Envjs::ENVJS
        runtime.load File.join( File.dirname(__FILE__), "jshub_test_utils.js" )
        runtime[:ruby_test_runner] = self
        
        # Run the test
        begin
          runtime.evaluate <<-EOJS
            runTest("#{test_case_url}", #{DEBUG});
          EOJS
        rescue Exception => e
          callback_parse_failed e
          puts "*** HTML file #{test_case_url} ***"
          puts Net::HTTP.get_print URI.parse(test_case_url)
          puts "*** HTML file ends ***"
      
        end
      end
    end
    puts "Finished in %.6fs" % time
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
        fail result[:error][:message] + result[:error][:cause][:stack]  
      end
    end
  end
  
  def self.callback_parse_failed(error)
    full_test_name = "#{@test_case}.parse html file"
    puts "Defining method ##{full_test_name}" if DEBUG
    define_method full_test_name do
      e = Exception.new("Error while parsing HTML file")
      e.set_backtrace(error.backtrace)
      raise e
    end
  end
  
end
