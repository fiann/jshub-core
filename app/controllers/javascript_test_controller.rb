class JavascriptTestController < ApplicationController

  # tag generates form submission to data_capture and doesn't know about
  # authenticity token 
  protect_from_forgery :except => :data_capture
  
  # GET /test/:action/*path
  # GET /test/:action/*path/*?view=min
  # GET /test/external/:test_page_id/:action/*path
  # 
  # Render a test case page from the template. The actual test html is stored
  # under /test/unit/javascript. Templates for rendering folder views etc are 
  # in the standard location under /app/views.
  #
  # Appending ?view=min on the URL will render with the javascript_unit_test_minimal
  # layout, which contains the same test code but does not contain the YUItest
  # and other supporting scripts and html which are injected separately when
  # the tests are run through the Rhino/env.js tests.
  #
  # Note that you can place a YUItest test case in any other page or view in your
  # app, and as long as the results collector is correctly configured, it will 
  # work just as well.

  # additional paths to look for templates, appended to allow for overrides in 'app/views'
  # ref: http://rethink.unspace.ca/2009/5/21/cascading-view-paths-for-fun-and-profit
  # ref: http://www.axehomeyg.com/2009/06/10/view-path-manipulation-for-rails-with-aop/
  append_view_path "#{RAILS_ROOT}/test/unit/javascript"
  append_view_path "#{RAILS_ROOT}/test/functional/javascript"

  def index
    # forward to unit tests by default
    redirect_to :action => 'unit'
  end
  
  def unit
    # Get full OS path to URL
    path = Pathname.new("#{RAILS_ROOT}/test/unit/javascript/#{params[:path].join('/')}")
    # if a directory we find the contents and generate a listing for navigation
    if path.directory?
      children = path.children.reject{|f| f.basename.to_s =~ /^\.+/ }
      @folders = children.reject{|f| f.file?}
      @files = children.reject{|f| f.directory?}
      render :template => 'javascript_unit_test/index', :layout => 'js'
    elsif
      # use the *path part of the url set in the routes.rb to find the template
      url = params[:path].join('/')
      # chose the layout based on the 'min' parameter
      layout = (params[:view] == 'min') ? 'javascript_test_minimal' : 'javascript_test'      
      render :template => "#{url}", :layout => "#{layout}"
    end
  end

  def functional
    # TODO make functional test templates
  end
  
  # POST /test/unit/data-capture
  def data_capture
    # Expect ?key= on request url
    @key = request.query_parameters['key'] || 'missing'
    if request.post?
      # Data submission, the data is in post body
      @data = request.request_parameters
      session['unit_test_data_'+@key] = @data
      render :layout => false
    else 
      # Retrieve previous data from session
      @data = session['unit_test_data_'+@key] || '[none]'
      render :text => @data.to_json()
    end
  end

end  