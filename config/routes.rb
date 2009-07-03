ActionController::Routing::Routes.draw do |map|

  # The priority is based upon order of creation: first created -> highest priority.

  # Sample of regular route:
  #   map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  # Keep in mind you can assign values other than :controller and :action
  
  # Serve source files
  map.connect '/js/:action/*path', :controller => 'js'

  # External access to the Javascript unit test files including the Test Page Id in the path
  # TODO tidy up the data model this should really be a test run id
  map.external_test '/test/external/:test_page_id/unit/*path', :controller => 'javascript_test'
  map.external_test_results '/test/external/:test_page_id/results', 
    :conditions => { :method => :post },
    :controller => 'javascript_test_result', 
    :action => 'create'
  
  # Serve the Javascript unit test files
  map.connect '/test/data-capture', :controller => 'javascript_test', :action => 'data_capture'
  map.javascript_test '/test/unit/*path', :controller => 'javascript_test'
  
  # Collect data from the YUI test javascript
  map.resources :javascript_test_result, :as => 'test/results', :collection => { :destroy_all => :delete } 
    
  # Tests run through the Litmus service
  map.resources :litmus_test_runs, :as => 'litmus/runs', :controller => 'litmus_test_run', 
    :collection => { :destroy_all => :delete } 
  map.litmus_run_page '/litmus/runs/:id/run_page/*path', :controller => 'litmus_test_run', :action => 'run_page'
  map.connect '/litmus/runs/:id/results.xml', :controller => 'litmus_test_run', :action => 'results', :format => 'xml'
  map.litmus_external_latest '/litmus/external/latest', :controller => 'litmus', :action => 'latest' 
  map.resources :litmus_external, :as => 'litmus/external', :controller => 'litmus'
  map.connect '/litmus', :controller => 'litmus', :action => 'home'

  # Homepage
  map.root :controller => 'homepage', :action => 'index'

  # Sample of named route:
  #   map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   map.resources :products

  # Sample resource route with options:
  #   map.resources :products, :member => { :short => :get, :toggle => :post }, :collection => { :sold => :get }

  # Sample resource route with sub-resources:
  #   map.resources :products, :has_many => [ :comments, :sales ], :has_one => :seller
  
  # Sample resource route with more complex sub-resources
  #   map.resources :products do |products|
  #     products.resources :comments
  #     products.resources :sales, :collection => { :recent => :get }
  #   end

  # Sample resource route within a namespace:
  #   map.namespace :admin do |admin|
  #     # Directs /admin/products/* to Admin::ProductsController (app/controllers/admin/products_controller.rb)
  #     admin.resources :products
  #   end

  # You can have the root of your site routed with map.root -- just remember to delete public/index.html.
  # map.root :controller => "store"

  # See how all your routes lay out with "rake routes"

  # Install the default routes as the lowest priority.
  # Note: These default routes make all actions in every controller accessible via GET requests. You should
  # consider removing the them or commenting them out if you're using named routes and resources.
  # map.connect ':controller/:action/:id'
  # map.connect ':controller/:action/:id.:format'
end
