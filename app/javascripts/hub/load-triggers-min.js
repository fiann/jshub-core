"use strict";(function(){var c=null,b=document;function a(){if(a.done){return;}a.done=true;if(c){clearInterval(c);}jsHub.trigger("data-capture-start");jsHub.trigger("page-view");jsHub.trigger("data-capture-complete");}if(b.addEventListener){b.addEventListener("DOMContentLoaded",a,false);}else{if(b.attachEvent){b.onreadystatechange=function(){if(/interactive|complete/.test(this.readyState)){a();}};}else{if(/WebKit/i.test(navigator.userAgent)){c=setInterval(function(){if(/loaded|complete/.test(b.readyState)){a();}},50);}}}})();