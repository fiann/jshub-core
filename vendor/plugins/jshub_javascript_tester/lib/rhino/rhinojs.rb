# get access to Rake::FileUtils.sh
require 'rake'

class RhinoJS
  # default options can be get/set
  # mylinter = RhinoJS.new
  # mylinter.rhino_jar = '/some/other/jar'
  attr_accessor :rhino_jar, :rhino_options, :jslint_src, :jslint_runner
  
  # setup class
  def initialize
    # use the enhanced js.jar from the env-js project
    @rhino_jar = File.expand_path("#{File.dirname(__FILE__)}/../env/env-js.jar")
    @rhino_options = "-opt -1"
    @jslint_src = File.expand_path("#{File.dirname(__FILE__)}/../jslint/fulljslint.js")
    @jslint_runner = File.expand_path("#{File.dirname(__FILE__)}/../jshub_javascript_tester/jshub_jslint_runner.js")
    @log_level = ENV['JSHUB_DEBUG'] == 'true' ? true : false    
  end
  
  # Load a javascript file into Rhino and pass args
  def run(file, args=[])
    allok = true
    # turn array into string for use in a shell
    args.collect! { |arg| "'#{arg}'" }
    cmd_line = "cd '#{RAILS_ROOT}' && java -jar '#{rhino_jar}' #{rhino_options} '#{file}' #{args.join(' ')}"
    verbose(@log_level) do
      sh cmd_line do |ok, res|
        if !ok
          puts "Rhino had a problem loading the file (status = #{res.exitstatus})" if @log_level
          allok = false
        end    
      end
    end 
    return allok
  end
  
  # iterate over each file and JSLint it in Rhino, using the options file
  # continues to next file if there are lint errors
  # return true only if all files are linted without errors
  def lint(files)
    allok = true
    files.each do |src_file|
      verbose(@log_level) do
        sh "cd '#{RAILS_ROOT}' && java -jar '#{rhino_jar}' #{rhino_options} -f '#{jslint_src}' '#{jslint_runner}' '#{src_file}'" do |ok, res|
          if !ok
            puts "File: #{src_file} had JSLint errors (status = #{res.exitstatus})" if @log_level
            allok = false
          end
        end
      end
    end
    return allok
  end
  
end