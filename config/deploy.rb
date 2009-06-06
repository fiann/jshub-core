set :application, "akita-on-rails"
# The gateway server is accessed before anything else and all ssh commands sent via it
set :gateway,     "intra.causata.com"
set :domain,      "gromit"
set :rails_env,   "gromit"

# If you aren't deploying to /u/apps/#{application} on the target
# servers (which is the default), you can specify the actual location
# via the :deploy_to variable:
set :deploy_to,   "/var/capistrano/#{application}"

# If you aren't using Subversion to manage your source code, specify
# your SCM below:
set :scm,         "subversion"

#If you log into your server with a different user name than you are logged 
#into your local machine with, youÕll need to tell Capistrano about that user 
#name.
set :user, "dev"

#If you access your source repository with a different user name than you are 
#logged into your local machine with, Capistrano needs to know. Note that not 
#all SCMÕs support the scm_username variable; you might need to embed the 
#scm_username into the repository, 
#e.g. Òsvn+ssh://#{scm_username}@foo.bar.com/path/to/repoÓ.
set :scm_username, "capistrano"
# Liam: needed due to Basic Auth protecting the SVN server
set :scm_password, "tant0ine"

# construct the path to the repository
set :repository,  "http://#{domain}/svn/javascript/tag-core/trunk/"

# all services are on the same server for now
role :app, domain
role :web, domain
role :db,  domain, :primary => true

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
  desc 'Create the initial dist JS files. These files are linted and then merged via rake and an ERB template, if something goes wrong then the whole application is rolled back.'
  task :dist, :roles => [:app] do
    transaction do
      run "cd #{current_path} && rake jshub:lint"
    end
  end
  
  desc 'Symlink the public directory into the web root. This is for use by Passenger via RailsBaseURI
        ref: http://www.modrails.com/documentation/Users%20guide.html#deploying_rails_to_sub_uri'
  task :symlink do
    run "ln -nfs #{current_path}/public /var/www/html/#{application}"
  end
  
  desc 'Output the Subversion version number'
  task :version do
    run "echo \"r#{real_revision}\" > #{release_path}/app/views/shared/_version.html.erb"
  end  

end
# use our custom tasks at the appropriate time
# e.g. before :deploy, :my_custom_task
#      after  "deploy:symlink", :do_this, :and_do_that
after "deploy:update",   "deploy:migrate", "custom:version", "custom:dist"
after "deploy:symlink",   "custom:symlink"