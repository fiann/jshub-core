(function(){
  var _old_quit = this.quit;
  this.__defineGetter__("exit", function(){ _old_quit() });
  this.__defineGetter__("quit", function(){ _old_quit() });
  
  print("=================================================");
  print(" Rhino JavaScript Shell");
  print(" To exit type 'exit', 'quit', or 'quit()'.");
  print("=================================================");

  // Paths and vars relative to #{RAILS_ROOT}
  var src_path = "app/javascripts/";
  var public_path = "public/javascripts/"; 

  // Env.js creates a browser environment, including a 'window' object
  // ref: http://github.com/jeresig/env-js/tree/master
  print("Loading Env.js: started");
  load("lib/env/env.rhino.js");
  print("Loading Env.js: finished");
  
  // load the YUI Test files and optinally init a TestRunner
  // @param Boolean init
  function loadYuiTest(init){
    // YUI Core needed by all Modules
    print("Loading YUI: started");
    load(public_path + "yui3/build/yui/yui-min.js");
    print("Loading YUI: finished");
    // YUI Test dependencies
    print("Loading YUI Test files: started");
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
    print("Loading YUI Test files: finished");
    
    if (init) {  
      // Create new YUI instance, and populate it with the required modules
      window.Y = YUI({ useBrowserConsole: true }).use("*", function(Y){
        print("YUI Core initialised as 'Y'");
      });
      // initialise test runner
      var TestRunner = Y.Test.Runner;      
    }
  }

  // useful shortcuts
  window.onload = function() {	
    print("window.onload event fired");
    loadYuiTest(true);
  }   

  window.location = "lib/testing/example.html";
  print('Use load("../../relative/path/to.js") to load a JS file');
  print('Use window.location="../../relative/path/to.html" to load a HTML file');

  print("=================================================");
  
})();
