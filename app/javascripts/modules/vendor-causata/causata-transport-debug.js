/** 
 * A plugin to send output to the Causata system, using the POST transport and 
 * in JSON format expected by Causata.
 *
 * @module data-transport
 * @class causata-post-plugin
 */
/*--------------------------------------------------------------------------*/

// JSLint options
/*global YUI, jsHub */
"use strict";

YUI.add("causata-transport", function (Y) {
	
    /**
     * Metadata about this plug-in for use by UI tools and the Hub
     */
    var metadata = {
      id: 'causata-transport',
      name: 'Causata Transport Plugin',
      version: 0.1,
      vendor: 'Causata Inc'
    },

    /**
     * The events that will be captured and sent to the Causata servers
     */
    boundEvents = ['page-view', 'product-view', 'authentication', 'checkout'],  

    /**
     * The config object for this plugin
     */
    config = {
      server_url : null,
      account_id : null
    },
    
    /**
     * Event driven anonymous function bound to 'page-view'
     * @method transport
     * @param event {Object} the event to serialize and send to the server
     * @property metadata
     */
    transport = function(event) {
    
      jsHub.logger.group("Causata output: sending '%s' event", event.type);
      
      // cannot send message if server_url is not configured
      if (typeof config.server_url !== 'string') {
        jsHub.trigger('plugin-error', {
          message : "Server url not specified",
          source : metadata.id
        });
        jsHub.logger.groupEnd();
        return;
      }
      
      /*
       * Serialize data as expected format, see
       * https://intra.causata.com/code/causata/wiki/JavascriptTag/WireFormat
       */
      var outputEvent = {
        timestamp: event.timestamp,
        eventType: event.type,
        attributes: []
      };
      
      for (var field in event.data) {
        if ("string" === typeof event.data[field] || "number" === typeof event.data[field]) {
          outputEvent.attributes.push({
            name: field,
            value: event.data[field]
          });
        }
      }
      
      /** 
       * Convert an object to a JSON representation
       */
      jsHub.safe.toJSONString = function(object) {
        if (Y.JSON) {
          return Y.JSON.stringify(object, null, 2);
        }
      };
      
      var outputData = {
        sender: metadata.name + " v" + metadata.version,
        event: jsHub.safe.toJSONString(outputEvent)
      };
      
      // dispatch via API function
      jsHub.dispatchViaForm("POST", config.server_url, outputData);
      jsHub.logger.groupEnd();
    },
    
    /**
     * Receive a configuration update
     */
    configure = function (key, value) {
      config[key] = value;
    };
    
    /*
     * First trigger an event to show that the plugin is being registered
     */
    metadata.configure = configure;
    jsHub.trigger("plugin-initialization-start", metadata);

    /*
     * Bind the plugin to the Hub so as to run when events we are interested in occur
     */
    for (var i = 0; i < boundEvents.length; i++) {
      jsHub.bind(boundEvents[i], metadata.id, transport);
    }
    
    // lifecycle notification
    jsHub.trigger("plugin-initialization-complete", metadata);
    

}, "2.0.0", {
  requires: ["hub", "logger", "form-transport", "json-stringify"], 
  after: ["hub", "logger", "form-transport", "json-stringify"]
});