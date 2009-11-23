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

# jQuery is used by the jsHub microformats code
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :jquery => ["/js/src/modules/jquery/jquery-min.js"]

# jsHub common core distributions for Unit Testing
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :'jshub-min' => ["/js/src/dist/yui/yui-combo-jshub-min.js"]
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :'jshub-debug' => ["/js/src/dist/yui/yui-combo-jshub-debug.js"]
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :'jshub+microformats-min' => ["/js/src/dist/yui/yui-combo-jshub+microformats-min.js"]
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :'jshub+microformats-debug' => ["/js/src/dist/yui/yui-combo-jshub+microformats-debug.js"]
