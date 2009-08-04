# load a YAML file for use
raw_config = File.read(RAILS_ROOT + "/config/jshub_javascript_tester.yml")
JSHUB_JAVASCRIPT_TESTER = YAML.load(raw_config)[RAILS_ENV]

# Register one or more javascript/stylesheet files to be included when :symbol is passed to javascript_include_tag.

# YUI3 Test files are used by unit test pages
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :yuitest => [
  "../plugin_assets/jshub_javascript_tester/yui3/build/yui/yui-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/substitute/substitute-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/oop/oop-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/dom/dom-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/attribute/attribute-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/base/base-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/node/node-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/json/json-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/event/event-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/event-custom/event-custom-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/event-simulate/event-simulate-min", 
  "../plugin_assets/jshub_javascript_tester/yui3/build/test/test-min"]

# jsHub YUI3Test results table visualiser
ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion :yuitest_visualizer => ["../plugin_assets/jshub_javascript_tester/jshub_yuitest_visualizer.css"]
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :yuitest_visualizer => ["../plugin_assets/jshub_javascript_tester/jshub_yuitest_visualizer.js"]