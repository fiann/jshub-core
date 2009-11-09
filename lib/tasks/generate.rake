# add our classes from lib/
require File.expand_path("#{File.dirname(__FILE__)}/../../lib/yuicompressor/yuicompressor")

# invoke with optional [src] flag or list of files, e.g. files=src/hub.js,src/api.js
namespace :jshub do 
  namespace :javascripts do 
    
    desc "Generate the -min and normal src from the -debug src files"
    task :generate, :files do |task, args|
      
      # by default use the src js files
      if (args.files == nil || args.files=='src')
        files = Dir["#{RAILS_ROOT}/app/javascripts/**/*.js"]
      # or the dist js files
      elsif (args.files=='dist')
        files = Dir["#{RAILS_ROOT}/dist/**/*.js"]
      # or specifically named files
      else
        files = args.files.split(",")
      end
      
      # only use -debug files
      files = files.grep /-debug\.js/

      # remove external libraries we don't control as they probably won't recompress
      # and we don't want to fork them
      files = files.grep /^(?:(?!jquery\/|yui\/|loader\/|debug\/).)*$/
      puts files

      compressor = YUICompressor.new
      # remove logging statements
      allok = compressor.strip(files)
      if !allok
        fail "Logging strip errors"
      end

      # run through YUI compressor
      allok = compressor.compress(files)      
      if !allok
        fail "Compression errors"
      end

    end

    desc "Generate the default dist files from the src files"
    task :dist do |task, args|
      # Declare the files in a 'standard' dist
      files = [File.expand_path("#{RAILS_ROOT}/app/javascripts/HEADER"),
               File.expand_path("#{RAILS_ROOT}/app/javascripts/modules/yui/yui-debug.js"),
               File.expand_path("#{RAILS_ROOT}/app/javascripts/modules/hub/hub-debug.js"),
               File.expand_path("#{RAILS_ROOT}/app/javascripts/modules/logger/logger-debug.js"),
               File.expand_path("#{RAILS_ROOT}/app/javascripts/modules/image-transport/image-transport-debug.js"),
               File.expand_path("#{RAILS_ROOT}/app/javascripts/modules/form-transport/form-transport-debug.js"),
               File.expand_path("#{RAILS_ROOT}/app/javascripts/modules/utilities/utilities-debug.js"),
               File.expand_path("#{RAILS_ROOT}/app/javascripts/modules/jshub/jshub-debug.js")]
      # Files to generate
      debug_file = File.expand_path("#{RAILS_ROOT}/app/javascripts/jshub-dist-debug.js")

      # Concatenate all the -debug files together
      data = ''
      files.each do |src_file|
        verbose(@log_level) do
          File.open("#{src_file}","r").each { |line|
            data += line
          }
          data += "\n\n"
        end
      end
      File.open("#{debug_file}","w") do |file|
        file.write(data)
      end
      
      # Generate the remaining files from the -debug version as normal
      Rake::Task['jshub:javascripts:generate'].invoke(files=debug_file)
      
    end
    
  end  
end
