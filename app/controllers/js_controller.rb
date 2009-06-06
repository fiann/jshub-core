class JsController < ApplicationController
  
  SRC_PATH = "#{RAILS_ROOT}/app/javascripts/"
  
  def src
    if File.exists? path = SRC_PATH + params[:path].join('/')
      render :content_type => 'text/javascript', :file => path
    else
      render :status => :not_found, :text => "Not found: #{path}"
    end
  end
  
  def show
    if File.exists? @path = SRC_PATH + params[:path].join('/')
      if File.directory? @path
        @files = Dir.entries @path
        @title = "Files: src/#{params[:path].join('/')}"
        render :template => 'js/show_dir'
      else
        @code = render_to_string :file => @path
        @code = @code.gsub(/\t/, '  ')
        @title = "Source: #{params[:path].last()}"
        render :template => 'js/show_file'
      end
    else
      render :status => :not_found, :text => "Not found: #{@path}"
    end
  end
  
end
