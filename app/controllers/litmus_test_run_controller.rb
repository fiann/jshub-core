###################### Test Runs ############################
# 
# A test run is a collection of tests that can collectively pass
# or fail. A full suite of tests will be a single test run,
# with many test pages, each of which can have multiple test 
# results when it is run across multiple browsers.
#
# The test run will only pass if all the tests in all the pages
# have passed in all browsers.
# 

require "rexml/document"
require "rexml/element"
require "rexml/xpath"

class LitmusTestRunController < ApplicationController
  
  layout 'litmus'
  
  # GET /litmus/runs
  # GET /litmus/runs.xml
  def index
    @test_runs = LitmusTestRun.find(:all, :order => "id DESC")
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @test_runs }
    end
  end
  
  # GET /litmus/runs/1
  # GET /litmus/runs/1.xml
  def show
    @test_run = LitmusTestRun.find(params[:id])
    
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @test_run }
    end
  end
  
  # GET /litmus/runs/new
  # GET /litmus/runs/new.xml
  def new
    @test_run = LitmusTestRun.new
    
    # get list of Test Pages
    @test_pages = list_test_pages
    
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @test_run }
    end
  end
  
  # GET /litmus/runs/1/edit
  def edit
    @test_run = LitmusTestRun.find(params[:id])
  end
  
  # POST /litmus/runs
  # POST /litmus/runs.xml
  def create
    @test_run = LitmusTestRun.new(params[:litmus_test_run])

    # get list of Test Pages
    @test_pages = list_test_pages
    
    # Create multiple TestPages from an array of URLs submitted and add them to the run
    params[:urls].each do |key,value|
      unless value.empty?
        page = LitmusTestPage.new(:url => value)
        logger.info "Adding url #{page.url} to test #{@test_run.id}"
        # Add the page to the test_run list
        @test_run.litmus_test_pages << page
      end 
    end 
    
    # Save now so we have run and page ids to use in the URL
    @test_run.save!
    
    # Launch Litmus service if requested
    if @test_run.use_defaults == true 
      
      # make a test on Litmus for each page using the default browsers for the account and wait for the Id to be returned
      @test_run.litmus_test_pages.each do |page|
        begin
          # Use the TestPage Id in the URL for when results are submited
          page.url = "http://test.cross-domain-com.com:81/akita-on-rails/test/external/#{page.id}/unit/#{page.url}"

          # create the test on via the Litmus API
          @test = LitmusResource::Page.new(:url => page[:url], :use_defaults => @test_run.use_defaults.to_s)
          @test.save
          
          # Use the Litmus Id as a property of the Page record locally
          page.external_id = @test.id
          page.save!
          
          # Handle errors from Litmus
        rescue ActiveResource::TimeoutError, ActiveResource::ClientError, ActiveResource::ServerError, ActiveResource::ConnectionError => e
                  
          flash[:error] = "There was a problem creating the external test #{e.message}"          
          # get the Litmus response e.g. 404 because the URL is not accessible
          @LitmusError = e

          # No Litmus page was created so destroy our version to keep in sync
          page.destroy

          respond_to do |format|            
            format.html { render :action => "new" }
            format.xml  { render :xml => e, :status => :unprocessable_entity }
          end
        end
      end

    end
    
    
    respond_to do |format|            
      if @test_run.save
        flash[:notice] = 'LitmusTestRun was successfully created.'
        format.html { redirect_to(@test_run) }
        format.xml  { render :xml => @test_run, :status => :created, :location => @test_run }
      else
        flash[:error] = 'LitmusTestRun was not created.'      
        format.html { render :action => "new" }
        format.xml  { render :xml => @test_run.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  # PUT /litmus/runs/1
  # PUT /litmus/runs/1.xml
  def update
    @test_run = LitmusTestRun.find(params[:id])
    
    respond_to do |format|
      if @test_run.update_attributes(params[:test_run])
        flash[:notice] = 'LitmusTestRun was successfully updated.'
        format.html { redirect_to(@test_run) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @test_run.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  # DELETE /litmus/runs/1
  # DELETE /litmus/runs/1.xml
  def destroy
    @test_run = LitmusTestRun.destroy(params[:id])
    
    respond_to do |format|
      format.html { redirect_to(litmus_test_runs_url) }
      format.xml  { head :ok }
    end
  end
  
  
  # DELETE /litmus/runs
  # DELETE /litmus/runs.xml
  def destroy_all
    @test_runs = LitmusTestRun.destroy_all
    
    respond_to do |format|
      format.html { redirect_to(litmus_test_runs_url) }
      format.xml  { head :ok }
    end
  end
    
  # GET /litmus/runs/1/results
  # GET /litmus/runs/1/results.xml
  # Returns data in JUnit xml style
  
  #<testsuites duration="127" failures="1" name="hProduct_plugin_test" tests="5">
  #  <testsuite failures="0" name="hProduct_plugin_test - Environment check" tests="2">
  #    <testcase name="test required test dependencies"/>
  #    <testcase name="test jsHub API dependencies"/>
  #  </testsuite>
  #  <testsuite failures="1" name="hProduct_plugin_test - Microformat parsing" tests="3">
  #    <testcase name="test product view not generated without required fields">
  #      <failure message="n is not specified, it is required&#10;Unexpected: undefined (undefined) ">No stack trace available. See http://yuilibrary.com/forum/viewtopic.php?f=92&amp;t=80</failure>
  #    </testcase>
  #    <testcase name="test required values specified"/>
  #    <testcase name="test optional values specified"/>
  #  </testsuite>
  #  <system-out></system-out>
  #  <system-err></system-err>
  #</testsuites>
  def results
    @test_run = LitmusTestRun.find(params[:id])
    xml = REXML::Document.new '<testsuites/>'
    xml.root.attributes['name'] = @test_run.label
    failures = 0
    tests = 0
    @test_run.litmus_test_pages.each do |page|
      page.javascript_test_results.each do |result|
        result_xml = REXML::Document.new result.results_xml
        REXML::XPath.each(result_xml, "//testcase") do |testcase|
          suite_elm = xml.root.add_element "testsuite", {
            'name' => "[#{result.user_agent.browser_family}].#{result.user_agent.os_family}.#{page.name}.#{testcase.attributes['name']}", 
            'failures' => testcase.attributes['failed'], 
            'tests' => testcase.attributes['total']
          }
          failures += testcase.attributes['failed'].to_i
          tests += testcase.attributes['total'].to_i
          REXML::XPath.each(testcase, 'test') do |test|
            test_elm = suite_elm.add_element "testcase", {
              'name' => test.attributes['name']
            }
            if test.attributes['result'] == 'fail'
              test_elm.add_element 'failure', {
                'message' => test.attributes['message']
              }
            end
          end
        end
      end
    end
    xml.root.attributes['failures'] = failures.to_s
    xml.root.attributes['tests'] = tests.to_s
    respond_to do |format|
      format.html # results.html.erb
      format.xml  { render :text => xml.to_s }
    end    
  end

protected
  # TDOD add path arg
  def list_test_pages
    # List the availbale Test Pages from the file system
    test_pages = Dir.entries "#{RAILS_ROOT}/test/unit/javascript/"
    test_pages.delete_if {|page| page =~ /^\./ }
    test_pages.collect! {|page| page.gsub(/\.html\.erb$/, '') }    
  end

end

