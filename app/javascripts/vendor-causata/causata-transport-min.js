"use strict";(function(){var b={id:"causata-transport",name:"Causata Transport Plugin",version:0.1,vendor:"Causata Inc",type:"data-transport"},c=["page-view","product-view","authentication","checkout","site-search"],a={server:null,account:null};jsHub.trigger("plugin-initialization-start",b);b.eventHandler=function d(k){var j=false;if(""+k.data["custom-event"]==="true"){j="custom";}else{for(var h=0;h<c.length;h++){if(c[h]===k.type){j="standard";break;}}}if(!j){return;}if(typeof a.server!=="string"){jsHub.trigger("plugin-error",{message:"Server hostname not specified",source:b.id});return;}var g={timestamp:k.timestamp,eventType:k.type,attributes:[]};var f=function(r,q,p){var o=typeof p,n;if("string"===o||"number"===o){r.push({name:q,value:p});}else{if(jsHub.util.isArray(p)){for(n=0;n<p.length;n++){f(r,q,p[n]);}}}};for(var l in k.data){if(k.data.hasOwnProperty(l)){f(g.attributes,l,k.data[l]);}}var e={sender:b.name+" v"+b.version,event:jsHub.json.stringify(g)};var m=(("https:"===jsHub.safe("document").location.protocol)?"https://":"http://");jsHub.dispatchViaForm("POST",m+a.server,e);};b.configure=function(e,f){a[e]=f;};jsHub.bind("*",b);jsHub.trigger("plugin-initialization-complete",b);})();