# add our classes from lib/
require File.expand_path("#{RAILS_ROOT}/lib/yuicompressor/yuicompressor")

# invoke with optional [src] flag or list of files, e.g. files=src/hub.js,src/api.js
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
    
    # remove any generated dist files as they come from the combo service
    files = files.grep /^(?:(?!dist).)*$/
    
    # only use -debug files
    debug = files.grep /-debug\.js/
    
    # remove external libraries we don't control as they probably won't recompress
    # and we don't want to fork them
    debug = debug.grep /^(?:(?!jquery\/|yui\/|loader\/|debug\/|json\/).)*$/
    
    # Don't reprocess if the compressed files is up to date
    debug.reject! do |file|
      min_file = file.gsub(/-debug\.js$/, "-min.js")
      uptodate = File.exists?(min_file) && File.mtime(min_file) > File.mtime(file)
      if uptodate
        file = file["#{RAILS_ROOT}/app/javascripts/".length, file.length]
        puts "Skipping #{file}, up to date"
      end
      uptodate
    end
    
    if debug.empty?
      puts "All files up to date"
    else
      compressor = YUICompressor.new
      # remove logging statements
      puts "Stripping comments from #{debug.to_s}"
      allok = compressor.strip(debug)
      if !allok
        fail "Logging strip errors"
      end
      # run through YUI compressor
      puts "Compressing #{debug.to_s}"
      allok = compressor.compress(debug)      
      if !allok
        fail "Compression errors"
      end
    end    

    # # Remove comments from all -min files including external libraries
    # min = files.grep /-min\.js/
    # puts "Stripping comments from #{min.to_s}"
    # compressor = YUICompressor.new
    # compressor.yuicompressor_options = '--nomunge --line-break 6000 --preserve-semi -v'
    # allok = compressor.compress(min)      
    # if !allok
    #   fail "Comment strip errors"
    # end
    
  end
  
end  
