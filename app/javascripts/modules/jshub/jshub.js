/**
 * jsHub tag module dependencies
 * @module jshub
 *//*--------------------------------------------------------------------------*/

// JSLint options
/*global YUI, jsHub */
"use strict";

YUI.add("jshub",function(Y){

  // Initialise lifecycle triggers
  jsHub.logger.info("Hub initialized, triggering page lifecycle events");
  // Can be used to pre-configure data at page level if necessary
  jsHub.trigger("data-capture-start");

  // Data is ready to be parsed by Data Capture plugins
  jsHub.trigger("page-view");

  // Data capture phase is complete
  jsHub.trigger("data-capture-complete");

Y.log('jshub module loaded', 'info', 'jsHub')
},"2.0.0",{
  requires:["yui","jquery","hub","logger","utilities","microformats"], 
  after:["jquery"]
});