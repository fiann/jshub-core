/**
 * Wrap Firebug console for logging.
 * Set META.DEBUG = false to switch off logging.
 * @module hub
 * @class Logger
 * @for jsHub
 *//*--------------------------------------------------------------------------*/
// TODO: Enable sending of logging data to remote servers

// JSLint options
/*global YUI */
"use strict";

YUI.add('logger', function(Y) {

(function () {

  // global namespace
  var global = this, 
  
    Logger = function () {
      var console = global.console;
      var logging_active = console && true;
      if (global.META && global.META.DEBUG === false) {
        logging_active = false;
      }
      this.debug = function debug() {
        if (logging_active && console.debug) {
          console.debug.apply(console, arguments);
        }
      };
      this.log = function log() {
        if (logging_active && console.log) {
          console.log.apply(console, arguments);
        }
      };
      this.warn = function warn() {
        if (logging_active && console.warn) {
          console.warn.apply(console, arguments);
        }
      };
      this.error = function error() {
        if (logging_active && console.error) {
          console.error.apply(console, arguments);
        }
      };
      this.group = function group() {
        if (logging_active && console.group) {
          console.group.apply(console, arguments);
        } else {
          this.log.apply(this, arguments);
        }
      };
      this.groupEnd = function groupEnd() {
        if (logging_active && console.groupEnd) {
          console.groupEnd.apply(console, arguments);
        }
      };
    }
    
  // Initialise a logger instance  
  jsHub.logger = new Logger();  
})();

  Y.log('logger module loaded')
}, '2.0.0' , {
  after:['hub']
});
