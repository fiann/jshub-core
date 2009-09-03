module JavascriptUnitTestHelper
  
  def set_title(title)
    @title = title
  end
  
  def title
    "#{@title} < Unit Tests"
  end
    
  def internet_explorer?
    request.env["HTTP_USER_AGENT"] && request.env["HTTP_USER_AGENT"][/(MSIE)/]
  end
  
end
