module JsHelper
  
  def path_components
    subpath = []
    title = link_to 'src', :path => subpath
    params[:path].each do |node|
      title += " / #{link_to node, :path => subpath << node}"
    end
    title
  end
  
  def render_directory
    listing = ''
    @files.each do |f|
      listing += "<li>#{link_to f, :path => params[:path] + [f]}</li>" unless f =~ /^\.+/
    end
    return listing
  end
  
end
