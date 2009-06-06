/**
 * Enhancements to jQuery for common functions 
 * used in plugins
 * @module data-capture
 * @class PluginAPI
 *//*--------------------------------------------------------------------------*/

/*jslint strict: true */
/*global jsHub, jQuery, Date */
"use strict";
 
(function () {
  var PluginAPI = {

    /**
     * This function normalizes an ISO8601 date by adding punctuation and
     * ensuring that hours and seconds have values
     * ref: http://en.wikipedia.org/wiki/ISO_8601
     * credits: Michael Kaply, Firefox Operator extension
     * @method normalizeISO8601
     * @param string {string} String to parse into ISO8601 format date
     * @return {string}       ISO8601 format date as a String 
     */
    normalizeISO8601: function (string) {
      var dateArray = string.match(/(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(?:([+-Z])(?:(\d\d)(?::?(\d\d))?)?)?)?)?)?/),
          dateString,
          tzOffset = 0;
        
      if (!dateArray) {
        return;
      }
    
      // build-up a ISO8601 string
      if (dateArray[1]) {
        dateString = dateArray[1];
        if (dateArray[2]) {
          dateString += "-" + dateArray[2];
          if (dateArray[3]) {
            dateString += "-" + dateArray[3];
            if (dateArray[4]) {
              dateString += "T" + dateArray[4];
              if (dateArray[5]) {
                dateString += ":" + dateArray[5];
              } else {
                dateString += ":" + "00";
              }
              if (dateArray[6]) {
                dateString += ":" + dateArray[6];
              } else {
                dateString += ":" + "00";
              }
              if (dateArray[7]) {
                dateString += "." + dateArray[7];
              }
              if (dateArray[8]) {
                dateString += dateArray[8];
                if ((dateArray[8] === "+") || (dateArray[8] === "-")) {
                  if (dateArray[9]) {
                    dateString += dateArray[9];
                    if (dateArray[10]) {
                      dateString += dateArray[10];
                    }
                  }
                }
              }
            }
          }
        }
      }
      return dateString;
    },
    /**
     * Converts an ISO8601 date into a JavaScript date object, honoring the TZ
     * offset and Z if present to convert the date to local time
     * NOTE: I'm using an extra parameter on the date object for this function.
     * I set date.time to true if there is a date, otherwise date.time is false.
     * ref: http://en.wikipedia.org/wiki/ISO_8601
     * credits: Michael Kaply, Firefox Operator extension
     * @method dateFromISO8601
     * @param  string {string}  ISO8601 formatted date
     * @return {string}         JavaScript date object that represents the ISO date. 
     */
    dateFromISO8601: function dateFromISO8601(string) {
      var dateArray = string.match(/(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(?:([+-Z])(?:(\d\d)(?::?(\d\d))?)?)?)?)?)?/);
      
      var date = new Date(dateArray[1], 0, 1);
      date.time = false;

      if (dateArray[2]) {
        date.setMonth(dateArray[2] - 1);
      }
      if (dateArray[3]) {
        date.setDate(dateArray[3]);
      }
      if (dateArray[4]) {
        date.setHours(dateArray[4]);
        date.time = true;
        if (dateArray[5]) {
          date.setMinutes(dateArray[5]);
          if (dateArray[6]) {
            date.setSeconds(dateArray[6]);
            if (dateArray[7]) {
              date.setMilliseconds(Number("0." + dateArray[7]) * 1000);
            }
          }
        }
      }
      if (dateArray[8]) {
        if (dateArray[8] === "-") {
          if (dateArray[9] && dateArray[10]) {
            date.setHours(date.getHours() + parseInt(dateArray[9], 10));
            date.setMinutes(date.getMinutes() + parseInt(dateArray[10], 10));
          }
        } else if (dateArray[8] === "+") {
          if (dateArray[9] && dateArray[10]) {
            date.setHours(date.getHours() - parseInt(dateArray[9], 10));
            date.setMinutes(date.getMinutes() - parseInt(dateArray[10], 10));
          }
        }
        /* at this point we have the time in gmt */
        /* convert to local if we had a Z - or + */
        if (dateArray[8]) {
          var tzOffset = date.getTimezoneOffset();
          if (tzOffset < 0) {
            date.setMinutes(date.getMinutes() + tzOffset); 
          } else if (tzOffset > 0) {
            date.setMinutes(date.getMinutes() - tzOffset); 
          }
        }
      }
      return date;
    },
    /**
     * Converts a Javascript date object into an ISO 8601 formatted date
     * NOTE: I'm using an extra parameter on the date object for this function.
     * If date.time is NOT true, this function only outputs the date.
     * ref: http://en.wikipedia.org/wiki/ISO_8601
     * credits: Michael Kaply, Firefox Operator extension
     * @method iso8601FromDate
     * @param  date {object}            Javascript Date object
     * @param  punctuation {boolean}  True if the date should have -/:
     * @return {string}               String with the ISO date. 
     */
    iso8601FromDate: function iso8601FromDate(date, punctuation) {
      var string = date.getFullYear().toString();
      if (punctuation) {
        string += "-";
      }
      string += (date.getMonth() + 1).toString().replace(/\b(\d)\b/g, '0$1');
      if (punctuation) {
        string += "-";
      }
      string += date.getDate().toString().replace(/\b(\d)\b/g, '0$1');
      if (date.time) {
        string += "T";
        string += date.getHours().toString().replace(/\b(\d)\b/g, '0$1');
        if (punctuation) {
          string += ":";
        }
        string += date.getMinutes().toString().replace(/\b(\d)\b/g, '0$1');
        if (punctuation) {
          string += ":";
        }
        string += date.getSeconds().toString().replace(/\b(\d)\b/g, '0$1');
        if (date.getMilliseconds() > 0) {
          if (punctuation) {
            string += ".";
          }
          string += date.getMilliseconds().toString();
        }
      }
      return string;
    },

    /** 
     * Fix relative pathed URLs
     * ref: http://www.sitepoint.com/blogs/2007/08/10/dealing-with-unqualified-href-values/
     * TODO: pass in context to account for BASE or IFRAME variations
     * @method qualifyHREF
     * @param href {string} The href to qualify, e.g. page.html, ../page.html, /page.html
     * @return {string}     Full qualified URI
     */
    qualifyHREF: function (href) {
      //get the current safe document location object 
      var loc = jsHub.safe('document').location; 

      //build a base URI from the protocol plus host (which includes port if applicable) 
      var uri = loc.protocol + '//' + loc.host; 

      //if the input path is relative-from-here 
      //just delete the ./ token to make it relative 
      if (/^(\.\/)([^\/]?)/.test(href)) 
      { 
        href = href.replace(/^(\.\/)([^\/]?)/, '$2'); 
      } 

      //if the input href is already qualified, copy it unchanged 
      if (/^([a-z]+)\:\/\//.test(href)) 
      { 
        uri = href; 
      } 

      //or if the input href begins with a leading slash, then it's base relative 
      //so just add the input href to the base URI 
      else if (href.substr(0, 1) === '/') 
      { 
        uri += href; 
      } 

      //or if it's an up-reference we need to compute the path 
      else if (/^((\.\.\/)+)([^\/].*$)/.test(href)) 
      { 
        //get the last part of the path, minus up-references 
        var lastpath = href.match(/^((\.\.\/)+)([^\/].*$)/); 
        lastpath = lastpath[lastpath.length - 1]; 

        //count the number of up-references 
        var references = href.split('../').length - 1; 

        //get the path parts and delete the last one (this page or directory) 
        var parts = loc.pathname.split('/'); 
        parts = parts.splice(0, parts.length - 1); 

        //for each of the up-references, delete the last part of the path 
        for (var i = 0; i < references; i++) 
        { 
          parts = parts.splice(0, parts.length - 1); 
        } 

        //now rebuild the path 
        var path = ''; 
        for (var j = 0; j < parts.length; j++) 
        { 
          if (parts[j] !== '') 
          { 
            path += '/' + parts[j]; 
          } 
        } 
        path += '/'; 

        //and add the last part of the path 
        path += lastpath; 

        //then add the path and input href to the base URI 
        uri += path; 
      } 

      //otherwise it's a relative path, 
      else 
      { 
        //calculate the path to this directory 
        path = ''; 
        parts = loc.pathname.split('/'); 
        parts = parts.splice(0, parts.length - 1); 
        for (var k = 0; k < parts.length; k++) 
        { 
          if (parts[k] !== '') 
          { 
            path += '/' + parts[k]; 
          } 
        } 
        path += '/'; 

        //then add the path and input href to the base URI 
        uri += path + href; 
      } 

      //return the final uri 
      return uri; 
    }
  };
  /*
   * Add the API as global functions on the core jQuery object
   */
  var $ = jsHub.safe('$');
  $.extend($, PluginAPI);
})();


/**
 * Enhancements to jQuery for common functions
 * used in microformat plugins
 * @module data-capture
 * @class MicroformatAPI
 */
/*--------------------------------------------------------------------------*/

(function () {
  var MicroformatAPI = {
  	
    /**
     * Implements value excepting rules for working out the value of a property
     * @method getMicroformatPropertyValue
     * @parmeter last {boolean} optional flag to return only the last source ordered value rather than concatenate multiple values
     * @parameter separator {string} optional sepeartor to use to concatenate multiple values
     * default separator is ', ' if not specified
     * @return The value of the property or null
     */
    getMicroformatPropertyValue: function (last, separator) {
    
      /*
       * Note: jQuery gives an empty string if the element / attribute is not present
       * so testing against this is needed to return null
       */
      var value = null, sources;
	  
      /*
       * <abbr> design pattern (contriversial)
       * ref: http://microformats.org/wiki/abbr-design-pattern
       */
      if (jQuery(this).find('abbr').length === 1) {
        value = jQuery(this).find('abbr').attr('title');
      }
	  
      /*
       * get value from explicit 'value' declarations
       */
      else {
        sources = jQuery(this).find('.value');
        sources = sources.not(sources.find('.value'));
        if (sources.length === 1) {
          value = sources.html();
        }

        /*
         * get value from multiple value elements, e.g. categories or nested formats
         * these are concatenated according to whitespace rules
         */
        else if (sources.length > 1) {
          value = '';
          jQuery.each(sources, function (idx, elm) {
            separator = separator || ' ';
            value += jQuery(elm).text();
            // if this is the last value we don't want an extra separator
            if (idx !== sources.length - 1) {
              value += separator;
            }
          });
        }

        /*
         * get last value from multiple value elements, e.g. categories or nested formats
         * these are overriden according to source order rules
         */
        else if (jQuery(this).text() !== '' && this.length > 1 && last === true) {
          jQuery.each(this, function (idx, elm) {
            value = jQuery(elm).text();
          });
        }
        
        /*
         * finally use the contained text as the value (removes HTML tags)
         */
        else if (jQuery(this).html() !== '') {
          value = jQuery(this).html();
        }
      }
      
      /*
       * trim whitespace at beginning and end of value
       */
      if (value !== null) {
        value = jQuery.trim(value);
        value = value.replace(/\s+/g, ' ');
      }
      
      return value;
    },
    
    /**
     * Implements value excepting rules for working out the value of a property
     * @method excerptMultipleValues
     * @return An array containing all values found for the property or null
     */
    excerptMultipleValues: function (last, separator) {
    
      /*
       * Note: jQuery gives an empty string if the element / attribute is not present
       * so testing against this is needed to return null
       */
      var value = [], node = jQuery(this), sources;
	  
      /*
       * get value from explicit 'value' declarations
       */
      sources = node.find('.value');
      sources = sources.not(sources.find('.value'));
      if (sources.length >= 1) {
        jQuery.each(sources, function (idx, elm) {
          var nodeValue = sources.text().split(/\s+/);
          jQuery.each(nodeValue, function (entry) {
            value.push(entry);
          });
        });
      }

      /*
       * or use the contained text as the value (removes HTML tags).
       * $(node).text() concatenates multiple node text without any separator, so we have
       * to split each value, not the whole string.
       */
      else if (node.text() !== '') {
        node.each(function () {
          jQuery.each(jQuery(this).text().split(/\s+/), function (idx, word) {
            value.push(word);
          });
        });
      }
      
      return (value.length > 0) ? value : null;
    },
    
    /**
     * Implements value class pattern excepting rules for working out the value of a property
     * @method excerptValueClassData
     * @return a JSON object containing the fields <code>type</code> and <code>value</code> if
     * present, or null if no data is found
     */
    excerptValueClassData: function () {
    
      /*
       * Default value if not specified is 'true'
       */
      var type, value, defaultValue = 'true', typeNodes = jQuery(this).find('.type'), valueNodes;
	  
	  
      /*
       * If the type is not specified, then the whole content of the attribute node is the
       * type, and the default value is implied. If the whole content is empty, the attribute 
       * invalid.
       */
      if (typeNodes.length === 0) {
        type = jQuery(this).html();
        if (type === "") {
          return null;
        }
        return {
          type: type,
          value: defaultValue
        };
      }
	  
	  /*
	   * If a single .type node is found, then concatenate .value nodes, or use the default
	   * value if no .value nodes are found.
	   */
	  else if (typeNodes.length === 1) {
        type = typeNodes.html();
        valueNodes = jQuery(this).find('.value');
        valueNodes = valueNodes.not(valueNodes.find('.value'));
        if (valueNodes.length === 0) {
          value = defaultValue;
        } else {
          value = "";
          valueNodes.each(function () {
            value += jQuery(this).html();
          });
        }
        return {
          type: type,
          value: value
        };
      }

      /*
       * If there is more than one .type node, the context is not valid
       */
      return null;
    }
    
  };
  
  /*
   * Add the API as object methods on the any jQuery object
   */
  var $ = jsHub.safe('$');
  $.extend($.fn, MicroformatAPI);
})(jQuery);