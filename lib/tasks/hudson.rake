# This is in a rake file so that the configuration for Hudson is under version control.
namespace "jshub" do
  namespace "hudson" do
    
    desc "Run the Continuous Integration build tasks for Hudson"
    task :build => [
      "gems:install", 
      "db:schema:load",
      # linting is used as an equivilant to a compile failure
      "jshub:javascripts:lint",
      # start a server instance to serve javascript unit tests html pages
      "jshub:hudson:server:start"] do
      
      # Server specific path removes the need for manual install of ci_reporter and editing of rake files in the app allowing rake gems:install to work for end users. See #773
      puts "CI Reporter: invoking using 'Advanced Usage' ref: http://caldersphere.rubyforge.org/ci_reporter/"
      #stub_path = "/Library/Ruby/Gems/1.8/gems/ci_reporter-1.5.2/stub.rake" # osx
      stub_path = "/usr/local/lib/ruby/gems/1.8/gems/ci_reporter-1.5.2/stub.rake" # gromit

      # invoke the CI task in same process as test to output results in JUnit XML format into the default location (./test/reports)
      sh "#{RAILS_ROOT} && rake -f #{stub_path} ci:setup:testunit test" 
      
      # stop the server instance
      sh "#{RAILS_ROOT} && rake jshub:hudson:server:stop"
    end
  
    desc "Start the local Rails server"
    task "server:start" do
      # start the local server so tests can be requested directly from the app
      puts "Starting local server"
      sh "cd #{RAILS_ROOT} && mongrel_rails start --port 30000 --pid tmp/pids/server.pid --daemonize"
    end
    task "server:stop" do
      # stop the local server
      puts "Stopping local server"
      sh "#{RAILS_ROOT} && mongrel_rails stop --pid tmp/pids/server.pid --wait 5"
    end
  
  end
end