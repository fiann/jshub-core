# This is the post install hook for the plugin. It copies resources to necessary locations.
require 'fileutils'

# TODO this should all be a generator using Rails::Generator::Base

# Copy the config (which will be customised by the user)
plugin_config_file = "#{File.dirname(__FILE__)}/config/jshub_javascript_tester.yml"
config_file = File.expand_path("#{File.dirname(__FILE__)}/../../../config/jshub_javascript_tester.yml")
if File::exists? config_file
  puts "Config file already exists. Please ensure it is up-to-date with the current format."
  puts "See #{plugin_config_file}"
else  
  puts "Installing default config"
  puts "  From #{plugin_config_file}"
  puts "For External Vendor and Continuous Integration tests to work you need to configure this file"
  puts "  See #{plugin_config_file}"
  FileUtils.copy_file plugin_config_file, config_file
end

# copy the initializers
plugin_initializers = "#{File.dirname(__FILE__)}/config/initializers/." # note '.'
initializers = File.expand_path("#{File.dirname(__FILE__)}/../../../config/initializers/")
FileUtils.cp_r plugin_initializers, initializers

# Copy migrations (as a single authorative source is needed)
plugin_migrations = "#{File.dirname(__FILE__)}/db/migrate/." # note '.'
migrations = File.expand_path("#{File.dirname(__FILE__)}/../../../db/migrate/")
puts "New migrations have been added to the app."
puts "  Please run 'rake db:migrate'"
FileUtils.cp_r plugin_migrations, migrations

# Make location for Javascript Unit tests with template HTML files
plugin_examples = "#{File.dirname(__FILE__)}/lib/jshub_javascript_tester/templates/." # note '.'
examples = File.expand_path("#{File.dirname(__FILE__)}/../../../#{JSHUB_JAVASCRIPT_TESTER[:src_path]}")
FileUtils.mkdir_p examples
FileUtils.cp_r plugin_examples, examples

# Copy assets to public directory
plugin_assets = "#{File.dirname(__FILE__)}/assets/." # note '.'
assets = File.expand_path("#{File.dirname(__FILE__)}/../../../public/plugin_assets/jshub_javascript_tester/")
FileUtils.mkdir_p assets
FileUtils.cp_r plugin_assets, assets