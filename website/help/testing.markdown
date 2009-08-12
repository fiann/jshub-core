---
layout: help
---

# Testing

These instructions are intended to enable a developer to:

* run the jsHub Unit Tests in a local web browser
* create additional Unit Testscases and pages
* run the jsHub Unit Test Suite in a headless browser
* run the jsHub Unit Test Suite from a Continuous Integration server (soon)

## Running Unit Tests in a browser

The application comes with a set of comprehensive test pages that can be run in a web browser:

<http://localhost:3000/test/unit/>

Each page submits its results to a local database, also identifying the browser used, so that the Unit Test pages can be run from any other local machines with web browsers installed as part of a cross-browser test suite:

<http://localhost:3000/test/results/>
    
## Creating tests and test pages

The test pages make use of [YUI Test][yt] and so all documentation and examples supplied by Yahoo are relevant when writing tests for jsHub javascript code. 

  [yt]: http://developer.yahoo.com/yui/3/test/

**Note:** The existing test pages are designed to allow for easy reuse of test cases however be aware that the most common problem likely to be encountered is the accidental use of **[trailing commas][tc]** after test method declarations, which is especially difficult to debug in IE.

  [tc]: http://firsttube.com/read/ie-sucking-hard-since-version-5/

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
    }));
</pre>

Above is a minimal *hPage* microformat HTML section, along with a test to assert that the value found by the jsHub javascript code matches that declared in the page.

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
  
## The *jsHub Javascript Tester* plugin

For information on the features of the *jsHub Javascript Tester* plugin please see the [testing plugin guide](testing_plugin.html)

