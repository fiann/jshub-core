# This is in a rake file so that the configuration for Hudson is under version control.
namespace "hudson" do
  
  desc "Run the continuous build tasks"
  task :build => [
    "gems:install", 
    "db:schema:load", 
    "jshub:lint"] do
    
    # Server specific path removes the need for manual install of ci_reporter and editing of rake files in the app allowing rake gems:install to work for end users. See #773
    puts "CI Reporter: invoking using 'Advanced Usage' ref: http://caldersphere.rubyforge.org/ci_reporter/"
    sh 'rake -f /Library/Ruby/Gems/1.8/gems/ci_reporter-1.5.2/stub.rake ci:setup:testunit'
            
    # It looks like it should be possible to inline this in the dependencies but it doesn't
    # work due to a problem in rake where 'rake db:test:prepare' does not operate the same
    # as 'rake db:test:prepare; rake test'. See #582.
    "db:test:prepare"  
    sh 'rake test'
  end
end