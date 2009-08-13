# Register one or more javascript/stylesheet files to be included when :symbol is passed to javascript_include_tag.

# Shared by all application views
ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion :jshub => ["jshub.css"] 

# YUI3 is used in the UI
ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion :yui3 => [
  "../javascripts/yui3/build/cssreset/reset-context-min", 
  "../javascripts/yui3/build/cssfonts/fonts-context-min", 
  "../javascripts/yui3/build/cssgrids/grids-context-min", 
  "../javascripts/yui3/build/cssbase/base-context-min"]
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :yui3 => [
  "yui3/build/yui/yui-min"]

# YUI3 syntax highlighter is used on the src pages
ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion :syntaxhighlighter => ["../javascripts/yui3/assets/dpSyntaxHighlighter"]
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :syntaxhighlighter => ["yui3/assets/dpSyntaxHighlighter"]

# jQuery is used by the jsHub tag code
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :jquery => ["jquery/jquery.js"]