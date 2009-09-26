/** 
 * A plugin to parse the hProduct syntax microformat and pass it to the
 * jsHub event hub for delivery.
 *
 * @module data-capture
 * @class hProduct-plugin
 */
/*--------------------------------------------------------------------------*/

"use strict";

(function () {

  /*
   * Metadata about this plug-in for use by UI tools and the Hub
   */
  var metadata = {
    name: 'hProduct Microformat Parser Plugin',
	id: 'hProduct-plugin',
    version: 0.1,
    vendor: 'jsHub.org',
    type: 'microformat'
  };
  
  /*
   * First trigger an event to show that the plugin is being registered
   */
  jsHub.trigger("plugin-initialization-start", metadata);
  
  /**
   * Event driven anonymous function bound to 'page-view'
   * @method parse
   * @param event {Object}    Config object for the plugin.  Currently it is expected to contain a optional "context" property
   * @property metadata
   * @property propertyNames
   * @event  hproduct-parse-start
   * @event  hproduct-data-found
   * @event  hproduct-parse-complete
   */
  var parse = function parse(event) {
  
    // Notify start lifecycle event
    jsHub.trigger("hproduct-parse-start", event);
    
    /*
     * All local vars set here so nothing is accidentally made global.
     */
    var $, console, context, sources, data;
    
    /*
     * Reference to a 'safe' version of jQuery with restricted access to the DOM (like AdSafe).
     * The plugin should only use this API and will be subject to static analysis
     * to demonstrate this.
     */
    $ = jsHub.safe('$');
    
    /*
     * Pass logging messages via jsHub Hub for remote error reporting, etc
     */
    console = jsHub.logger;
    
    /*
     * Where to start parsing for microformat data
     */
    if (event && event.data && event.data.context) {
      context = event.data.context;
    }
    
    /*
     * Extract the hProduct nodes from HTML DOM (not source code), excluding nested hProducts
     * If there is no '.hproduct' node in the page, then no product view event will be 
     * generated.
     */
    sources = $('.hproduct', context);
	sources = sources.not(sources.find('.hproduct'));
    //console.debug("Found %s .hproduct islands in context %s", sources.length, context);
    
    /*
     * The parser will populate an object to represent the data according
     * to the parsing rules.
     * This may involve merging data from multiple sources.
     */
    data = {
      products : []
	};
    
    /*
     * Most classes and their values can be resolved using the Value Excerpting design-pattern
     */
    // TODO support currency design pattern
    var properties = ["brand", "category", "price", "description", "fn", "url", "product-id"];
    
    
    sources.each(function (idx, elm) {
    
      /*
       * Object for this hProduct
       */
      var hproduct = {};
	  var root = $(elm);
      
      /*
       * get the property data from class names
       */
      $.each(properties, function(count, name) {
        var node, value, classname = '.' + name;
        // exclude properties in nested microformats
        node = root.find(classname);
		node = node.not(node.find('.hproduct'));
		value = node.getMicroformatPropertyValue();
		console.debug('hProduct value for %s is', node, value);
        if (value !== null) {
          hproduct[name] = value;
        }
      });
      
	  // attributes use value class pattern http://microformats.org/wiki/value-class-pattern
	  // we can have multiple attributes, each one has a type and a value
	  // output in the data is an array: {name:[value, value], name:value}
	  var attributes = $('.attribute', elm);
	  attributes.each(function () {
        var attribute = $(this).excerptValueClassData(), type, value, allValues;
        if (attribute !== null) {
		  type = attribute.type;
		  value = attribute.value;
          hproduct.attributes = (hproduct.attributes || {});
		  allValues = $.makeArray(hproduct.attributes[type]); 
          $.merge(allValues, $.makeArray(value));
		  var unique = []; 
		  for (var i=0; i < allValues.length; i++) {
		  	if ($.inArray(allValues[i], unique) === -1) {
              unique.push(allValues[i]);
			}
		  }
		  if (unique.length === 1) {
		  	unique = allValues[0];
		  }
		  hproduct.attributes[type] = unique;
        }
      });
      
      jsHub.trigger("hproduct-data-found", {
        count: idx + 1,
        element: elm,
        data: hproduct
      });
      
      // issue an product view event to be logged
      jsHub.trigger("product-view", hproduct);
      
      /*
       * Append this hProduct object into the data to return
       */
      data.products.push(hproduct);
    });
    
    jsHub.trigger("hproduct-parse-complete", data);
    
	// don't return data as the product view is not part of the page view event that triggered
	// the parsing
    return;
  };
  
  /*
   * Bind the plugin to the Hub to look for .hproduct microformats and generate
   * product view events
   */
  jsHub.bind("page-view", metadata.id, parse);
    
  /*
   * Last trigger an event to show that the plugin has been registered
   */
  jsHub.trigger("plugin-initialization-complete", metadata);
  
})();
