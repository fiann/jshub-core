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

    desc "Generate the default dist files from the src files"
    task :dist => :environment do |task, args|
      # TODO hit a Combo service URL and save files locally
      require 'net/http'
      require 'uri'
      
      # Set Combo server in config/jshub_javascript_tester.yml for now
      url = URI.parse("#{JSHUB_JAVASCRIPT_TESTER[:combo][:base_url]}")
      
      # the default jsHub dist
      res_min = Net::HTTP.start(url.host, url.port) do |http|
        http.get('/phploader/combo.php?jshub_2.0.0/build/jshub/jshub-min.js')
    end
      res_debug = Net::HTTP.start(url.host, url.port) do |http|
        http.get('/phploader/combo.php?jshub_2.0.0/build/jshub/jshub-debug.js')
      end
      File.open("#{RAILS_ROOT}/app/javascripts/dist/yui/yui-combo-jshub-min.js", 'w') do |file|
        file.write res_min.body
      end      
      File.open("#{RAILS_ROOT}/app/javascripts/dist/yui/yui-combo-jshub-debug.js", 'w') do |file|
        file.write res_debug.body
      end 
    
      # the default jsHub+microformats dist
      res_min = Net::HTTP.start(url.host, url.port) do |http|
        http.get('/phploader/combo.php?jshub_2.0.0/build/jshub/jshub-min.js&jshub_2.0.0/build/microformats/micriformats-min.js')
  end  
      res_debug = Net::HTTP.start(url.host, url.port) do |http|
        http.get('/phploader/combo.php?jshub_2.0.0/build/jshub/jshub-debug.js&jshub_2.0.0/build/microformats/micriformats-min.js')
end
      File.open("#{RAILS_ROOT}/app/javascripts/dist/yui/yui-combo-jshub+microformats-min.js", 'w') do |file|
        file.write res_min.body
      end      
      File.open("#{RAILS_ROOT}/app/javascripts/dist/yui/yui-combo-jshub+microformats-debug.js", 'w') do |file|
        file.write res_debug.body
      end 
      
      puts "The default distributions have generated from the combo service at: #{url.host}"
    end
    
  end  
end
