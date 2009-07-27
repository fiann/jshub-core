# Copied from the default Rails rake task, to add test:javascripts
desc 'Run all unit, functional, javascript and integration tests'
task :test do
  errors = %w(test:units test:javascripts test:functionals test:integration).collect do |task|
    begin
      Rake::Task[task].invoke
      nil
    rescue => e
      task
    end
  end.compact
  abort "Errors running #{errors.to_sentence}!" if errors.any?
end    

# The test:javascripts task
namespace :test do
  Rake::TestTask.new(:javascripts) do |t|
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
            " -e \"load './lib/testing/javascript_test.rb'; "+
          # just test the file declared using FILE=
          if ENV["FILE"]
            "JavascriptTest.initialize_tests(%w{#{ENV['FILE']}})\""
          else
          # use files matching t.pattern
            "JavascriptTest.initialize_tests(%w{#{file_list}})\""
          end
        end
      end
    end
    
  end
  Rake::Task['test:javascripts'].comment = "Run JavaScript unit test pages, use 'FILE=' to test a single page."
end
