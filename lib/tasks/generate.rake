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
    
    compressor = YUICompressor.new
    # remove logging statements
    allok = compressor.strip(debug)
    if !allok
      fail "Logging strip errors"
    end
    # run through YUI compressor
    allok = compressor.compress(debug)      
    if !allok
      fail "Compression errors"
    end
    
    # Remove comments from all -min files including external libraries
    min = files.grep /-min\.js/
    compressor = YUICompressor.new
    compressor.yuicompressor_options = '--nomunge --line-break 6000 --preserve-semi -v'
    allok = compressor.compress(min)      
    if !allok
      fail "Comment strip errors"
    end
    
  end
  
end  
