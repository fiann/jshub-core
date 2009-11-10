/**
 * Data transport via Form submission to an iFrame 
 * Creates an HTML form in the DOM and encodes the data into the POST body for sending to a server.
 * The form is submitted to a named iframe for asynchronous cross domain delivery.
 * used in plugins
 * @module form-transport
 * @class FormTransport
 *//*--------------------------------------------------------------------------*/

/*jslint strict: true */
/*global YUI, jsHub */
"use strict";

YUI.add('form-transport', function (Y) {

  (function () {

    var FormTransport = function () {
  
      /**
       * Send a request to the server as a POST or GET method form request. 
       * <p>The data is sent via a hidden iframe which is dynamically created in the page, so that the
       * form submission does not interfere with the history and behaviour of the back button in 
       * the browser.
       * <p>This function does not perform any serialization. It is the responsibility of the data
       * output plugins to prepare the data in the format required by their server.
       * @method dispatch
       * @for FormTransport
       * @param method {string} one of "GET" or "POST", not case sensitive. If the method is not
       * supplied or does not match on of these values, then the submission will be rejected and
       * the function will return without taking any action.
       * @param url {string} a URL for the endpoint to send the data to. The URL is processed by
       * the browser, and so it may be fully qualified or relative to the page, as per a normal 
       * link. If the url is not specified the method will return without taking any action.
       * @param data {object} an object containing name=value pairs that will be sent as form data.
       * The name of each field in the object will be used as the form field name. The value must
       * be either a string, a number, or an array of strings / numbers, in which case multiple
       * form fields with the same name will be created. Any parameters which do not match this
       * expected format will be ignored.
       * @return the ID of the iframe that has been created
       */
      this.dispatch = function (method, url, data) {
        var timestamp, form, formID, appendField, iframe, iframeID, field, array, i;
        
        /*
         * This data transport only supports POST or GET
         * TODO: validate url for security reasons, reject javascript: protocol etc
         */
        if (!(/^POST|GET$/i.test(method)) || !url) {
          return;
        }
        data = data || {};
        timestamp = jsHub.safe.getTimestamp();
    
        /**
         * Add a hidden field to the form
         * @param {Object} form
         * @param {Object} name
         * @param {Object} value
         */
        appendField = function (form, name, value) {
          if ("string" === typeof value || "number" === typeof value) {
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = name;
            input.value = value;
            form.appendChild(input);
          }
        };
    
        // Create the form
        formID = "jshub-form-" + timestamp;        
        form = document.createElement("form");
        form.id = formID;
        form.method = method;
        form.action = url;
        form.style.visibility = "hidden";
        form.style.position = "absolute";
        form.style.top = 0;

        //remove any existing fields
        while (form.hasChildNodes()) {
          form.removeChild(form.lastChild);
        }

        for (field in data) {
          if (data[field] instanceof Array) {
            // TODO improve array test for security: http://blog.360.yahoo.com/blog-TBPekxc1dLNy5DOloPfzVvFIVOWMB0li?p=916
            array = data[field];
            for (i = 0; i < array.length; i++) {
              if ("string" === typeof array[i] || "number" === typeof array[i]) {
                appendField(form, field, array[i]);
              }
            }
          } else {
            appendField(form, field, data[field]);
          }
        }
        document.body.appendChild(form);

        // Create the iframe
        iframeID = "jshub-iframe-" + timestamp;        
        //IE won't let you assign a name using the DOM, must do it the hacky way
        if (Y.UA.ie) {
          iframe = document.createElement('<iframe name="' + iframeID + '" />');
        } else {
          iframe = document.createElement("iframe");
          iframe.name = iframeID;
        }

        iframe.id = iframeID;
        // TODO avoid IE 'clicks'
        // ref: http://www.julienlecomte.net/blog/2007/11/30/
        iframe.src = "#";
        iframe.style.visibility = "hidden";
        iframe.style.position = "absolute";
        iframe.style.top = 0;
        iframe.style.cssClass = "jshub-iframe";
        document.body.appendChild(iframe);
    
        // Set the iframe as the submission target of the form, tied together by a timestamp
        form.target = iframeID;

        // And send it ...
        form.submit();
        jsHub.trigger("form-transport-sent", {
          node: iframeID
        });
        return iframeID;
      };
    };
    
    jsHub.dispatchViaForm = (new FormTransport()).dispatch;
  })();

  Y.log('form-transport module loaded', 'info', 'jsHub');
}, '2.0.0' , {
  requires: ['hub'], 
  after: ['hub']
});
    