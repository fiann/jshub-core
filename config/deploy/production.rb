# PRODUCTION-specific deployment configuration
# please put general deployment config in config/deploy.rb

puts "Deploying to PRODUCTION"

set :scm_domain,  "github.com"
set :domain,      "jshub.org"
set :rails_env,   "jshub"

# construct the path to the repository
set :repository,   "git@#{scm_domain}:jshub/jshub-core.git"

#If you log into your server with a different user name than you are logged 
#into your local machine with, youll need to tell Capistrano about that user 
#name.
set :user, "capistrano"

# webserver root symlink path for passenger
set :webroot, "/var/jshub/htdocs/#{application}"

# all services are on the same server for now
role :app, domain
role :web, domain
role :db,  domain, :primary => true
