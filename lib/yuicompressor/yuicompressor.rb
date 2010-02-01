# get access to Rake::FileUtils.sh
require 'rake'

class YUICompressor
  # default options can be get/set
  # mycompressor = YUICompressor.new
  # mycompressor.yuicompressor_jar = '/some/other/jar'
  attr_accessor :yuicompressor_jar, :yuicompressor_options
  
  # setup class
  def initialize
    @yuicompressor_jar = File.expand_path("#{File.dirname(__FILE__)}/yuicompressor.jar")
    @yuicompressor_options = "--line-break 6000 --preserve-semi -v"
    @log_level = ENV['JSHUB_DEBUG'] == 'true' ? true : false    
  end
 
  # iterate over each line in a -debug file and strip logging messages
  # continues to next file if there are errors
  # return true only if all files are stripped without errors
  def strip(files)
    allok = true
    files.each do |src_file|
      verbose(@log_level) do
      
        # determine filenames: -debug.js -> .js -> -min.js
        debug_file = src_file
        normal_file = src_file.gsub('-debug','') 
        puts "Strip logging from #{src_file}"

        src = File.open("#{debug_file}","r");
        out = File.open("#{normal_file}","w");
        src.each { |line|
          # output each file unless it contains this text
          line = "// #{line}" if line =~ /jsHub\.logger\.|Y\.log\(/ 
          out.puts line
        }
        src.close; 
        out.close;
      end
    end
    return allok
  end
 
  # iterate over each file and compress it's normal version in YUI Compressor
  # continues to next file if there are errors
  # return true only if all files are compressed without errors
  def compress(files)
    allok = true
    files.each do |src_file|
      verbose(@log_level) do
      
        # determine filenames: -debug.js -> .js -> -min.js
        debug_file = src_file
        normal_file = src_file.gsub('-debug','') 
        min_file = src_file.gsub('-debug','-min')
        puts "Compress #{normal_file}"
        
        sh "cd '#{RAILS_ROOT}' && java -jar '#{yuicompressor_jar}' #{yuicompressor_options} -o '#{min_file}' '#{normal_file}'" do |ok, res|
          if !ok
            puts "File: #{src_file} had errors (status = #{res.exitstatus})"
            allok = false
          end
        end
      end
    end
    return allok
  end
  
end