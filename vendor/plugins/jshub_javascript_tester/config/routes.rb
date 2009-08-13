ActionController::Routing::Routes.draw do |map|

  # External access to the Javascript unit test files including the Test Page Id in the path
  # TODO tidy up the data model this should really be a test run id
  map.external_test_results '/test/external/:test_page_id/results', 
    :conditions => { :method => :post },
    :controller => 'javascript_test_result', 
    :action => 'create'
  map.external_test '/test/external/:test_page_id/:action/*path', :controller => 'javascript_test'

  # Collect data from the YUITest results POST
  map.resources :javascript_test_result, :as => 'test/results', :collection => { :destroy_all => :delete }   
  # Serve the Javascript test templates
  map.javascript_test '/test/:action/*path', :controller => 'javascript_test'
      
  # Tests run through the Litmus service
  map.resources :litmus_test_runs, :as => 'litmus/runs', :controller => 'litmus_test_run', 
    :collection => { :destroy_all => :delete } 
  map.litmus_run_page '/litmus/runs/:id/run_page/*path', :controller => 'litmus_test_run', :action => 'run_page'
  map.connect '/litmus/runs/:id/results.xml', :controller => 'litmus_test_run', :action => 'results', :format => 'xml'
  map.litmus_external_latest '/litmus/external/latest', :controller => 'litmus', :action => 'latest' 
  map.resources :litmus_external, :as => 'litmus/external', :controller => 'litmus'
  map.connect '/litmus', :controller => 'litmus', :action => 'home'

end
