(function(args) {
  
  // HTML DOM for these tests (relative to this #{RAILS_ROOT})
  var test_file = args[0];
  if (typeof test_file != 'string') {
    throw new java.lang.IllegalArgumentException("Must specify test file on command line");
  }
  
  // Logging
  // TODO: capture input to YAHOO.tool.TestLogger
  var debug_mode = (args[1] === 'debug');
  if (debug_mode) {
    print("Using debug mode");
  }
  // initialize console
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
    var discard = function() {
    };
    this.debug = (!debug_mode) ? discard : function() {
      print("debug: " + indent + format.apply(this, arguments));
    };
    this.log = (!debug_mode) ? discard : function() {
      print("log  : " + indent + format.apply(this, arguments));
    };
    this.warn = (!debug_mode) ? discard : function() {
      print("warn : " + indent + format.apply(this, arguments));
    };
    this.error = function() {
      print("error: " + indent + format.apply(this, arguments));
    };
    this.group = (!debug_mode) ? discard : function() {
      indent += "+ ";
      print("log  : " + indent + format.apply(this, arguments));
    };
    this.groupEnd = (!debug_mode) ? discard : function() {
      indent = indent.substring(0, indent.length - 2);
    };
  };

  // time how long it takes to run
  var startTime = 0;
  
  // Utilities for the test functions
  var utils = {
    /**
     * Reporting output
     * @param {Object} data the event that was recorded
     */
    printReport: function(data, timeTaken) {
      print('Test Report: ' + data.results.passed + " Passed, " 
	    + data.results.failed + " Failed, " 
		+ data.results.ignored + " Ignored, " 
		+ data.results.total + " Total tests in " + timeTaken + "ms");
    },
    
    /**
     * Log a result to the console.
     * @param {Object} result
     */
    reportResult: function(result) {
      var className, message;
      if (result.type == 'fail') {
        console.log("Test '" + result.testName + "' failed.");
        console.log("Message: " + result.error);
      }
    },
    
    // Output data in YUI format
    saveYUITestReport: function(data) {
      // format as XML
      var xml = Y.Test.Format.XML(data.results)
      // where to save (relative to #{RAILS_ROOT})
	  var path = test_file;
	  path = path.substring(path.lastIndexOf('tmp/test/'), path.lastIndexOf('.')) + '.xml';
      var out = new java.io.FileWriter(new java.io.File(path));
      out.write(xml);
      out.flush();
      out.close();
      console.log('Report saved in YUITest XML at ' + path);
    },
    
    /* Example data.results object 
    ({
      '/Users/fiann/Code/Javascript/jsHub/tag-core/branches/akita-on-rails/tmp/test/javascript/hAuthenticate_parser_test.html': {
        passed: 2,
        'Environment check': {
          passed: 2,
          'test required test dependencies': {
            message: "Test passed",
            type: "test",
            name: "test required test dependencies",
            result: "pass"
          },
          'test jsHub API dependencies': {
            message: "Test passed",
            type: "test",
            name: "test jsHub API dependencies",
            result: "pass"
          },
          total: 2,
          type: "testcase",
          name: "Environment check",
          ignored: 0,
          failed: 0
        },
        total: 5,
        type: "testsuite",
        name: "/Users/fiann/Code/Javascript/jsHub/tag-core/branches/akita-on-rails/tmp/test/javascript/hAuthenticate_parser_test.html",
        ignored: 0,
        'hAuthenticateEvent - required default properties': {
          'test optional auth-method value specified': {
            message: "Unexpected error: \"hAuthenticationPlugin\" is not defined.",
            type: "test",
            name: "test optional auth-method value specified",
            result: "fail"
          },
          total: 3,
          type: "testcase",
          'test values not specified': {
            message: "Unexpected error: \"hAuthenticationPlugin\" is not defined.",
            type: "test",
            name: "test values not specified",
            result: "fail"
          },
          failed: 3,
          passed: 0,
          'test optional userid value specified': {
            message: "Unexpected error: \"hAuthenticationPlugin\" is not defined.",
            type: "test",
            name: "test optional userid value specified",
            result: "fail"
          },
          ignored: 0,
          name: "hAuthenticateEvent - required default properties"
        },
        failed: 3
      },
      total: 5,
      type: "report",
      timestamp: "22 January 2009 17:07:58 GMT",
      failed: 3,
      passed: 2,
      duration: 42,
      ignored: 0,
      name: "YUI Test Results"
    })  */
     
    // Save data in JUnit format for Hudson reporting
    saveJUnitTestReport: function(results) {
		
      var appendReport = function(currentNode, object) {
        if (typeof object.type == 'undefined') {
          return;
        }
        switch (object.type) {
          case 'testsuite':
		    // map a YUI suite to a JUnit suite
            var suite = <testsuite tests={object.total} failures={object.failed} />;
            // hudson doesn't differentiate suites with the same name from different files,
			// so prepend filename to ensure uniqueness
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
            // hudson doesn't differentiate suites with the same name from different files,
			// so prepend filename to ensure uniqueness
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
//				testcase.failure = object.error.rhinoException.getScriptStackTrace();
			  }
			  testcase.failure.@message = object.message;
			}
            currentNode.appendChild(testcase);
            break;
        }
      };
		
      // transform data
      var time = (results.duration);
      var name = test_file.substring(test_file.lastIndexOf('tmp/test/') + 'tmp/test/javascript/'.length, 
	    test_file.lastIndexOf('.'));
      // create a fake root element because it's hard to get the real suite element
	  // from the javascript object
	  var xml = <root />;
	  for (prop in results) {
	  	if (typeof results[prop] == 'object') {
			// it's a test result not metadata
			appendReport(xml, results[prop]);
		}
	  }
	  // now get rid of the <root> element and change the root <testsuite> to <testsuites>
	  xml = xml.testsuite[0];
	  xml.setName("testsuites");
      xml.@tests = results.total;
      xml.@failures = results.failed;
	  xml.@name = name;
	  xml.@duration = results.duration;
	  xml["system-out"] = "";
	  xml["system-err"] = "";
	  
      // where to save (relative to #{RAILS_ROOT}) - this dir is automatically created by CI::Reporter and read by Hudson
	  var path = 'test/reports/TEST-' + name.replace(/\//g, '_') + '.xml';
      // save as file
      var out = new java.io.FileWriter(new java.io.File(path));
      //      xml = new java.lang.String(xml);
      out.write(xml); //, 0, text.length());
      out.flush();
      out.close();
      console.log('Report saved in JUnit XML at ' + path);
    }
  };
  
  // env.js creates a browser environment, including window object
  load("lib/env/env.rhino.js");
  
  // use the console for output from the tests
  window.console = console;

  // define function to run the tests after page has loaded 
  window.onload = function() {
  
    // relative to #{RAILS_ROOT}
    var public_folder = "public/javascripts/";
    var src_path = "app/javascripts/";	
    
    // jQuery is a jsHub dependency
    console.log("Loading jquery.js");
    load(public_folder + "jquery/jquery.js");
    
    // jsHub code
	console.log("Loading jsHub core");
    load(src_path+"hub.js");
    load(src_path+"api.js");
    
    // YUI test framework
    console.log("Loading yuitest framework");
    load(public_folder + "yui-3.0.0pr2/build/yui/yui.js");
    load(public_folder + "yui-3.0.0pr2/build/dump/dump.js");
    load(public_folder + "yui-3.0.0pr2/build/substitute/substitute.js");
    load(public_folder + "yui-3.0.0pr2/build/oop/oop.js");
    load(public_folder + "yui-3.0.0pr2/build/event/event.js");
    load(public_folder + "yui-3.0.0pr2/build/dom/dom.js");
    load(public_folder + "yui-3.0.0pr2/build/node/node.js");
    load(public_folder + "yui-3.0.0pr2/build/json/json.js");
    load(public_folder + "yui-3.0.0pr2/build/yuitest/yuitest.js");
    
    // Create new YUI instance, and populate it with the required modules
    YUI().use("yuitest", function(Y) {
    
      /*
       * Place a reference to the YUI object in the global space for the
       * tests to access
       */
      window.Y = Y;
      
      /*
       * Create a test suite, the actual test page can add test cases to this.
       */
      window.suite = new Y.Test.Suite(test_file);
    });
    
    // initialise test runner
    var TestRunner = Y.Test.Runner;
    
    // add the test cases and suites
    TestRunner.add(window.suite);
    
    // capture results
    TestRunner.subscribe(TestRunner.BEGIN_EVENT, function() {
      startTime = +new Date();
      console.log("Test execution started");
    });
    TestRunner.subscribe(TestRunner.TEST_PASS_EVENT, utils.reportResult);
    TestRunner.subscribe(TestRunner.TEST_FAIL_EVENT, utils.reportResult);
    TestRunner.subscribe(TestRunner.TEST_IGNORE_EVENT, utils.reportResult);
    TestRunner.subscribe(TestRunner.COMPLETE_EVENT, function(evt) {
      try {
        var timeTaken = (+new Date()) - startTime;
        utils.printReport(evt, timeTaken);
        utils.saveYUITestReport(evt);
        utils.saveJUnitTestReport(evt.results);
        // exit status is 0 if no failures, otherwise the ruby test captures a fail
        quit(evt.results.failed);
      } 
      catch (e) {
        console.error(e);
        for (prop in e) {
          console.log("error." + prop + "=" + e[prop]);
        }
        quit(1);
      }
    });
    
    // execute inline script (with test code) in the html page, env.js loads
    // scripts with a mimetype of text/envjs automatically but not scripts
    // with a mimetype of text/javascript, and anyway we have to fix the urls
    // for the external scripts
    $("script").each(function() {
      var src = $(this).attr("src");
      if (typeof src != 'undefined') {
        // fix script load sources which follow rails routing
        src = src.replace(/^\/js\/src\//, src_path). // jshub src
          replace(/^\/javascripts\//, public_folder). // rails public/javascripts
          replace(/\?.*/, ""); // remove query string
//        console.log('Running <script src="' + src + '">');
        try {
          load(src);
        } 
        catch (e) {
          console.error("Error executing script " + src + ": " + e);
          console.log(e.toString());
          throw e;
        }
      } else {
//        console.log("Running inline <script>");
        try {
          var script = $(this).text();
          eval(script);
        } 
        catch (e) {
          console.error("Error executing inline script: " + e);
		  e.fileName = "inline script";
          console.error(script);
          throw e;
        }
      }
    });
    
    // run all tests
    TestRunner.run();
  }; // end window.onload()
  
  // wrap html load so we write a JUnit report if env.js can't read the html file
  try {
    // Load html test into the 'browser'
    console.log("Loading test file: " + test_file);
    window.location = test_file;
	
  } catch (e) {
	  
      var message = e.toString();
	  if (e.fileName) {
	  	message += ", file: " + e.fileName;
	  }
	  if (e.code) {
	  	// it's probably a DOMException
	  	message += " parsing the html";
	  }
      var name = test_file.substring(test_file.lastIndexOf('tmp/test/') + 'tmp/test/javascript/'.length, test_file.lastIndexOf('.'));
      console.log(message);
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
        'Parse html test file': {
          'test env.js can read unit test html file': {
            message: message,
            type: "test",
            name: "test env.js can read unit test html file",
            result: "fail",
			error: e
          },
          total: 1,
          passed: 0,
          failed: 1,
          type: "testcase",
          name: name + ": parse html test file"
        },
        total: 1,
        passed: 0,
        failed: 1,
        type: "testsuite",
        name: test_file
      };
      utils.saveJUnitTestReport(results);

		    quit(1);
  }

})(arguments);
