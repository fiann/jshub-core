# This is the unstall hook for the plugin. It removes resources from locations.
require 'pathname'

# TODO this should all be a generator using Rails::Generator::Base

# Leave the config (which will be customised by the user)
config_file = Pathname.new("#{File.dirname(__FILE__)}/../../../config/jshub_javascript_tester.yml")
if config_file.exist?
  puts "Leaving plugin config file #{config_file.cleanpath}"
end

# Leave location for Javascript Unit tests with template HTML files
examples = Pathname.new("#{File.dirname(__FILE__)}/../../../test/javascript/")
if examples.exist?
  puts "Leaving unit test files in #{examples.cleanpath}/"
end

# Leave migrations (as there is data in the db)
plugin_migrations = Pathname.new("#{File.dirname(__FILE__)}/db/migrate/")
migrations = Pathname.new("#{File.dirname(__FILE__)}/../../../db/migrate/")
# list our files to highlight ours
if plugin_migrations.directory?
  plugin_migrations.children.each do |file|
    if file.exist?
      puts "Leaving plugin migration #{migrations.cleanpath}/#{file.basename}"
    end
  end
end

# Delete the initializers
plugin_initializers = Pathname.new("#{File.dirname(__FILE__)}/config/initializers/")
initializers = Pathname.new("#{File.dirname(__FILE__)}/../../../config/initializers/")
# list our files to remove only those from the target
if plugin_initializers.directory?
  plugin_initializers.children.each do |file|
    if file.exist?
      delete_me = Pathname.new("#{initializers.cleanpath}/#{file.basename}")
      puts "Deleting plugin initializer #{delete_me}"
      delete_me.delete
    end
  end
end

# Delete assets in public directory
assets = Pathname.new("#{File.dirname(__FILE__)}/../../../public/plugin_assets/jshub_javascript_tester/")
if assets.directory?
  puts "Deleting plugin assets in #{assets.cleanpath}/"
  assets.rmtree
end
