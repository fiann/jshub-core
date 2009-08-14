# This is in a :default rake task so that the configuration for RunCodeRun is under version control.
namespace "jshub" do
  namespace "runcoderun" do
    
    desc "Run the Continuous Integration build tasks for RunCodeRun"
    task :build => [
      "gems:install", 
      "db:schema:load",
      # linting is used as an equivilant to a compile failure
      "jshub:javascripts:lint",
      # start a server instance to serve javascript unit tests html pages
      "jshub:runcoderun:server:start",
      # run tests
      "test",
      # stop server
      "jshub:runcoderun:server:stop"] do
      
      puts "Running RunCodeRun build task"
    end
  
    desc "Start the local Rails server"
    task "server:start" => "environment" do
      port = JSHUB_JAVASCRIPT_TESTER[:continuous_integration][:port]
      # start the local server so tests can be requested directly from the app
      puts "Starting local server on port #{port}"
      FileUtils.mkpath "tmp/pids"  
      sh "cd '#{RAILS_ROOT}' && mongrel_rails start --port #{port} --pid tmp/pids/server.pid --daemonize"
    end
    task "server:stop" do
      # stop the local server
      puts "Stopping local server"
      sh "cd '#{RAILS_ROOT}' && mongrel_rails stop --pid tmp/pids/server.pid --wait 5"
    end
  
  end
end