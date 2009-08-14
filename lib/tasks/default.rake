# Task for RunCodeRun

# override the default task as it calls just 'rake'
Rake::Task[:default].prerequisites.clear
desc "Override the default task for RunCodeRun"
task :default => ["jshub:runcoderun:build"]

