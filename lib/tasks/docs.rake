output_location = "./../public/help"

namespace :jshub do 
  
  desc 'Generate the help documentation'
  task "doc" do
    sh "cd #{RAILS_ROOT}/website/ && jekyll #{output_location}"
  end
  
end

