# Be sure to restart your server when you modify this file

# Specifies gem version of Rails to use when vendor/rails is not present
RAILS_GEM_VERSION = '2.3.2' unless defined? RAILS_GEM_VERSION

# Bootstrap the Rails environment, frameworks, and default configuration
require File.join(File.dirname(__FILE__), 'boot')

Rails::Initializer.run do |config|
  # Settings in config/environments/* take precedence over those specified here.
  # Application configuration should go into files in config/initializers
  # -- all .rb files in that directory are automatically loaded.

  # Add additional load paths for your own custom dirs
  # config.load_paths += %W( #{RAILS_ROOT}/extras )

  # Specify gems that this application depends on. 
  # They can then be installed with "rake gems:install" on new installations.
  # You have to specify the :lib option for libraries, where the Gem name (sqlite3-ruby) differs from the file itself (sqlite3)
  # config.gem "bj"
  # config.gem "hpricot", :version => '0.6', :source => "http://code.whytheluckystiff.net"
  # config.gem "sqlite3-ruby", :lib => "sqlite3"
  # config.gem "aws-s3", :lib => "aws/s3"
  
  # Detect and load gems needed
  # ref: http://www.fngtps.com/2008/12/adding-development-gem-dependencies-to-a-rails-application
  
  # the database we use. Note: version fixed to latest available on Windows via 'gem install'
  config.gem "sqlite3-ruby", :version => '1.2.3', :lib => "sqlite3"
  config.gem "haml", :version => '>= 2.2.1'
  # for generating diagrams see http://railroad.rubyforge.org/
  config.gem "railroad", :version => '>= 0.5.0', :lib => "railroad/diagram_graph"
  # for writing XPI file
  config.gem "rubyzip", :version => '>= 0.9.1', :lib => "zip/zip"

  # for documentation
  config.gem "jekyll", :version => '>= 0.4.1'

  # for deployment
  config.gem "capistrano", :version => '>= 2.5.8'
  # along with Apache integration
  config.gem "passenger", :lib => false if RAILS_ENV == 'jshub' || RAILS_ENV == 'gromit' || RAILS_ENV == 'passenger'
  
  # convert test output to XML for CI Servers like Hudson and CruiseControl
  # ref: http://blog.huikau.com/2008/01/09/jruby-ruby-continuous-integration-with-hudson/
  config.gem "ci_reporter", :lib => "ci/reporter/core" if RAILS_ENV == 'gromit'

  # Only load the plugins named here, in the order given (default is alphabetical).
  # :all can be used as a placeholder for all plugins not explicitly named
  # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

  # Skip frameworks you're not going to use. To use Rails without a database,
  # you must remove the Active Record framework.
  # config.frameworks -= [ :active_record, :active_resource, :action_mailer ]

  # Activate observers that should always be running
  # config.active_record.observers = :cacher, :garbage_collector, :forum_observer

  # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
  # Run "rake -D time" for a list of tasks for finding time zone names.
  config.time_zone = 'UTC'

  # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
  # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}')]
  # config.i18n.default_locale = :de
end
