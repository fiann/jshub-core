namespace :doc do
  namespace :diagram do
    task :models do
      sh "railroad -i -l -a -m -M | dot -Tsvg | sed 's/font-size:14.00/font-size:11.00/g' > doc/models.svg"
    end

    task :controllers do
      puts "Railsroad has not yet been updated for Rails 2.3 ref: http://rubyforge.org/tracker/index.php?func=detail&aid=26493&group_id=3383&atid=12998"
      # sh "railroad -i -l -C | neato -Tsvg | sed 's/font-size:14.00/font-size:11.00/g' > doc/controllers.svg"
    end
  end

  task :diagrams => %w(diagram:models diagram:controllers)
end