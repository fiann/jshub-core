class JavascriptTestResultController < ApplicationController

  # yuitest generates form submission to results collector and doesn't know about
  # authenticity token 
  protect_from_forgery :except => :create

  # POST /test/results/*
  def create
    # Turn the XML into a record
    result = JavascriptTestResult.from_xml params[:results]
    
    # associate the user agent for this result
    result.user_agent = UserAgent.find_or_create_by_ua_string(params[:useragent])
    
    # Associate these results back with a Test Page Id if provided in the URL (see routes.rb)
    if params[:test_page_id]
      result.litmus_test_page = LitmusTestPage.find(params[:test_page_id])
    end
    result.save
    
    # We don't need to present a UI here
    render :text => "Results received: #{result.passed} passed, #{result.failed} failed",
      :content_type => "text/plain"
  end
  
  # GET /test/results
  def index
    @results = JavascriptTestResult.find(:all, :order => 'created_at DESC', :limit => 20)
  end

  # GET /test/results/1
  # GET /test/results/1.xml
  def show
    @test = JavascriptTestResult.find(params[:id])
    
    # Lookup external data
#    testset = LitmusResource::Test.find(test.external_id)
#    @test.testset = testset

    respond_to do |format|
      # TODO: create YUI XML viewer
      format.html { redirect_to :action => 'show', :format => 'xml' }# show.html.erb
      format.xml  { render :xml => @test }
    end
  end
  
  # DELETE /test/results/1
  # DELETE /test/results/1.xml
  def destroy
    @test = JavascriptTestResult.destroy(params[:id])

    respond_to do |format|
      format.html { redirect_to :action => 'index' }
      format.xml  { head :ok }
    end
  end
  
  def destroy_all
    @tests = JavascriptTestResult.destroy_all  

    respond_to do |format|
      format.html { redirect_to :action => 'index' }
      format.xml  { head :ok }
    end
  end

end
