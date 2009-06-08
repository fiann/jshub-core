/** 
 * A sample plugin to capture jsHub events and send them to a server via a 
 * single pixel gif image.
 * 
 * You can use this as a starting point to customize the data to generate a
 * URL in the format expected by your server.
 *
 * @module data-output
 * @class sample-output-plugin
 */
/*--------------------------------------------------------------------------*/

"use strict";

(function() {

  /**
   * Metadata about this plug-in for use by UI tools and the Hub
   */
  var metadata = {
  	id: 'sample-output-plugin',
    name: 'Sample Output Plugin',
    version: 0.1,
    author: "Fiann O'Hagan",
    email: 'fiann.ohagan@jshub.org',
    vendor: 'jsHub'
  },  
  
  /**
   * The events that will be captured and sent to the server
   */
  boundEvents = ['page-view', 'authentication', 'checkout'],  
  
  /**
   * Event driven anonymous function bound to 'page-view'
   * @method send
   * @param event {Object} the event to serialize and send to the server
   * @property metadata
   */
  send = function(event) {
  
    jsHub.logger.group("Sample output: sending '%s' event", event.type);
    
    /**
     * URL to dispatch to the server
     * TODO where should we configure this?
     */
    var url = "http://10.0.1.9/";
    
    var data = {
      sender: metadata.name + " v" + metadata.version,
      pagename: event.data.name
    };
    
    // dispatch via API function
    jsHub.dispatchViaImage(url, data);
    jsHub.logger.groupEnd();
  };
  
  /*
   * Bind the plugin to the Hub so as to run when events we are interested in occur
   */
  jsHub.bind("page-view", metadata.id, transport);
  
  // lifecycle notification
  jsHub.trigger("plugin-initialization-complete", metadata);
})();
