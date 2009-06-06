module JavascriptUnitTestHelper
  
  def set_title(title)
    @title = title
  end
  
  def title
    "#{@title} < Unit Tests"
  end
    
  def render_test_listing
    listing = ''
    @files.each do |f|
      unless (f =~ /^\.+/ || f == 'index.html.erb') 
        f.sub!(/\.html\.erb$/, "")
        listing += "<li>#{link_to f, :path => params[:path] + [f]}</li>" 
      end
    end
    return listing
  end
  
end
