/**
 * Alias console wrapper for logging.
 * @module hub
 * @for jsHub
 *//*--------------------------------------------------------------------------*/
// TODO: Enable sending of logging data to remote servers

// JSLint options
/*global YUI, jsHub */
"use strict";

YUI.add('logger', function (Y) {

  (function () {    
    // Initialise a logger instance based on what is available
    if (window.debug && window.debug.log) {
      // Use caching debug console wrapper
      jsHub.logger = window.debug;
    } else {
      // firebugx based stub functions
      // ref: http://getfirebug.com/firebug/firebugx.js
      if (!window.console || !console.firebug) {
        var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
        "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];      
        window.console = {};
        for (var i = 0; i < names.length; ++i) {
          window.console[names[i]] = function () {
            // Closure to keep 'i' correct if we use it in the function
            // http://groups.google.com/group/comp.lang.javascript/browse_thread/thread/54ab90e2d778dc14
            return function () {
              /* do nothing */
            }; 
          }(i);
        }
      }
      // Use whatever window.console is now available
      jsHub.logger = window.console;
    }
  })();

  Y.log('logger module loaded', 'info', 'jsHub');
}, '2.0.0' , {
  requires: ['hub'],
  after: ['debug']
});
