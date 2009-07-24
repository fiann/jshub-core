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
  
# YUI3 Test files are used by unit test pages
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :yuitest => [
  "yui3/build/substitute/substitute-min", 
  "yui3/build/oop/oop-min", 
  "yui3/build/dom/dom-min", 
  "yui3/build/event-custom/event-custom-min", 
  "yui3/build/attribute/attribute-min", 
  "yui3/build/base/base-min", 
  "yui3/build/node/node-min", 
  "yui3/build/json/json-min", 
  "yui3/build/event/event-min", 
  "yui3/build/event-simulate/event-simulate-min", 
  "yui3/build/test/test-min"]

# YUI3 syntax highlighter is used on the src pages
ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion :syntaxhighlighter => ["../javascripts/yui3/assets/dpSyntaxHighlighter"]
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :syntaxhighlighter => ["yui3/assets/dpSyntaxHighlighter"]

# jQuery is used by the jsHub tag code
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :jquery => ["jquery/jquery.js"]

# jsHub YUI3Test results table visualiser
ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion :javascript_unit_test => ["javascript_unit_test.css"]
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :javascript_unit_test => ["javascript_unit_test.js"]

  