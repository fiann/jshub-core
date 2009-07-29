require 'test_helper'

class JavascriptTestControllerTest < ActionController::TestCase
  
  test "should get html page" do
    # Check the URL to the HTML file to be tested is valid
    assert_routing "/test/unit/hub_configuration_test", { :controller => 'javascript_test', :action => 'unit', :path => [ 'hub_configuration_test' ] }
    get :unit, { :path => [ 'hub_configuration_test' ] }
    assert_response :success
    assert_equal "text/html", @response.content_type
  end
    
end
