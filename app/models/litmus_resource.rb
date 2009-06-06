# ORM mapping via REST API
# ref: http://api.rubyonrails.org/classes/ActiveResource/Base.html
# ref: http://litmusapp.com/help/customer-api/
class LitmusResource < ActiveResource::Base
  self.site = "#{APP_CONFIG[:test_run][:vendor][:site]}"
  self.timeout = 10
  
  # credentials
  # TODO move to YAML file in config
  site.user = "#{APP_CONFIG[:test_run][:vendor][:user]}"
  site.password = "#{APP_CONFIG[:test_run][:vendor][:password]}"

  # Lists all tests
  # e.g. /tests.xml
  class Testset < LitmusResource
    # needed it does not match the class name
    self.element_name = "test"
  end

  # Returns details of a single test
  # e.g. GET /tests/#{id}.xml
  class Test < LitmusResource
  end

  # Lists all versions of the test.
  # e.g. GET /tests/#{test-id}/versions.xml
  class Versionset < LitmusResource
    #self.site += "/tests/:testset_id"
    #self.prefix = "/tests/:testset_id"
  end
  
  # Returns details of a single test version.
  # e.g. GET /tests/#{test-id}/versions/#{version}.xml
  class Version < LitmusResource
  end
  
  # Creates a new web page test in the account.
  # e.g. POST /pages.xml
  class Page < LitmusResource
    self.element_name = "test_set" # singular name and XML root element
    self.collection_name = "pages" # plural name and path to xml requested
  end
end