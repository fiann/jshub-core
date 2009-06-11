# STAGING-specific deployment configuration
# please put general deployment config in config/deploy.rb

puts "Deploying to STAGING"

set :scm_domain,  "jshub.org"
set :domain,      "gromit"
set :rails_env,   "gromit"

# construct the path to the repository
set :repository,   "git@#{scm_domain}:jshub-core.git"

#If you log into your server with a different user name than you are logged 
#into your local machine with, youll need to tell Capistrano about that user 
#name.
set :user, "dev"

# webserver root symlink path for passenger
set :webroot, "/var/www/html/#{application}"

# all services are on the same server for now
role :app, domain
role :web, domain
role :db,  domain, :primary => true
