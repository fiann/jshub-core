# load a YAML file for use
raw_config = File.read(RAILS_ROOT + "/config/jshub_javascript_tester.yml")
JSHUB_JAVASCRIPT_TESTER = YAML.load(raw_config)[RAILS_ENV].symbolize_keys!
JSHUB_JAVASCRIPT_TESTER.each_value { |v| v.symbolize_keys! if v.respond_to? "symbolize_keys!" }

# Register one or more javascript/stylesheet files to be included when :symbol is passed to javascript_include_tag.

# YUI3 Test files are used by unit test pages
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :yuitest => [
  "../plugin_assets/jshub_javascript_tester/yui3/combo/yui/yui-test-min"]

# jsHub YUI3Test results table visualiser
ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion :yuitest_visualizer => ["../plugin_assets/jshub_javascript_tester/jshub_yuitest_visualizer.css"]
ActionView::Helpers::AssetTagHelper.register_javascript_expansion :yuitest_visualizer => ["../plugin_assets/jshub_javascript_tester/jshub_yuitest_visualizer.js"]