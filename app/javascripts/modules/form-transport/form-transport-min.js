"use strict";YUI.add("form-transport",function(a){var b=function(){this.dispatch=function(g,j,v){var p,h,t,r,w,d,q,l,o,n,k,c,m,s,f;p=a.UA;h=a.Lang;t=a.Object;if(!(/^POST|GET$/i.test(g))||!j||(/^javascript:|file:/i.test(j))){return false;}v=v||{};r=a.guid();q="jshub-form-"+r;d=document.createElement("form");d.id=q;d.method=g;d.action=j;d.style.visibility="hidden";d.style.position="absolute";d.style.top=0;d.style.cssClass="jshub-form";while(d.hasChildNodes()){d.removeChild(d.lastChild);}t.each(v,function l(i,x){var e;if(h.isString(i)||h.isNumber(i)){if(p.ie){e=document.createElement('<input name="'+x+'" />');}else{e=document.createElement("input");e.name=x;}e.type="hidden";e.value=i;d.appendChild(e);}else{if(h.isArray(i)){for(s=0;s<i.length;s++){if(h.isString(i[s])||h.isNumber(i[s])){l(i[s],x);}}}else{if(h.isFunction(i)){}else{if(h.isObject(i)){}else{}}}}});k="jshub-iframe-"+r;if(p.ie){n=document.createElement('<iframe name="'+k+'" />');}else{n=document.createElement("iframe");n.name=k;}n.id=k;n.src="#";n.style.visibility="hidden";n.style.position="absolute";n.style.top=0;n.style.cssClass="jshub-iframe";if(p.ie){try{if("ActiveXObject" in window){w=new ActiveXObject("htmlfile");w.open();w.write("<html><head></head><body></body></html>");w.body.innerHTML=d.outerHTML+n.outerHTML;w.close();d=w.getElementById(d.id);n=w.getElementById(n.id);}}catch(u){}}else{w=document;w.body.appendChild(d);w.body.appendChild(n);}if(!d){}if(!n||h.isUndefined(n.nodeType)){}f={doc:w,form:d,iframe:n};n.transportState=0;n.onload=function(){jsHub.trigger("form-transport-complete",f);};n.onunload=function(){};d.target=n.id;d.submit();jsHub.trigger("form-transport-sent",f);return f;};};jsHub.dispatchViaForm=(new b()).dispatch;},"2.0.0",{requires:["hub"],after:["hub"]});