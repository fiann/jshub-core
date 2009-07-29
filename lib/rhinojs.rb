# get access to Rake::FileUtils.sh
require 'rake'

class RhinoJS
  # default options can be get/set
  # mylinter = RhinoJS.new
  # mylinter.rhino_jar = '/some/other/jar'
  attr_accessor :rhino_jar, :rhino_options, :jslint_options
  
  # setup class
  def initialize
    @rhino_jar = "#{RAILS_ROOT}/lib/js.jar"
    @rhino_options = ""
    @jslint_options = "#{RAILS_ROOT}/lib/jslint/jslint-jshub-options.js"
    @debug = ENV['JSHUB_DEBUG'] == 'true' ? true : false    
  end

  # Open file as a shell using '-f -'
  def shell(file, args=[])
    cmd_line = "cd '#{RAILS_ROOT}' && java -jar '#{rhino_jar}' #{rhino_options} -f '#{file}' -f - #{args.join(' ')}"
    verbose(false) do
      sh cmd_line do |ok, res|
        if !ok
          puts "Rhino had a problem loading the file (status = #{res.exitstatus})" if @debug
        end    
      end
    end 
  end
  
  # load all javascript files into Rhino
  def run(file, args=[])
  
    # if no file passed open as a shell
  
    allok = true
    # turn array into string for use in a shell
    args.collect! { |arg| "'#{arg}'" }
    cmd_line = "cd '#{RAILS_ROOT}' && java -jar '#{rhino_jar}' #{rhino_options} '#{file}' #{args.join(' ')}"
    verbose(false) do
      sh cmd_line do |ok, res|
        if !ok
          puts "Rhino had a problem loading the file (status = #{res.exitstatus})" if @debug
          allok = false
        end    
      end
    end 
    return allok
  end
  
  # iterate over each file and JSLint it in Rhino, using the options file
  # continues to next file if there are lint errors
  # return true only if all files linted without errors
  def lint(files)
    allok = true
    files.each do |src_file|
      verbose(false) do
        sh "cd '#{RAILS_ROOT}' && java -jar '#{rhino_jar}' #{rhino_options} '#{jslint_options}' '#{src_file}'" do |ok, res|
          if !ok
            puts "File: #{src_file} had JSLint errors (status = #{res.exitstatus})" if @debug
            allok = false
          end
        end
      end
    end
    return allok
  end
  
end