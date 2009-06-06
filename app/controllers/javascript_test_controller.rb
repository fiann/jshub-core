# Serve the JS test files as static html
# Inspired by http://snafu.diarrhea.ch/blog/article/4-serving-static-content-with-rails

class JavascriptTestController < ApplicationController

  # tag generates form submission to data_capture and doesn't know about
  # authenticity token 
  protect_from_forgery :except => :data_capture

  NO_CACHE = [
    'static/about/website',
  ]
  
  # GET /test/unit/*
  # GET /test/unit/*?view=min
  # GET /test/external/:test_page_id/unit/*
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
  #
  # TODO make this read from functional as well as unit folders
  def index
    path = "#{RAILS_ROOT}/test/unit/javascript/#{params[:path].join('/')}"
    
    if File.directory? path
      @files = Dir.entries path
      render :template => 'javascript_unit_test/index', :layout => 'js'
    
    elsif template_exists? path = "#{path}.html.erb"
      layout = (params[:view] == 'min') ? 'javascript_test_minimal' : true
      render_cached path, layout

    else
      raise ::ActionController::RoutingError,
            "Recognition failed for #{path.inspect}"
    end
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

  
private
  def render_cached(path, layout=true)
    if NO_CACHE.include? path
      render :template => path
    else
      key = path.gsub('/', '-')
      unless content = read_fragment(key)
        content = render_to_string :template => path, :layout => false
        write_fragment(key, content)
      end
      render :text => content, :layout => layout
    end
  end
end