require 'test_helper'

class JsControllerTest < ActionController::TestCase
  
  test "should get file listing" do
    get :show, { :path => [] }
    assert_response :success
    assert_equal "text/html", @response.content_type
    # check for presence of an example file and folder link
    assert_select "ul" do
      assert_select "li a[href$=hub.js]", "hub.js"
      assert_select "li a[href$=data-capture]", "data-capture"
    end
  end
  
  test "should get raw source file" do
    assert_routing "js/src/hub.js", { :controller => 'js', 
      :action => 'src', :path => [ 'hub.js' ] }
    get :src, { :path => [ 'hub.js' ] }
    assert_response :success
    assert_equal "text/javascript", @response.content_type
  end
  
  test "should get html formatted source file" do
    assert_routing "js/show/hub.js", { :controller => 'js', 
      :action => 'show', :path => [ 'hub.js' ] }
    get :show, { :path => [ 'hub.js' ] }
    assert_response :success
    assert_equal "text/html", @response.content_type
  end
  
end
