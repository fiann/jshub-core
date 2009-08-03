output_location = "public/help"
assets_location = output_location

# ref: http://michaelxavier.net/posts/4-Custom-doc-app-for-Breaking-Up-Large-READMEs
namespace :jshub do 
  namespace :doc do 

    desc 'Generate help documentation for the application using rdoc and a template'
    Rake::RDocTask.new("help") { |rdoc|
      rdoc.template = "jshub"
      rdoc.options << '--line-numbers' << '--inline-source'

      # paths are relative to RAILS_ROOT
      rdoc.rdoc_files.include('*.rdoc')
      rdoc.rdoc_files.include('doc/help/**/*.rdoc')
      #rdoc.rdoc_files.exclude('')

      # place the files under the webroot for access when the app is running at '/help'/
      rdoc.rdoc_dir = "#{output_location}" # rdoc output folder
      rdoc.main    = "README.rdoc" # page to start on
      rdoc.title    = "jsHub help and guides"
      
    } # end task
    
    desc 'Copy static assets for help documentation'
    task "static" do
      FileUtils.mkdir_p(assets_location)
      FileUtils.cp_r 'doc/assets/', assets_location
    end
    
  end

  desc 'Generate jsHub documentation'
  task :doc => ['jshub:doc:rehelp', 'jshub:doc:static']

end