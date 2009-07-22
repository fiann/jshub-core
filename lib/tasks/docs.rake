# ref: http://michaelxavier.net/posts/4-Custom-doc-app-for-Breaking-Up-Large-READMEs
namespace :jshub do 
  namespace :doc do 

    desc 'Generate help documentation for the application using rdoc and a template'
    Rake::RDocTask.new("help") { |rdoc|
      rdoc.template = "lib/rdoc/generators/template/html/jamis.rb"
      rdoc.options << '--line-numbers' << '--inline-source'

      # paths are relative to RAILS_ROOT
      rdoc.rdoc_files.include('*.rdoc')
      rdoc.rdoc_files.include('doc/help/**/*.rdoc')
      #rdoc.rdoc_files.exclude('')

      # place the files under the webroot for access when the app is running at '/help'/
      rdoc.rdoc_dir = 'public/help' # rdoc output folder
      rdoc.main    = "README.rdoc" # page to start on
      rdoc.title    = "jsHub help and guides"

    }

  end
end