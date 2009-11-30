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
  
  try {
  
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
     * The config object for this plugin
     */
    config = (function () {
      if (jsHub && jsHub.config && jsHub.config['causata-transport']) {
        return jsHub.config['causata-transport'];
      } else {
        throw new Error("Missing configuration object");
      }
    })(),

    /**
     * The URL of the server to send data to.
     * @required
     */
    server_url = (function () {
      if (config.url) {
        return config.url;
      } else {
        throw new Error("Missing server URL");
      }
    })(),  

    /**
     * The customer's account ID to send data to.
     * @required
     */
    account_id = (function () {
      if (config.account) {
        return config.account;
      } else {
        throw new Error("Missing account ID");
      }
    })(),  

    /**
     * Event driven anonymous function bound to 'page-view'
     * @method transport
     * @param event {Object} the event to serialize and send to the server
     * @property metadata
     */
    transport = function (event) {
    
      jsHub.logger.group("Causata output: sending '%s' event", event.type);
      
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
      jsHub.safe.toJSONString = function (object) {
        if (Y.JSON) {
          return Y.JSON.stringify(object, null, 2);
        }
      };
      
      var outputData = {
        sender: metadata.name + " v" + metadata.version,
        event: jsHub.safe.toJSONString(outputEvent)
      };
      
      var protocol = (("https:" === jsHub.safe('document').location.protocol) ? "https://" : "http://");
    
      // dispatch via API function
      jsHub.dispatchViaForm("POST", protocol + server_url, outputData);
      jsHub.logger.groupEnd();
    };
    
    /*
     * Bind the plugin to the Hub so as to run when events we are interested in occur
     */
    for (var i = 0; i < boundEvents.length; i++) {
      jsHub.bind(boundEvents[i], "causata", transport);
    }
    
    // lifecycle notification
    jsHub.trigger("plugin-initialization-complete", metadata);
    
  } catch (e) {
    jsHub.logger.warn("Causata plugin failed to initialize", e);
    
    // lifecycle notification
    metadata.error = e;
    jsHub.trigger("plugin-initialization-failed", metadata);
  }

}, "2.0.0", {
  requires: ["hub", "form-transport", "json-stringify"], 
  after: ["hub", "form-transport", "json-stringify"]
});