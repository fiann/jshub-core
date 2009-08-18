# TODO
# If you have previously been relying upon the code to start, stop 
# and restart your mongrel application, or if you rely on the database
# migration code, please uncomment the lines you require below

# If you are deploying a rails app you probably need these:

# load 'ext/rails-database-migrations.rb'
# load 'ext/rails-shared-directories.rb'

# There are also new utility libaries shipped with the core these 
# include the following, please see individual files for more
# documentation, or run `cap -vT` with the following lines commented
# out to see what they make available.

# load 'ext/spinner.rb'              # Designed for use with script/spin
# load 'ext/passenger-mod-rails.rb'  # Restart task for use with mod_rails
# load 'ext/web-disable-enable.rb'   # Gives you web:disable and web:enable

# Enable multistage deploys
set :stages, %w(staging production)
set :default_stage, "staging"
require 'capistrano/ext/multistage'

# name of the application
set :application, "core"

# If you aren't deploying to /u/apps/#{application} on the target
# servers (which is the default), you can specify the actual location
# via the :deploy_to variable:
set :deploy_to,   "/var/capistrano/#{application}"

# If you aren't using Subversion to manage your source code, specify
# your SCM below:
set :scm,         "git"
set :scm_verbose, true
set :deploy_via,  :checkout
set :branch,      "master"
set :git_shallow_clone, 1
  
#By default, Capistrano will try to use sudo to do certain operations (setting 
#up your servers, restarting your application, etc.). If you are on a shared 
#host, sudo might be unavailable to you, or maybe you just want to avoid using sudo.
set :use_sudo,    false

# Liam: overide the default task as we are using Passenger
# ref: http://www.modrails.com/documentation/Users%20guide.html#capistrano
namespace :deploy do
  desc "Restart Application"
  task :restart, :roles => :app do
    run "touch #{current_path}/tmp/restart.txt"
  end
end

# additional custom tasks viewable with 'cap -T'
namespace :custom do
  desc 'Lint the initial dist JS files. If they do not pass then the whole application is rolled back.'
  task :dist, :roles => [:app] do
    transaction do
      run "cd #{current_path} && rake jshub:javascripts:lint"
    end
  end
  
  desc 'Symlink the public directory into the web root. This is for use by Passenger via RailsBaseURI
        ref: http://www.modrails.com/documentation/Users%20guide.html#deploying_rails_to_sub_uri'
  task :link_webroot do
    run "ln -nfs #{current_path}/public #{webroot}"
  end
  
  desc 'Output the Subversion version number'
  task :version do
    run "echo \"r#{real_revision}\" > #{current_path}/app/views/shared/_version.html.erb"
  end  

  desc "Make symlink for server specific jshub_javascript_tester yaml" 
  task :link_app_config do
    run "ln -nfs #{shared_path}/config/jshub_javascript_tester.yml #{release_path}/config/jshub_javascript_tester.yml" 
  end
  
  desc "Create an archive of this application and put it in the downloads folder"
  task :archive do
    puts "Creating archive"
    run "cd #{current_path} && git archive --format=zip HEAD > #{current_path}/public/download/jshub-core.zip"  
  end
  
  desc "Generate website with help and guides"
  task :website do
    puts "Generating website"
    run "cd #{current_path} && rake jshub:website"
  end

end
# use our custom tasks at the appropriate time
# e.g. before :deploy, :my_custom_task
#      after  "deploy:symlink", :do_this, :and_do_that
after "deploy:setup",   "custom:link_webroot"
after "deploy:update",   "deploy:migrate", "custom:version", "custom:dist"
after "deploy:symlink",   "custom:link_app_config"
after "deploy:restart", "custom:archive", "custom:website"