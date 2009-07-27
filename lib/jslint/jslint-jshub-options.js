// rhino.js
// 2007-02-19
/*
Copyright (c) 2002 Douglas Crockford  (www.JSLint.com) Rhino Edition

Updated by Fiann O'Hagan with jsHub options
*/

// This is the Rhino companion to fulljslint.js.

/*extern JSLINT */
(function (a) {
  
  var jsHub_options = {

    // used for hub etc
    core : {
      onevar: false, 
      white: true, 
      indent: 2, 
      eqeqeq: true, 
      browser: true, 
      rhino: false,
      strict: true,
      laxbreak: true, 
      undef: true, 
      nomen: true, 
      bitwise: true, 
      regexp: false
    },

    // used for data-capture and data-output plugins, which must be adsafe compliant
    strict : {
      predef: ["jsHub"],
      safe: true,
      onevar: false, 
      white: true, 
      indent: 2, 
      eqeqeq: true, 
      strict: true,
      laxbreak: true, 
      undef: true, 
      nomen: true, 
      bitwise: true, 
      regexp: true
    }
  };
  
  var file = a[0];
  if (!file) {
    print("Usage: jslint.js file.js");
    quit(1);
  }
  // get the name of the HTML file
  var src_path = "app/javascripts/";
  var file_name = file.substring(file.lastIndexOf(src_path) + src_path.length);  
  
  load("./lib/jslint/fulljslint.js");
  var input = readFile(file);
  if (!input) {
    print("jslint: Couldn't open file '" + file + "'.");
    quit(1);
  }
  var ruleset = (/\/data\-/.test(file)) ? 'adsafe' : 'core';
  if (!JSLINT(input, jsHub_options[ruleset])) {
    print("Linting file " + file_name + " with " + ruleset + " rules\n");
    for (var i = 0; i < JSLINT.errors.length; i += 1) {
      var e = JSLINT.errors[i];
      if (e) {
        print('Lint at line ' + (e.line + 1) + ' character ' +
          (e.character + 1) + ': ' + e.reason);
        print((e.evidence || '').
          replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
        print('');
      }
    }
    quit(1);
  } else {
    print("jslint: 0 issues in " + file_name + " using " + ruleset + " rules");
    quit();
  }
})(arguments);