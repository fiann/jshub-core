# add our classes from lib/
require File.expand_path("#{File.dirname(__FILE__)}/../lib/rhino/rhinojs")

# invoke with optional [src] flag or list of files, e.g. files=src/hub.js,src/api.js
# TODO: generate list of files from dir only
namespace :jshub do 
  namespace :javascripts do 
    
    desc "Validate JavaScript source files with JsLint in Rhino"
    task :lint, :files do |task, args|
      
      # by default lint the src js files
      if (args.files == nil || args.files=='src')
        files = Dir["#{RAILS_ROOT}/app/javascripts/**/*.js"]
        # or the src js files
      elsif (args.files=='dist')
        files = Dir["#{RAILS_ROOT}/dist/**/*.js"]
        # or specifically named files
      else
        files = args.files.split(",")
      end
      
      # remove any minimised files as they won't lint
      files = files.grep /^(?:(?!-min).)*$/

      # remove any generated dist files as they won't lint
      files = files.grep /^(?:(?!-dist).)*$/

      # remove external libraries we don't control as they probably won't lint
      # and we don't want to fork them
      files = files.grep /^(?:(?!jquery\/|yui\/|loader\/|debug\/).)*$/
      puts files
            
      # lint the files in Rhino
      rhinojs = RhinoJS.new
      allok = rhinojs.lint(files)
      
      if !allok
        fail "Lint validation errors"
      end
    end
    
  end  
end
