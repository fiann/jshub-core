/** 
 * A plugin to create an analytics object from technographic data 
 *
 * @module data-capture
 * @class technographics
 *//*--------------------------------------------------------------------------*/

// JSLint options
/*global jsHub */
/*jslint strict: true */
"use strict";
 
 
(function () {

  /*
   * Metadata about this plug-in for use by UI tools and the Hub
   */
  var metadata = {
    name: 'Link tracker plugin',
    id: 'links',
    version: 0.1,
    vendor: 'jsHub.org',
    type: 'data-capture'
  },
  
  // shortcut references
  window = this, document = window.document,
  
  // strings that are reused
  click = "click",
  
  // Configurable fields for this plugin
  // the default values are set below using calls to configure()
  trackDownloadLinks = false,
  downloadLinkRegexp = null,
  trackExternalLinks = false,
  internalDomainNameRegexp = null;
  
  /*
   * First trigger an event to show that the plugin is being registered
   */
  jsHub.trigger("plugin-initialization-start", metadata);
  
  /**
   * Receive a configuration update
   */
  metadata.configure = function (key, value) {
    var types, domains, links, i;
    if (key === "downloadLinkTypes") {
      if (value === "") {
        trackDownloadLinks = false;
      } else {
        types = value.split(/[,|\s]+/).join("|\\.");
        trackDownloadLinks = true;
        downloadLinkRegexp = new RegExp("\\." + types + "$");
      }
    } else if (key === "internalDomains") {
      if (value === "") {
        trackExternalLinks = false;
      } else {
        domains = value.split(/[,|\s]+/).join("|\\.").replace('*', '.*');
        trackExternalLinks = true;
        internalDomainNameRegexp = new RegExp("^" + domains + "$");
      }
    }
  };
  
  /*
   * Set defaults
   */
  metadata.configure("downloadLinkTypes", "avi,doc,docx,exe,m4v,mov,mp3,mp4,mpg,pdf,wav,wmv,xls,xlsx,zip,zxp");
  metadata.configure("internalDomains", window.location.host);
  
  
  /**
   * Callback fired when a link is clicked
   */
  var linkHandler = function () {
    var link = this, target = link.target, timeoutId, eventName = null,
      goImmediately = (target !== "" && target !== "_self" && target !== window.name);
    if (trackExternalLinks && ! internalDomainNameRegexp.test(link.hostname)) {
      eventName = "site-exit";
    } else if (trackDownloadLinks && downloadLinkRegexp.test(link.pathname)) {
      eventName = "download";
    }
    print("Tracking link to " + link.href + " (" + link + "): " + eventName);
    if (eventName !== null && ! goImmediately) {
      // the link unloads this window, so wait a moment for the tags to send their requests
      timeoutId = setTimeout(function () {
        window.location.href = link.href;
        // alert("go to " + link.href);
      }, 500);
    }
    if (eventName !== null) {
      jsHub.trigger(eventName, {
        node : link,
        url : link.href,
        timeoutId : timeoutId
      });      
    }
    return goImmediately;
   };
  
  /**
   * Instrument links to capture links to external sites and downloads, when triggered by the 'data-capture-start' event
   * @method capture
   * @property metadata
   */
  metadata.eventHandler = function instrumentLinks(event) {
  
    // extract links from html dom
    var links = document.getElementsByTagName('a'), i;
    for (i = 0; i < links.length; i++) {
      if (links[i].addEventListener) {
				links[i].addEventListener(click, linkHandler, false);
      } else if (links[i].attachEvent) {
				links[i].attachEvent("on" + click, linkHandler);
      }
    }
    
    return null;
  };
  
  /*
   * Bind the plugin to the Hub to look for hPage microformats and add the data
   * to page view events
   */
  jsHub.bind("data-capture-start", metadata);

  /*
   * Last trigger an event to show that the plugin has bene registered
   */
  jsHub.trigger("plugin-initialization-complete", metadata);
  
})();