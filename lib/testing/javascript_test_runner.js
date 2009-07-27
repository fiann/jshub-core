/*
 * Rhino compatible Javascript Test Runner using YUI Test
 * @author <a href="mailto:fiann.ohagan@jshub.org">Fiann O'Hagan</a>
 * @author <a href="mailto:liam.clancy@jshub.org">Liam Clancy</a>
 */

(function(args) {
  
  // HTML file that will create a DOM for these tests
  var test_file = args[0];
  if (typeof test_file != 'string') {
    throw new java.lang.IllegalArgumentException("You must specify a HTML test file on the command line");
  }

  // Logging on/off
  var debug_mode = (args[1] === 'true');
  if (debug_mode) {
    print("javascript_test_runner.js: Using 'debug' mode");
  }

  // Paths and vars relative to #{RAILS_ROOT}
  var src_path = "app/javascripts/";
  var public_path = "public/javascripts/";
  var reports_path = "test/reports/unit/";
  var tmp_path = "tmp/test/javascript/";
  
  // get the name of the HTML file
  var test_file_name = test_file.substring(test_file.lastIndexOf(tmp_path) + tmp_path.length, test_file.lastIndexOf('.'));

  /**
   * Utility functions
   */     
  // initialize a console for logging, taking into account debug setting
  var console = new function() {
    var indent = "";
    var format = function(msg) {
      if (typeof msg === 'string') {
        for (var i = 1; i < arguments.length; i++) {
          var entity = arguments[i];
          if (typeof entity == 'object') {
            if (entity.toString !== Object.prototype.toString) {
              entity = entity.toString();
            } else {
              // use toString() functions where available for DOMNodes and other
              // big objects
              var clone = {};
              for (var field in entity) {
                if (entity[field] == null || !entity[field].toString) {
                  clone[field] = entity[field];
                } else if (typeof entity[field] == 'function' ||
                entity[field].toString !== Object.prototype.toString) {
                  clone[field] = entity[field].toString();
                } else {
                  clone[field] = entity[field].toSource();
                }
              }
              entity = clone.toSource();
            }
          }
          if (msg.indexOf('%s') > -1) {
            msg = msg.replace('%s', entity);
          } else {
            msg += ", " + entity;
          }
        }
      }
      return msg;
    }
    // called when debug = false and does nothing with the message
    var discard = function() {};
    this.info = (!debug_mode) ? discard :  function() {
      print("info: " + indent + format.apply(this, arguments));
    };
    this.log = (!debug_mode) ? discard : function() {
      print("log: " + indent + format.apply(this, arguments));
    };
    this.warn = (!debug_mode) ? discard : function() {
      print("warn: " + indent + format.apply(this, arguments));
    };
    this.error = (!debug_mode) ? discard : function() {
      print("error: " + indent + format.apply(this, arguments));
    };
    this.debug = (!debug_mode) ? discard : function() {
      print("debug: " + indent + format.apply(this, arguments));
    };
    // adds a '+ ' visual prefix to nest log messages
    this.group = (!debug_mode) ? discard : function() {
      indent += "+ ";
      print("log: " + indent + format.apply(this, arguments));
    };
    this.groupEnd = (!debug_mode) ? discard : function() {
      indent = indent.substring(0, indent.length - 2);
    };
  };
  
  // Event handlers and methods
  var utils = {

    /**
     * TEST_PASS_EVENT, TEST_FAIL_EVENT, TEST_IGNORE_EVENT event handlers
     * that logs a result to the console dependent on its type.
     * @method reportResult
     * @param {Object} result
     * @private
     */
    reportResult: function(result) {
      if (result.type == 'fail') {
        console.error("Test '" + result.testName + "' failed.");
        console.error("Message: " + result.error);
      }
    },

    /**
     * COMPLETE_EVENT event handler
     * that outputs the report and log as files.
     * @method reportCompletionStatus
     * @param {Object} evt
     * @private
     */
    reportCompletionStatus: function(evt) {
      try {
        utils.printReport(evt);
        utils.saveJUnitTestReport(evt);
        utils.saveYUITestReport(evt);
        // exit status is 0 if no failures, otherwise the Ruby Test Runner captures a fail, e.g. ..F. in the output
        quit(evt.results.failed);
      } 
      catch (e) {
        // log any errors raised by the file saves
        console.error(e);
        for (prop in e) {
          console.error("Rhino: " + prop + "=" + e[prop]);
        }
        // return non-zero so the Ruby Test Runner sees this as a fail
        quit(1);
      }
    },
    
    // A crafted results object that represents a YUI Test fail for an HTML
    // file that could not be parsed.
    manualResultsObject: function(message, e, test_file_name, test_file) {
      var results = {
        type: "report",
        total: 1,
        timestamp: (new Date()).toGMTString(),
        passed: 0,
        failed: 1,
        duration: 0,
        name: "YUI Test Results"
      };
      results[test_file] = {
        'Parse HTML test file': {
          'test env.js can read unit test HTML file': {
            message: message,
            type: "test",
            name: "test env.js can read unit test HTML file",
            result: "fail",
            error: e
          },
          total: 1,
          passed: 0,
          failed: 1,
          type: "testcase",
          name: test_file_name + ": Parse HTML test file"
        },
        total: 1,
        passed: 0,
        failed: 1,
        type: "testsuite",
        name: test_file
      };
      return results;
    },

    /**
     * Print output to console (ignores debug setting)
     * @param {Object} data the event that was recorded
     * @param {Number} timeTaken of milliseconds from the start of the test
     */
    printReport: function(data) {
      var timeTaken = (+new Date()) - startTime;    
      print('\nUnit Test Report: ' + data.results.passed + " Passed, " 
	    + data.results.failed + " Failed, " 
		  + data.results.ignored + " Ignored, " 
		  + data.results.total + " Total tests in " + timeTaken + "ms"
		  + ' for '+ test_file_name);
    },  
    
    // Output data in YUI JSON format to a file for debugging
    saveYUITestReport: function(data) {
		  var results = data.results
      // format as JSON as YUI3 XML formatting is broken
      var json = Y.Test.Format.JSON(results)
      // save the file
      var path = reports_path + 'YUITEST-' + test_file_name.replace(/\//g, '_') + '.json';	    
      var out = new java.io.FileWriter(new java.io.File(path));
      out.write(json);
      out.flush();
      out.close();
      console.log('Report saved in YUITest JSON at ' + path);
    },
     
    // Save data in JUnit XML format for Hudson reporting
    // ref: http://developer.yahoo.com/yui/3/test/#test-reporting
    saveJUnitTestReport: function(data) {
		  var results = data.results
		  
		  // recursively iterate over the object to construct XML using E4X
      var appendReport = function(currentNode, object) {
        if (typeof object.type === 'undefined') {
          return;
        }
        switch (object.type) {
          case 'testsuite':
		        // map a YUI suite to a JUnit suite
            var suite = <testsuite tests={object.total} failures={object.failed} />;
            // hudson doesn't differentiate suites with the same name from 
            // different files, so prepend filename to ensure uniqueness
            suite.@name = name + ' - ' + object.name;
            for (prop in object) {
              if (typeof object[prop] == 'object') {
                // it's a test result not metadata
                appendReport(suite, object[prop]);
              }
            }
            currentNode.appendChild(suite);
            break;
          case 'testcase':
		        // map a YUI testcase (a group of tests) to a suite too
            var suite = <testsuite tests={object.total} failures={object.failed} />;
            // hudson doesn't differentiate suites with the same name from 
            // different files, so prepend filename to ensure uniqueness
            suite.@name = name + '.' + object.name;
            for (prop in object) {
              if (typeof object[prop] == 'object') {
                // it's a test result not metadata
                appendReport(suite, object[prop]);
              }
            }
            currentNode.appendChild(suite);
            break;
          case 'test':
		        // map a YUI test (a test function) to a JUnit testcase
            var testcase = <testcase name={object.name} />;
			      if (object.result == "fail") {
              testcase.failure = "No stack trace available. See http://yuilibrary.com/forum/viewtopic.php?f=92&t=80";
              if (object.error && object.error.rhinoException) {
                var stringwriter = new java.io.StringWriter();
                var catcher = new java.io.PrintWriter(stringwriter);
                object.error.rhinoException.printStackTrace(catcher);
                testcase.failure = stringwriter.toString();
                // testcase.failure = object.error.rhinoException.getScriptStackTrace();
              }
              testcase.failure.@message = object.message;
            }
            currentNode.appendChild(testcase);
            break;
        } // end switch
      };
      
      // create a fake root element because it's hard to get the real suite 
      // element from the javascript object
      var xml = <root />;
      for (prop in results) {
        if (typeof results[prop] == 'object') {
        // it's a test result not metadata
        appendReport(xml, results[prop]);
        }
      }
  
      // now get rid of the <root> element and change the root <testsuite> to <testsuites>
      if (xml.testsuite){
        xml = xml.testsuite[0];
        xml.setName("testsuites");
        xml.@tests = results.total;
        xml.@failures = results.failed;
        xml.@name = test_file_name;
        xml.@duration = results.duration;
        xml["system-out"] = "";
        xml["system-err"] = "";
      }
      
      // where to save (relative to #{RAILS_ROOT}) - this dir is automatically created by CI::Reporter and read by Hudson
      var path = reports_path + 'TEST-' + test_file_name.replace(/\//g, '_') + '.xml';
      // save as file
      var out = new java.io.FileWriter(new java.io.File(path));
      out.write(xml);
      out.flush();
      out.close();
      console.log('Report saved in JUnit XML at ' + path);
    }
  };  

  // Env.js creates a browser environment, including a 'window' object
  // ref: http://github.com/jeresig/env-js/tree/master
  console.info("Loading Env.js: started");
  load("lib/env/env.rhino.js");
  console.info("Loading Env.js: finished");
  
  
  // YUI Core needed by all Modules
  console.info("Loading YUI: started");
  load(public_path + "yui3/build/yui/yui-min.js");
  console.info("Loading YUI: finished");
  // YUI Test dependencies
  console.info("Loading YUI Test files: started");
  load(public_path + "yui3/build/substitute/substitute-min.js");
  load(public_path + "yui3/build/oop/oop-min.js");
  load(public_path + "yui3/build/dom/dom-min.js");
  load(public_path + "yui3/build/event-custom/event-custom-min.js");
  load(public_path + "yui3/build/attribute/attribute-min.js");
  load(public_path + "yui3/build/base/base-min.js");
  load(public_path + "yui3/build/node/node-min.js");
  load(public_path + "yui3/build/json/json-min.js");
  load(public_path + "yui3/build/event/event-min.js");
  load(public_path + "yui3/build/event-simulate/event-simulate-min.js");
  load(public_path + "yui3/build/test/test-min.js");
  console.info("Loading YUI Test files: finished");

  /** 
   * Suppress Rhino errors on HTML load by creation of placeholder vars 
   * required by the HTML file before the 'onload' event fires, e.g. references 
   * to jQuery methods, YUI methods, the 'suite' holder, etc as all scripts 
   * will be re-executed.
   **/
  window.suite = { add: function(){} };
  window.Y = { Test: { Case: function(){} }};
  window.$ = function(){
    this.ready = function(){
      return this;
    };
    if (this instanceof $){
      return this.$
    } else {
      return new $();
    }
  };

  // time how long it takes to run
  var startTime = 0;
  
  // use the console for output from the HTML page
  window.console = console;  
  // define function to run the tests after the HTML page has loaded 
  window.onload = function() {	
    console.info("window.onload event fired");

    // Create new YUI instance, and populate it with the required modules
    window.Y = YUI({ useBrowserConsole: true }).use("*", function(Y){
      console.info("YUI Core initialised as 'Y'");
    });
    // initialise test runner
    var TestRunner = Y.Test.Runner;
    // capture results
    TestRunner.subscribe(TestRunner.BEGIN_EVENT, function() {
      startTime = +new Date();
    });
    TestRunner.subscribe(TestRunner.TEST_PASS_EVENT, utils.reportResult);
    TestRunner.subscribe(TestRunner.TEST_FAIL_EVENT, utils.reportResult);
    TestRunner.subscribe(TestRunner.TEST_IGNORE_EVENT, utils.reportResult);
    TestRunner.subscribe(TestRunner.COMPLETE_EVENT, utils.reportCompletionStatus);    
    console.info("YUI TestRunner initialised");
 
    // create a test suite container
    window.suite = new Y.Test.Suite(test_file); 
    
    // jQuery is a jsHub dependency
    console.info("Loading jquery files: started");
    load(public_path + "jquery/jquery.js");
    console.info("Loading jquery files: finished");
    
    // jsHub code
	  console.info("Loading jsHub files: started");
    load(src_path + "hub.js");
    load(src_path + "api.js");
	  console.info("Loading jsHub files: finished");
         
    // Find and execute scripts (with test code) in the loaded HTML page.
    // env.js loads scripts with a mimetype of text/envjs automatically 
    // but not scripts with a mimetype of text/javascript.
    // We have to fix the urls for the external scripts to be relative to RAILS_ROOT.
    $("script").each(function(idx) {
      var src = $(this).attr("src");
      // External scripts with a src attribute
      if (typeof src != 'undefined') {
        // fix script load sources which follow rails routing
        src = src.replace(/^\/js\/src\//, src_path). // jshub src
        replace(/^\/javascripts\//, public_path). // rails public/javascripts
        replace(/\?.*/, ""); // remove query string
        console.debug('Loading external script '+ idx +': ' + src);
        try {
          load(src);
        } 
        catch (e) {
          console.error('Error executing external script '+ idx +': ' + src + ': ' + e);
          console.log(e.toString());
          throw e;
        }
      } else {
        console.debug('Evaling inline script '+ idx);
        try {
          var script = $(this).text();
          eval(script);
        } 
        catch (e) {
          console.error('Error executing inline script '+ idx +': ' + e);
		      e.fileName = test_file;
          console.error(script);
          throw e;
        }
      }
    });

    // clear any old tests from previous pages
    TestRunner.clear();
    // add the test cases and suites from the loaded HTML file
    TestRunner.add(window.suite);    
    // run all tests
    TestRunner.run();
  }; // end window.onload()
  
  /*
   * Load the HTML page with the Unit Tests in, catching any errors so we can write a JUnit report if env.js can't read the HTML file
   */
  try {  
    // Load HTML page into the env.js 'browser'
    console.info("Loading HTML test file: " + test_file);
    window.location = test_file;	
  } catch (e) {	  
    var message = e.toString();
	  if (e.fileName) {
	  	message += ", file: " + e.fileName;
	  }
	  if (e.code) {
	  	// it's probably a DOMException
	  	message += " parsing the HTML file";
	  }
    console.error("Error HTML test file: " + message);
    // Manually construct a YUI Test JSON results object to represent the failure
    var results = utils.manualResultsObject(message, e, test_file_name, test_file);
    // save this error as a JUnit report
    utils.saveJUnitTestReport(results);
    // return non-zero so the Ruby Test Runner sees this as a fail
    quit(1);
  }

})(arguments);
