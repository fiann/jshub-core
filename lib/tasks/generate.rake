# add our classes from lib/
require File.expand_path("#{RAILS_ROOT}/lib/yuicompressor/yuicompressor")

# invoke with optional [src] flag or list of files, e.g. files=src/hub.js,src/api.js
namespace :jshub do 
  namespace :javascripts do 
    
    desc "Generate the -min and normal src from the -debug src files"
    task :generate, :files do |task, args|
      
      # by default use the src js files
      if (args.files == nil || args.files=='src')
        files = Dir["#{RAILS_ROOT}/app/javascripts/**/*.js"]
      # or specifically named files
      else
        files = args.files.split(",")
      end
      
      # only use -debug files
      files = files.grep /-debug\.js/

      # remove any generated dist files as they come from the combo service
      files = files.grep /^(?:(?!dist).)*$/

      # remove external libraries we don't control as they probably won't recompress
      # and we don't want to fork them
      files = files.grep /^(?:(?!jquery\/|yui\/|loader\/|debug\/|json\/).)*$/

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
      # TODO hit a Combo service URL and save files locally
      puts 'The distribution is generated from the YUI phploader application'
    end
    
  end  
end
