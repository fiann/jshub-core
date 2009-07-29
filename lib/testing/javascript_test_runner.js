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
  var log_level = (args[1] === 'true');
  if (log_level) {
    print("javascript_test_runner.js: Using 'debug' mode");
  }

  // Paths and vars
  var reports_path = "test/reports/";
  var url_path = "/test/unit/";
  
  // get the path/name of the test file e.g. image_transport/api_test
  var test_file_name = test_file.substring(test_file.lastIndexOf(url_path) + url_path.length);

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
    this.info = (!log_level) ? discard :  function() {
      print("info: " + indent + format.apply(this, arguments));
    };
    this.log = (!log_level) ? discard : function() {
      print("log: " + indent + format.apply(this, arguments));
    };
    this.warn = (!log_level) ? discard : function() {
      print("warn: " + indent + format.apply(this, arguments));
    };
    this.error = (!log_level) ? discard : function() {
      print("error: " + indent + format.apply(this, arguments));
    };
    this.debug = (!log_level) ? discard : function() {
      print("debug: " + indent + format.apply(this, arguments));
    };
    // adds a '+ ' visual prefix to nest log messages
    this.group = (!log_level) ? discard : function() {
      indent += "+ ";
      print("log: " + indent + format.apply(this, arguments));
    };
    this.groupEnd = (!log_level) ? discard : function() {
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
      if (!data){
        console.log("No YUI Test results collected")
        return
      }
		  var results = data.results

      // Pretty print the JSON for reports
      var jsonStr = "";
      try {
        jsonStr = Y.JSON.stringify(results,null,2);
      } catch (e) {
        console.error("json: Invalid or cyclical reference in JSON object")
      }

      // save the file
      var path = reports_path + 'YUITEST-' + test_file_name.replace(/\//g, '_') + '.json';	    
      var out = new java.io.FileWriter(new java.io.File(path));
      out.write(jsonStr);
      out.flush();
      out.close();
      console.log('Report saved in YUITest JSON at ' + path);
    },
     
    // Save data in JUnit XML format for Hudson reporting
    // ref: http://developer.yahoo.com/yui/3/test/#test-reporting
    saveJUnitTestReport: function(data) {
      if (!data){
        console.log("No YUI Test results collected")
        return
      }
		  var results = data.results

      // Pretty print the JSON for reports
      var jsonStr = "";
      try {
        jsonStr = Y.JSON.stringify(results,null,2);
      } catch (e) {
        console.error("xml: Invalid or cyclical reference in JSON object")
      }
		  
		  // recursively iterate over the object to construct XML using E4X
      var appendReport = function(currentNode, object) {
        if (typeof object.type === 'undefined') {
          console.debug('xml: Undefined object.type')
          return;
        }
        switch (object.type) {
          case 'testsuite':
		        // map a YUI suite to a JUnit suite
            var suite = <testsuite tests={object.total} failures={object.failed} />;
            // hudson doesn't differentiate suites with the same name from 
            // different files, so prepend filename to ensure uniqueness
            console.debug('xml: YUI testsuite => JUnit suite.@name = ' + test_file_name)            
            suite.@name = test_file_name + ' - ' + object.name;
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
            console.debug('xml: YUI testcase => JUnit suite.@name = ' + test_file_name)            
            suite.@name = test_file_name + '.' + object.name;
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
            console.debug('xml: YUI test => JUnit testcase.@name = ' + object.name)            
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
      
      // JUnit can nest testsuites, but there are not many examples of this
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
      console.debug("xml: changing <root/> to <testsuites>")
      if(xml.testsuite[0]){
        xml = xml.testsuite[0];
        xml.setName("testsuites");
        xml.@tests = results.total;
        xml.@failures = results.failed;
        xml.@name = test_file_name;
        xml.@time = results.duration/1000.0;
      }

      xml["system-out"] = new XML("<text><![CDATA[" + jsonStr + "]]></text>");
      xml["system-err"] = new XML("<text><![CDATA[]]></text>");
      
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
  
  // use the console for output from the HTML page
  window.console = console;  

  /*
   * Load the HTML page with the Unit Tests in, catching any errors so we can write a JUnit report if env.js can't read the HTML file
   */
  try {  
    // Load HTML page into the env.js 'browser'
    console.info("Loading HTML test file: " + test_file);
    window.location = test_file;	
    console.info("File name: " + test_file_name);
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

  if (navigator.userAgent.match(/Rhino/)){  
    console.info("Browser UA: " + navigator.userAgent)  
    console.info("Browser UA: " + Y.JSON.stringify(Y.UA,null,2))

    // time how long it takes to run
    var startTime = 0;

    // initialise test runner
    var TestRunner = Y.Test.Runner;
    // capture results
    TestRunner.subscribe(TestRunner.BEGIN_EVENT, function() {
      startTime = +new Date();
      console.info("Test execution started");
    });
    TestRunner.subscribe(TestRunner.TEST_PASS_EVENT, utils.reportResult);
    TestRunner.subscribe(TestRunner.TEST_FAIL_EVENT, utils.reportResult);
    TestRunner.subscribe(TestRunner.TEST_IGNORE_EVENT, utils.reportResult);
    TestRunner.subscribe(TestRunner.COMPLETE_EVENT, utils.reportCompletionStatus);    
    console.info("Rhino: YUI TestRunner events subscribed");
  
    // clear any old tests from previous pages
    TestRunner.clear();
    // add the test cases and suites from the loaded HTML file
    console.log("Rhino: Running tests " + Y.JSON.stringify(suite,null,2))
    TestRunner.add(suite);    
    // run all tests
    TestRunner.run();
    console.log("Rhino: TestRunner complete");
  }

})(arguments);
