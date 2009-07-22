namespace :jshub do
  namespace :test_runs do
  
    desc "Download JUnit XML for latest Test Run supplied by a Testing Vendor"
    # You have to invoke :environment to have access to Models
    task :latest => :environment do
  
      if APP_CONFIG[:test_run][:vendor][:url_prefix] != 'secret'
        # Ruby HTTP client
        # ref: http://www.ruby-doc.org/stdlib/libdoc/net/http/rdoc/index.html
        require 'net/http'
        require 'uri'
    
        # Where to write our files
        temp_folder = "#{RAILS_ROOT}/tmp/"
        FileUtils.makedirs temp_folder
        report_folder = "#{RAILS_ROOT}/test/reports/integration"
        FileUtils.makedirs report_folder
    
        puts "Getting JUnit XML results for the latest test run"
        
        # get the Id of the last test run
        url = URI.parse("#{APP_CONFIG[:test_run][:vendor][:url_prefix]}/#{APP_CONFIG[:test_run][:vendor][:name]}/external/latest")
        req = Net::HTTP::Get.new(url.path)
        res = Net::HTTP.start(url.host, url.port) {|http|
          http.request(req)
        }
        # store the value for later use
        @run_id = res.body
        #File.open "#{temp_folder}/latest_test_run_id.txt", "w" do |file|
        #  file.puts "#{@run_id}"
        #end
        puts "The latest Test Run Id is: #{@run_id}"
    
        # use the Id to get the JUnit XML
        url = URI.parse("#{APP_CONFIG[:test_run][:vendor][:url_prefix]}/#{APP_CONFIG[:test_run][:vendor][:name]}/runs/#{@run_id.to_s}/results.xml")
        req = Net::HTTP::Get.new(url.path)
        res = Net::HTTP.start(url.host, url.port) {|http|
          http.request(req)
        }
        # store the XML for parsing by Hudson
        @results_xml = res.body
        File.open "#{report_folder}/latest_test_run_results.xml", "w" do |file|
          file.puts "#{@results_xml}"
        end
    
        puts "The latest Test Run XML has been saved to: #{report_folder}/latest_test_run_results.xml"
      else
        puts "A Testing Vendor is not configured in config/app_config.yml"
      end
            
    end
  
  end
end
