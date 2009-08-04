require 'rhino/rhinojs'

# Rails 2.3 bug? Shouldn't have to do this manually anymore
ActionView::Base.send :include, JavascriptUnitTestHelper