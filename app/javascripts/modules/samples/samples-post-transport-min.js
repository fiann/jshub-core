"use strict";YUI.add("samples-post-transport",function(d){var a={name:"Sample HTTP POST transport plugin",version:0.1,vendor:"jsHub.org"},b=["page-view","authentication","checkout"],c=function(f){var h="1234";var e="test.causata.com";if(h!==""){e+=e.substring(e.length-1,e.length)=="/"?"":"/";e+="account/"+h;}var g={sender:a.name+" v"+a.version};for(field in f.data){if("string"===typeof f.data[field]||"number"===typeof f.data[field]){g[field]=f.data[field];}}var j=(("https:"===jsHub.safe("document").location.protocol)?"https://":"http://");jsHub.dispatchViaForm("POST",j+e,g);};for(i=0;i<b.length;i++){jsHub.bind(b[i],a.id,c);}jsHub.trigger("plugin-initialization-complete",a);},"2.0.0",{requires:["yui","hub","logger","form-transport"],after:["yui"]});