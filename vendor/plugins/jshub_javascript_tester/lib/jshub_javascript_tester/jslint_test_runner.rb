# TODO work out why we have to use the main app test_helper file
require File.expand_path("#{File.dirname(__FILE__)}/../../../../../test/test_helper")

require 'rake'
require 'johnson'
require 'rubygems'
require 'pathname'

# Output to test/reports for continuous integration server to read 
require 'ci/reporter/rake/test_unit_loader'

require 'johnson/tracemonkey'

require 'benchmark'

class JslintTestRunner < ActiveSupport::TestCase
  
  DEBUG = (ENV['JSHUB_DEBUG'] == 'true') 
  @@runtime = nil
  
  JSLINT_RULES = {
    :core => {
      "onevar" => false, 
      "white" => true, 
      "indent" => 2, 
      "eqeqeq" => true, 
      "browser" => true, 
      "rhino" => false,
      "strict" => true,
      "laxbreak" => true, 
      "undef" => true, 
      "nomen" => true, 
      "bitwise" => true, 
      "regexp" => false
    },
    :adsafe => {
      "predef" => ["jsHub"],
      "safe" => true,
      "onevar" => false, 
      "white" => true, 
      "indent" => 2, 
      "eqeqeq" => true, 
      "strict" => true,
      "laxbreak" => true, 
      "undef" => true, 
      "nomen" => true, 
      "bitwise" => true, 
      "regexp" => true
    }
  }
  
  # Initialize a set of source files to be linted
  def self.initialize_tests(js_files=[])
    
    time = Benchmark.realtime do  
      puts "Creating JavaScript runtime" if DEBUG
      @@runtime = Johnson::Runtime.new
      @@runtime.load File.expand_path("#{File.dirname(__FILE__)}/../jslint/fulljslint.js")
#      @@runtime.load File.join( File.dirname(__FILE__), "jslint_runner.js" )
    
      # remove libraries and minimised files as they won't lint
      js_files = js_files.reject do |f|
        if f.match /\/jquery\/|\/lib\/|\/custom\/|\/debug\//
          print "Skip linting library #{f}\n" if ENV["JSHUB_DEBUG"]
          true
        elsif ! f.match /-debug\.js$/
          print "Skip linting generated file #{f}\n" if ENV["JSHUB_DEBUG"]
          true
        else
          false
        end
      end

      # Run each HTML file supplied
      js_files.each do |file|
        full_test_name = "test lint #{file}"
        puts "Defining method ##{full_test_name}" if DEBUG
        define_method full_test_name do
          lint_file(file)
        end

      end
    end
    puts "Finished in %.6fs" % time
  end
  
  def lint_file(file)
    
    ruleset = (file =~ /\/data\-/) ? :adsafe : :core
    puts "Linting file #{file} with #{ruleset} rules"

    js = ""
    File.open(file, "r") { |f|
      js = f.read
    }
    
    jslint = @@runtime[:JSLINT]
    if jslint.call(js, JSLINT_RULES[ruleset])
      assert true
    else
      errors = jslint[:errors].to_a
      message = ""
      errors.each do |e|
        message << "Line #{e.line + 1} character #{e.character + 1}: #{e.reason}\n"
      end
      assert_equal "", message, "Lint failed"
    end
  end
  
end
