output_location = "./../public/website"

namespace :jshub do 

  # Generate a CHANGELOG file from commit messages for inclusion in a download zip
  # ref: http://sick.snusnu.info/2009/05/11/rake-task-to-generate-changelog-file-for-git-repositories/
  desc 'Update the CHANGELOG.txt file'
  task :changelog do
    File.open('public/CHANGELOG.txt', 'w+') do |changelog|
      `git log -z --abbrev-commit`.split("\0").each do |commit|
        next if commit =~ /^Merge: \d*/
        ref, author, time, _, title, _, message = commit.split("\n", 7)
        ref = ref[/commit ([0-9a-f]+)/, 1]
        author = author[/Author: (.*)/, 1].strip
        time = Time.parse(time[/Date: (.*)/, 1]).utc
        title.strip!
  
        changelog.puts "[#{ref} | #{time}] #{author}"
        changelog.puts '', " * #{title}"
        changelog.puts '', message.rstrip if message
        changelog.puts
      end
    end
  end
  
  desc 'Generate the website help and  documentation'
  task "website" do
    sh "cd #{RAILS_ROOT}/website/ && jekyll --no-auto #{output_location}"
  end

  namespace :website do 
  
    # Github requires the documentation to be in a special branch called 'gh-pages'
    # ref: http://judofyr.net/posts/copy-folders-to-a-branch.html    
    desc 'Publish the website help and documentation to Github'
    task "publish" do
      require 'grancher'
      # Uses library version so that rake -T and rake gems:install do not fail if gem is missing
      grancher = Grancher.new do |g|
        g.directory 'website'

        g.branch = 'gh-pages'
        g.push_to = 'origin' # automatically push too    
        g.message = 'Updated website'
      end
      grancher.commit
      grancher.push
    end

    desc 'Develop the website help and documentation'
    task "dev" do
      sh "cd #{RAILS_ROOT}/website/ && jekyll #{output_location}"
    end

  end
  
end

