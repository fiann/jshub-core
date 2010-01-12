# This is in a :default rake task so that the configuration for RunCodeRun is under version control.
namespace "jshub" do
  namespace "runcoderun" do
    
    desc "Run the Continuous Integration build tasks for RunCodeRun"
    task :build => [
      "gems:install", 
      # linting is used as an equivilant to a compile failure
      "jshub:javascripts:lint"] do

    
      # Behave nice on RunCodeRun servers
      # ref: http://support.runcoderun.com/discussions/builds-open-source/72-server-500-error-on-localhost
      begin
        # start a server instance to serve javascript unit tests html pages
        Rake::Task["jshub:runcoderun:server:start"].execute []
        # run tests
        Rake::Task["test"].execute []
      ensure
        # stop server
        Rake::Task["jshub:runcoderun:server:stop"].execute []
        puts "Finished RunCodeRun build task"
      end
    end
  
    desc "Start the local Rails server"
    task "server:start" => "environment" do
      if FileTest.exists? "tmp/pids/server.pid"
        puts "Server is already running and pid file exists"        
      elsif
        # Behave nice on RunCodeRun servers
        # ref: http://support.runcoderun.com/discussions/builds-open-source/72-server-500-error-on-localhost
        #port = JSHUB_JAVASCRIPT_TESTER[:webserver][:port]
        port = 81664
        # start the local server so tests can be requested directly from the app
        puts "Starting local server on port #{port}"
        FileUtils.mkpath "tmp/pids"  
        sh "cd '#{RAILS_ROOT}' && mongrel_rails start --port #{port} --pid tmp/pids/server.pid --daemonize"
      end
    end
    desc "Stop the local Rails server"
    task "server:stop" do
      if FileTest.exists? "tmp/pids/server.pid"
        # stop the local server
        puts "Stopping local server"
        sh "cd '#{RAILS_ROOT}' && mongrel_rails stop --pid tmp/pids/server.pid --wait 5"
      elsif
        puts "Cannot find pid file to stop server"        
      end
    end
  
  end
end