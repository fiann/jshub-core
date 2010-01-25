# invoke with optional [src] flag or list of files, e.g. files=src/hub.js,src/api.js
# TODO: generate list of files from dir only
namespace :jshub do 
  namespace :javascripts do 
    
    desc "Validate JavaScript source files with JsLint in Rhino"
    Rake::TestTask.new(:lint) do |t|
      # get a list of all the test files
      t.pattern = 'app/javascripts/**/*.js'
      t.verbose = true if ENV['JSHUB_DEBUG'] == 'true'
      
      # Create the tasks defined by this task lib
      def t.define
        lib_path = @libs.join(File::PATH_SEPARATOR)
        task @name do
          RakeFileUtils.verbose(@verbose) do
            @ruby_opts.unshift( "-I#{lib_path}" )
            @ruby_opts.unshift( "-w" ) if @warning
            ruby @ruby_opts.join(" ") +
              " -e \"load '#{File.expand_path(File.dirname(__FILE__)+"/../lib/jshub_javascript_tester/jslint_test_runner.rb")}'; " +
              # use files matching t.pattern or TEST=
              "JslintTestRunner.initialize_tests(%w{#{file_list}})\""
          end
        end
      end
    end
  end
end
