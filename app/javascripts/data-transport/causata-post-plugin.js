/** 
 * A plugin to send output to the Causata system, using the POST transport and 
 * in JSON format expected by Causata.
 *
 * @module data-transport
 * @class causata-post-plugin
 */
/*--------------------------------------------------------------------------*/

"use strict";

(function() {

  /**
   * Metadata about this plug-in for use by UI tools and the Hub
   */
  var metadata = {
    name: 'Causata Transport Plugin',
    version: 0.1,
    vendor: 'Causata Inc'
  },  
  
  /**
   * The events that will be captured and sent to the Causata servers
   */
  boundEvents = ['page-view', 'product-view', 'authentication', 'checkout'],  
  
  /**
   * The authentication token for the plugin, which must exactly match the
   * data-visibility configured in the html page.
   */
  token = "causata",  
  
  /**
   * Event driven anonymous function bound to 'page-view'
   * @method transport
   * @param event {Object} the event to serialize and send to the server
   * @property metadata
   */
  transport = function(event) {
  
    jsHub.logger.group("Causata output: sending '%s' event", event.type);
    
    /**
     * URL to dispatch to the server
     */
    var url = "<%= server_url %>";
    var account = "<%= account_id %>";
    
    /*
     * Reference to a 'safe' version of jQuery with restricted access to the DOM (like AdSafe).
     * The plugin should only use this API and will be subject to static analysis
     * to demonstrate this.
     */
    var $ = jsHub.safe('$');
    
    /*
     * Serialize data as expected format, see
     * https://intra.causata.com/code/causata/wiki/JavascriptTag/WireFormat
     */
    var outputEvent = {
      timestamp: event.timestamp,
      'event-type': event.type,
      attributes: []
    };
	
	for (field in event.data) {
      if ("string" === typeof event.data[field] || "number" === typeof event.data[field]) {
	  	outputEvent.attributes.push({
			name : field,
			value : event.data[field]
		});
      }
    }
	
    var outputData = {
      sender: metadata.name + " v" + metadata.version,
      event: jsHub.safe.toJSONString(outputEvent)
    };
    
    // dispatch via API function
    jsHub.dispatchViaForm("POST", url, outputData);
    jsHub.logger.groupEnd();
  };
  
  /*
   * Bind the plugin to the Hub so as to run when events we are interested in occur
   */
  for (i = 0; i < boundEvents.length; i++) {
    jsHub.bind(boundEvents[i], "causata", transport);
  }
  
  // lifecycle notification
  jsHub.trigger("plugin-initialization-complete", metadata);
})();
