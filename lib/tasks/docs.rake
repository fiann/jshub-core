require 'grancher/task'

output_location = "./../public/website"

namespace :jshub do 
  
  desc 'Generate the website help and  documentation'
  task "website" do
    sh "cd #{RAILS_ROOT}/website/ && jekyll #{output_location}"
  end

  namespace :website do 
  
    # Github requires the documentation to be in a special branch called 'gh-pages'
    # ref: http://judofyr.net/posts/copy-folders-to-a-branch.html
    desc 'Publish the website help and documentation to Github'
    Grancher::Task.new do |g|
      g.branch = 'gh-pages'
      g.push_to = 'github' # automatically push too    
      g.directory 'website'
    end
  
  end
  
end

