/**
 * Visual logger for the YUI3 tests used to implement the unit tests.
 * Provides a better visual representation than the YUI Console.
 *
 * @author <a href="mailto:fiann.ohagan@jshub.org">Fiann O'Hagan</a>
 */
// Y is a YUI instance declared in the layout for the tests
// suite contains the suite of tests for the page
/*global Y, suite */

(function() {
  
  if (typeof Y === 'undefined') {
    alert("Configuration error: YUI3 is not present");
    return;
  }
  
  if (typeof suite === 'undefined') {
    alert("Configuration error: A test suite is not defined");
    return;
  }
  
  if (window.location.hash === '#no_autotest') {
  	console.debug("Autorun tests disabled");
  	return;
  }
  
  var resultsDiv = Y.get('#results');
  var statusBar = Y.Node.create('<div class="logsummary"></div>');
  resultsDiv.appendChild(statusBar);
  var resultsTable = Y.Node.create('<table class="logtable">' +
    '<thead><tr><th>Test</th><th>Result</th><th>Message</th></tr></thead>' +
    '</table>');
  resultsDiv.appendChild(resultsTable);
  resultsBody = Y.Node.create('<tbody></tbody>');
  resultsTable.appendChild(resultsBody);
  
  /**
   * Show a message in the status bar above the test results
   * @param {String} msg
   */
  var updateStatus = function(msg) {
    statusBar.set('innerHTML', msg);
  };
  
  /**
   * Add a result to the results table.
   * @param {Object} result
   */
  var reportResult = function(result) {
    var className, message;
    updateStatus("Test '" + result.testName + "' " + result.type.replace('ignore', 'ignor') + "ed.");
    switch (result.type) {
      case 'pass':
        className = 'passed';
        message = 'Test passed';
        break;
      case 'fail':
        className = 'failed';
        message = '<pre>' + result.error.getMessage() + '</pre>';
        break;
      case 'ignore':
        className = 'ignored';
        message = 'Test ignored';
        break;
      default:
        className = 'error';
        message = 'Cannot parse test status "' + result.type + '"';
    }
	var row = Y.Node.create('<tr class="' + className + '">'+
      '<td>' + result.testCase.name + ': ' + result.testName + '</td>'+
      '<td>' + result.type.replace('ignore', 'ignor') + 'ed</td>' +
      '<td>' + message + '</td></tr>');
    resultsBody.appendChild(row);
  };
  
  var reportCompletionStatus = function(evt) {
    var status, timeTaken = (+new Date()) - startTime;
    if (window.jsHub) {
      jsHub.logger.debug('Test results', evt.results);
    }
    if (evt.results.failed == 0) {
      status = evt.results.passed + " test" + 
        (evt.results.passed !== 1 ? "s" : "") +
        " passed in " + timeTaken + "ms";
      statusBar.addClass("passed");
    } else {
      status = evt.results.failed + " test" + 
        (evt.results.failed !== 1 ? "s" : "") +
        " failed. Tests complete in " + timeTaken + " ms";
      statusBar.addClass("failed");
    }
    updateStatus(status);
  
    // automatically submit the tests as the page loads
    // sample URLs:
    // local test: 
    // ... and send the results to the local data collection server
    var resultsUrl = window.location.pathname.replace(/test\/javascript\/.*/, "test/results");
    
    // or if its a External Vendor test, e.g. http://some.domain/core/test/external/:test_page_id/unit/hub_configuration_test posts to /test/external/:test_page_id/results so we can link the jvascript_test_results to the test_run
    if (/test\/external/.test(window.location.pathname)) {
      resultsUrl = window.location.pathname.replace(/test\/external\/(\d+)\/.*/, "test/external/$1/results");
    }
    
    // default url for non-core applications that don't use 'test' in the URL, e.g. UI
    if (!/test\//.test(resultsUrl)) {
      resultsUrl = "/core/test/results";
    }
    
    var reporter = new Y.Test.Reporter(resultsUrl, Y.Test.Format.JSON);
    reporter.report(evt.results);
  }
  
  // time how long it takes to run
  var startTime = 0;
  
  // initialise test runner
  var TestRunner = Y.Test.Runner;
  
  // add the test cases and suites
  TestRunner.add(window.suite);
  
  // visualise results
  TestRunner.subscribe(TestRunner.BEGIN_EVENT, function() {
    startTime = +new Date();
    updateStatus("Test execution started");
  });
  TestRunner.subscribe(TestRunner.TEST_PASS_EVENT, reportResult);
  TestRunner.subscribe(TestRunner.TEST_FAIL_EVENT, reportResult);
  TestRunner.subscribe(TestRunner.TEST_IGNORE_EVENT, reportResult);
  TestRunner.subscribe(TestRunner.COMPLETE_EVENT, reportCompletionStatus);
  
  // clear any old tests from previous pages
  TestRunner.clear();
  // add the test cases and suites from the loaded HTML file
  TestRunner.add(suite);
  
  // run all tests
  TestRunner.run();
})();
