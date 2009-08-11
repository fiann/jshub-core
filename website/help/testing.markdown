---
layout: help
---

# Testing

These instructions are intended to enable a developer to:

* run the jsHub Unit Tests in a local web browser
* create additional Unit Testscases and pages
* run the jsHub Unit Test Suite in a headless browser (soon)
* run the jsHub Unit Test Suite from a Continuous Integration server (soon)

## Running Unit Tests in a browser

The application comes with a set of comprehensive test pages that can be run in a web browser:

<http://localhost:3000/test/unit/>

Each page submits its results to a local database, also identifying the browser used, so that the Unit Test pages can be run from any other local machines with web browsers installed as part of a cross-browser test suite:

<http://localhost:3000/test/results/>
    
## Creating tests and test pages

The test pages make use of [YUI Test][yt] and so all documentation and examples supplied by Yahoo are relevant when writing tests for jsHub javascript code. 

  [yt]: http://developer.yahoo.com/yui/3/test/

### Basic test page details

Test pages should be named `test_suite_name.html.erb` and placed in `test/unit/javascript/` which is accessed as <http://localhost:3000/test/unit/>

Each test page is a standard Rails style HTML page fragment that will be wrapped in a template to provide the full YUI Test functionality, including reporting.

Each page is regarded as a *test suite*, in which the only **required** content is at least one *test case* containing *test methods* made up of  *test assertions* to be run, along with any HTML required for testing.

However the page can be a complete site mockup if required allowing testing against real-life implementation enviroments.

We believe orgainising tests in this way is more suitable for a browser environment and gives greater flexibility in grouping tests for related functionality together in a single page in contrast to a traditional *1 file per test case* used by other frameworks in other languages.

#### Example 1

This example is taken from [test/unit/javascript/hub_configuration_test.html.erb](http://localhost:3000/test/unit/hub_configuration_test):

<pre class="brush: js;">
(function() {

  suite.add(new Y.Test.Case({ 
    name : "Environment check",
  
    "test required test dependencies" : function () {
      Y.Assert.isNotUndefined(window.jQuery, "The jQuery library is required");
      Y.Assert.isNotUndefined(window.jsHub, "The jsHub hub is required");
    }
  }));

})();
</pre>

Above is 1 *test case* with 1 *test method* and 2 *test assertions* that checks that the desired libraries to be tested are present, and does not require any HTML to do this.

All *test cases* are automatically added to the page *test suite* buy use of the `suite.add` function call, which is globally set by the template. 

Everything is optionally wrapped in an anonymous function to minimise leakage of test variables and data into the page to be tested.

#### Example 2

This example is taken from [test/unit/javascript/microformat/hPage/simple_nodes.html.erb](http://localhost:3000/test/unit/microformat/hPage/simple_nodes):

<pre class="brush: html;">
<div id="example1">
  <div class="hpage">
    <ul>
      <li>
        name : <span class="name">page name</span>.
      </li>
    </ul>
  </div>
</div>
</pre>
<pre class="brush: js;">
  suite.add(new Y.Test.Case({
    name: "Text field values",
    	
    "test name field": function() {
      var data = suite.parse("#example1");
      Y.Assert.areEqual('page name', data.name);
    }
</pre>

Above is a minimal *hPage* microformat HTML section, along with a test to assert that the value found by the jsHub javascript code matches that declared in the page.

**Note:** The existing test pages are designed to allow for easy reuse of test cases however be aware that the most common problem likely to be encountered is the correct use of **trailing commas** after test method declarations, especially in IE.

### Advanced test page details

For many unit tests it is necessary to isolate the code to be tested, particularly when dealing with `data-capture` plugins which would otherwise only pass their data into the main jsHub object.

#### Example 3

This example is taken from [test/unit/javascript/microformat/hPage/simple_nodes.html.erb](http://localhost:3000/test/unit/microformat/hPage/simple_nodes):

<pre class="brush: js;">
  suite.parse = function(selector, hPageCount) {
    var data = null, count = 0;
    if (typeof hPageCount != 'number') {
      hPageCount = 1;
    }
    jsHub.bind("hpage-found", "unittest", function(evt) {
	  count ++;
      data = evt.data.hpage;
    });
    jsHub.trigger("page-view", {
      context: selector
    });
    Y.Assert.areEqual(hPageCount, count, 'wrong number of hPage objects have been found');
  	return data;
  };
</pre>

Above is a method that is commonly used in the test pages to allow for the `data` object captured by a plugin to be exposed to a test assertion (as used in **Example 2** above).

This code shows how to use jsHub events to subscribe to plugin lifecycle events - functionality that is *not* being tested here - in order to test the plugin functionality in a clean way.

YUI Test also provides [Mock Objects][yt-mock] and [Asynchronous Tests][yt-async] as well as ways to [Simulate Events (user interactions)][ye-simulate].

  [yt-mock]: http://developer.yahoo.com/yui/3/test/#mockobjects
  [yt-async]: http://developer.yahoo.com/yui/3/test/#asynctests
  [ye-simulate]: http://developer.yahoo.com/yui/3/event/#eventsimulation


### Other testing features

The *jsHub Javascript Tester* plugin will be released as a separate project soon, and can be found in the `vendor/plugins/jshub_javascript_tester/` directory.

The plugin provides some additional features for including other javascript code and documentation into the HTML output, as well as for reporting results.

#### Templates

    <% content_for :javascripts do %>  
      <%= javascript_include_tag "/js/src/data-capture/hPage-plugin.js" %>
    <% end %>

Additional javascript code can be added or included via the Ruby yield `content_for :javascripts` declaration and it will be inserted in the head of the HTML page.

All jsHub src code is placed in `app/javascripts/` and accessed as <http://localhost:3000/js/src/>

In the same way any visible page documentation can be inserted via the Ruby yield `content_for :intro` declaration and will appear above the test results table. 

#### Reporting

The plugin provides a [YUI Test Visualizer](http://developer.yahoo.com/yui/3/test/#viewing-results) as well as collecting test results using [YUI Test Reporter](http://developer.yahoo.com/yui/3/test/#test-reporting).

##### Test Visualiser

![Test Visualiser](../images/screenshots/test_visualiser.png)

##### Test Reporter

![Test Reporter](../images/screenshots/test_reporter.png)

The collection of results allows for the driving of unit test running by an external cross-browser vendor, such as [Litmus][r1] or [BrowserCam][r2] and also tools such as [Selenium][r3].

  [r1]: http://litmusapp.com/
  [r2]: http://www.browsercam.com/
  [r3]: http://seleniumhq.org/

