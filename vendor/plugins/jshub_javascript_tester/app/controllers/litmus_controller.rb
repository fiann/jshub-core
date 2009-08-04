class LitmusController < ApplicationController

  # GET /litmus
  # Redirect to the internal test run database first of all
  def home
    redirect_to :litmus_test_runs
  end

  # GET /litmus/external/index
  # makes a remote request to list the cross-browser tests via Litmus API
  def index
    @testsets = LitmusResource::Testset.find(:all, :conditions => {:order => "id DESC"})
  end

  # GET /litmus/external/latest
  # makes a remote request to list the latest cross-browser test id via Litmus API
  # for use when polling for new tests
  def latest
    begin
      @testsets = LitmusResource::Testset.find(:all, :conditions => {:state => "complete", :order => "id DESC"})
      logger.info "Found completed testsets: #{@testsets}"
      # Handle errors from Litmus
      rescue ActiveResource::TimeoutError, ActiveResource::ClientError, ActiveResource::ServerError, ActiveResource::ConnectionError => e
        @LitmusError = e
    end
    
    # TODO this still isn't completely reliable
    @testsets.each do |test|
      logger.info "Testset state is: #{test.state}"
      logger.info "Looking for Test Page with an external_id: #{test.id}"
      @testpage = LitmusTestPage.find(:first, :conditions => {:external_id => test.id})
      break if @testpage
    end

    if @testpage
      logger.info "Looking up Test Run containing Test Page: #{@testpage.id}"
      render :text => @testpage.litmus_test_run_id, :content_type => 'text/plain'
    else
    # if no tests on Litmus server
      render :text => '0', :content_type => 'text/plain'
    end
  end
  
  # GET /litmus/external/:id
  # makes a remote request to list the lookup the cross-browser test by its id via Litmus API
  def show
    @testset = LitmusResource::Test.find(params[:id])
  end

  # GET /litmus/external/new
  # gathers data to make a new Litmus test
  def new
  end

  # POST /litmus/external/create
  # makes a remote request to make a new test and return its id via Litmus API
  def create
    # make a test on Litmus and wait for the id to be returned
    page = {:url => params[:test_set_url], :use_defaults => params[:test_set_use_defaults]}
    @testset = LitmusResource::Page.new(page)
    @testset.save
        
    # redirect the user to avoid a refresh creating a new test
    redirect_to :action => "test", :id => @testset.id
  end

end