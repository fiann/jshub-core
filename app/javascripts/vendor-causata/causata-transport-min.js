"use strict";YUI.add("causata-transport",function(f){var d={id:"causata-transport",name:"Causata Transport Plugin",version:0.1,vendor:"Causata Inc"},e=["page-view","product-view","authentication","checkout"],b={server:null,account:null},g=function(j){if(typeof b.server!=="string"){jsHub.trigger("plugin-error",{message:"Server hostname not specified",source:d.id});return;}var i={timestamp:j.timestamp,eventType:j.type,attributes:[]};for(var k in j.data){if("string"===typeof j.data[k]||"number"===typeof j.data[k]){i.attributes.push({name:k,value:j.data[k]});}}jsHub.safe.toJSONString=function(m){if(f.JSON){return f.JSON.stringify(m,null,2);}};var h={sender:d.name+" v"+d.version,event:jsHub.safe.toJSONString(i)};var l=(("https:"===jsHub.safe("document").location.protocol)?"https://":"http://");jsHub.dispatchViaForm("POST",l+b.server,h);},a=function(h,i){b[h]=i;};d.configure=a;jsHub.trigger("plugin-initialization-start",d);for(var c=0;c<e.length;c++){jsHub.bind(e[c],d.id,g);}jsHub.trigger("plugin-initialization-complete",d);},"2.0.0",{requires:["hub","logger","form-transport","json-stringify"],after:["hub","logger","form-transport","json-stringify"]});