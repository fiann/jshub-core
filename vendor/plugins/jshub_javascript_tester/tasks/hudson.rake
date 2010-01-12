# This is in a rake file so that the configuration for Hudson is under version control.

namespace "jshub" do
  namespace "hudson" do
    
    desc "Run the Continuous Integration build tasks for Hudson"
    task :build => [
      "gems:install", 
      "db:migrate",
      # linting is used as an equivilant to a compile failure
      "jshub:javascripts:lint"] do
      
      begin
        puts "Running Hudson build task"

        # start a server instance to serve javascript unit tests html pages
        Rake::Task["jshub:hudson:server:start"].execute []
        
        # invoke the CI task in same process as test to output results in JUnit XML format into the default location (./test/reports)
        Rake::Task["ci:setup:testunit"].execute []
        Rake::Task["test"].execute []
      ensure
        # stop server
        Rake::Task["jshub:runcoderun:server:stop"].execute []
        puts "Finished Hudson build task"
      end
    end
  
    desc "Start the local Rails server"
    task "server:start" => "environment" do
      if FileTest.exists? "tmp/pids/server.pid"
        puts "Server is already running and pid file exists"        
      elsif
        port = JSHUB_JAVASCRIPT_TESTER[:webserver][:port]
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
