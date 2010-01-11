# The test:javascripts task
desc "Run tests for javascript unit test pages, use 'TEST=' to test a single page."
Rake::TestTask.new("test:javascripts" => "db:test:prepare") do |t|
  # get a list of all the test files
  t.pattern = 'test/unit/javascript/**/*.html.erb'
  t.libs << 'test'
  t.verbose = true if ENV['JSHUB_DEBUG'] == 'true'
  
  # Create the tasks defined by this task lib
  def t.define
    lib_path = @libs.join(File::PATH_SEPARATOR)
    task @name do
      RakeFileUtils.verbose(@verbose) do
        @ruby_opts.unshift( "-I#{lib_path}" )
        @ruby_opts.unshift( "-w" ) if @warning
        ruby @ruby_opts.join(" ") +
          " -e \"RAILS_ENV='#{RAILS_ENV}'; " +
          "load '" + File.expand_path("#{File.dirname(__FILE__)}/../lib/jshub_javascript_tester/jshub_test_runner.rb") + "'; " +
          # use files matching t.pattern or TEST=
          "JshubTestRunner.initialize_tests(%w{#{file_list}})\""
      end
    end
  end
end

# Rake merges actions from duplicate tasks
# ref: http://blog.jayfields.com/2008/02/rake-task-overwriting.html
desc "Run all unit, functional, integration and javascript tests"
task :test do
  Rake::Task["test:javascripts"].invoke
end