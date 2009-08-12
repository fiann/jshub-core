---
layout: help
---

# The *jsHub Javascript Tester* plugin

These instructions are intended to enable a developer to:

* run the jsHub Unit Test Suite in a headless browser
* run the jsHub Unit Test Suite from a Continuous Integration server (soon)

The *jsHub Javascript Tester* plugin will be released as a separate project on Github soon, and can currently be found in the `vendor/plugins/jshub_javascript_tester/` directory.

The plugin provides some additional features for including other javascript code and documentation into the HTML output, as well as for reporting results, headless running and integration with Continuous Intergration environments.

## Test Page Templates

    <% content_for :javascripts do %>  
      <%= javascript_include_tag "/js/src/data-capture/hPage-plugin.js" %>
    <% end %>

Additional javascript code can be added or included via the Ruby yield `content_for :javascripts` declaration and it will be inserted in the head of the HTML page.

All jsHub src code is placed in `app/javascripts/` and accessed as <http://localhost:3000/js/src/>

In the same way any visible page documentation can be inserted via the Ruby yield `content_for :intro` declaration and will appear above the test results table. 

### Unit Test Reporting

The plugin provides a [YUI Test Visualizer][yt-visual] as well as collecting test results using [YUI Test Reporter][yt-report].

  [yt-visual]: http://developer.yahoo.com/yui/3/test/#viewing-results
  [yt-report]: http://developer.yahoo.com/yui/3/test/#test-reporting

#### Test Visualiser

The plugin provides an alternate view of the Unit Test results to allow for easy identification of failed tests in a page an its overall state:

![Test Visualiser](../images/screenshots/test_visualiser.png)

#### Test Reporter

Unit Test results for each page and browser combination are stored for comparison over time:

![Test Reporter](../images/screenshots/test_reporter.png)

The collection of results allows for the driving of unit test running by an external cross-browser vendor, such as [Litmus][v1] or [BrowserCam][v2] and also tools such as [Selenium][v3].

  [v1]: http://litmusapp.com/
  [v2]: http://www.browsercam.com/
  [v3]: http://seleniumhq.org/

## Running the Unit Tests in a headless browser

The *jsHub Javascript Tester* plugin ships with a copy of the *[Rhino Javascript for Java][rhino]* implementation, *[env.js][env]* and a *Test Runner* that allows all Unit Test pages to be tested in one run from the command line.

  [rhino]: http://www.mozilla.org/rhino/
  [env]: http://ejohn.org/blog/bringing-the-browser-to-the-server/
  
To run the tests in this way you must have Java installed and this application running (see the [installation guide](install.html)):

Set the URL to your running instance in `config/jshub_javascript_tester.yml`

<pre class="brush: ruby; light: true;">
    :continuous_integration:
      :base_url: http://localhost:3000/ # default install
</pre>
      
Run the rake task:

<pre class="brush: bash; light: true;">
    % rake jshub:javascripts
</pre>

You should see output similar to below:

<pre class="brush: bash; light: true;">
    Loaded suite -e
    Started
    
    Unit Test Report: 2 Passed, 0 Failed, 2 Ignored, 4 Total tests in 18ms for form_transport/base.html.erb
    .
    Unit Test Report: 4 Passed, 0 Failed, 0 Ignored, 4 Total tests in 16ms for hub_configuration_test.html.erb
    .
    Unit Test Report: 12 Passed, 0 Failed, 0 Ignored, 12 Total tests in 52ms for hub_events_test.html.erb
    .
    Unit Test Report: 11 Passed, 0 Failed, 0 Ignored, 11 Total tests in 39ms for image_transport/api_test.html.erb
    .
    Unit Test Report: 6 Passed, 0 Failed, 0 Ignored, 6 Total tests in 22ms for image_transport/sample_get_plugin_test.html.erb
    .
    Unit Test Report: 0 Passed, 0 Failed, 1 Ignored, 1 Total tests in 9ms for library_functions_test.html.erb
    .
    Unit Test Report: 5 Passed, 0 Failed, 0 Ignored, 5 Total tests in 74ms for microformat/hAuthentication/parsing.html.erb
    .
    Unit Test Report: 13 Passed, 0 Failed, 0 Ignored, 13 Total tests in 304ms for microformat/hPage/attributes.html.erb
    .
    Unit Test Report: 6 Passed, 0 Failed, 0 Ignored, 6 Total tests in 159ms for microformat/hPage/composition.html.erb
    .
    Unit Test Report: 7 Passed, 0 Failed, 0 Ignored, 7 Total tests in 145ms for microformat/hPage/nesting.html.erb
    .
    Unit Test Report: 14 Passed, 0 Failed, 0 Ignored, 14 Total tests in 368ms for microformat/hPage/simple_nodes.html.erb
    .
    Unit Test Report: 10 Passed, 0 Failed, 0 Ignored, 10 Total tests in 216ms for microformat/hProduct/parsing_test.html.erb
    .
    Unit Test Report: 5 Passed, 0 Failed, 0 Ignored, 5 Total tests in 150ms for microformat/hPurchase/parsing.html.erb
    .
    Unit Test Report: 15 Passed, 0 Failed, 0 Ignored, 15 Total tests in 399ms for microformat/microformat_api_test.html.erb
    .
    Unit Test Report: 4 Passed, 0 Failed, 0 Ignored, 4 Total tests in 21ms for technographics/default_values.html.erb
    .
    Unit Test Report: 8 Passed, 0 Failed, 0 Ignored, 8 Total tests in 185ms for vendor/google_analytics_test.html.erb
    .
    Unit Test Report: 4 Passed, 0 Failed, 0 Ignored, 4 Total tests in 27ms for vendor/mixpanel_test.html.erb
    .
    Finished in 59.37231 seconds.
    
    17 tests, 17 assertions, 0 failures, 0 errors
</pre>

### Debugging the headless browser

As the successful running of Unit Tests in the headless browser is dependent on *env.js* supporting the browser features being tested it is possible for new tests or additional javascript libraries to cause errors or failures resulting in Rhino crashing.

To get information on the cause of a crash you can enable debug mode by setting an environment variable and inspect the logging information of the Test Runner:

<pre class="brush: bash; light: true;">
    $ export JSHUB_DEBUG=true
</pre>

To narrow down the output to only the page that is having a problem pass a `TEST=` parameter for the file to be loaded. An example of the full output is [attached](testing_debug_output.txt)
    
For further information and support on the running of headless Unit Tests you may wish to consult with the *env.js* developer community in addition to jsHub developers:

* <http://groups.google.com/group/envjs>
* <http://github.com/thatcher/env-js>