//  http://yui.yahooapis.com/combo?3.0.0/build/yui/yui-min.js&3.0.0/build/oop/oop-min.js&3.0.0/build/event-custom/event-custom-min.js&3.0.0/build/dom/dom-min.js&3.0.0/build/pluginhost/pluginhost-min.js&3.0.0/build/node/node-min.js&3.0.0/build/event/event-min.js&3.0.0/build/event-simulate/event-simulate-min.js&3.0.0/build/dump/dump-min.js&3.0.0/build/substitute/substitute-min.js&3.0.0/build/json/json-min.js&3.0.0/build/test/test-debug.js&3.0.0/build/node/node-event-simulate-min.js

/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
(function(){var I={},B=new Date().getTime(),A,E,H=function(){if(window.addEventListener){return function(M,L,K,J){M.addEventListener(L,K,(!!J));};}else{if(window.attachEvent){return function(L,K,J){L.attachEvent("on"+K,J);};}else{return function(){};}}}(),F=function(){if(window.removeEventListener){return function(M,L,K,J){M.removeEventListener(L,K,!!J);};}else{if(window.detachEvent){return function(L,K,J){L.detachEvent("on"+K,J);};}else{return function(){};}}}(),D=function(){YUI.Env.windowLoaded=true;YUI.Env.DOMReady=true;F(window,"load",D);},C={"io.xdrReady":1,"io.xdrResponse":1},G=Array.prototype.slice;if(typeof YUI==="undefined"||!YUI){YUI=function(O,N,M,L,J){var K=this,R=arguments,Q,P=R.length;if(!(K instanceof YUI)){return new YUI(O,N,M,L,J);}else{K._init();for(Q=0;Q<P;Q++){K._config(R[Q]);}K._setup();return K;}};}YUI.prototype={_config:function(N){N=N||{};var O=this.config,L,K,J,M;M=O.modules;for(L in N){if(M&&L=="modules"){J=N[L];for(K in J){if(J.hasOwnProperty(K)){M[K]=J[K];}}}else{if(L=="win"){O[L]=N[L].contentWindow||N[L];O.doc=O[L].document;}else{O[L]=N[L];}}}},_init:function(){var J="3.0.0",K=this;if(J.indexOf("@")>-1){J="test";}K.version=J;K.Env={mods:{},cdn:"http://yui.yahooapis.com/"+J+"/build/",bootstrapped:false,_idx:0,_used:{},_attached:{},_yidx:0,_uidx:0,_loaded:{}};K.Env._loaded[J]={};if(YUI.Env){K.Env._yidx=(++YUI.Env._yidx);K.Env._guidp=("yui_"+J+"-"+K.Env._yidx+"-"+B).replace(/\./g,"_");K.id=K.stamp(K);I[K.id]=K;}K.constructor=YUI;K.config={win:window||{},doc:document,debug:true,useBrowserConsole:true,throwFail:true,bootstrap:true,fetchCSS:true,base:function(){var L,M,O,N;M=document.getElementsByTagName("script");for(O=0;O<M.length;O=O+1){N=M[O].src.match(/^(.*)yui\/yui[\.\-].*js(\?.*)?$/);L=N&&N[1];if(L){break;}}return L||K.Env.cdn;}(),loaderPath:"loader/loader-min.js"};},_setup:function(J){this.use("yui-base");},applyTo:function(P,O,L){if(!(O in C)){this.log(O+": applyTo not allowed","warn","yui");return null;}var K=I[P],N,J,M;if(K){N=O.split(".");J=K;for(M=0;M<N.length;M=M+1){J=J[N[M]];if(!J){this.log("applyTo not found: "+O,"warn","yui");}}return J.apply(K,L);}return null;},add:function(K,M,J,L){YUI.Env.mods[K]={name:K,fn:M,version:J,details:L||{}};return this;},_attach:function(K,O){var T=YUI.Env.mods,L=this.Env._attached,Q,P=K.length,M,N,R,S,J;for(Q=0;Q<P;Q=Q+1){M=K[Q];N=T[M];if(!L[M]&&N){L[M]=true;R=N.details;S=R.requires;J=R.use;if(S){this._attach(this.Array(S));}if(N.fn){N.fn(this);}if(J){this._attach(this.Array(J));}}}},use:function(){if(this._loading){this._useQueue=this._useQueue||new this.Queue();this._useQueue.add(G.call(arguments,0));return this;}var K=this,U=G.call(arguments,0),Z=YUI.Env.mods,b=K.Env._used,V,O=U[0],M=false,X=U[U.length-1],W=K.config.bootstrap,P,R,N,Q=[],J=[],S=K.config.fetchCSS,T=function(d){if(b[d]){return;}var Y=Z[d],c,e,a;if(Y){b[d]=true;e=Y.details.requires;a=Y.details.use;}else{if(!YUI.Env._loaded[K.version][d]){Q.push(d);}else{b[d]=true;}}if(e){if(K.Lang.isString(e)){T(e);}else{for(c=0;c<e.length;c=c+1){T(e[c]);}}}J.push(d);},L;if(typeof X==="function"){U.pop();}else{X=null;}L=function(Y){Y=Y||{success:true,msg:"not dynamic"};if(X){X(K,Y);}if(K.fire){K.fire("yui:load",K,Y);}K._loading=false;if(K._useQueue&&K._useQueue.size()&&!K._loading){K.use.apply(K,K._useQueue.next());}};if(O==="*"){U=[];for(P in Z){if(Z.hasOwnProperty(P)){U.push(P);}}if(X){U.push(X);}return K.use.apply(K,U);}if(K.Loader){M=true;V=new K.Loader(K.config);V.require(U);V.ignoreRegistered=true;V.allowRollup=false;V.calculate(null,(S)?null:"js");U=V.sorted;}N=U.length;for(R=0;R<N;R=R+1){T(U[R]);}N=Q.length;if(N){Q=K.Object.keys(K.Array.hash(Q));}if(W&&N&&K.Loader){K._loading=true;V=new K.Loader(K.config);V.onSuccess=L;V.onFailure=L;V.onTimeout=L;V.context=K;V.attaching=U;V.require((S)?Q:U);V.insert(null,(S)?null:"js");}else{if(W&&N&&K.Get&&!K.Env.bootstrapped){K._loading=true;U=K.Array(arguments,0,true);K.Get.script(K.config.base+K.config.loaderPath,{onEnd:function(){K._loading=false;K.Env.bootstrapped=true;K._attach(["loader"]);K.use.apply(K,U);}});return K;}else{if(N){}K._attach(J);L();}}return K;},namespace:function(){var J=arguments,N=null,L,K,M;for(L=0;L<J.length;L=L+1){M=(""+J[L]).split(".");N=this;for(K=(M[0]=="YAHOO")?1:0;K<M.length;K=K+1){N[M[K]]=N[M[K]]||{};N=N[M[K]];}}return N;},log:function(){},error:function(K,J){if(this.config.throwFail){throw (J||new Error(K));}else{this.message(K,"error");}return this;},guid:function(J){var K=this.Env._guidp+(++this.Env._uidx);return(J)?(J+K):K;},stamp:function(L,M){if(!L){return L;}var J=(typeof L==="string")?L:L._yuid;if(!J){J=this.guid();if(!M){try{L._yuid=J;}catch(K){J=null;}}}return J;}};A=YUI.prototype;for(E in A){YUI[E]=A[E];}YUI._init();H(window,"load",D);YUI.Env.add=H;YUI.Env.remove=F;})();YUI.add("yui-base",function(B){function A(){this._init();this.add.apply(this,arguments);}A.prototype={_init:function(){this._q=[];},next:function(){return this._q.shift();},add:function(){B.Array.each(B.Array(arguments,0,true),function(C){this._q.push(C);},this);return this;},size:function(){return this._q.length;}};B.Queue=A;(function(){B.Lang=B.Lang||{};var R=B.Lang,G="array",I="boolean",D="date",M="error",S="function",H="number",K="null",F="object",O="regexp",N="string",C=Object.prototype.toString,P="undefined",E={"undefined":P,"number":H,"boolean":I,"string":N,"[object Function]":S,"[object RegExp]":O,"[object Array]":G,"[object Date]":D,"[object Error]":M},J=/^\s+|\s+$/g,Q="";R.isArray=function(L){return R.type(L)===G;};R.isBoolean=function(L){return typeof L===I;};R.isFunction=function(L){return R.type(L)===S;};R.isDate=function(L){return R.type(L)===D;};R.isNull=function(L){return L===null;};R.isNumber=function(L){return typeof L===H&&isFinite(L);};R.isObject=function(T,L){return(T&&(typeof T===F||(!L&&R.isFunction(T))))||false;};R.isString=function(L){return typeof L===N;};R.isUndefined=function(L){return typeof L===P;};R.trim=function(L){try{return L.replace(J,Q);}catch(T){return L;}};R.isValue=function(T){var L=R.type(T);
switch(L){case H:return isFinite(T);case K:case P:return false;default:return !!(L);}};R.type=function(L){return E[typeof L]||E[C.call(L)]||(L?F:K);};})();(function(){var C=B.Lang,D=Array.prototype,E=function(M,J,L){var I=(L)?2:B.Array.test(M),H,G,F;if(I){try{return D.slice.call(M,J||0);}catch(K){F=[];for(H=0,G=M.length;H<G;H=H+1){F.push(M[H]);}return F;}}else{return[M];}};B.Array=E;E.test=function(H){var F=0;if(C.isObject(H)){if(C.isArray(H)){F=1;}else{try{if("length" in H&&!("tagName" in H)&&!("alert" in H)&&(!B.Lang.isFunction(H.size)||H.size()>1)){F=2;}}catch(G){}}}return F;};E.each=(D.forEach)?function(F,G,H){D.forEach.call(F||[],G,H||B);return B;}:function(G,I,J){var F=(G&&G.length)||0,H;for(H=0;H<F;H=H+1){I.call(J||B,G[H],H,G);}return B;};E.hash=function(H,G){var K={},F=H.length,J=G&&G.length,I;for(I=0;I<F;I=I+1){K[H[I]]=(J&&J>I)?G[I]:true;}return K;};E.indexOf=(D.indexOf)?function(F,G){return D.indexOf.call(F,G);}:function(F,H){for(var G=0;G<F.length;G=G+1){if(F[G]===H){return G;}}return -1;};E.numericSort=function(G,F){return(G-F);};E.some=(D.some)?function(F,G,H){return D.some.call(F,G,H);}:function(G,I,J){var F=G.length,H;for(H=0;H<F;H=H+1){if(I.call(J,G[H],H,G)){return true;}}return false;};})();(function(){var D=B.Lang,C="__",E=function(H,G){var F=G.toString;if(D.isFunction(F)&&F!=Object.prototype.toString){H.toString=F;}};B.merge=function(){var G=arguments,I={},H,F=G.length;for(H=0;H<F;H=H+1){B.mix(I,G[H],true);}return I;};B.mix=function(F,O,H,N,L,M){if(!O||!F){return F||B;}if(L){switch(L){case 1:return B.mix(F.prototype,O.prototype,H,N,0,M);case 2:B.mix(F.prototype,O.prototype,H,N,0,M);break;case 3:return B.mix(F,O.prototype,H,N,0,M);case 4:return B.mix(F.prototype,O,H,N,0,M);default:}}var K=M&&D.isArray(F),J,I,G;if(N&&N.length){for(J=0,I=N.length;J<I;++J){G=N[J];if(G in O){if(M&&D.isObject(F[G],true)){B.mix(F[G],O[G]);}else{if(!K&&(H||!(G in F))){F[G]=O[G];}else{if(K){F.push(O[G]);}}}}}}else{for(J in O){if(M&&D.isObject(F[J],true)){B.mix(F[J],O[J]);}else{if(!K&&(H||!(J in F))){F[J]=O[J];}else{if(K){F.push(O[J]);}}}}if(B.UA.ie){E(F,O);}}return F;};B.cached=function(H,F,G){F=F||{};return function(L,K){var J=(K)?Array.prototype.join.call(arguments,C):L,I=F[J];if(!(J in F)||(G&&F[J]==G)){F[J]=H.apply(H,arguments);}return F[J];};};})();(function(){B.Object=function(H){var G=function(){};G.prototype=H;return new G();};var E=B.Object,D=undefined,C=function(J,I){var H=(I===2),F=(H)?0:[],G;for(G in J){if(H){F++;}else{if(J.hasOwnProperty(G)){F.push((I)?J[G]:G);}}}return F;};E.keys=function(F){return C(F);};E.values=function(F){return C(F,1);};E.size=function(F){return C(F,2);};E.hasKey=function(G,F){return(F in G);};E.hasValue=function(G,F){return(B.Array.indexOf(E.values(G),F)>-1);};E.owns=function(G,F){return(G.hasOwnProperty(F));};E.each=function(J,I,K,H){var G=K||B,F;for(F in J){if(H||J.hasOwnProperty(F)){I.call(G,J[F],F,J);}}return B;};E.getValue=function(J,I){var H=B.Array(I),F=H.length,G;for(G=0;J!==D&&G<F;G=G+1){J=J[H[G]];}return J;};E.setValue=function(L,J,K){var I=B.Array(J),H=I.length-1,F,G=L;if(H>=0){for(F=0;G!==D&&F<H;F=F+1){G=G[I[F]];}if(G!==D){G[I[F]]=K;}else{return D;}}return L;};})();B.UA=function(){var F=function(J){var K=0;return parseFloat(J.replace(/\./g,function(){return(K++==1)?"":".";}));},I=navigator,H={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0,caja:I.cajaVersion,secure:false,os:null},E=I&&I.userAgent,G=B.config.win.location,D=G&&G.href,C;H.secure=D&&(D.toLowerCase().indexOf("https")===0);if(E){if((/windows|win32/i).test(E)){H.os="windows";}else{if((/macintosh/i).test(E)){H.os="macintosh";}}if((/KHTML/).test(E)){H.webkit=1;}C=E.match(/AppleWebKit\/([^\s]*)/);if(C&&C[1]){H.webkit=F(C[1]);if(/ Mobile\//.test(E)){H.mobile="Apple";}else{C=E.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);if(C){H.mobile=C[0];}}C=E.match(/AdobeAIR\/([^\s]*)/);if(C){H.air=C[0];}}if(!H.webkit){C=E.match(/Opera[\s\/]([^\s]*)/);if(C&&C[1]){H.opera=F(C[1]);C=E.match(/Opera Mini[^;]*/);if(C){H.mobile=C[0];}}else{C=E.match(/MSIE\s([^;]*)/);if(C&&C[1]){H.ie=F(C[1]);}else{C=E.match(/Gecko\/([^\s]*)/);if(C){H.gecko=1;C=E.match(/rv:([^\s\)]*)/);if(C&&C[1]){H.gecko=F(C[1]);}}}}}}return H;}();(function(){var F=["yui-base"],D,I=B.config,H=YUI.Env.mods,G,E;B.use.apply(B,F);if(I.core){D=I.core;}else{D=[];G=["get","loader","yui-log","yui-later"];for(E=0;E<G.length;E++){if(H[G[E]]){D.push(G[E]);}}}B.use.apply(B,D);})();},"3.0.0");YUI.add("get",function(A){(function(){var C=A.UA,B=A.Lang,E="text/javascript",F="text/css",D="stylesheet";A.Get=function(){var M={},K=0,U=false,W=function(a,X,b){var Y=b||A.config.win,c=Y.document,e=c.createElement(a),Z;for(Z in X){if(X[Z]&&X.hasOwnProperty(Z)){e.setAttribute(Z,X[Z]);}}return e;},T=function(Y,Z,X){var a={id:A.guid(),type:F,rel:D,href:Y};if(X){A.mix(a,X);}return W("link",a,Z);},S=function(Y,Z,X){var a={id:A.guid(),type:E,src:Y};if(X){A.mix(a,X);}return W("script",a,Z);},N=function(c){var X=M[c],Y,a,g,e,j,b,Z,f;if(X){Y=X.nodes;a=Y.length;g=X.win.document;e=g.getElementsByTagName("head")[0];if(X.insertBefore){j=L(X.insertBefore,c);if(j){e=j.parentNode;}}for(b=0;b<a;b=b+1){Z=Y[b];if(Z.clearAttributes){Z.clearAttributes();}else{for(f in Z){delete Z[f];}}e.removeChild(Z);}}X.nodes=[];},P=function(Y,Z,X){return{tId:Y.tId,win:Y.win,data:Y.data,nodes:Y.nodes,msg:Z,statusText:X,purge:function(){N(this.tId);}};},O=function(b,a,X){var Y=M[b],Z;if(Y&&Y.onEnd){Z=Y.context||Y;Y.onEnd.call(Z,P(Y,a,X));}},V=function(a,Z){var X=M[a],Y;if(X.timer){clearTimeout(X.timer);}if(X.onFailure){Y=X.context||X;X.onFailure.call(Y,P(X,Z));}O(a,Z,"failure");},L=function(X,a){var Y=M[a],Z=(B.isString(X))?Y.win.document.getElementById(X):X;if(!Z){V(a,"target node not found: "+X);}return Z;},I=function(a){var X=M[a],Z,Y;if(X.timer){clearTimeout(X.timer);}X.finished=true;if(X.aborted){Z="transaction "+a+" was aborted";V(a,Z);return;}if(X.onSuccess){Y=X.context||X;X.onSuccess.call(Y,P(X));}O(a,Z,"OK");},Q=function(Z){var X=M[Z],Y;if(X.onTimeout){Y=X.context||X;X.onTimeout.call(Y,P(X));
}O(Z,"timeout","timeout");},H=function(Z,c){var Y=M[Z],b,g,f,e,a,X,i;if(Y.timer){clearTimeout(Y.timer);}if(Y.aborted){b="transaction "+Z+" was aborted";V(Z,b);return;}if(c){Y.url.shift();if(Y.varName){Y.varName.shift();}}else{Y.url=(B.isString(Y.url))?[Y.url]:Y.url;if(Y.varName){Y.varName=(B.isString(Y.varName))?[Y.varName]:Y.varName;}}g=Y.win;f=g.document;e=f.getElementsByTagName("head")[0];if(Y.url.length===0){I(Z);return;}X=Y.url[0];if(!X){Y.url.shift();return H(Z);}if(Y.timeout){Y.timer=setTimeout(function(){Q(Z);},Y.timeout);}if(Y.type==="script"){a=S(X,g,Y.attributes);}else{a=T(X,g,Y.attributes);}J(Y.type,a,Z,X,g,Y.url.length);Y.nodes.push(a);if(Y.insertBefore){i=L(Y.insertBefore,Z);if(i){i.parentNode.insertBefore(a,i);}}else{e.appendChild(a);}if((C.webkit||C.gecko)&&Y.type==="css"){H(Z,X);}},G=function(){if(U){return;}U=true;var X,Y;for(X in M){if(M.hasOwnProperty(X)){Y=M[X];if(Y.autopurge&&Y.finished){N(Y.tId);delete M[X];}}}U=false;},R=function(Y,X,Z){Z=Z||{};var c="q"+(K++),a,b=Z.purgethreshold||A.Get.PURGE_THRESH;if(K%b===0){G();}M[c]=A.merge(Z,{tId:c,type:Y,url:X,finished:false,nodes:[]});a=M[c];a.win=a.win||A.config.win;a.context=a.context||a;a.autopurge=("autopurge" in a)?a.autopurge:(Y==="script")?true:false;if(Z.charset){a.attributes=a.attributes||{};a.attributes.charset=Z.charset;}setTimeout(function(){H(c);},0);return{tId:c};},J=function(Z,e,d,Y,c,b,X){var a=X||H;if(C.ie){e.onreadystatechange=function(){var f=this.readyState;if("loaded"===f||"complete"===f){e.onreadystatechange=null;a(d,Y);}};}else{if(C.webkit){if(Z==="script"){e.addEventListener("load",function(){a(d,Y);});}}else{e.onload=function(){a(d,Y);};e.onerror=function(f){V(d,f+": "+Y);};}}};return{PURGE_THRESH:20,_finalize:function(X){setTimeout(function(){I(X);},0);},abort:function(Y){var Z=(B.isString(Y))?Y:Y.tId,X=M[Z];if(X){X.aborted=true;}},script:function(X,Y){return R("script",X,Y);},css:function(X,Y){return R("css",X,Y);}};}();})();},"3.0.0");YUI.add("yui-log",function(A){(function(){var D=A,F="yui:log",B="undefined",C={debug:1,info:1,warn:1,error:1},E;D.log=function(I,Q,G,O){var H=D,P=H.config,K=false,N,L,J,M;if(P.debug){if(G){N=P.logExclude;L=P.logInclude;if(L&&!(G in L)){K=1;}else{if(N&&(G in N)){K=1;}}}if(!K){if(P.useBrowserConsole){J=(G)?G+": "+I:I;if(typeof console!=B&&console.log){M=(Q&&console[Q]&&(Q in C))?Q:"log";console[M](J);}else{if(typeof opera!=B){opera.postError(J);}}}if(H.fire&&!O){if(!E){H.publish(F,{broadcast:2,emitFacade:1});E=1;}H.fire(F,{msg:I,cat:Q,src:G});}}}return H;};D.message=function(){return D.log.apply(D,arguments);};})();},"3.0.0",{requires:["yui-base"]});YUI.add("yui-later",function(A){(function(){var B=A.Lang,C=function(K,E,L,G,H){K=K||0;E=E||{};var F=L,J=A.Array(G),I,D;if(B.isString(L)){F=E[L];}if(!F){}I=function(){F.apply(E,J);};D=(H)?setInterval(I,K):setTimeout(I,K);return{id:D,interval:H,cancel:function(){if(this.interval){clearInterval(D);}else{clearTimeout(D);}}};};A.later=C;B.later=C;})();},"3.0.0",{requires:["yui-base"]});YUI.add("yui",function(A){},"3.0.0",{use:["yui-base","get","yui-log","yui-later"]});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("oop",function(F){var E=F.Lang,D=F.Array,C=Object.prototype,B="_~yuim~_";F.augment=function(A,T,I,R,N){var L=T.prototype,P=null,S=T,O=(N)?F.Array(N):[],H=A.prototype,M=H||A,Q=false,G,J,K;if(H&&S){G={};J={};P={};F.each(L,function(V,U){J[U]=function(){for(K in G){if(G.hasOwnProperty(K)&&(this[K]===J[K])){this[K]=G[K];}}S.apply(this,O);return G[U].apply(this,arguments);};if((!R||(U in R))&&(I||!(U in this))){if(E.isFunction(V)){G[U]=V;this[U]=J[U];}else{this[U]=V;}}},P,true);}else{Q=true;}F.mix(M,P||L,I,R);if(Q){T.apply(M,O);}return A;};F.aggregate=function(H,G,A,I){return F.mix(H,G,A,I,0,true);};F.extend=function(I,H,A,K){if(!H||!I){F.error("extend failed, verify dependencies");}var J=H.prototype,G=F.Object(J);I.prototype=G;G.constructor=I;I.superclass=J;if(H!=Object&&J.constructor==C.constructor){J.constructor=H;}if(A){F.mix(G,A,true);}if(K){F.mix(I,K,true);}return I;};F.each=function(H,G,I,A){if(H.each&&H.item){return H.each.call(H,G,I);}else{switch(D.test(H)){case 1:return D.each(H,G,I);case 2:return D.each(F.Array(H,0,true),G,I);default:return F.Object.each(H,G,I,A);}}};F.clone=function(I,J,M,N,H,L){if(!E.isObject(I)){return I;}var K,G=L||{},A;switch(E.type(I)){case"date":return new Date(I);case"regexp":return new RegExp(I.source);case"function":K=F.bind(I,H);break;case"array":K=[];break;default:if(I[B]){return G[I[B]];}A=F.guid();K=(J)?{}:F.Object(I);I[B]=A;G[A]=I;}if(!I.addEventListener&&!I.attachEvent){F.each(I,function(P,O){if(!M||(M.call(N||this,P,O,this,I)!==false)){if(O!==B){this[O]=F.clone(P,J,M,N,H||I,G);}}},K);}if(!L){F.each(G,function(P,O){delete P[B];});G=null;}return K;};F.bind=function(A,H){var G=arguments.length>2?F.Array(arguments,2,true):null;return function(){var J=E.isString(A)?H[A]:A,I=(G)?G.concat(F.Array(arguments,0,true)):arguments;return J.apply(H||J,I);};};F.rbind=function(A,H){var G=arguments.length>2?F.Array(arguments,2,true):null;return function(){var J=E.isString(A)?H[A]:A,I=(G)?F.Array(arguments,0,true).concat(G):arguments;return J.apply(H||J,I);};};},"3.0.0");/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("event-custom-base",function(E){E.Env.evt={handles:{},plugins:{}};(function(){var F=0,G=1;E.Do={objs:{},before:function(I,K,L,M){var J=I,H;if(M){H=[I,M].concat(E.Array(arguments,4,true));J=E.rbind.apply(E,H);}return this._inject(F,J,K,L);},after:function(I,K,L,M){var J=I,H;if(M){H=[I,M].concat(E.Array(arguments,4,true));J=E.rbind.apply(E,H);}return this._inject(G,J,K,L);},_inject:function(H,J,K,M){var N=E.stamp(K),L,I;if(!this.objs[N]){this.objs[N]={};}L=this.objs[N];if(!L[M]){L[M]=new E.Do.Method(K,M);K[M]=function(){return L[M].exec.apply(L[M],arguments);};}I=N+E.stamp(J)+M;L[M].register(I,J,H);return new E.EventHandle(L[M],I);},detach:function(H){if(H.detach){H.detach();}},_unload:function(I,H){}};E.Do.Method=function(H,I){this.obj=H;this.methodName=I;this.method=H[I];this.before={};this.after={};};E.Do.Method.prototype.register=function(I,J,H){if(H){this.after[I]=J;}else{this.before[I]=J;}};E.Do.Method.prototype._delete=function(H){delete this.before[H];delete this.after[H];};E.Do.Method.prototype.exec=function(){var J=E.Array(arguments,0,true),K,I,N,L=this.before,H=this.after,M=false;for(K in L){if(L.hasOwnProperty(K)){I=L[K].apply(this.obj,J);if(I){switch(I.constructor){case E.Do.Halt:return I.retVal;case E.Do.AlterArgs:J=I.newArgs;break;case E.Do.Prevent:M=true;break;default:}}}}if(!M){I=this.method.apply(this.obj,J);}for(K in H){if(H.hasOwnProperty(K)){N=H[K].apply(this.obj,J);if(N&&N.constructor==E.Do.Halt){return N.retVal;}else{if(N&&N.constructor==E.Do.AlterReturn){I=N.newRetVal;}}}}return I;};E.Do.AlterArgs=function(I,H){this.msg=I;this.newArgs=H;};E.Do.AlterReturn=function(I,H){this.msg=I;this.newRetVal=H;};E.Do.Halt=function(I,H){this.msg=I;this.retVal=H;};E.Do.Prevent=function(H){this.msg=H;};E.Do.Error=E.Do.Halt;})();var D="after",B=["broadcast","bubbles","context","contextFn","currentTarget","defaultFn","details","emitFacade","fireOnce","host","preventable","preventedFn","queuable","silent","stoppedFn","target","type"],C=9,A="yui:log";E.EventHandle=function(F,G){this.evt=F;this.sub=G;};E.EventHandle.prototype={detach:function(){var F=this.evt,G;if(F){if(E.Lang.isArray(F)){for(G=0;G<F.length;G++){F[G].detach();}}else{F._delete(this.sub);}}}};E.CustomEvent=function(F,G){G=G||{};this.id=E.stamp(this);this.type=F;this.context=E;this.logSystem=(F==A);this.silent=this.logSystem;this.subscribers={};this.afters={};this.preventable=true;this.bubbles=true;this.signature=C;this.applyConfig(G,true);};E.CustomEvent.prototype={applyConfig:function(G,F){if(G){E.mix(this,G,F,B);}},_on:function(J,H,G,F){if(!J){this.log("Invalid callback for CE: "+this.type);}var I=new E.Subscriber(J,H,G,F);if(this.fireOnce&&this.fired){E.later(0,this,E.bind(this._notify,this,I,this.firedWith));}if(F==D){this.afters[I.id]=I;this.hasAfters=true;}else{this.subscribers[I.id]=I;this.hasSubscribers=true;}return new E.EventHandle(this,I);},subscribe:function(H,G){var F=(arguments.length>2)?E.Array(arguments,2,true):null;return this._on(H,G,F,true);},on:function(H,G){var F=(arguments.length>2)?E.Array(arguments,2,true):null;return this._on(H,G,F,true);},after:function(H,G){var F=(arguments.length>2)?E.Array(arguments,2,true):null;return this._on(H,G,F,D);},detach:function(J,H){if(J&&J.detach){return J.detach();}var K=0,G=this.subscribers,F,I;for(F in G){if(G.hasOwnProperty(F)){I=G[F];if(I&&(!J||J===I.fn)){this._delete(I);K++;}}}return K;},unsubscribe:function(){return this.detach.apply(this,arguments);},_notify:function(I,H,F){this.log(this.type+"->"+"sub: "+I.id);var G;G=I.notify(H,this);if(false===G||this.stopped>1){this.log(this.type+" cancelled by subscriber");return false;}return true;},log:function(G,F){if(!this.silent){}},fire:function(){if(this.fireOnce&&this.fired){this.log("fireOnce event: "+this.type+" already fired");return true;}else{var F=E.Array(arguments,0,true);this.fired=true;this.firedWith=F;if(this.emitFacade){return this.fireComplex(F);}else{return this.fireSimple(F);}}},fireSimple:function(F){if(this.hasSubscribers||this.hasAfters){this._procSubs(E.merge(this.subscribers,this.afters),F);}this._broadcast(F);return this.stopped?false:true;},fireComplex:function(F){F[0]=F[0]||{};return this.fireSimple(F);},_procSubs:function(I,G,F){var J,H;for(H in I){if(I.hasOwnProperty(H)){J=I[H];if(J&&J.fn){if(false===this._notify(J,G,F)){this.stopped=2;}if(this.stopped==2){return false;}}}}return true;},_broadcast:function(G){if(!this.stopped&&this.broadcast){var F=E.Array(G);F.unshift(this.type);if(this.host!==E){E.fire.apply(E,F);}if(this.broadcast==2){E.Global.fire.apply(E.Global,F);}}},unsubscribeAll:function(){return this.detachAll.apply(this,arguments);},detachAll:function(){return this.detach();},_delete:function(F){if(F){delete F.fn;delete F.context;delete this.subscribers[F.id];delete this.afters[F.id];}}};E.Subscriber=function(H,G,F){this.fn=H;this.context=G;this.id=E.stamp(this);this.args=F;this.events=null;};E.Subscriber.prototype={_notify:function(J,H,I){var F=this.args,G;switch(I.signature){case 0:G=this.fn.call(J,I.type,H,J);break;case 1:G=this.fn.call(J,H[0]||null,J);break;default:if(F||H){H=H||[];F=(F)?H.concat(F):H;G=this.fn.apply(J,F);}else{G=this.fn.call(J);}}return G;},notify:function(G,I){var J=this.context,F=true;if(!J){J=(I.contextFn)?I.contextFn():I.context;}if(E.config.throwFail){F=this._notify(J,G,I);}else{try{F=this._notify(J,G,I);}catch(H){E.error(this+" failed: "+H.message,H);}}return F;},contains:function(G,F){if(F){return((this.fn==G)&&this.context==F);}else{return(this.fn==G);}}};(function(){var F=E.Lang,H=":",I="|",J="~AFTER~",K=E.cached(function(L,N){if(!N||!F.isString(L)||L.indexOf(H)>-1){return L;}return N+H+L;}),G=E.cached(function(O,Q){var N=O,P,R,L;if(!F.isString(N)){return N;}L=N.indexOf(J);if(L>-1){R=true;N=N.substr(J.length);}L=N.indexOf(I);if(L>-1){P=N.substr(0,(L));N=N.substr(L+1);if(N=="*"){N=null;}}return[P,(Q)?K(N,Q):N,R,N];}),M=function(L){var N=(F.isObject(L))?L:{};this._yuievt=this._yuievt||{id:E.guid(),events:{},targets:{},config:N,chain:("chain" in N)?N.chain:E.config.chain,defaults:{context:N.context||this,host:this,emitFacade:N.emitFacade,fireOnce:N.fireOnce,queuable:N.queuable,broadcast:N.broadcast,bubbles:("bubbles" in N)?N.bubbles:true}};
};M.prototype={on:function(Q,U,O,V){var Z=G(Q,this._yuievt.config.prefix),a,b,N,g,X,W,d,R=E.Env.evt.handles,P,L,S,e=E.Node,Y,T;if(F.isObject(Q)){if(F.isFunction(Q)){return E.Do.before.apply(E.Do,arguments);}a=U;b=O;N=E.Array(arguments,0,true);g={};P=Q._after;delete Q._after;E.each(Q,function(f,c){if(f){a=f.fn||((E.Lang.isFunction(f))?f:a);b=f.context||b;}N[0]=(P)?J+c:c;N[1]=a;N[2]=b;g[c]=this.on.apply(this,N);},this);return(this._yuievt.chain)?this:new E.EventHandle(g);}W=Z[0];P=Z[2];S=Z[3];if(e&&(this instanceof e)&&(S in e.DOM_EVENTS)){N=E.Array(arguments,0,true);N.splice(2,0,e.getDOMNode(this));return E.on.apply(E,N);}Q=Z[1];if(this instanceof YUI){L=E.Env.evt.plugins[Q];N=E.Array(arguments,0,true);N[0]=S;if(e){Y=N[2];if(Y instanceof E.NodeList){Y=E.NodeList.getDOMNodes(Y);}else{if(Y instanceof e){Y=e.getDOMNode(Y);}}T=(S in e.DOM_EVENTS);if(T){N[2]=Y;}}if(L){d=L.on.apply(E,N);}else{if((!Q)||T){d=E.Event._attach(N);}}}if(!d){X=this._yuievt.events[Q]||this.publish(Q);d=X._on(U,O,(arguments.length>3)?E.Array(arguments,3,true):null,(P)?"after":true);}if(W){R[W]=R[W]||{};R[W][Q]=R[W][Q]||[];R[W][Q].push(d);}return(this._yuievt.chain)?this:d;},subscribe:function(){return this.on.apply(this,arguments);},detach:function(P,U,O){var T=this._yuievt.events,Z,d,c=E.Node,Y=(this instanceof c);if(!P&&(this!==E)){for(Z in T){if(T.hasOwnProperty(Z)){d=T[Z].detach(U,O);}}if(Y){E.Event.purgeElement(c.getDOMNode(this));}return d;}var X=G(P,this._yuievt.config.prefix),V=F.isArray(X)?X[0]:null,R=(X)?X[3]:null,b,L,Q=E.Env.evt.handles,S,N,W,a=function(g,f){var e=g[f];if(e){while(e.length){b=e.pop();b.detach();}}};if(V){S=Q[V];P=X[1];if(S){if(P){a(S,P);}else{for(Z in S){if(S.hasOwnProperty(Z)){a(S,Z);}}}return(this._yuievt.chain)?this:true;}}else{if(F.isObject(P)&&P.detach){d=P.detach();return(this._yuievt.chain)?this:d;}else{if(Y&&((!R)||(R in c.DOM_EVENTS))){N=E.Array(arguments,0,true);N[2]=c.getDOMNode(this);return E.detach.apply(E,N);}}}L=E.Env.evt.plugins[R];if(this instanceof YUI){N=E.Array(arguments,0,true);if(L&&L.detach){return L.detach.apply(E,N);}else{if(!P||(!L&&c&&(P in c.DOM_EVENTS))){N[0]=P;return E.Event.detach.apply(E.Event,N);}}}W=T[P];if(W){d=W.detach(U,O);}return(this._yuievt.chain)?this:d;},unsubscribe:function(){return this.detach.apply(this,arguments);},detachAll:function(L){return this.detach(L);},unsubscribeAll:function(){return this.detachAll.apply(this,arguments);},publish:function(O,P){var N,R,L,Q=this._yuievt.config.prefix;O=(Q)?K(O,Q):O;if(F.isObject(O)){L={};E.each(O,function(T,S){L[S]=this.publish(S,T||P);},this);return L;}N=this._yuievt.events;R=N[O];if(R){if(P){R.applyConfig(P,true);}}else{R=new E.CustomEvent(O,(P)?E.mix(P,this._yuievt.defaults):this._yuievt.defaults);N[O]=R;}return N[O];},addTarget:function(L){this._yuievt.targets[E.stamp(L)]=L;this._yuievt.hasTargets=true;},removeTarget:function(L){delete this._yuievt.targets[E.stamp(L)];},fire:function(P){var S=F.isString(P),O=(S)?P:(P&&P.type),R,L,N,Q=this._yuievt.config.prefix;O=(Q)?K(O,Q):O;R=this.getEvent(O,true);if(!R){if(this._yuievt.hasTargets){L=(S)?arguments:E.Array(arguments,0,true).unshift(O);return this.bubble(null,L,this);}N=true;}else{L=E.Array(arguments,(S)?1:0,true);N=R.fire.apply(R,L);R.target=null;}return(this._yuievt.chain)?this:N;},getEvent:function(N,L){var P,O;if(!L){P=this._yuievt.config.prefix;N=(P)?K(N,P):N;}O=this._yuievt.events;return(O&&N in O)?O[N]:null;},after:function(O,N){var L=E.Array(arguments,0,true);switch(F.type(O)){case"function":return E.Do.after.apply(E.Do,arguments);case"object":L[0]._after=true;break;default:L[0]=J+O;}return this.on.apply(this,L);},before:function(){return this.on.apply(this,arguments);}};E.EventTarget=M;E.mix(E,M.prototype,false,false,{bubbles:false});M.call(E);YUI.Env.globalEvents=YUI.Env.globalEvents||new M();E.Global=YUI.Env.globalEvents;})();},"3.0.0",{requires:["oop"]});YUI.add("event-custom-complex",function(A){(function(){var C,D,B=A.CustomEvent.prototype;A.EventFacade=function(F,E){F=F||{};this.details=F.details;this.type=F.type;this.target=F.target;this.currentTarget=E;this.relatedTarget=F.relatedTarget;this.stopPropagation=function(){F.stopPropagation();};this.stopImmediatePropagation=function(){F.stopImmediatePropagation();};this.preventDefault=function(){F.preventDefault();};this.halt=function(G){F.halt(G);};};B.fireComplex=function(H){var L=A.Env._eventstack,F,J,E,K,G,I;if(L){if(this.queuable&&this.type!=L.next.type){this.log("queue "+this.type);L.queue.push([this,H]);return true;}}else{A.Env._eventstack={id:this.id,next:this,silent:this.silent,stopped:0,prevented:0,queue:[]};L=A.Env._eventstack;}this.stopped=0;this.prevented=0;this.target=this.target||this.host;I=new A.EventTarget({fireOnce:true,context:this.host});this.events=I;if(this.preventedFn){I.on("prevented",this.preventedFn);}if(this.stoppedFn){I.on("stopped",this.stoppedFn);}this.currentTarget=this.host||this.currentTarget;this.details=H.slice();this.log("Firing "+this.type);this._facade=null;F=this._getFacade(H);if(A.Lang.isObject(H[0])){H[0]=F;}else{H.unshift(F);}if(this.hasSubscribers){this._procSubs(A.merge(this.subscribers),H,F);}if(this.bubbles&&this.host&&this.host.bubble&&!this.stopped){L.stopped=0;L.prevented=0;G=this.host.bubble(this);this.stopped=Math.max(this.stopped,L.stopped);this.prevented=Math.max(this.prevented,L.prevented);}if(this.defaultFn&&!this.prevented){this.defaultFn.apply(this.host||this,H);}this._broadcast(H);if(this.hasAfters&&!this.prevented&&this.stopped<2){this._procSubs(A.merge(this.afters),H,F);}if(L.id===this.id){E=L.queue;while(E.length){J=E.pop();K=J[0];L.stopped=0;L.prevented=0;L.next=K;K.fire.apply(K,J[1]);}A.Env._eventstack=null;}return this.stopped?false:true;};B._getFacade=function(){var E=this._facade,H,G,F=this.details;if(!E){E=new A.EventFacade(this,this.currentTarget);}H=F&&F[0];if(A.Lang.isObject(H,true)){G={};A.mix(G,E,true,D);A.mix(E,H,true);A.mix(E,G,true,D);}E.details=this.details;E.target=this.target;E.currentTarget=this.currentTarget;E.stopped=0;
E.prevented=0;this._facade=E;return this._facade;};B.stopPropagation=function(){this.stopped=1;A.Env._eventstack.stopped=1;this.events.fire("stopped",this);};B.stopImmediatePropagation=function(){this.stopped=2;A.Env._eventstack.stopped=2;this.events.fire("stopped",this);};B.preventDefault=function(){if(this.preventable){this.prevented=1;A.Env._eventstack.prevented=1;this.events.fire("prevented",this);}};B.halt=function(E){if(E){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();};A.EventTarget.prototype.bubble=function(M,K,I){var G=this._yuievt.targets,J=true,N,L,E,F,H;if(!M||((!M.stopped)&&G)){for(F in G){if(G.hasOwnProperty(F)){N=G[F];L=M&&M.type;E=N.getEvent(L,true);if(!E){if(N._yuievt.hasTargets){N.bubble.call(N,M,K,I);}}else{E.target=I||(M&&M.target)||this;E.currentTarget=N;H=E.broadcast;E.broadcast=false;J=J&&E.fire.apply(E,K||M.details);E.broadcast=H;if(E.stopped){break;}}}}}return J;};C=new A.EventFacade();D=A.Object.keys(C);})();},"3.0.0",{requires:["event-custom-base"]});YUI.add("event-custom",function(A){},"3.0.0",{use:["event-custom-base","event-custom-complex"]});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("dom-base",function(D){(function(H){var R="nodeType",F="ownerDocument",E="defaultView",J="parentWindow",M="tagName",O="parentNode",Q="firstChild",L="previousSibling",P="nextSibling",K="contains",G="compareDocumentPosition",N=document.documentElement,I=/<([a-z]+)/i;H.DOM={byId:function(T,S){S=S||H.config.doc;return S.getElementById(T);},children:function(U,S){var T=[];if(U){S=S||"*";T=H.Selector.query("> "+S,U);}return T;},firstByTag:function(S,T){var U;T=T||H.config.doc;if(S&&T.getElementsByTagName){U=T.getElementsByTagName(S)[0];}return U||null;},getText:(N.textContent!==undefined)?function(T){var S="";if(T){S=T.textContent;}return S||"";}:function(T){var S="";if(T){S=T.innerText;}return S||"";},setText:(N.textContent!==undefined)?function(S,T){if(S){S.textContent=T;}}:function(S,T){if(S){S.innerText=T;}},previous:function(S,U,T){return H.DOM.elementByAxis(S,L,U,T);},next:function(S,U,T){return H.DOM.elementByAxis(S,P,U,T);},ancestor:function(S,U,T){return H.DOM.elementByAxis(S,O,U,T);},elementByAxis:function(S,V,U,T){while(S&&(S=S[V])){if((T||S[M])&&(!U||U(S))){return S;}}return null;},contains:function(T,U){var S=false;if(!U||!T||!U[R]||!T[R]){S=false;}else{if(T[K]){if(H.UA.opera||U[R]===1){S=T[K](U);}else{S=H.DOM._bruteContains(T,U);}}else{if(T[G]){if(T===U||!!(T[G](U)&16)){S=true;}}}}return S;},inDoc:function(S,T){T=T||S[F];var U=S.id;if(!U){U=S.id=H.guid();}return !!(T.getElementById(U));},create:function(X,Z){if(typeof X==="string"){X=H.Lang.trim(X);}if(!Z&&H.DOM._cloneCache[X]){return H.DOM._cloneCache[X].cloneNode(true);}Z=Z||H.config.doc;var T=I.exec(X),W=H.DOM._create,Y=H.DOM.creators,V=null,S,U;if(T&&Y[T[1]]){if(typeof Y[T[1]]==="function"){W=Y[T[1]];}else{S=Y[T[1]];}}U=W(X,Z,S).childNodes;if(U.length===1){V=U[0].parentNode.removeChild(U[0]);}else{V=H.DOM._nl2frag(U,Z);}if(V){H.DOM._cloneCache[X]=V.cloneNode(true);}return V;},_nl2frag:function(T,W){var U=null,V,S;if(T&&(T.push||T.item)&&T[0]){W=W||T[0].ownerDocument;U=W.createDocumentFragment();if(T.item){T=H.Array(T,0,true);}for(V=0,S=T.length;V<S;V++){U.appendChild(T[V]);}}return U;},CUSTOM_ATTRIBUTES:(!N.hasAttribute)?{"for":"htmlFor","class":"className"}:{"htmlFor":"for","className":"class"},setAttribute:function(U,S,V,T){if(U&&U.setAttribute){S=H.DOM.CUSTOM_ATTRIBUTES[S]||S;U.setAttribute(S,V,T);}},getAttribute:function(V,S,U){U=(U!==undefined)?U:2;var T="";if(V&&V.getAttribute){S=H.DOM.CUSTOM_ATTRIBUTES[S]||S;T=V.getAttribute(S,U);if(T===null){T="";}}return T;},isWindow:function(S){return S.alert&&S.document;},_fragClones:{div:document.createElement("div")},_create:function(T,U,S){S=S||"div";var V=H.DOM._fragClones[S];if(V){V=V.cloneNode(false);}else{V=H.DOM._fragClones[S]=U.createElement(S);}V.innerHTML=T;return V;},_removeChildNodes:function(S){while(S.firstChild){S.removeChild(S.firstChild);}},_cloneCache:{},addHTML:function(W,V,T){if(typeof V==="string"){V=H.Lang.trim(V);}var U=H.DOM._cloneCache[V],S=W.parentNode;if(U){U=U.cloneNode(true);}else{if(V.nodeType){U=V;}else{U=H.DOM.create(V);}}if(T){if(T.nodeType){T.parentNode.insertBefore(U,T);}else{switch(T){case"replace":while(W.firstChild){W.removeChild(W.firstChild);}W.appendChild(U);break;case"before":S.insertBefore(U,W);break;case"after":if(W.nextSibling){S.insertBefore(U,W.nextSibling);}else{S.appendChild(U);}break;default:W.appendChild(U);}}}else{W.appendChild(U);}return U;},VALUE_SETTERS:{},VALUE_GETTERS:{},getValue:function(U){var T="",S;if(U&&U[M]){S=H.DOM.VALUE_GETTERS[U[M].toLowerCase()];if(S){T=S(U);}else{T=U.value;}}return(typeof T==="string")?T:"";},setValue:function(S,T){var U;if(S&&S[M]){U=H.DOM.VALUE_SETTERS[S[M].toLowerCase()];if(U){U(S,T);}else{S.value=T;}}},_bruteContains:function(S,T){while(T){if(S===T){return true;}T=T.parentNode;}return false;},_getRegExp:function(T,S){S=S||"";H.DOM._regexCache=H.DOM._regexCache||{};if(!H.DOM._regexCache[T+S]){H.DOM._regexCache[T+S]=new RegExp(T,S);}return H.DOM._regexCache[T+S];},_getDoc:function(S){S=S||{};return(S[R]===9)?S:S[F]||S.document||H.config.doc;},_getWin:function(S){var T=H.DOM._getDoc(S);return T[E]||T[J]||H.config.win;},_batch:function(V,Z,Y,U,T,X){Z=(typeof name==="string")?H.DOM[Z]:Z;var S,W=[];if(Z&&V){H.each(V,function(a){if((S=Z.call(H.DOM,a,Y,U,T,X))!==undefined){W[W.length]=S;}});}return W.length?W:V;},_testElement:function(T,S,U){S=(S&&S!=="*")?S.toUpperCase():null;return(T&&T[M]&&(!S||T[M].toUpperCase()===S)&&(!U||U(T)));},creators:{},_IESimpleCreate:function(S,T){T=T||H.config.doc;return T.createElement(S);}};(function(W){var X=W.DOM.creators,S=W.DOM.create,V=/(?:\/(?:thead|tfoot|tbody|caption|col|colgroup)>)+\s*<tbody/,U="<table>",T="</table>";if(W.UA.ie){W.mix(X,{tbody:function(Z,a){var b=S(U+Z+T,a),Y=b.children.tags("tbody")[0];if(b.children.length>1&&Y&&!V.test(Z)){Y[O].removeChild(Y);}return b;},script:function(Y,Z){var a=Z.createElement("div");a.innerHTML="-"+Y;a.removeChild(a[Q]);return a;}},true);W.mix(W.DOM.VALUE_GETTERS,{button:function(Y){return(Y.attributes&&Y.attributes.value)?Y.attributes.value.value:"";}});W.mix(W.DOM.VALUE_SETTERS,{button:function(Z,a){var Y=Z.attributes.value;if(!Y){Y=Z[F].createAttribute("value");Z.setAttributeNode(Y);}Y.value=a;}});}if(W.UA.gecko||W.UA.ie){W.mix(X,{option:function(Y,Z){return S("<select>"+Y+"</select>",Z);},tr:function(Y,Z){return S("<tbody>"+Y+"</tbody>",Z);},td:function(Y,Z){return S("<tr>"+Y+"</tr>",Z);},tbody:function(Y,Z){return S(U+Y+T,Z);}});W.mix(X,{legend:"fieldset",th:X.td,thead:X.tbody,tfoot:X.tbody,caption:X.tbody,colgroup:X.tbody,col:X.tbody,optgroup:X.option});}W.mix(W.DOM.VALUE_GETTERS,{option:function(Z){var Y=Z.attributes;return(Y.value&&Y.value.specified)?Z.value:Z.text;},select:function(Z){var a=Z.value,Y=Z.options;if(Y&&a===""){if(Z.multiple){}else{a=W.DOM.getValue(Y[Z.selectedIndex],"value");}}return a;}});})(H);})(D);var B,A,C;D.mix(D.DOM,{hasClass:function(G,F){var E=D.DOM._getRegExp("(?:^|\\s+)"+F+"(?:\\s+|$)");return E.test(G.className);},addClass:function(F,E){if(!D.DOM.hasClass(F,E)){F.className=D.Lang.trim([F.className,E].join(" "));
}},removeClass:function(F,E){if(E&&A(F,E)){F.className=D.Lang.trim(F.className.replace(D.DOM._getRegExp("(?:^|\\s+)"+E+"(?:\\s+|$)")," "));if(A(F,E)){C(F,E);}}},replaceClass:function(F,E,G){B(F,G);C(F,E);},toggleClass:function(F,E){if(A(F,E)){C(F,E);}else{B(F,E);}}});A=D.DOM.hasClass;C=D.DOM.removeClass;B=D.DOM.addClass;},"3.0.0",{requires:["oop"]});YUI.add("dom-style",function(A){(function(E){var C="documentElement",B="defaultView",D="ownerDocument",L="style",N="float",F="cssFloat",G="styleFloat",J="transparent",H="getComputedStyle",M=E.config.doc,I=undefined,K=/color$/i;E.mix(E.DOM,{CUSTOM_STYLES:{},setStyle:function(R,O,S,Q){Q=Q||R.style;var P=E.DOM.CUSTOM_STYLES;if(Q){if(S===null){S="";}if(O in P){if(P[O].set){P[O].set(R,S,Q);return;}else{if(typeof P[O]==="string"){O=P[O];}}}Q[O]=S;}},getStyle:function(R,O){var Q=R[L],P=E.DOM.CUSTOM_STYLES,S="";if(Q){if(O in P){if(P[O].get){return P[O].get(R,O,Q);}else{if(typeof P[O]==="string"){O=P[O];}}}S=Q[O];if(S===""){S=E.DOM[H](R,O);}}return S;},setStyles:function(P,Q){var O=P.style;E.each(Q,function(R,S){E.DOM.setStyle(P,S,R,O);},E.DOM);},getComputedStyle:function(P,O){var R="",Q=P[D];if(P[L]){R=Q[B][H](P,null)[O];}return R;}});if(M[C][L][F]!==I){E.DOM.CUSTOM_STYLES[N]=F;}else{if(M[C][L][G]!==I){E.DOM.CUSTOM_STYLES[N]=G;}}if(E.UA.opera){E.DOM[H]=function(Q,P){var O=Q[D][B],R=O[H](Q,"")[P];if(K.test(P)){R=E.Color.toRGB(R);}return R;};}if(E.UA.webkit){E.DOM[H]=function(Q,P){var O=Q[D][B],R=O[H](Q,"")[P];if(R==="rgba(0, 0, 0, 0)"){R=J;}return R;};}})(A);(function(D){var B=parseInt,C=RegExp;D.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(E){if(!D.Color.re_RGB.test(E)){E=D.Color.toHex(E);}if(D.Color.re_hex.exec(E)){E="rgb("+[B(C.$1,16),B(C.$2,16),B(C.$3,16)].join(", ")+")";}return E;},toHex:function(F){F=D.Color.KEYWORDS[F]||F;if(D.Color.re_RGB.exec(F)){F=[Number(C.$1).toString(16),Number(C.$2).toString(16),Number(C.$3).toString(16)];for(var E=0;E<F.length;E++){if(F[E].length<2){F[E]=F[E].replace(D.Color.re_hex3,"$1$1");}}F="#"+F.join("");}if(F.length<6){F=F.replace(D.Color.re_hex3,"$1$1");}if(F!=="transparent"&&F.indexOf("#")<0){F="#"+F;}return F.toLowerCase();}};})(A);(function(D){var W="hasLayout",K="px",L="filter",B="filters",T="opacity",M="auto",G="borderWidth",J="borderTopWidth",Q="borderRightWidth",V="borderBottomWidth",H="borderLeftWidth",I="width",O="height",R="transparent",S="visible",C="getComputedStyle",Z=undefined,X=document.documentElement,P=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,E=function(Y){return Y.currentStyle||Y.style;},N={CUSTOM_STYLES:{},get:function(Y,b){var a="",c;if(Y){c=E(Y)[b];if(b===T&&D.DOM.CUSTOM_STYLES[T]){a=D.DOM.CUSTOM_STYLES[T].get(Y);}else{if(!c||(c.indexOf&&c.indexOf(K)>-1)){a=c;}else{if(D.DOM.IE.COMPUTED[b]){a=D.DOM.IE.COMPUTED[b](Y,b);}else{if(P.test(c)){a=N.getPixel(Y,b)+K;}else{a=c;}}}}}return a;},sizeOffsets:{width:["Left","Right"],height:["Top","Bottom"],top:["Top"],bottom:["Bottom"]},getOffset:function(b,g){var d=E(b)[g],Y=g.charAt(0).toUpperCase()+g.substr(1),f="offset"+Y,a="pixel"+Y,e=N.sizeOffsets[g],c="";if(d===M||d.indexOf("%")>-1){c=b["offset"+Y];if(e[0]){c-=N.getPixel(b,"padding"+e[0]);c-=N.getBorderWidth(b,"border"+e[0]+"Width",1);}if(e[1]){c-=N.getPixel(b,"padding"+e[1]);c-=N.getBorderWidth(b,"border"+e[1]+"Width",1);}}else{if(!b.style[a]&&!b.style[g]){b.style[g]=d;}c=b.style[a];}return c+K;},borderMap:{thin:"2px",medium:"4px",thick:"6px"},getBorderWidth:function(a,c,Y){var b=Y?"":K,d=a.currentStyle[c];if(d.indexOf(K)<0){if(N.borderMap[d]){d=N.borderMap[d];}else{}}return(Y)?parseFloat(d):d;},getPixel:function(b,Y){var d=null,a=E(b),e=a.right,c=a[Y];b.style.right=c;d=b.style.pixelRight;b.style.right=e;return d;},getMargin:function(b,Y){var c,a=E(b);if(a[Y]==M){c=0;}else{c=N.getPixel(b,Y);}return c+K;},getVisibility:function(a,Y){var b;while((b=a.currentStyle)&&b[Y]=="inherit"){a=a.parentNode;}return(b)?b[Y]:S;},getColor:function(a,Y){var b=E(a)[Y];if(!b||b===R){D.DOM.elementByAxis(a,"parentNode",null,function(c){b=E(c)[Y];if(b&&b!==R){a=c;return true;}});}return D.Color.toRGB(b);},getBorderColor:function(a,Y){var b=E(a),c=b[Y]||b.color;return D.Color.toRGB(D.Color.toHex(c));}},F={};try{if(X.style[T]===Z&&X[B]){D.DOM.CUSTOM_STYLES[T]={get:function(a){var c=100;try{c=a[B]["DXImageTransform.Microsoft.Alpha"][T];}catch(b){try{c=a[B]("alpha")[T];}catch(Y){}}return c/100;},set:function(a,d,Y){var c,b;if(d===""){b=E(a);c=(T in b)?b[T]:1;d=c;}if(typeof Y[L]=="string"){Y[L]="alpha("+T+"="+d*100+")";if(!a.currentStyle||!a.currentStyle[W]){Y.zoom=1;}}}};}}catch(U){}try{document.createElement("div").style.height="-1px";}catch(U){D.DOM.CUSTOM_STYLES.height={set:function(b,c,a){var Y=parseFloat(c);if(isNaN(Y)||Y>=0){a.height=c;}else{}}};D.DOM.CUSTOM_STYLES.width={set:function(b,c,a){var Y=parseFloat(c);if(isNaN(Y)||Y>=0){a.width=c;}else{}}};}F[I]=F[O]=N.getOffset;F.color=F.backgroundColor=N.getColor;F[G]=F[J]=F[Q]=F[V]=F[H]=N.getBorderWidth;F.marginTop=F.marginRight=F.marginBottom=F.marginLeft=N.getMargin;F.visibility=N.getVisibility;F.borderColor=F.borderTopColor=F.borderRightColor=F.borderBottomColor=F.borderLeftColor=N.getBorderColor;if(!D.config.win[C]){D.DOM[C]=N.get;}D.namespace("DOM.IE");D.DOM.IE.COMPUTED=F;D.DOM.IE.ComputedStyle=N;})(A);},"3.0.0",{requires:["dom-base"]});YUI.add("dom-screen",function(A){(function(F){var D="documentElement",O="compatMode",M="position",C="fixed",K="relative",G="left",H="top",I="BackCompat",N="medium",E="borderLeftWidth",B="borderTopWidth",P="getBoundingClientRect",J="getComputedStyle",L=/^t(?:able|d|h)$/i;F.mix(F.DOM,{winHeight:function(R){var Q=F.DOM._getWinSize(R).height;return Q;},winWidth:function(R){var Q=F.DOM._getWinSize(R).width;
return Q;},docHeight:function(R){var Q=F.DOM._getDocSize(R).height;return Math.max(Q,F.DOM._getWinSize(R).height);},docWidth:function(R){var Q=F.DOM._getDocSize(R).width;return Math.max(Q,F.DOM._getWinSize(R).width);},docScrollX:function(Q){var R=F.DOM._getDoc(Q);return Math.max(R[D].scrollLeft,R.body.scrollLeft);},docScrollY:function(Q){var R=F.DOM._getDoc(Q);return Math.max(R[D].scrollTop,R.body.scrollTop);},getXY:function(){if(document[D][P]){return function(T){var a=null,U,R,V,Y,X,Q,S,W,Z;if(T){if(F.DOM.inDoc(T)){U=F.DOM.docScrollX(T);R=F.DOM.docScrollY(T);V=T[P]();Z=F.DOM._getDoc(T);a=[V.left,V.top];if(F.UA.ie){Y=2;X=2;W=Z[O];Q=F.DOM[J](Z[D],E);S=F.DOM[J](Z[D],B);if(F.UA.ie===6){if(W!==I){Y=0;X=0;}}if((W==I)){if(Q!==N){Y=parseInt(Q,10);}if(S!==N){X=parseInt(S,10);}}a[0]-=Y;a[1]-=X;}if((R||U)){a[0]+=U;a[1]+=R;}}else{a=F.DOM._getOffset(T);}}return a;};}else{return function(R){var T=null,Q,V,S,U;if(R){if(F.DOM.inDoc(R)){T=[R.offsetLeft,R.offsetTop];Q=R;V=((F.UA.gecko||F.UA.webkit>519)?true:false);while((Q=Q.offsetParent)){T[0]+=Q.offsetLeft;T[1]+=Q.offsetTop;if(V){T=F.DOM._calcBorders(Q,T);}}if(F.DOM.getStyle(R,M)!=C){Q=R;while((Q=Q.parentNode)){S=Q.scrollTop;U=Q.scrollLeft;if(F.UA.gecko&&(F.DOM.getStyle(Q,"overflow")!=="visible")){T=F.DOM._calcBorders(Q,T);}if(S||U){T[0]-=U;T[1]-=S;}}T[0]+=F.DOM.docScrollX(R);T[1]+=F.DOM.docScrollY(R);}else{T[0]+=F.DOM.docScrollX(R);T[1]+=F.DOM.docScrollY(R);}}else{T=F.DOM._getOffset(R);}}return T;};}}(),_getOffset:function(Q){var S,R=null;if(Q){S=F.DOM.getStyle(Q,M);R=[parseInt(F.DOM[J](Q,G),10),parseInt(F.DOM[J](Q,H),10)];if(isNaN(R[0])){R[0]=parseInt(F.DOM.getStyle(Q,G),10);if(isNaN(R[0])){R[0]=(S===K)?0:Q.offsetLeft||0;}}if(isNaN(R[1])){R[1]=parseInt(F.DOM.getStyle(Q,H),10);if(isNaN(R[1])){R[1]=(S===K)?0:Q.offsetTop||0;}}}return R;},getX:function(Q){return F.DOM.getXY(Q)[0];},getY:function(Q){return F.DOM.getXY(Q)[1];},setXY:function(R,U,X){var S=F.DOM.setStyle,W,V,Q,T;if(R&&U){W=F.DOM.getStyle(R,M);V=F.DOM._getOffset(R);if(W=="static"){W=K;S(R,M,W);}T=F.DOM.getXY(R);if(U[0]!==null){S(R,G,U[0]-T[0]+V[0]+"px");}if(U[1]!==null){S(R,H,U[1]-T[1]+V[1]+"px");}if(!X){Q=F.DOM.getXY(R);if(Q[0]!==U[0]||Q[1]!==U[1]){F.DOM.setXY(R,U,true);}}}else{}},setX:function(R,Q){return F.DOM.setXY(R,[Q,null]);},setY:function(Q,R){return F.DOM.setXY(Q,[null,R]);},_calcBorders:function(S,T){var R=parseInt(F.DOM[J](S,B),10)||0,Q=parseInt(F.DOM[J](S,E),10)||0;if(F.UA.gecko){if(L.test(S.tagName)){R=0;Q=0;}}T[0]+=Q;T[1]+=R;return T;},_getWinSize:function(T){var V=F.DOM._getDoc(),U=V.defaultView||V.parentWindow,W=V[O],S=U.innerHeight,R=U.innerWidth,Q=V[D];if(W&&!F.UA.opera){if(W!="CSS1Compat"){Q=V.body;}S=Q.clientHeight;R=Q.clientWidth;}return{height:S,width:R};},_getDocSize:function(R){var S=F.DOM._getDoc(),Q=S[D];if(S[O]!="CSS1Compat"){Q=S.body;}return{height:Q.scrollHeight,width:Q.scrollWidth};}});})(A);(function(G){var D="top",C="right",H="bottom",B="left",F=function(L,K){var N=Math.max(L[D],K[D]),O=Math.min(L[C],K[C]),I=Math.min(L[H],K[H]),J=Math.max(L[B],K[B]),M={};M[D]=N;M[C]=O;M[H]=I;M[B]=J;return M;},E=G.DOM;G.mix(E,{region:function(J){var K=E.getXY(J),I=false;if(J&&K){I=E._getRegion(K[1],K[0]+J.offsetWidth,K[1]+J.offsetHeight,K[0]);}return I;},intersect:function(K,I,M){var J=M||E.region(K),L={},O=I,N;if(O.tagName){L=E.region(O);}else{if(G.Lang.isObject(I)){L=I;}else{return false;}}N=F(L,J);return{top:N[D],right:N[C],bottom:N[H],left:N[B],area:((N[H]-N[D])*(N[C]-N[B])),yoff:((N[H]-N[D])),xoff:(N[C]-N[B]),inRegion:E.inRegion(K,I,false,M)};},inRegion:function(L,I,J,N){var M={},K=N||E.region(L),P=I,O;if(P.tagName){M=E.region(P);}else{if(G.Lang.isObject(I)){M=I;}else{return false;}}if(J){return(K[B]>=M[B]&&K[C]<=M[C]&&K[D]>=M[D]&&K[H]<=M[H]);}else{O=F(M,K);if(O[H]>=O[D]&&O[C]>=O[B]){return true;}else{return false;}}},inViewportRegion:function(J,I,K){return E.inRegion(J,E.viewportRegion(J),I,K);},_getRegion:function(K,L,I,J){var M={};M[D]=M[1]=K;M[B]=M[0]=J;M[H]=I;M[C]=L;M.width=M[C]-M[B];M.height=M[H]-M[D];return M;},viewportRegion:function(J){J=J||G.config.doc.documentElement;var I=false,L,K;if(J){L=E.docScrollX(J);K=E.docScrollY(J);I=E._getRegion(K,E.winWidth(J)+L,K+E.winHeight(J),L);}return I;}});})(A);},"3.0.0",{requires:["dom-base","dom-style"]});YUI.add("selector-native",function(A){(function(G){G.namespace("Selector");var E="compareDocumentPosition",F="ownerDocument",D="yui-tmp-",C=0;var B={_foundCache:[],useNative:true,_compare:("sourceIndex" in document.documentElement)?function(K,J){var I=K.sourceIndex,H=J.sourceIndex;if(I===H){return 0;}else{if(I>H){return 1;}}return -1;}:(document.documentElement[E]?function(I,H){if(I[E](H)&4){return -1;}else{return 1;}}:function(L,K){var J,H,I;if(L&&K){J=L[F].createRange();J.setStart(L,0);H=K[F].createRange();H.setStart(K,0);I=J.compareBoundaryPoints(1,H);}return I;}),_sort:function(H){if(H){H=G.Array(H,0,true);if(H.sort){H.sort(B._compare);}}return H;},_deDupe:function(H){var I=[],J,K;for(J=0;(K=H[J++]);){if(!K._found){I[I.length]=K;K._found=true;}}for(J=0;(K=I[J++]);){K._found=null;K.removeAttribute("_found");}return I;},query:function(I,P,Q,H){P=P||G.config.doc;var M=[],J=(G.Selector.useNative&&document.querySelector&&!H),L=[[I,P]],N,R,K,O=(J)?G.Selector._nativeQuery:G.Selector._bruteQuery;if(I&&O){if(!H&&(!J||P.tagName)){L=B._splitQueries(I,P);}for(K=0;(N=L[K++]);){R=O(N[0],N[1],Q);if(!Q){R=G.Array(R,0,true);}if(R){M=M.concat(R);}}if(L.length>1){M=B._sort(B._deDupe(M));}}return(Q)?(M[0]||null):M;},_splitQueries:function(J,M){var I=J.split(","),K=[],N="",L,H;if(M){if(M.tagName){M.id=M.id||G.guid();N="#"+M.id+" ";}for(L=0,H=I.length;L<H;++L){J=N+I[L];K.push([J,M]);}}return K;},_nativeQuery:function(H,I,J){try{return I["querySelector"+(J?"":"All")](H);}catch(K){return G.Selector.query(H,I,J,true);}},filter:function(I,H){var J=[],K,L;if(I&&H){for(K=0;(L=I[K++]);){if(G.Selector.test(L,H)){J[J.length]=L;}}}else{}return J;},test:function(N,I,J){var K=false,H=I.split(","),M,L,O;if(N&&N.tagName){J=J||N.ownerDocument;if(!N.id){N.id=D+C++;
}for(L=0;(O=H[L++]);){O+="#"+N.id;M=G.Selector.query(O,J,true);K=(M===N);if(K){break;}}}return K;}};G.mix(G.Selector,B,true);})(A);},"3.0.0",{requires:["dom-base"]});YUI.add("selector-css2",function(G){var H="parentNode",D="tagName",E="attributes",A="combinator",F="pseudos",C=G.Selector,B={SORT_RESULTS:true,_children:function(M,I){var J=M.children,L,K=[],N,O;if(M.children&&I&&M.children.tags){K=M.children.tags(I);}else{if((!J&&M[D])||(J&&I)){N=J||M.childNodes;J=[];for(L=0;(O=N[L++]);){if(O.tagName){if(!I||I===O.tagName){J.push(O);}}}}}return J||[];},_regexCache:{},_re:{attr:/(\[.*\])/g,pseudos:/:([\-\w]+(?:\(?:['"]?(.+)['"]?\)))*/i},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[className~=$1]"},operators:{"":function(J,I){return G.DOM.getAttribute(J,I)!=="";},"~=":"(?:^|\\s+){val}(?:\\s+|$)","|=":"^{val}-?"},pseudos:{"first-child":function(I){return G.Selector._children(I[H])[0]===I;}},_bruteQuery:function(M,Q,S){var N=[],I=[],P=C._tokenize(M),L=P[P.length-1],R=G.DOM._getDoc(Q),J,O,K;if(P[0]&&R===Q&&(J=P[0].id)&&R.getElementById(J)){Q=R.getElementById(J);}if(L){J=L.id;O=L.className;K=L.tagName||"*";if(J){if(R.getElementById(J)){I=[R.getElementById(J)];}}else{if(O){I=Q.getElementsByClassName(O);}else{if(K){I=Q.getElementsByTagName(K||"*");}}}if(I.length){N=C._filterNodes(I,P,S);}}return N;},_filterNodes:function(R,N,P){var W=0,V,X=N.length,Q=X-1,M=[],T=R[0],a=T,Y=G.Selector.getters,L,U,K,O,I,S,J,Z;for(W=0;(a=T=R[W++]);){Q=X-1;O=null;testLoop:while(a&&a.tagName){K=N[Q];J=K.tests;V=J.length;if(V&&!I){while((Z=J[--V])){L=Z[1];if(Y[Z[0]]){S=Y[Z[0]](a,Z[0]);}else{S=a[Z[0]];if(S===undefined&&a.getAttribute){S=a.getAttribute(Z[0]);}}if((L==="="&&S!==Z[2])||(L.test&&!L.test(S))||(L.call&&!L(a,Z[0]))){if((a=a[O])){while(a&&(!a.tagName||(K.tagName&&K.tagName!==a.tagName))){a=a[O];}}continue testLoop;}}}Q--;if(!I&&(U=K.combinator)){O=U.axis;a=a[O];while(a&&!a.tagName){a=a[O];}if(U.direct){O=null;}}else{M.push(T);if(P){return M;}break;}}}T=a=null;return M;},_getRegExp:function(K,I){var J=C._regexCache;I=I||"";if(!J[K+I]){J[K+I]=new RegExp(K,I);}return J[K+I];},combinators:{" ":{axis:"parentNode"},">":{axis:"parentNode",direct:true},"+":{axis:"previousSibling",direct:true}},_parsers:[{name:E,re:/^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,fn:function(K,L){var J=K[2]||"",I=G.Selector.operators,M;if((K[1]==="id"&&J==="=")||(K[1]==="className"&&document.getElementsByClassName&&(J==="~="||J==="="))){L.prefilter=K[1];L[K[1]]=K[3];}if(J in I){M=I[J];if(typeof M==="string"){M=G.Selector._getRegExp(M.replace("{val}",K[3]));}K[2]=M;}if(!L.last||L.prefilter!==K[1]){return K.slice(1);}}},{name:D,re:/^((?:-?[_a-z]+[\w-]*)|\*)/i,fn:function(J,K){var I=J[1].toUpperCase();K.tagName=I;if(I!=="*"&&(!K.last||K.prefilter)){return[D,"=",I];}if(!K.prefilter){K.prefilter="tagName";}}},{name:A,re:/^\s*([>+~]|\s)\s*/,fn:function(I,J){}},{name:F,re:/^:([\-\w]+)(?:\(['"]?(.+)['"]?\))*/i,fn:function(I,J){var K=C[F][I[1]];if(K){return[I[2],K];}else{return false;}}}],_getToken:function(I){return{tagName:null,id:null,className:null,attributes:{},combinator:null,tests:[]};},_tokenize:function(K){K=K||"";K=C._replaceShorthand(G.Lang.trim(K));var J=C._getToken(),P=K,O=[],Q=false,M,N,L,I;outer:do{Q=false;for(L=0;(I=C._parsers[L++]);){if((M=I.re.exec(K))){if(I!==A){J.selector=K;}K=K.replace(M[0],"");if(!K.length){J.last=true;}if(C._attrFilters[M[1]]){M[1]=C._attrFilters[M[1]];}N=I.fn(M,J);if(N===false){Q=false;break outer;}else{if(N){J.tests.push(N);}}if(!K.length||I.name===A){O.push(J);J=C._getToken(J);if(I.name===A){J.combinator=G.Selector.combinators[M[1]];}}Q=true;}}}while(Q&&K.length);if(!Q||K.length){O=[];}return O;},_replaceShorthand:function(J){var K=C.shorthand,L=J.match(C._re.attr),O=J.match(C._re.pseudos),N,M,I;if(O){J=J.replace(C._re.pseudos,"!!REPLACED_PSEUDO!!");}if(L){J=J.replace(C._re.attr,"!!REPLACED_ATTRIBUTE!!");}for(N in K){if(K.hasOwnProperty(N)){J=J.replace(C._getRegExp(N,"gi"),K[N]);}}if(L){for(M=0,I=L.length;M<I;++M){J=J.replace("!!REPLACED_ATTRIBUTE!!",L[M]);}}if(O){for(M=0,I=O.length;M<I;++M){J=J.replace("!!REPLACED_PSEUDO!!",O[M]);}}return J;},_attrFilters:{"class":"className","for":"htmlFor"},getters:{href:function(J,I){return G.DOM.getAttribute(J,I);}}};G.mix(G.Selector,B,true);G.Selector.getters.src=G.Selector.getters.rel=G.Selector.getters.href;if(G.Selector.useNative&&document.querySelector){G.Selector.shorthand["\\.(-?[_a-z]+[-\\w]*)"]="[class~=$1]";}},"3.0.0",{requires:["selector-native"]});YUI.add("selector",function(A){},"3.0.0",{use:["selector-native","selector-css2"]});YUI.add("dom",function(A){},"3.0.0",{use:["dom-base","dom-style","dom-screen","selector"]});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("pluginhost",function(C){var A=C.Lang;function B(){this._plugins={};}B.prototype={plug:function(G,D){if(G){if(A.isFunction(G)){this._plug(G,D);}else{if(A.isArray(G)){for(var E=0,F=G.length;E<F;E++){this.plug(G[E]);}}else{this._plug(G.fn,G.cfg);}}}return this;},unplug:function(E){if(E){this._unplug(E);}else{var D;for(D in this._plugins){if(this._plugins.hasOwnProperty(D)){this._unplug(D);}}}return this;},hasPlugin:function(D){return(this._plugins[D]&&this[D]);},_initPlugins:function(E){this._plugins=this._plugins||{};var G=(this._getClasses)?this._getClasses():[this.constructor],D=[],H={},F,I,K,L,J;for(I=G.length-1;I>=0;I--){F=G[I];L=F._UNPLUG;if(L){C.mix(H,L,true);}K=F._PLUG;if(K){C.mix(D,K,true);}}for(J in D){if(D.hasOwnProperty(J)){if(!H[J]){this.plug(D[J]);}}}if(E&&E.plugins){this.plug(E.plugins);}},_destroyPlugins:function(){this._unplug();},_plug:function(F,D){if(F&&F.NS){var E=F.NS;D=D||{};D.host=this;if(this.hasPlugin(E)){this[E].setAttrs(D);}else{this[E]=new F(D);this._plugins[E]=F;}}},_unplug:function(F){var E=F,D=this._plugins;if(A.isFunction(F)){E=F.NS;if(E&&(!D[E]||D[E]!==F)){E=null;}}if(E){if(this[E]){this[E].destroy();delete this[E];}if(D[E]){delete D[E];}}}};B.plug=function(E,I,G){var J,H,D,F;if(E!==C.Base){E._PLUG=E._PLUG||{};if(!A.isArray(I)){if(G){I={fn:I,cfg:G};}I=[I];}for(H=0,D=I.length;H<D;H++){J=I[H];F=J.NAME||J.fn.NAME;E._PLUG[F]=J;}}};B.unplug=function(E,H){var I,G,D,F;if(E!==C.Base){E._UNPLUG=E._UNPLUG||{};if(!A.isArray(H)){H=[H];}for(G=0,D=H.length;G<D;G++){I=H[G];F=I.NAME;if(!E._PLUG[F]){E._UNPLUG[F]=I;}else{delete E._PLUG[F];}}}};C.namespace("Plugin").Host=B;},"3.0.0",{requires:["yui-base"]});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("node-base",function(C){var G=".",E="nodeName",I="nodeType",B="ownerDocument",H="tagName",D="_yuid",F=function(L){var K=L[D];if(K&&F._instances[K]&&F._instances[K]._node!==L){L[D]=null;}K=C.stamp(L);if(!K){K=C.guid();}this[D]=K;this._node=L;F._instances[K]=this;this._stateProxy=L;if(this._initPlugins){this._initPlugins();}},J=function(L){var K=null;if(L){K=(typeof L==="string")?function(M){return C.Selector.test(M,L);}:function(M){return L(F.get(M));};}return K;};F.NAME="Node";F.re_aria=/^(?:role$|aria-)/;F.DOM_EVENTS={abort:true,beforeunload:true,blur:true,change:true,click:true,close:true,command:true,contextmenu:true,drag:true,dragstart:true,dragenter:true,dragover:true,dragleave:true,dragend:true,drop:true,dblclick:true,error:true,focus:true,keydown:true,keypress:true,keyup:true,load:true,message:true,mousedown:true,mousemove:true,mouseout:true,mouseover:true,mouseup:true,mousemultiwheel:true,mousewheel:true,submit:true,mouseenter:true,mouseleave:true,scroll:true,reset:true,resize:true,select:true,textInput:true,unload:true};C.mix(F.DOM_EVENTS,C.Env.evt.plugins);F._instances={};F.getDOMNode=function(K){if(K){return(K.nodeType)?K:K._node||null;}return null;};F.scrubVal=function(L,K){if(K&&L){if(typeof L==="object"||typeof L==="function"){if(I in L||C.DOM.isWindow(L)){L=F.get(L);}else{if((L.item&&!L._nodes)||(L[0]&&L[0][I])){L=C.all(L);}}}}else{if(L===undefined){L=K;}}return L;};F.addMethod=function(K,M,L){if(K&&M&&typeof M==="function"){F.prototype[K]=function(){L=L||this;var O=C.Array(arguments),N;if(O[0]&&O[0] instanceof F){O[0]=O[0]._node;}if(O[1]&&O[1] instanceof F){O[1]=O[1]._node;}O.unshift(this._node);N=F.scrubVal(M.apply(L,O),this);return N;};}else{}};F.importMethod=function(M,K,L){if(typeof K==="string"){L=L||K;F.addMethod(L,M[K],M);}else{C.each(K,function(N){F.importMethod(M,N);});}};F.one=function(N){var K=null,M,L;if(N){if(typeof N==="string"){if(N.indexOf("doc")===0){N=C.config.doc;}else{if(N.indexOf("win")===0){N=C.config.win;}else{N=C.Selector.query(N,null,true);}}if(!N){return null;}}else{if(N instanceof F){return N;}}L=N._yuid;K=F._instances[L];M=K?K._node:null;if(!K||(M&&N!==M)){K=new F(N);}}return K;};F.get=function(){return F.one.apply(F,arguments);};F.create=function(){return F.get(C.DOM.create.apply(C.DOM,arguments));};F.ATTRS={text:{getter:function(){return C.DOM.getText(this._node);},setter:function(K){C.DOM.setText(this._node,K);return K;}},"options":{getter:function(){return this._node.getElementsByTagName("option");}},"elements":{getter:function(){return C.all(this._node.elements);}},"children":{getter:function(){var N=this._node,M=N.children,O,L,K;if(!M){O=N.childNodes;M=[];for(L=0,K=O.length;L<K;++L){if(O[L][H]){M[M.length]=O[L];}}}return C.all(M);}},value:{getter:function(){return C.DOM.getValue(this._node);},setter:function(K){C.DOM.setValue(this._node,K);return K;}},data:{getter:function(){return this._data;},setter:function(K){this._data=K;return K;}}};F.DEFAULT_SETTER=function(K,M){var L=this._stateProxy,N;if(K.indexOf(G)>-1){N=K;K=K.split(G);C.Object.setValue(L,K,M);}else{if(L[K]!==undefined){L[K]=M;}}return M;};F.DEFAULT_GETTER=function(K){var L=this._stateProxy,M;if(K.indexOf&&K.indexOf(G)>-1){M=C.Object.getValue(L,K.split(G));}else{if(L[K]!==undefined){M=L[K];}}return M;};C.augment(F,C.Event.Target);C.mix(F.prototype,{toString:function(){var M="",L=this[D]+": not bound to a node",K=this._node;if(K){M+=K[E];if(K.id){M+="#"+K.id;}if(K.className){M+="."+K.className.replace(" ",".");}M+=" "+this[D];}return M||L;},get:function(K){var L;if(this._getAttr){L=this._getAttr(K);}else{L=this._get(K);}if(L){L=C.Node.scrubVal(L,this);}return L;},_get:function(K){var L=F.ATTRS[K],M;if(L&&L.getter){M=L.getter.call(this);}else{if(F.re_aria.test(K)){M=this._node.getAttribute(K,2);}else{M=F.DEFAULT_GETTER.apply(this,arguments);}}return M;},set:function(K,M){var L=F.ATTRS[K];if(this._setAttr){this._setAttr.apply(this,arguments);}else{if(L&&L.setter){L.setter.call(this,M);}else{if(F.re_aria.test(K)){this._node.setAttribute(K,M);}else{F.DEFAULT_SETTER.apply(this,arguments);}}}return this;},setAttrs:function(K){if(this._setAttrs){this._setAttrs(K);}else{C.Object.each(K,function(L,M){this.set(M,L);},this);}return this;},getAttrs:function(L){var K={};if(this._getAttrs){this._getAttrs(L);}else{C.Array.each(L,function(M,N){K[M]=this.get(M);},this);}return K;},create:F.create,compareTo:function(K){var L=this._node;if(K instanceof C.Node){K=K._node;}return L===K;},inDoc:function(L){var K=this._node;L=(L)?L._node||L:K[B];if(L.documentElement){return C.DOM.contains(L.documentElement,K);}},getById:function(M){var L=this._node,K=C.DOM.byId(M,L[B]);if(K&&C.DOM.contains(L,K)){K=C.one(K);}else{K=null;}return K;},ancestor:function(K){return F.get(C.DOM.elementByAxis(this._node,"parentNode",J(K)));},previous:function(L,K){return F.get(C.DOM.elementByAxis(this._node,"previousSibling",J(L),K));},next:function(M,L,K){return F.get(C.DOM.elementByAxis(this._node,"nextSibling",J(L),K));},one:function(K){return C.one(C.Selector.query(K,this._node,true));},query:function(K){return this.one(K);},all:function(K){var L=C.all(C.Selector.query(K,this._node));L._query=K;return L;},queryAll:function(K){return this.all(K);},test:function(K){return C.Selector.test(this._node,K);},remove:function(K){var L=this._node;L.parentNode.removeChild(L);if(K){this.destroy(true);}return this;},replace:function(K){var L=this._node;L.parentNode.replaceChild(K,L);return this;},purge:function(L,K){C.Event.purgeElement(this._node,L,K);},destroy:function(K){delete F._instances[this[D]];if(K){this.purge(true);}if(this.unplug){this.unplug();}this._node._yuid=null;this._node=null;this._stateProxy=null;},invoke:function(R,L,K,Q,P,O){var N=this._node,M;if(L&&L instanceof C.Node){L=L._node;}if(K&&K instanceof C.Node){K=K._node;}M=N[R](L,K,Q,P,O);return C.Node.scrubVal(M,this);},each:function(L,K){K=K||this;return L.call(K,this);},item:function(K){return this;},size:function(){return this._node?1:0;},insert:function(M,K){var L=this._node;
if(M){if(typeof K==="number"){K=this._node.childNodes[K];}if(typeof M!=="string"){if(M._node){M=M._node;}else{if(M._nodes||(!M.nodeType&&M.length)){C.each(M._nodes,function(N){C.DOM.addHTML(L,N,K);});return this;}}}C.DOM.addHTML(L,M,K);}return this;},prepend:function(K){return this.insert(K,0);},append:function(K){return this.insert(K,null);},setContent:function(K){C.DOM.addHTML(this._node,K,"replace");return this;},hasMethod:function(L){var K=this._node;return(K&&(typeof K==="function"));}},true);C.Node=F;C.get=C.Node.get;C.one=C.Node.one;var A=function(K){if(typeof K==="string"){this._query=K;K=C.Selector.query(K);}else{K=C.Array(K,0,true);}A._instances[C.stamp(this)]=this;this._nodes=K;};A.NAME="NodeList";A.getDOMNodes=function(K){return K._nodes;};A._instances=[];A.each=function(K,N,M){var L=K._nodes;if(L&&L.length){C.Array.each(L,N,M||K);}else{}};A.addMethod=function(K,M,L){if(K&&M){A.prototype[K]=function(){var O=[],N=arguments;C.Array.each(this._nodes,function(T){var S="_yuid",Q=C.Node._instances[T[S]],R,P;if(!Q){Q=A._getTempNode(T);}R=L||Q;P=M.apply(R,N);if(P!==undefined&&P!==Q){O[O.length]=P;}});return O.length?O:this;};}else{}};A.importMethod=function(M,K,L){if(typeof K==="string"){L=L||K;A.addMethod(K,M[K]);}else{C.each(K,function(N){A.importMethod(M,N);});}};A._getTempNode=function(L){var K=A._tempNode;if(!K){K=C.Node.create("<div></div>");A._tempNode=K;}K._node=L;K._stateProxy=L;return K;};C.mix(A.prototype,{item:function(K){return C.one((this._nodes||[])[K]);},each:function(M,L){var K=this;C.Array.each(this._nodes,function(O,N){O=C.one(O);return M.call(L||O,O,N,K);});return K;},batch:function(L,K){var M=this;C.Array.each(this._nodes,function(P,O){var N=C.Node._instances[P[D]];if(!N){N=A._getTempNode(P);}return L.call(K||N,N,O,M);});return M;},some:function(M,L){var K=this;return C.Array.some(this._nodes,function(O,N){O=C.one(O);L=L||O;return M.call(L,O,N,K);});},toFrag:function(){return C.one(C.DOM._nl2frag(this._nodes));},indexOf:function(K){return C.Array.indexOf(this._nodes,C.Node.getDOMNode(K));},filter:function(K){return C.all(C.Selector.filter(this._nodes,K));},modulus:function(M,L){L=L||0;var K=[];A.each(this,function(O,N){if(N%M===L){K.push(O);}});return C.all(K);},odd:function(){return this.modulus(2,1);},even:function(){return this.modulus(2);},destructor:function(){delete A._instances[this[D]];},refresh:function(){var L,K=this._nodes;if(this._query){if(K&&K[0]&&K[0].ownerDocument){L=K[0].ownerDocument;}this._nodes=C.Selector.query(this._query,L||C.config.doc);}return this;},on:function(N,M,L){var K=C.Array(arguments,0,true);K.splice(2,0,this._nodes);K[3]=L||this;return C.on.apply(C,K);},after:function(N,M,L){var K=C.Array(arguments,0,true);K.splice(2,0,this._nodes);K[3]=L||this;return C.after.apply(C,K);},size:function(){return this._nodes.length;},toString:function(){var N="",M=this[D]+": not bound to any nodes",K=this._nodes,L;if(K&&K[0]){L=K[0];N+=L[E];if(L.id){N+="#"+L.id;}if(L.className){N+="."+L.className.replace(" ",".");}if(K.length>1){N+="...["+K.length+" items]";}}return N||M;}},true);A.importMethod(C.Node.prototype,["append","detach","detachAll","insert","prepend","remove","set","setContent"]);A.prototype.get=function(L){var O=[],N=this._nodes,M=false,P=A._getTempNode,K,Q;if(N[0]){K=C.Node._instances[N[0]._yuid]||P(N[0]);Q=K._get(L);if(Q&&Q.nodeType){M=true;}}C.Array.each(N,function(R){K=C.Node._instances[R._yuid];if(!K){K=P(R);}Q=K._get(L);if(!M){Q=C.Node.scrubVal(Q,K);}O.push(Q);});return(M)?C.all(O):O;};C.NodeList=A;C.all=function(K){return new A(K);};C.Node.all=C.all;C.Array.each(["replaceChild","appendChild","insertBefore","removeChild","hasChildNodes","cloneNode","hasAttribute","removeAttribute","scrollIntoView","getElementsByTagName","focus","blur","submit","reset","select"],function(K){C.Node.prototype[K]=function(O,M,L){var N=this.invoke(K,O,M,L);return N;};});F.importMethod(C.DOM,["contains","setAttribute","getAttribute"]);C.NodeList.importMethod(C.Node.prototype,["getAttribute","setAttribute"]);(function(L){var K=["hasClass","addClass","removeClass","replaceClass","toggleClass"];L.Node.importMethod(L.DOM,K);L.NodeList.importMethod(L.Node.prototype,K);})(C);if(!document.documentElement.hasAttribute){C.Node.prototype.hasAttribute=function(K){return C.DOM.getAttribute(this._node,K)!=="";};}C.Node.ATTRS.type={setter:function(L){if(L==="hidden"){try{this._node.type="hidden";}catch(K){this.setStyle("display","none");this._inputType="hidden";}}else{try{this._node.type=L;}catch(K){}}return L;},getter:function(){return this._inputType||this._node.type;},_bypassProxy:true};},"3.0.0",{requires:["dom-base","selector-css2","event-base"]});YUI.add("node-style",function(A){(function(C){var B=["getStyle","getComputedStyle","setStyle","setStyles"];C.Node.importMethod(C.DOM,B);C.NodeList.importMethod(C.Node.prototype,B);})(A);},"3.0.0",{requires:["dom-style","node-base"]});YUI.add("node-screen",function(A){A.each(["winWidth","winHeight","docWidth","docHeight","docScrollX","docScrollY"],function(B){A.Node.ATTRS[B]={getter:function(){var C=Array.prototype.slice.call(arguments);C.unshift(A.Node.getDOMNode(this));return A.DOM[B].apply(this,C);}};});A.Node.ATTRS.scrollLeft={getter:function(){var B=A.Node.getDOMNode(this);return("scrollLeft" in B)?B.scrollLeft:A.DOM.docScrollX(B);},setter:function(C){var B=A.Node.getDOMNode(this);if(B){if("scrollLeft" in B){B.scrollLeft=C;}else{if(B.document||B.nodeType===9){A.DOM._getWin(B).scrollTo(C,A.DOM.docScrollY(B));}}}else{}}};A.Node.ATTRS.scrollTop={getter:function(){var B=A.Node.getDOMNode(this);return("scrollTop" in B)?B.scrollTop:A.DOM.docScrollY(B);},setter:function(C){var B=A.Node.getDOMNode(this);if(B){if("scrollTop" in B){B.scrollTop=C;}else{if(B.document||B.nodeType===9){A.DOM._getWin(B).scrollTo(A.DOM.docScrollX(B),C);}}}else{}}};A.Node.importMethod(A.DOM,["getXY","setXY","getX","setX","getY","setY"]);A.Node.ATTRS.region={getter:function(){var B=A.Node.getDOMNode(this);if(B&&!B.tagName){if(B.nodeType===9){B=B.documentElement;
}else{if(B.alert){B=B.document.documentElement;}}}return A.DOM.region(B);}};A.Node.ATTRS.viewportRegion={getter:function(){return A.DOM.viewportRegion(A.Node.getDOMNode(this));}};A.Node.importMethod(A.DOM,"inViewportRegion");A.Node.prototype.intersect=function(B,D){var C=A.Node.getDOMNode(this);if(B instanceof A.Node){B=A.Node.getDOMNode(B);}return A.DOM.intersect(C,B,D);};A.Node.prototype.inRegion=function(B,D,E){var C=A.Node.getDOMNode(this);if(B instanceof A.Node){B=A.Node.getDOMNode(B);}return A.DOM.inRegion(C,B,D,E);};},"3.0.0",{requires:["dom-screen"]});YUI.add("node-pluginhost",function(A){A.Node.plug=function(){var B=A.Array(arguments);B.unshift(A.Node);A.Plugin.Host.plug.apply(A.Base,B);return A.Node;};A.Node.unplug=function(){var B=A.Array(arguments);B.unshift(A.Node);A.Plugin.Host.unplug.apply(A.Base,B);return A.Node;};A.mix(A.Node,A.Plugin.Host,false,null,1);A.NodeList.prototype.plug=function(){var B=arguments;A.NodeList.each(this,function(C){A.Node.prototype.plug.apply(A.one(C),B);});};A.NodeList.prototype.unplug=function(){var B=arguments;A.NodeList.each(this,function(C){A.Node.prototype.unplug.apply(A.one(C),B);});};},"3.0.0",{requires:["node-base","pluginhost"]});YUI.add("node-event-delegate",function(A){A.Node.prototype.delegate=function(F,E,B){var D=Array.prototype.slice.call(arguments,3),C=[F,E,A.Node.getDOMNode(this),B];C=C.concat(D);return A.delegate.apply(A,C);};},"3.0.0",{requires:["node-base","event-delegate","pluginhost"]});YUI.add("node",function(A){},"3.0.0",{skinnable:false,use:["node-base","node-style","node-screen","node-pluginhost","node-event-delegate"],requires:["dom","event-base","event-delegate","pluginhost"]});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
(function(){var GLOBAL_ENV=YUI.Env,C=YUI.config,D=C.doc,POLL_INTERVAL=C.pollInterval||40,_ready=function(e){GLOBAL_ENV._ready();};if(!GLOBAL_ENV._ready){GLOBAL_ENV._ready=function(){if(!GLOBAL_ENV.DOMReady){GLOBAL_ENV.DOMReady=true;if(D.removeEventListener){D.removeEventListener("DOMContentLoaded",_ready,false);}}};
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
if(navigator.userAgent.match(/MSIE/)){if(self!==self.top){document.onreadystatechange=function(){if(document.readyState=="complete"){document.onreadystatechange=null;_ready();}};}else{GLOBAL_ENV._dri=setInterval(function(){try{document.documentElement.doScroll("left");clearInterval(GLOBAL_ENV._dri);GLOBAL_ENV._dri=null;_ready();}catch(ex){}},POLL_INTERVAL);}}else{D.addEventListener("DOMContentLoaded",_ready,false);}}})();YUI.add("event-base",function(A){(function(){var C=YUI.Env,B=function(){A.fire("domready");};A.publish("domready",{fireOnce:true});if(C.DOMReady){B();}else{A.before(B,C,"_ready");}})();(function(){var C=A.UA,B={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9,63272:46,63273:36,63275:35},D=function(F){try{if(F&&3==F.nodeType){F=F.parentNode;}}catch(E){return null;}return A.one(F);};A.DOMEventFacade=function(L,F,E){E=E||{};var H=L,G=F,I=A.config.doc,M=I.body,N=H.pageX,K=H.pageY,J,O;this.altKey=H.altKey;this.ctrlKey=H.ctrlKey;this.metaKey=H.metaKey;this.shiftKey=H.shiftKey;this.type=H.type;this.clientX=H.clientX;this.clientY=H.clientY;if(!N&&0!==N){N=H.clientX||0;K=H.clientY||0;if(C.ie){N+=Math.max(I.documentElement.scrollLeft,M.scrollLeft);K+=Math.max(I.documentElement.scrollTop,M.scrollTop);}}this._yuifacade=true;this._event=H;this.pageX=N;this.pageY=K;J=H.keyCode||H.charCode||0;if(C.webkit&&(J in B)){J=B[J];}this.keyCode=J;this.charCode=J;this.button=H.which||H.button;this.which=this.button;this.target=D(H.target||H.srcElement);this.currentTarget=D(G);O=H.relatedTarget;if(!O){if(H.type=="mouseout"){O=H.toElement;}else{if(H.type=="mouseover"){O=H.fromElement;}}}this.relatedTarget=D(O);if(H.type=="mousewheel"||H.type=="DOMMouseScroll"){this.wheelDelta=(H.detail)?(H.detail*-1):Math.round(H.wheelDelta/80)||((H.wheelDelta<0)?-1:1);}this.stopPropagation=function(){if(H.stopPropagation){H.stopPropagation();}else{H.cancelBubble=true;}E.stopped=1;};this.stopImmediatePropagation=function(){if(H.stopImmediatePropagation){H.stopImmediatePropagation();}else{this.stopPropagation();}E.stopped=2;};this.preventDefault=function(P){if(H.preventDefault){H.preventDefault();}H.returnValue=P||false;E.prevented=1;};this.halt=function(P){if(P){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();};};})();(function(){A.Env.evt.dom_wrappers={};A.Env.evt.dom_map={};var H=A.Env.evt,J=YUI.Env.add,D=YUI.Env.remove,G=function(){YUI.Env.windowLoaded=true;A.Event._load();D(window,"load",G);},B=function(){A.Event._unload();D(window,"unload",B);},C="domready",E="~yui|2|compat~",F=function(L){try{return(L&&typeof L!=="string"&&A.Lang.isNumber(L.length)&&!L.tagName&&!L.alert);}catch(K){return false;}},I=function(){var M=false,N=0,L=[],O=H.dom_wrappers,K=null,P=H.dom_map;return{POLL_RETRYS:1000,POLL_INTERVAL:40,lastError:null,_interval:null,_dri:null,DOMReady:false,startInterval:function(){var Q=A.Event;if(!Q._interval){Q._interval=setInterval(A.bind(Q._poll,Q),Q.POLL_INTERVAL);}},onAvailable:function(Q,U,Y,R,V,X){var W=A.Array(Q),S,T;for(S=0;S<W.length;S=S+1){L.push({id:W[S],fn:U,obj:Y,override:R,checkReady:V,compat:X});}N=this.POLL_RETRYS;setTimeout(A.bind(A.Event._poll,A.Event),0);T=new A.EventHandle({_delete:function(){if(T.handle){T.handle.detach();return;}var a,Z;for(a=0;a<W.length;a++){for(Z=0;Z<L.length;Z++){if(W[a]===L[Z].id){L.splice(Z,1);}}}}});return T;},onContentReady:function(U,R,T,S,Q){return this.onAvailable(U,R,T,S,true,Q);},attach:function(T,S,R,Q){return A.Event._attach(A.Array(arguments,0,true));},_createWrapper:function(W,V,Q,R,U){var X=A.stamp(W),T="event:"+X+V,S;if(false===U){T+="native";}if(Q){T+="capture";}S=O[T];if(!S){S=A.publish(T,{silent:true,bubbles:false,contextFn:function(){S.nodeRef=S.nodeRef||A.one(S.el);return S.nodeRef;}});S.el=W;S.key=T;S.domkey=X;S.type=V;S.fn=function(Y){S.fire(A.Event.getEvent(Y,W,(R||(false===U))));};S.capture=Q;if(W==A.config.win&&V=="load"){S.fireOnce=true;K=T;}O[T]=S;P[X]=P[X]||{};P[X][T]=S;J(W,V,S.fn,Q);}return S;},_attach:function(W,S){var a,e=A.Event,c,U,Z,Q,T=false,V,X=W[0],Y=W[1],R=W[2]||A.config.win,d=S&&S.facade,b=S&&S.capture;if(W[W.length-1]===E){a=true;}if(!Y||!Y.call){return false;}if(F(R)){c=[];A.each(R,function(g,f){W[2]=g;c.push(e._attach(W,S));});return new A.EventHandle(c);}else{if(A.Lang.isString(R)){if(a){U=A.DOM.byId(R);}else{U=A.Selector.query(R);switch(U.length){case 0:U=null;break;case 1:U=U[0];break;default:W[2]=U;return e._attach(W,S);}}if(U){R=U;}else{V=this.onAvailable(R,function(){V.handle=e._attach(W,S);},e,true,false,a);return V;}}}if(!R){return false;}if(A.Node&&R instanceof A.Node){R=A.Node.getDOMNode(R);}Z=this._createWrapper(R,X,b,a,d);if(R==A.config.win&&X=="load"){if(YUI.Env.windowLoaded){T=true;}}if(a){W.pop();}Q=W[3];V=Z._on(Y,Q,(W.length>4)?W.slice(4):null);if(T){Z.fire();}return V;},detach:function(X,Z,S,U){var W=A.Array(arguments,0,true),a,V,T,Y,Q,R;if(W[W.length-1]===E){a=true;}if(X&&X.detach){return X.detach();}if(typeof S=="string"){if(a){S=A.DOM.byId(S);}else{S=A.Selector.query(S);T=S.length;if(T<1){S=null;}else{if(T==1){S=S[0];}}}}if(!S){return false;}if(F(S)){Y=true;for(V=0,T=S.length;V<T;++V){W[2]=S[V];Y=(A.Event.detach.apply(A.Event,W)&&Y);}return Y;}if(!X||!Z||!Z.call){return this.purgeElement(S,false,X);}Q="event:"+A.stamp(S)+X;R=O[Q];if(R){return R.detach(Z);}else{return false;}},getEvent:function(T,R,Q){var S=T||window.event;return(Q)?S:new A.DOMEventFacade(S,R,O["event:"+A.stamp(R)+T.type]);},generateId:function(Q){var R=Q.id;if(!R){R=A.stamp(Q);Q.id=R;}return R;},_isValidCollection:F,_load:function(Q){if(!M){M=true;if(A.fire){A.fire(C);}A.Event._poll();}},_poll:function(){if(this.locked){return;
}if(A.UA.ie&&!YUI.Env.DOMReady){this.startInterval();return;}this.locked=true;var V=!M,U,W,R,Q,T,S;if(!V){V=(N>0);}U=[];W=function(Z,a){var Y,X=a.override;if(a.compat){if(a.override){if(X===true){Y=a.obj;}else{Y=X;}}else{Y=Z;}a.fn.call(Y,a.obj);}else{Y=a.obj||A.one(Z);a.fn.apply(Y,(A.Lang.isArray(X))?X:[]);}};for(R=0,Q=L.length;R<Q;++R){T=L[R];if(T&&!T.checkReady){S=(T.compat)?A.DOM.byId(T.id):A.Selector.query(T.id,null,true);if(S){W(S,T);L[R]=null;}else{U.push(T);}}}for(R=0,Q=L.length;R<Q;++R){T=L[R];if(T&&T.checkReady){S=(T.compat)?A.DOM.byId(T.id):A.Selector.query(T.id,null,true);if(S){if(M||(S.get&&S.get("nextSibling"))||S.nextSibling){W(S,T);L[R]=null;}}else{U.push(T);}}}N=(U.length===0)?0:N-1;if(V){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;return;},purgeElement:function(W,X,V){var S=(A.Lang.isString(W))?A.Selector.query(W,null,true):W,R=this.getListeners(S,V),T,Q,U;if(R){for(T=0,Q=R.length;T<Q;++T){U=R[T];U.detachAll();D(U.el,U.type,U.fn,U.capture);delete O[U.key];delete P[U.domkey][U.key];}}if(X&&S&&S.childNodes){for(T=0,Q=S.childNodes.length;T<Q;++T){this.purgeElement(S.childNodes[T],X,V);}}},getListeners:function(U,T){var V=A.stamp(U,true),Q=P[V],S=[],R=(T)?"event:"+V+T:null;if(!Q){return null;}if(R){if(Q[R]){S.push(Q[R]);}R+="native";if(Q[R]){S.push(Q[R]);}}else{A.each(Q,function(X,W){S.push(X);});}return(S.length)?S:null;},_unload:function(Q){A.each(O,function(S,R){S.detachAll();D(S.el,S.type,S.fn,S.capture);delete O[R];delete P[S.domkey][R];});},nativeAdd:J,nativeRemove:D};}();A.Event=I;if(A.config.injected||YUI.Env.windowLoaded){G();}else{J(window,"load",G);}if(A.UA.ie){A.on(C,I._poll,I,true);}A.on("unload",B);I.Custom=A.CustomEvent;I.Subscriber=A.Subscriber;I.Target=A.EventTarget;I.Handle=A.EventHandle;I.Facade=A.EventFacade;I._poll();})();A.Env.evt.plugins.available={on:function(D,C,F,E){var B=arguments.length>4?A.Array(arguments,4,true):[];return A.Event.onAvailable.call(A.Event,F,C,E,B);}};A.Env.evt.plugins.contentready={on:function(D,C,F,E){var B=arguments.length>4?A.Array(arguments,4,true):[];return A.Event.onContentReady.call(A.Event,F,C,E,B);}};},"3.0.0",{requires:["event-custom-base"]});YUI.add("event-delegate",function(B){var I=B.Event,F=B.Lang,E={},A={mouseenter:"mouseover",mouseleave:"mouseout"},H=function(K){try{if(K&&3==K.nodeType){return K.parentNode;}}catch(J){}return K;},D=function(K,P,M){var Q=H((P.target||P.srcElement)),N=E[K],T,O,L,S,R;var J=function(X,U,V){var W;if(!X||X===V){W=false;}else{W=B.Selector.test(X,U)?X:J(X.parentNode,U,V);}return W;};for(T in N){if(N.hasOwnProperty(T)){O=N[T];S=N.fn;L=null;if(B.Selector.test(Q,T,M)){L=Q;}else{if(B.Selector.test(Q,((T.replace(/,/gi," *,"))+" *"),M)){L=J(Q,T,M);}}if(L){if(!R){R=new B.DOMEventFacade(P,M);R.container=R.currentTarget;}R.currentTarget=B.Node.get(L);B.publish(O,{contextFn:function(){return R.currentTarget;}});if(S){S(R,O);}else{B.fire(O,R);}}}}},G=function(M,L,K){var O={focus:I._attachFocus,blur:I._attachBlur},N=O[M],J=[M,function(P){D(L,(P||window.event),K);},K];if(N){return N(J,{capture:true,facade:false});}else{return I._attach(J,{facade:false});}},C=B.cached(function(J){return J.replace(/[|,:]/g,"~");});B.Env.evt.plugins.delegate={on:function(O,N,M,J,K){var L=B.Array(arguments,0,true);L.splice(3,1);L[0]=J;return B.delegate.apply(B,L);}};I.delegate=function(R,U,K,W){if(!W){return false;}var O=B.Array(arguments,0,true),M=K,N;if(F.isString(K)){M=B.Selector.query(K,null,true);if(!M){N=I.onAvailable(K,function(){N.handle=I.delegate.apply(I,O);},I,true,false);return N;}}M=B.Node.getDOMNode(M);var S=B.stamp(M),L="delegate:"+S+R+C(W),J=R+S,Q=E[J],T,V,P;if(!Q){Q={};if(A[R]){if(!I._fireMouseEnter){return false;}R=A[R];Q.fn=I._fireMouseEnter;}T=G(R,J,M);B.after(function(X){if(T.sub==X){delete E[J];B.detachAll(L);}},T.evt,"_delete");Q.handle=T;E[J]=Q;}P=Q.listeners;Q.listeners=P?(P+1):1;Q[W]=L;O[0]=L;O.splice(2,2);V=B.on.apply(B,O);B.after(function(){Q.listeners=(Q.listeners-1);if(Q.listeners===0){Q.handle.detach();}},V,"detach");return V;};B.delegate=I.delegate;},"3.0.0",{requires:["node-base"]});YUI.add("event-mousewheel",function(C){var B="DOMMouseScroll",A=function(E){var D=C.Array(E,0,true),F;if(C.UA.gecko){D[0]=B;F=C.config.win;}else{F=C.config.doc;}if(D.length<3){D[2]=F;}else{D.splice(2,0,F);}return D;};C.Env.evt.plugins.mousewheel={on:function(){return C.Event._attach(A(arguments));},detach:function(){return C.Event.detach.apply(C.Event,A(arguments));}};},"3.0.0",{requires:["node-base"]});YUI.add("event-mouseenter",function(F){var C=F.Event,E=F.Lang,B=F.Env.evt.plugins,D={},A={on:function(M,O,H){var L=F.Array(arguments,0,true),J=H,K;if(E.isString(H)){J=F.all(H);if(J.size()===0){K=C.onAvailable(H,function(){K.handle=F.on.apply(F,L);},C,true,false);return K;}}var R=(M==="mouseenter")?"mouseover":"mouseout",Q=M+":"+F.stamp(J)+R,I=D[Q],N,P,G;if(!I){N=F.on(R,F.rbind(C._fireMouseEnter,F,Q),J);F.after(function(S){if(N.sub==S){delete D[Q];F.detachAll(Q);}},N.evt,"_delete");I={};I.handle=N;D[Q]=I;}G=I.count;I.count=G?(G+1):1;L[0]=Q;L.splice(2,1);P=F.on.apply(F,L);F.after(function(){I.count=(I.count-1);if(I.count===0){I.handle.detach();}},P,"detach");return P;}};C._fireMouseEnter=function(J,H){var G=J.relatedTarget,I=J.currentTarget;if(I!==G&&!I.contains(G)){F.publish(H,{contextFn:function(){return I;}});F.fire(H,J);}};B.mouseenter=A;B.mouseleave=A;},"3.0.0",{requires:["node-base"]});YUI.add("event-key",function(A){A.Env.evt.plugins.key={on:function(E,G,B,K,C){var I=A.Array(arguments,0,true),F,J,H,D;F=K&&K.split(":");if(!K||K.indexOf(":")==-1||!F[1]){I[0]="key"+((F&&F[0])||"press");return A.on.apply(A,I);}J=F[0];H=(F[1])?F[1].split(/,|\+/):null;D=(A.Lang.isString(B)?B:A.stamp(B))+K;D=D.replace(/,/g,"_");if(!A.getEvent(D)){A.on(E+J,function(P){var Q=false,M=false,N,L,O;for(N=0;N<H.length;N=N+1){L=H[N];O=parseInt(L,10);if(A.Lang.isNumber(O)){if(P.charCode===O){Q=true;}else{M=true;}}else{if(Q||!M){Q=(P[L+"Key"]);M=!Q;}}}if(Q){A.fire(D,P);}},B);
}I.splice(2,2);I[0]=D;return A.on.apply(A,I);}};},"3.0.0",{requires:["node-base"]});YUI.add("event-focus",function(A){(function(){var I=A.UA,J=A.Event,E=A.Env.evt.plugins,C=I.ie,F=(I.opera||I.webkit),D={focus:(C?"focusin":(F?"DOMFocusIn":"focus")),blur:(C?"focusout":(F?"DOMFocusOut":"blur"))},G={capture:(I.gecko?true:false)},H=function(M,L){var K=A.Array(M,0,true);K[0]=D[K[0]];return J._attach(K,L);},B={on:function(){return H(arguments,G);}};J._attachFocus=H;J._attachBlur=H;E.focus=B;E.blur=B;})();},"3.0.0",{requires:["node-base"]});YUI.add("event-resize",function(A){(function(){var C,B,E="window:resize",D=function(F){if(A.UA.gecko){A.fire(E,F);}else{if(B){B.cancel();}B=A.later(A.config.windowResizeDelay||40,A,function(){A.fire(E,F);});}};A.Env.evt.plugins.windowresize={on:function(H,G){if(!C){C=A.Event._attach(["resize",D]);}var F=A.Array(arguments,0,true);F[0]=E;return A.on.apply(A,F);}};})();},"3.0.0",{requires:["node-base"]});YUI.add("event",function(A){},"3.0.0",{use:["event-base","event-delegate","event-mousewheel","event-mouseenter","event-key","event-focus","event-resize"]});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("event-simulate",function(A){(function(){var H=A.Lang,G=A.Array,D=H.isFunction,C=H.isString,E=H.isBoolean,M=H.isObject,K=H.isNumber,J=A.config.doc,N={click:1,dblclick:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,mousemove:1},I={keydown:1,keyup:1,keypress:1};function F(S,W,R,P,Y,O,L,X,U,a,Z){if(!S){A.error("simulateKeyEvent(): Invalid target.");}if(C(W)){W=W.toLowerCase();switch(W){case"textevent":W="keypress";break;case"keyup":case"keydown":case"keypress":break;default:A.error("simulateKeyEvent(): Event type '"+W+"' not supported.");}}else{A.error("simulateKeyEvent(): Event type must be a string.");}if(!E(R)){R=true;}if(!E(P)){P=true;}if(!M(Y)){Y=window;}if(!E(O)){O=false;}if(!E(L)){L=false;}if(!E(X)){X=false;}if(!E(U)){U=false;}if(!K(a)){a=0;}if(!K(Z)){Z=0;}var V=null;if(D(J.createEvent)){try{V=J.createEvent("KeyEvents");V.initKeyEvent(W,R,P,Y,O,L,X,U,a,Z);}catch(T){try{V=J.createEvent("Events");}catch(Q){V=J.createEvent("UIEvents");}finally{V.initEvent(W,R,P);V.view=Y;V.altKey=L;V.ctrlKey=O;V.shiftKey=X;V.metaKey=U;V.keyCode=a;V.charCode=Z;}}S.dispatchEvent(V);}else{if(M(J.createEventObject)){V=J.createEventObject();V.bubbles=R;V.cancelable=P;V.view=Y;V.ctrlKey=O;V.altKey=L;V.shiftKey=X;V.metaKey=U;V.keyCode=(Z>0)?Z:a;S.fireEvent("on"+W,V);}else{A.error("simulateKeyEvent(): No event simulation framework present.");}}}function B(X,c,U,R,d,W,T,S,Q,O,P,L,b,Z,V,Y){if(!X){A.error("simulateMouseEvent(): Invalid target.");}if(C(c)){c=c.toLowerCase();if(!N[c]){A.error("simulateMouseEvent(): Event type '"+c+"' not supported.");}}else{A.error("simulateMouseEvent(): Event type must be a string.");}if(!E(U)){U=true;}if(!E(R)){R=(c!="mousemove");}if(!M(d)){d=window;}if(!K(W)){W=1;}if(!K(T)){T=0;}if(!K(S)){S=0;}if(!K(Q)){Q=0;}if(!K(O)){O=0;}if(!E(P)){P=false;}if(!E(L)){L=false;}if(!E(b)){b=false;}if(!E(Z)){Z=false;}if(!K(V)){V=0;}var a=null;if(D(J.createEvent)){a=J.createEvent("MouseEvents");if(a.initMouseEvent){a.initMouseEvent(c,U,R,d,W,T,S,Q,O,P,L,b,Z,V,Y);}else{a=J.createEvent("UIEvents");a.initEvent(c,U,R);a.view=d;a.detail=W;a.screenX=T;a.screenY=S;a.clientX=Q;a.clientY=O;a.ctrlKey=P;a.altKey=L;a.metaKey=Z;a.shiftKey=b;a.button=V;a.relatedTarget=Y;}if(Y&&!a.relatedTarget){if(c=="mouseout"){a.toElement=Y;}else{if(c=="mouseover"){a.fromElement=Y;}}}X.dispatchEvent(a);}else{if(M(J.createEventObject)){a=J.createEventObject();a.bubbles=U;a.cancelable=R;a.view=d;a.detail=W;a.screenX=T;a.screenY=S;a.clientX=Q;a.clientY=O;a.ctrlKey=P;a.altKey=L;a.metaKey=Z;a.shiftKey=b;switch(V){case 0:a.button=1;break;case 1:a.button=4;break;case 2:break;default:a.button=0;}a.relatedTarget=Y;X.fireEvent("on"+c,a);}else{A.error("simulateMouseEvent(): No event simulation framework present.");}}}A.Event.simulate=function(P,O,L){L=L||{};if(N[O]){B(P,O,L.bubbles,L.cancelable,L.view,L.detail,L.screenX,L.screenY,L.clientX,L.clientY,L.ctrlKey,L.altKey,L.shiftKey,L.metaKey,L.button,L.relatedTarget);}else{if(I[O]){F(P,O,L.bubbles,L.cancelable,L.view,L.ctrlKey,L.altKey,L.shiftKey,L.metaKey,L.keyCode,L.charCode);}else{A.error("simulate(): Event '"+O+"' can't be simulated.");}}};})();},"3.0.0",{requires:["event"]});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("dump",function(G){var B=G.Lang,C="{...}",F="f(){...}",A=", ",D=" => ",E=function(N,M){var I,H,K=[],J=B.type(N);if(!B.isObject(N)){return N+"";}else{if(J=="date"){return N;}else{if(N.nodeType&&N.tagName){return N.tagName+"#"+N.id;}else{if(N.document&&N.navigator){return"window";}else{if(N.location&&N.body){return"document";}else{if(J=="function"){return F;}}}}}}M=(B.isNumber(M))?M:3;if(J=="array"){K.push("[");for(I=0,H=N.length;I<H;I=I+1){if(B.isObject(N[I])){K.push((M>0)?B.dump(N[I],M-1):C);}else{K.push(N[I]);}K.push(A);}if(K.length>1){K.pop();}K.push("]");}else{if(J=="regexp"){K.push(N.toString());}else{K.push("{");for(I in N){if(N.hasOwnProperty(I)){try{K.push(I+D);if(B.isObject(N[I])){K.push((M>0)?B.dump(N[I],M-1):C);}else{K.push(N[I]);}K.push(A);}catch(L){K.push("Error: "+L.message);}}}if(K.length>1){K.pop();}K.push("}");}}return K.join("");};G.dump=E;B.dump=E;},"3.0.0");/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("substitute",function(G){var B=G.Lang,D="dump",F=" ",C="{",E="}",A=function(U,I,P,K,H){var N,M,L,S,R,T,Q=[],J,O;K=K||C;H=H||E;for(;;){N=U.lastIndexOf(K);if(N<0){break;}M=U.indexOf(H,N);if(N+1>=M){break;}J=U.substring(N+1,M);S=J;T=null;L=S.indexOf(F);if(L>-1){T=S.substring(L+1);S=S.substring(0,L);}R=I[S];if(P){R=P(S,R,T);}if(B.isObject(R)){if(!G.dump){R=R.toString();}else{if(B.isArray(R)){R=G.dump(R,parseInt(T,10));}else{T=T||"";O=T.indexOf(D);if(O>-1){T=T.substring(4);}if(R.toString===Object.prototype.toString||O>-1){R=G.dump(R,parseInt(T,10));}else{R=R.toString();}}}}else{if(!B.isString(R)&&!B.isNumber(R)){R="~-"+Q.length+"-~";Q[Q.length]=J;}}U=U.substring(0,N)+R+U.substring(M+1);}for(N=Q.length-1;N>=0;N=N-1){U=U.replace(new RegExp("~-"+N+"-~"),K+Q[N]+H,"g");}return U;};G.substitute=A;B.substitute=A;},"3.0.0",{optional:["dump"]});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("json-parse",function(Y){var _JSON=Y.config.win.JSON,Native=(Object.prototype.toString.call(_JSON)==="[object JSON]"&&_JSON),_UNICODE_EXCEPTIONS=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_ESCAPES=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,_VALUES=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS=/(?:^|:|,)(?:\s*\[)+/g,_UNSAFE=/[^\],:{}\s]/,_escapeException=function(c){return"\\u"+("0000"+(+(c.charCodeAt(0))).toString(16)).slice(-4);},_revive=function(data,reviver){var walk=function(o,key){var k,v,value=o[key];if(value&&typeof value==="object"){for(k in value){if(value.hasOwnProperty(k)){v=walk(value,k);if(v===undefined){delete value[k];}else{value[k]=v;}}}}return reviver.call(o,key,value);};return typeof reviver==="function"?walk({"":data},""):data;},_parse=function(s,reviver){if(typeof s==="string"){s=s.replace(_UNICODE_EXCEPTIONS,_escapeException);if(!_UNSAFE.test(s.replace(_ESCAPES,"@").replace(_VALUES,"]").replace(_BRACKETS,""))){return _revive(eval("("+s+")"),reviver);}}throw new SyntaxError("JSON.parse");};Y.namespace("JSON").parse=function(s,reviver){return Native&&Y.JSON.useNativeParse?Native.parse(s,reviver):_parse(s,reviver);};Y.JSON.useNativeParse=!!Native;},"3.0.0");YUI.add("json-stringify",function(C){var b=C.config.win.JSON,E=C.Lang,A=E.isFunction,L=E.isObject,N=E.isArray,X=Object.prototype.toString,W=(X.call(b)==="[object JSON]"&&b),h="undefined",O="object",e="null",R="string",U="number",Q="boolean",D="date",H={"undefined":h,"string":R,"[object String]":R,"number":U,"[object Number]":U,"boolean":Q,"[object Boolean]":Q,"[object Date]":D,"[object RegExp]":O},i="",g="{",G="}",F="[",V="]",T=",",K=",\n",B="\n",I=":",f=": ",M='"',Z=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,a={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function c(j){var Y=typeof j;return H[Y]||H[X.call(j)]||(Y===O?(j?O:e):h);}function P(Y){if(!a[Y]){a[Y]="\\u"+("0000"+(+(Y.charCodeAt(0))).toString(16)).slice(-4);}return a[Y];}function J(Y){return M+Y.replace(Z,P)+M;}function d(Y,j){return Y.replace(/^/gm,j);}function S(j,s,Y){if(j===undefined){return undefined;}var l=A(s)?s:null,r=X.call(Y).match(/String|Number/)||[],t=C.JSON.dateToString,q=[],n,m,p;if(l||!N(s)){s=undefined;}if(s){n={};for(m=0,p=s.length;m<p;++m){n[s[m]]=true;}s=n;}Y=r[0]==="Number"?new Array(Math.min(Math.max(0,Y),10)+1).join(" "):(Y||i).slice(0,10);function k(w,AC){var AA=w[AC],AE=c(AA),z=[],y=Y?f:I,x,u,AD,o,AB;if(L(AA)&&A(AA.toJSON)){AA=AA.toJSON(AC);}else{if(AE===D){AA=t(AA);}}if(A(l)){AA=l.call(w,AC,AA);}if(AA!==w[AC]){AE=c(AA);}switch(AE){case D:case O:break;case R:return J(AA);case U:return isFinite(AA)?AA+i:e;case Q:return AA+i;case e:return e;default:return undefined;}for(u=q.length-1;u>=0;--u){if(q[u]===AA){throw new Error("JSON.stringify. Cyclical reference");}}x=N(AA);q.push(AA);if(x){for(u=AA.length-1;u>=0;--u){z[u]=k(AA,u)||e;}}else{AD=s||AA;u=0;for(o in AD){if(AD.hasOwnProperty(o)){AB=k(AA,o);if(AB){z[u++]=J(o)+y+AB;}}}}q.pop();if(Y&&z.length){return x?F+B+d(z.join(K),Y)+B+V:g+B+d(z.join(K),Y)+B+G;}else{return x?F+z.join(T)+V:g+z.join(T)+G;}}return k({"":j},"");}C.mix(C.namespace("JSON"),{useNativeStringify:!!W,dateToString:function(j){function Y(k){return k<10?"0"+k:k;}return j.getUTCFullYear()+"-"+Y(j.getUTCMonth()+1)+"-"+Y(j.getUTCDate())+"T"+Y(j.getUTCHours())+I+Y(j.getUTCMinutes())+I+Y(j.getUTCSeconds())+"Z";},stringify:function(k,Y,j){return W&&C.JSON.useNativeStringify?W.stringify(k,Y,j):S(k,Y,j);}});},"3.0.0");YUI.add("json",function(A){},"3.0.0",{use:["json-parse","json-stringify"]});/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add('test', function(Y) {

    /**
     * YUI JavaScript Testing Framework
     *
     * @module test
     */

    
    Y.namespace("Test");
    
    /**
     * Test case containing various tests to run.
     * @param template An object containing any number of test methods, other methods,
     *                 an optional name, and anything else the test case needs.
     * @class Case
     * @namespace Test
     * @constructor
     */
    Y.Test.Case = function (template) {
        
        /**
         * Special rules for the test case. Possible subobjects
         * are fail, for tests that should fail, and error, for
         * tests that should throw an error.
         */
        this._should = {};
        
        //copy over all properties from the template to this object
        for (var prop in template) {
            this[prop] = template[prop];
        }    
        
        //check for a valid name
        if (!Y.Lang.isString(this.name)){
            /**
             * Name for the test case.
             */
            this.name = "testCase" + Y.guid();
        }
    
    };
            
    Y.Test.Case.prototype = {  
    
        /**
         * Resumes a paused test and runs the given function.
         * @param {Function} segment (Optional) The function to run.
         *      If omitted, the test automatically passes.
         * @return {Void}
         * @method resume
         */
        resume : function (segment) {
            Y.Test.Runner.resume(segment);
        },
    
        /**
         * Causes the test case to wait a specified amount of time and then
         * continue executing the given code.
         * @param {Function} segment (Optional) The function to run after the delay.
         *      If omitted, the TestRunner will wait until resume() is called.
         * @param {int} delay (Optional) The number of milliseconds to wait before running
         *      the function. If omitted, defaults to zero.
         * @return {Void}
         * @method wait
         */
        wait : function (segment, delay){
            var args = arguments;
            if (Y.Lang.isFunction(args[0])){
                throw new Y.Test.Wait(args[0], args[1]);
            } else {
                throw new Y.Test.Wait(function(){
                    Y.Assert.fail("Timeout: wait() called but resume() never called.");
                }, (Y.Lang.isNumber(args[0]) ? args[0] : 10000));
            }
        },
    
        //-------------------------------------------------------------------------
        // Stub Methods
        //-------------------------------------------------------------------------
    
        /**
         * Function to run before each test is executed.
         * @return {Void}
         * @method setUp
         */
        setUp : function () {
        },
        
        /**
         * Function to run after each test is executed.
         * @return {Void}
         * @method tearDown
         */
        tearDown: function () {    
        }
    };
    
    /**
     * Represents a stoppage in test execution to wait for an amount of time before
     * continuing.
     * @param {Function} segment A function to run when the wait is over.
     * @param {int} delay The number of milliseconds to wait before running the code.
     * @class Wait
     * @namespace Test
     * @constructor
     *
     */
    Y.Test.Wait = function (segment, delay) {
        
        /**
         * The segment of code to run when the wait is over.
         * @type Function
         * @property segment
         */
        this.segment = (Y.Lang.isFunction(segment) ? segment : null);
    
        /**
         * The delay before running the segment of code.
         * @type int
         * @property delay
         */
        this.delay = (Y.Lang.isNumber(delay) ? delay : 0);        
    };


        
    Y.namespace("Test");
    
    /**
     * A test suite that can contain a collection of TestCase and TestSuite objects.
     * @param {String||Object} data The name of the test suite or an object containing
     *      a name property as well as setUp and tearDown methods.
     * @namespace Test
     * @class Suite
     * @constructor
     */
    Y.Test.Suite = function (data /*:String||Object*/) {
    
        /**
         * The name of the test suite.
         * @type String
         * @property name
         */
        this.name = "";
    
        /**
         * Array of test suites and
         * @private
         */
        this.items = [];
    
        //initialize the properties
        if (Y.Lang.isString(data)){
            this.name = data;
        } else if (Y.Lang.isObject(data)){
            Y.mix(this, data, true);
        }
    
        //double-check name
        if (this.name === ""){
            this.name = "testSuite" + Y.guid();
        }
    
    };
    
    Y.Test.Suite.prototype = {
        
        /**
         * Adds a test suite or test case to the test suite.
         * @param {Y.Test.Suite||Y.Test.Case} testObject The test suite or test case to add.
         * @return {Void}
         * @method add
         */
        add : function (testObject /*:Y.Test.Suite*/) {
            if (testObject instanceof Y.Test.Suite || testObject instanceof Y.Test.Case) {
                this.items.push(testObject);
            }
            return this;
        },
        
        //-------------------------------------------------------------------------
        // Stub Methods
        //-------------------------------------------------------------------------
    
        /**
         * Function to run before each test is executed.
         * @return {Void}
         * @method setUp
         */
        setUp : function () {
        },
        
        /**
         * Function to run after each test is executed.
         * @return {Void}
         * @method tearDown
         */
        tearDown: function () {
        }
        
    };

    
    /*
     * Runs test suites and test cases, providing events to allowing for the
     * interpretation of test results.
     * @namespace Test
     * @class Runner
     * @static
     */
    Y.Test.Runner = (function(){
    
        /**
         * A node in the test tree structure. May represent a TestSuite, TestCase, or
         * test function.
         * @param {Variant} testObject A TestSuite, TestCase, or the name of a test function.
         * @class TestNode
         * @constructor
         * @private
         */
        function TestNode(testObject){
        
            /**
             * The TestSuite, TestCase, or test function represented by this node.
             * @type Variant
             * @property testObject
             */
            this.testObject = testObject;
            
            /**
             * Pointer to this node's first child.
             * @type TestNode
             * @property firstChild
             */        
            this.firstChild = null;
            
            /**
             * Pointer to this node's last child.
             * @type TestNode
             * @property lastChild
             */        
            this.lastChild = null;
            
            /**
             * Pointer to this node's parent.
             * @type TestNode
             * @property parent
             */        
            this.parent = null; 
       
            /**
             * Pointer to this node's next sibling.
             * @type TestNode
             * @property next
             */        
            this.next = null;
            
            /**
             * Test results for this test object.
             * @type object
             * @property results
             */                
            this.results = {
                passed : 0,
                failed : 0,
                total : 0,
                ignored : 0
            };
            
            //initialize results
            if (testObject instanceof Y.Test.Suite){
                this.results.type = "testsuite";
                this.results.name = testObject.name;
            } else if (testObject instanceof Y.Test.Case){
                this.results.type = "testcase";
                this.results.name = testObject.name;
            }
           
        }
        
        TestNode.prototype = {
        
            /**
             * Appends a new test object (TestSuite, TestCase, or test function name) as a child
             * of this node.
             * @param {Variant} testObject A TestSuite, TestCase, or the name of a test function.
             * @return {Void}
             */
            appendChild : function (testObject){
                var node = new TestNode(testObject);
                if (this.firstChild === null){
                    this.firstChild = this.lastChild = node;
                } else {
                    this.lastChild.next = node;
                    this.lastChild = node;
                }
                node.parent = this;
                return node;
            }       
        };
    
        /**
         * Runs test suites and test cases, providing events to allowing for the
         * interpretation of test results.
         * @namespace Test
         * @class Runner
         * @static
         */
        function TestRunner(){
        
            //inherit from EventProvider
            TestRunner.superclass.constructor.apply(this,arguments);
            
            /**
             * Suite on which to attach all TestSuites and TestCases to be run.
             * @type Y.Test.Suite
             * @property masterSuite
             * @static
             * @private
             */
            this.masterSuite /*:Y.Test.Suite*/ = new Y.Test.Suite("YUI Test Results");        
    
            /**
             * Pointer to the current node in the test tree.
             * @type TestNode
             * @private
             * @property _cur
             * @static
             */
            this._cur = null;
            
            /**
             * Pointer to the root node in the test tree.
             * @type TestNode
             * @private
             * @property _root
             * @static
             */
            this._root = null;
            
            /**
             * Indicates if the TestRunner will log events or not.
             * @type Boolean
             * @property _log
             * @private
             * @static
             */
            this._log = true;
            
            /**
             * Indicates if the TestRunner is waiting as a result of
             * wait() being called.
             * @type Boolean
             * @property _waiting
             * @private
             * @static
             */
            this._waiting = false;
            
            //create events
            var events = [
                this.TEST_CASE_BEGIN_EVENT,
                this.TEST_CASE_COMPLETE_EVENT,
                this.TEST_SUITE_BEGIN_EVENT,
                this.TEST_SUITE_COMPLETE_EVENT,
                this.TEST_PASS_EVENT,
                this.TEST_FAIL_EVENT,
                this.TEST_IGNORE_EVENT,
                this.COMPLETE_EVENT,
                this.BEGIN_EVENT
            ];
            for (var i=0; i < events.length; i++){
                this.subscribe(events[i], this._logEvent, this, true);
            }      
       
        }
        
        Y.extend(TestRunner, Y.Event.Target, {
        
            //-------------------------------------------------------------------------
            // Constants
            //-------------------------------------------------------------------------
             
            /**
             * Fires when a test case is opened but before the first 
             * test is executed.
             * @event testcasebegin
             * @static
             */         
            TEST_CASE_BEGIN_EVENT : "testcasebegin",
            
            /**
             * Fires when all tests in a test case have been executed.
             * @event testcasecomplete
             * @static
             */        
            TEST_CASE_COMPLETE_EVENT : "testcasecomplete",
            
            /**
             * Fires when a test suite is opened but before the first 
             * test is executed.
             * @event testsuitebegin
             * @static
             */        
            TEST_SUITE_BEGIN_EVENT : "testsuitebegin",
            
            /**
             * Fires when all test cases in a test suite have been
             * completed.
             * @event testsuitecomplete
             * @static
             */        
            TEST_SUITE_COMPLETE_EVENT : "testsuitecomplete",
            
            /**
             * Fires when a test has passed.
             * @event pass
             * @static
             */        
            TEST_PASS_EVENT : "pass",
            
            /**
             * Fires when a test has failed.
             * @event fail
             * @static
             */        
            TEST_FAIL_EVENT : "fail",
            
            /**
             * Fires when a test has been ignored.
             * @event ignore
             * @static
             */        
            TEST_IGNORE_EVENT : "ignore",
            
            /**
             * Fires when all test suites and test cases have been completed.
             * @event complete
             * @static
             */        
            COMPLETE_EVENT : "complete",
            
            /**
             * Fires when the run() method is called.
             * @event begin
             * @static
             */        
            BEGIN_EVENT : "begin",    
            
            //-------------------------------------------------------------------------
            // Logging-Related Methods
            //-------------------------------------------------------------------------
    
            
            /**
             * Disable logging via Y.log(). Test output will not be visible unless
             * TestRunner events are subscribed to.
             * @return {Void}
             * @method disableLogging
             * @static
             */
            disableLogging: function(){
                this._log = false;
            },    
            
            /**
             * Enable logging via Y.log(). Test output is published and can be read via
             * logreader.
             * @return {Void}
             * @method enableLogging
             * @static
             */
            enableLogging: function(){
                this._log = true;
            },
            
            /**
             * Logs TestRunner events using Y.log().
             * @param {Object} event The event object for the event.
             * @return {Void}
             * @method _logEvent
             * @private
             * @static
             */
            _logEvent: function(event){
                
                //data variables
                var message = "";
                var messageType = "";
                
                switch(event.type){
                    case this.BEGIN_EVENT:
                        message = "Testing began at " + (new Date()).toString() + ".";
                        messageType = "info";
                        break;
                        
                    case this.COMPLETE_EVENT:
                        message = "Testing completed at " + (new Date()).toString() + ".\nPassed:" + 
                            event.results.passed + " Failed:" + event.results.failed + " Total:" + event.results.total;
                        messageType = "info";
                        break;
                        
                    case this.TEST_FAIL_EVENT:
                        message = event.testName + ": failed.\n" + event.error.getMessage();
                        messageType = "fail";
                        break;
                        
                    case this.TEST_IGNORE_EVENT:
                        message = event.testName + ": ignored.";
                        messageType = "ignore";
                        break;
                        
                    case this.TEST_PASS_EVENT:
                        message = event.testName + ": passed.";
                        messageType = "pass";
                        break;
                        
                    case this.TEST_SUITE_BEGIN_EVENT:
                        message = "Test suite \"" + event.testSuite.name + "\" started.";
                        messageType = "info";
                        break;
                        
                    case this.TEST_SUITE_COMPLETE_EVENT:
                        message = "Test suite \"" + event.testSuite.name + "\" completed.\nPassed:" + 
                            event.results.passed + " Failed:" + event.results.failed + " Total:" + event.results.total;
                        messageType = "info";
                        break;
                        
                    case this.TEST_CASE_BEGIN_EVENT:
                        message = "Test case \"" + event.testCase.name + "\" started.";
                        messageType = "info";
                        break;
                        
                    case this.TEST_CASE_COMPLETE_EVENT:
                        message = "Test case \"" + event.testCase.name + "\" completed.\nPassed:" + 
                            event.results.passed + " Failed:" + event.results.failed + " Total:" + event.results.total;
                        messageType = "info";
                        break;
                    default:
                        message = "Unexpected event " + event.type;
                        message = "info";
                }
            
                //only log if required
                if (this._log){
                    Y.log(message, messageType, "TestRunner");
                }
            },

            //-------------------------------------------------------------------------
            // Test Tree-Related Methods
            //-------------------------------------------------------------------------
    
            /**
             * Adds a test case to the test tree as a child of the specified node.
             * @param {TestNode} parentNode The node to add the test case to as a child.
             * @param {Y.Test.Case} testCase The test case to add.
             * @return {Void}
             * @static
             * @private
             * @method _addTestCaseToTestTree
             */
           _addTestCaseToTestTree : function (parentNode, testCase /*:Y.Test.Case*/){
                
                //add the test suite
                var node = parentNode.appendChild(testCase),
                    prop,
                    testName;
                
                //iterate over the items in the test case
                for (prop in testCase){
                    if ((prop.indexOf("test") === 0 || (prop.toLowerCase().indexOf("should") > -1 && prop.indexOf(" ") > -1 ))&& Y.Lang.isFunction(testCase[prop])){
                        node.appendChild(prop);
                    }
                }
             
            },
            
            /**
             * Adds a test suite to the test tree as a child of the specified node.
             * @param {TestNode} parentNode The node to add the test suite to as a child.
             * @param {Y.Test.Suite} testSuite The test suite to add.
             * @return {Void}
             * @static
             * @private
             * @method _addTestSuiteToTestTree
             */
            _addTestSuiteToTestTree : function (parentNode, testSuite /*:Y.Test.Suite*/) {
                
                //add the test suite
                var node = parentNode.appendChild(testSuite);
                
                //iterate over the items in the master suite
                for (var i=0; i < testSuite.items.length; i++){
                    if (testSuite.items[i] instanceof Y.Test.Suite) {
                        this._addTestSuiteToTestTree(node, testSuite.items[i]);
                    } else if (testSuite.items[i] instanceof Y.Test.Case) {
                        this._addTestCaseToTestTree(node, testSuite.items[i]);
                    }                   
                }            
            },
            
            /**
             * Builds the test tree based on items in the master suite. The tree is a hierarchical
             * representation of the test suites, test cases, and test functions. The resulting tree
             * is stored in _root and the pointer _cur is set to the root initially.
             * @return {Void}
             * @static
             * @private
             * @method _buildTestTree
             */
            _buildTestTree : function () {
            
                this._root = new TestNode(this.masterSuite);
                this._cur = this._root;
                
                //iterate over the items in the master suite
                for (var i=0; i < this.masterSuite.items.length; i++){
                    if (this.masterSuite.items[i] instanceof Y.Test.Suite) {
                        this._addTestSuiteToTestTree(this._root, this.masterSuite.items[i]);
                    } else if (this.masterSuite.items[i] instanceof Y.Test.Case) {
                        this._addTestCaseToTestTree(this._root, this.masterSuite.items[i]);
                    }                   
                }            
            
            }, 
        
            //-------------------------------------------------------------------------
            // Private Methods
            //-------------------------------------------------------------------------
            
            /**
             * Handles the completion of a test object's tests. Tallies test results 
             * from one level up to the next.
             * @param {TestNode} node The TestNode representing the test object.
             * @return {Void}
             * @method _handleTestObjectComplete
             * @private
             */
            _handleTestObjectComplete : function (node) {
                if (Y.Lang.isObject(node.testObject)){
                    node.parent.results.passed += node.results.passed;
                    node.parent.results.failed += node.results.failed;
                    node.parent.results.total += node.results.total;                
                    node.parent.results.ignored += node.results.ignored;                
                    node.parent.results[node.testObject.name] = node.results;
                
                    if (node.testObject instanceof Y.Test.Suite){
                        node.testObject.tearDown();
                        this.fire(this.TEST_SUITE_COMPLETE_EVENT, { testSuite: node.testObject, results: node.results});
                    } else if (node.testObject instanceof Y.Test.Case){
                        this.fire(this.TEST_CASE_COMPLETE_EVENT, { testCase: node.testObject, results: node.results});
                    }      
                } 
            },                
            
            //-------------------------------------------------------------------------
            // Navigation Methods
            //-------------------------------------------------------------------------
            
            /**
             * Retrieves the next node in the test tree.
             * @return {TestNode} The next node in the test tree or null if the end is reached.
             * @private
             * @static
             * @method _next
             */
            _next : function () {
            
                if (this._cur.firstChild) {
                    this._cur = this._cur.firstChild;
                } else if (this._cur.next) {
                    this._cur = this._cur.next;            
                } else {
                    while (this._cur && !this._cur.next && this._cur !== this._root){
                        this._handleTestObjectComplete(this._cur);
                        this._cur = this._cur.parent;
                    }
                    
                    if (this._cur == this._root){
                        this._cur.results.type = "report";
                        this._cur.results.timestamp = (new Date()).toLocaleString();
                        this._cur.results.duration = (new Date()) - this._cur.results.duration;                            
                        this.fire(this.COMPLETE_EVENT, { results: this._cur.results});
                        this._cur = null;
                    } else {
                        this._handleTestObjectComplete(this._cur);               
                        this._cur = this._cur.next;                
                    }
                }
            
                return this._cur;
            },
            
            /**
             * Runs a test case or test suite, returning the results.
             * @param {Y.Test.Case|Y.Test.Suite} testObject The test case or test suite to run.
             * @return {Object} Results of the execution with properties passed, failed, and total.
             * @private
             * @method _run
             * @static
             */
            _run : function () {
            
                //flag to indicate if the TestRunner should wait before continuing
                var shouldWait = false;
                
                //get the next test node
                var node = this._next();
                
                if (node !== null) {
                    var testObject = node.testObject;
                    
                    //figure out what to do
                    if (Y.Lang.isObject(testObject)){
                        if (testObject instanceof Y.Test.Suite){
                            this.fire(this.TEST_SUITE_BEGIN_EVENT, { testSuite: testObject });
                            testObject.setUp();
                        } else if (testObject instanceof Y.Test.Case){
                            this.fire(this.TEST_CASE_BEGIN_EVENT, { testCase: testObject });
                        }
                        
                        //some environments don't support setTimeout
                        if (typeof setTimeout != "undefined"){                    
                            setTimeout(function(){
                                Y.Test.Runner._run();
                            }, 0);
                        } else {
                            this._run();
                        }
                    } else {
                        this._runTest(node);
                    }
    
                }
            },
            
            _resumeTest : function (segment) {
            
                //get relevant information
                var node = this._cur;                
                
                //we know there's no more waiting now
                this._waiting = false;
                
                //if there's no node, it probably means a wait() was called after resume()
                if (!node){
                    //TODO: Handle in some way?
                    //console.log("wait() called after resume()");
                    //this.fire("error", { testCase: "(unknown)", test: "(unknown)", error: new Error("wait() called after resume()")} );
                    return;
                }
                
                var testName = node.testObject;
                var testCase /*:Y.Test.Case*/ = node.parent.testObject;
            
                //cancel other waits if available
                if (testCase.__yui_wait){
                    clearTimeout(testCase.__yui_wait);
                    delete testCase.__yui_wait;
                }

                //get the "should" test cases
                var shouldFail = (testCase._should.fail || {})[testName];
                var shouldError = (testCase._should.error || {})[testName];
                
                //variable to hold whether or not the test failed
                var failed = false;
                var error = null;
                    
                //try the test
                try {
                
                    //run the test
                    segment.apply(testCase);
                    
                    //if it should fail, and it got here, then it's a fail because it didn't
                    if (shouldFail){
                        error = new Y.Assert.ShouldFail();
                        failed = true;
                    } else if (shouldError){
                        error = new Y.Assert.ShouldError();
                        failed = true;
                    }
                               
                } catch (thrown){

                    //cancel any pending waits, the test already failed
                    if (testCase.__yui_wait){
                        clearTimeout(testCase.__yui_wait);
                        delete testCase.__yui_wait;
                    }                    
                
                    //figure out what type of error it was
                    if (thrown instanceof Y.Assert.Error) {
                        if (!shouldFail){
                            error = thrown;
                            failed = true;
                        }
                    } else if (thrown instanceof Y.Test.Wait){
                    
                        if (Y.Lang.isFunction(thrown.segment)){
                            if (Y.Lang.isNumber(thrown.delay)){
                            
                                //some environments don't support setTimeout
                                if (typeof setTimeout != "undefined"){
                                    testCase.__yui_wait = setTimeout(function(){
                                        Y.Test.Runner._resumeTest(thrown.segment);
                                    }, thrown.delay);
                                    this._waiting = true;
                                } else {
                                    throw new Error("Asynchronous tests not supported in this environment.");
                                }
                            }
                        }
                        
                        return;
                    
                    } else {
                        //first check to see if it should error
                        if (!shouldError) {                        
                            error = new Y.Assert.UnexpectedError(thrown);
                            failed = true;
                        } else {
                            //check to see what type of data we have
                            if (Y.Lang.isString(shouldError)){
                                
                                //if it's a string, check the error message
                                if (thrown.message != shouldError){
                                    error = new Y.Assert.UnexpectedError(thrown);
                                    failed = true;                                    
                                }
                            } else if (Y.Lang.isFunction(shouldError)){
                            
                                //if it's a function, see if the error is an instance of it
                                if (!(thrown instanceof shouldError)){
                                    error = new Y.Assert.UnexpectedError(thrown);
                                    failed = true;
                                }
                            
                            } else if (Y.Lang.isObject(shouldError)){
                            
                                //if it's an object, check the instance and message
                                if (!(thrown instanceof shouldError.constructor) || 
                                        thrown.message != shouldError.message){
                                    error = new Y.Assert.UnexpectedError(thrown);
                                    failed = true;                                    
                                }
                            
                            }
                        
                        }
                    }
                    
                }
                
                //fire appropriate event
                if (failed) {
                    this.fire(this.TEST_FAIL_EVENT, { testCase: testCase, testName: testName, error: error });
                } else {
                    this.fire(this.TEST_PASS_EVENT, { testCase: testCase, testName: testName });
                }
                
                //run the tear down
                testCase.tearDown();
                
                //update results
                node.parent.results[testName] = { 
                    result: failed ? "fail" : "pass",
                    message: error ? error.getMessage() : "Test passed",
                    type: "test",
                    name: testName
                };
                
                if (failed){
                    node.parent.results.failed++;
                } else {
                    node.parent.results.passed++;
                }
                node.parent.results.total++;
    
                //set timeout not supported in all environments
                if (typeof setTimeout != "undefined"){
                    setTimeout(function(){
                        Y.Test.Runner._run();
                    }, 0);
                } else {
                    this._run();
                }
            
            },
            
            /**
             * Handles an error as if it occurred within the currently executing
             * test. This is for mock methods that may be called asynchronously
             * and therefore out of the scope of the TestRunner. Previously, this
             * error would bubble up to the browser. Now, this method is used
             * to tell TestRunner about the error. This should never be called
             * by anyplace other than the Mock object.
             * @param {Error} error The error object.
             * @return {Void}
             * @method _handleError
             * @private
             * @static
             */
            _handleError: function(error){
            
                if (this._waiting){
                    this._resumeTest(function(){
                        throw error;
                    });
                } else {
                    throw error;
                }           
            
            },
                    
            /**
             * Runs a single test based on the data provided in the node.
             * @param {TestNode} node The TestNode representing the test to run.
             * @return {Void}
             * @static
             * @private
             * @name _runTest
             */
            _runTest : function (node) {
            
                //get relevant information
                var testName = node.testObject;
                var testCase /*:Y.Test.Case*/ = node.parent.testObject;
                var test = testCase[testName];
                
                //get the "should" test cases
                var shouldIgnore = (testCase._should.ignore || {})[testName];
                
                //figure out if the test should be ignored or not
                if (shouldIgnore){
                
                    //update results
                    node.parent.results[testName] = { 
                        result: "ignore",
                        message: "Test ignored",
                        type: "test",
                        name: testName
                    };
                    
                    node.parent.results.ignored++;
                    node.parent.results.total++;
                
                    this.fire(this.TEST_IGNORE_EVENT, { testCase: testCase, testName: testName });
                    
                    //some environments don't support setTimeout
                    if (typeof setTimeout != "undefined"){                    
                        setTimeout(function(){
                            Y.Test.Runner._run();
                        }, 0);              
                    } else {
                        this._run();
                    }
    
                } else {
                
                    //run the setup
                    testCase.setUp();
                    
                    //now call the body of the test
                    this._resumeTest(test);                
                }
    
            },        
            
            //-------------------------------------------------------------------------
            // Protected Methods
            //-------------------------------------------------------------------------   
        
            /*
             * Fires events for the TestRunner. This overrides the default fire()
             * method from EventProvider to add the type property to the data that is
             * passed through on each event call.
             * @param {String} type The type of event to fire.
             * @param {Object} data (Optional) Data for the event.
             * @method fire
             * @static
             * @protected
             */
            fire : function (type, data) {
                data = data || {};
                data.type = type;
                TestRunner.superclass.fire.call(this, type, data);
            },
            
            //-------------------------------------------------------------------------
            // Public Methods
            //-------------------------------------------------------------------------   
        
            /**
             * Adds a test suite or test case to the list of test objects to run.
             * @param testObject Either a TestCase or a TestSuite that should be run.
             * @return {Void}
             * @method add
             * @static
             */
            add : function (testObject) {
                this.masterSuite.add(testObject);
                return this;
            },
            
            /**
             * Removes all test objects from the runner.
             * @return {Void}
             * @method clear
             * @static
             */
            clear : function () {
                this.masterSuite.items = [];
            },
            
            /**
             * Indicates if the TestRunner is waiting for a test to resume
             * @return {Boolean} True if the TestRunner is waiting, false if not.
             * @method isWaiting
             * @static
             */
            isWaiting: function() {
                return this._waiting;
            },
            
            /**
             * Resumes the TestRunner after wait() was called.
             * @param {Function} segment The function to run as the rest
             *      of the haulted test.
             * @return {Void}
             * @method resume
             * @static
             */
            resume : function (segment) {
                this._resumeTest(segment || function(){});
            },
        
            /**
             * Runs the test suite.
             * @return {Void}
             * @method run
             * @static
             */
            run : function (testObject) {
                
                //pointer to runner to avoid scope issues 
                var runner = Y.Test.Runner;
    
                //build the test tree
                runner._buildTestTree();
                            
                //set when the test started
                runner._root.results.duration = (new Date()).valueOf();
                
                //fire the begin event
                runner.fire(runner.BEGIN_EVENT);
           
                //begin the testing
                runner._run();
            }    
        });
        
        return new TestRunner();
        
    })();

  
    /**
     * The Assert object provides functions to test JavaScript values against
     * known and expected results. Whenever a comparison (assertion) fails,
     * an error is thrown.
     *
     * @class Assert
     * @static
     */
    Y.Assert = {
    
        /**
         * The number of assertions performed.
         * @property _asserts
         * @type int
         * @private
         */
        _asserts: 0,
    
        //-------------------------------------------------------------------------
        // Helper Methods
        //-------------------------------------------------------------------------
        
        /**
         * Formats a message so that it can contain the original assertion message
         * in addition to the custom message.
         * @param {String} customMessage The message passed in by the developer.
         * @param {String} defaultMessage The message created by the error by default.
         * @return {String} The final error message, containing either or both.
         * @protected
         * @static
         * @method _formatMessage
         */
        _formatMessage : function (customMessage, defaultMessage) {
            var message = customMessage;
            if (Y.Lang.isString(customMessage) && customMessage.length > 0){
                return Y.Lang.substitute(customMessage, { message: defaultMessage });
            } else {
                return defaultMessage;
            }        
        },
        
        /**
         * Returns the number of assertions that have been performed.
         * @method _getCount
         * @protected
         * @static
         */
        _getCount: function(){
            return this._asserts;
        },
        
        /**
         * Increments the number of assertions that have been performed.
         * @method _increment
         * @protected
         * @static
         */
        _increment: function(){
            this._asserts++;
        },
        
        /**
         * Resets the number of assertions that have been performed to 0.
         * @method _reset
         * @protected
         * @static
         */
        _reset: function(){
            this._asserts = 0;
        },
        
        //-------------------------------------------------------------------------
        // Generic Assertion Methods
        //-------------------------------------------------------------------------
        
        /** 
         * Forces an assertion error to occur.
         * @param {String} message (Optional) The message to display with the failure.
         * @method fail
         * @static
         */
        fail : function (message) {
            throw new Y.Assert.Error(Y.Assert._formatMessage(message, "Test force-failed."));
        },       
        
        //-------------------------------------------------------------------------
        // Equality Assertion Methods
        //-------------------------------------------------------------------------    
        
        /**
         * Asserts that a value is equal to another. This uses the double equals sign
         * so type cohersion may occur.
         * @param {Object} expected The expected value.
         * @param {Object} actual The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method areEqual
         * @static
         */
        areEqual : function (expected, actual, message) {
            Y.Assert._increment();
            if (expected != actual) {
                throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Values should be equal."), expected, actual);
            }
        },
        
        /**
         * Asserts that a value is not equal to another. This uses the double equals sign
         * so type cohersion may occur.
         * @param {Object} unexpected The unexpected value.
         * @param {Object} actual The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method areNotEqual
         * @static
         */
        areNotEqual : function (unexpected, actual, 
                             message) {
            Y.Assert._increment();
            if (unexpected == actual) {
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Values should not be equal."), unexpected);
            }
        },
        
        /**
         * Asserts that a value is not the same as another. This uses the triple equals sign
         * so no type cohersion may occur.
         * @param {Object} unexpected The unexpected value.
         * @param {Object} actual The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method areNotSame
         * @static
         */
        areNotSame : function (unexpected, actual, message) {
            Y.Assert._increment();
            if (unexpected === actual) {
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Values should not be the same."), unexpected);
            }
        },
    
        /**
         * Asserts that a value is the same as another. This uses the triple equals sign
         * so no type cohersion may occur.
         * @param {Object} expected The expected value.
         * @param {Object} actual The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method areSame
         * @static
         */
        areSame : function (expected, actual, message) {
            Y.Assert._increment();
            if (expected !== actual) {
                throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Values should be the same."), expected, actual);
            }
        },    
        
        //-------------------------------------------------------------------------
        // Boolean Assertion Methods
        //-------------------------------------------------------------------------    
        
        /**
         * Asserts that a value is false. This uses the triple equals sign
         * so no type cohersion may occur.
         * @param {Object} actual The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isFalse
         * @static
         */
        isFalse : function (actual, message) {
            Y.Assert._increment();
            if (false !== actual) {
                throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Value should be false."), false, actual);
            }
        },
        
        /**
         * Asserts that a value is true. This uses the triple equals sign
         * so no type cohersion may occur.
         * @param {Object} actual The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isTrue
         * @static
         */
        isTrue : function (actual, message) {
            Y.Assert._increment();
            if (true !== actual) {
                throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Value should be true."), true, actual);
            }
    
        },
        
        //-------------------------------------------------------------------------
        // Special Value Assertion Methods
        //-------------------------------------------------------------------------    
        
        /**
         * Asserts that a value is not a number.
         * @param {Object} actual The value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isNaN
         * @static
         */
        isNaN : function (actual, message){
            Y.Assert._increment();
            if (!isNaN(actual)){
                throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Value should be NaN."), NaN, actual);
            }    
        },
        
        /**
         * Asserts that a value is not the special NaN value.
         * @param {Object} actual The value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isNotNaN
         * @static
         */
        isNotNaN : function (actual, message){
            Y.Assert._increment();
            if (isNaN(actual)){
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Values should not be NaN."), NaN);
            }    
        },
        
        /**
         * Asserts that a value is not null. This uses the triple equals sign
         * so no type cohersion may occur.
         * @param {Object} actual The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isNotNull
         * @static
         */
        isNotNull : function (actual, message) {
            Y.Assert._increment();
            if (Y.Lang.isNull(actual)) {
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Values should not be null."), null);
            }
        },
    
        /**
         * Asserts that a value is not undefined. This uses the triple equals sign
         * so no type cohersion may occur.
         * @param {Object} actual The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isNotUndefined
         * @static
         */
        isNotUndefined : function (actual, message) {
            Y.Assert._increment();
            if (Y.Lang.isUndefined(actual)) {
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Value should not be undefined."), undefined);
            }
        },
    
        /**
         * Asserts that a value is null. This uses the triple equals sign
         * so no type cohersion may occur.
         * @param {Object} actual The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isNull
         * @static
         */
        isNull : function (actual, message) {
            Y.Assert._increment();
            if (!Y.Lang.isNull(actual)) {
                throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Value should be null."), null, actual);
            }
        },
            
        /**
         * Asserts that a value is undefined. This uses the triple equals sign
         * so no type cohersion may occur.
         * @param {Object} actual The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isUndefined
         * @static
         */
        isUndefined : function (actual, message) {
            Y.Assert._increment();
            if (!Y.Lang.isUndefined(actual)) {
                throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Value should be undefined."), undefined, actual);
            }
        },    
        
        //--------------------------------------------------------------------------
        // Instance Assertion Methods
        //--------------------------------------------------------------------------    
       
        /**
         * Asserts that a value is an array.
         * @param {Object} actual The value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isArray
         * @static
         */
        isArray : function (actual, message) {
            Y.Assert._increment();
            if (!Y.Lang.isArray(actual)){
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Value should be an array."), actual);
            }    
        },
       
        /**
         * Asserts that a value is a Boolean.
         * @param {Object} actual The value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isBoolean
         * @static
         */
        isBoolean : function (actual, message) {
            Y.Assert._increment();
            if (!Y.Lang.isBoolean(actual)){
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Value should be a Boolean."), actual);
            }    
        },
       
        /**
         * Asserts that a value is a function.
         * @param {Object} actual The value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isFunction
         * @static
         */
        isFunction : function (actual, message) {
            Y.Assert._increment();
            if (!Y.Lang.isFunction(actual)){
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Value should be a function."), actual);
            }    
        },
       
        /**
         * Asserts that a value is an instance of a particular object. This may return
         * incorrect results when comparing objects from one frame to constructors in
         * another frame. For best results, don't use in a cross-frame manner.
         * @param {Function} expected The function that the object should be an instance of.
         * @param {Object} actual The object to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isInstanceOf
         * @static
         */
        isInstanceOf : function (expected, actual, message) {
            Y.Assert._increment();
            if (!(actual instanceof expected)){
                throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Value isn't an instance of expected type."), expected, actual);
            }
        },
        
        /**
         * Asserts that a value is a number.
         * @param {Object} actual The value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isNumber
         * @static
         */
        isNumber : function (actual, message) {
            Y.Assert._increment();
            if (!Y.Lang.isNumber(actual)){
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Value should be a number."), actual);
            }    
        },    
        
        /**
         * Asserts that a value is an object.
         * @param {Object} actual The value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isObject
         * @static
         */
        isObject : function (actual, message) {
            Y.Assert._increment();
            if (!Y.Lang.isObject(actual)){
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Value should be an object."), actual);
            }
        },
        
        /**
         * Asserts that a value is a string.
         * @param {Object} actual The value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isString
         * @static
         */
        isString : function (actual, message) {
            Y.Assert._increment();
            if (!Y.Lang.isString(actual)){
                throw new Y.Assert.UnexpectedValue(Y.Assert._formatMessage(message, "Value should be a string."), actual);
            }
        },
        
        /**
         * Asserts that a value is of a particular type. 
         * @param {String} expectedType The expected type of the variable.
         * @param {Object} actualValue The actual value to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isTypeOf
         * @static
         */
        isTypeOf : function (expectedType, actualValue, message){
            Y.Assert._increment();
            if (typeof actualValue != expectedType){
                throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Value should be of type " + expectedType + "."), expected, typeof actualValue);
            }
        }
    };
    
    /**
     * Asserts that a given condition is true. If not, then a Y.Assert.Error object is thrown
     * and the test fails.
     * @method Y.assert
     * @param {Boolean} condition The condition to test.
     * @param {String} message The message to display if the assertion fails.
     * @static
     */
    Y.assert = function(condition, message){
        Y.Assert._increment();
        if (!condition){
            throw new Y.Assert.Error(Y.Assert._formatMessage(message, "Assertion failed."));
        }
    };

    /**
     * Forces an assertion error to occur. Shortcut for Y.Assert.fail().
     * @method Y.fail
     * @param {String} message (Optional) The message to display with the failure.
     * @static
     */
    Y.fail = Y.Assert.fail;   
    
    //-----------------------------------------------------------------------------
    // Assertion errors
    //-----------------------------------------------------------------------------
    
    /**
     * Error is thrown whenever an assertion fails. It provides methods
     * to more easily get at error information and also provides a base class
     * from which more specific assertion errors can be derived.
     *
     * @param {String} message The message to display when the error occurs.
     * @namespace Assert
     * @class Error
     * @constructor
     */ 
    Y.Assert.Error = function (message){
    
        //call superclass
        arguments.callee.superclass.constructor.call(this, message);
        
        /*
         * Error message. Must be duplicated to ensure browser receives it.
         * @type String
         * @property message
         */
        this.message = message;
        
        /**
         * The name of the error that occurred.
         * @type String
         * @property name
         */
        this.name = "Assert Error";
    };
    
    //inherit methods
    Y.extend(Y.Assert.Error, Error, {
    
        /**
         * Returns a fully formatted error for an assertion failure. This should
         * be overridden by all subclasses to provide specific information.
         * @method getMessage
         * @return {String} A string describing the error.
         */
        getMessage : function () {
            return this.message;
        },
        
        /**
         * Returns a string representation of the error.
         * @method toString
         * @return {String} A string representation of the error.
         */
        toString : function () {
            return this.name + ": " + this.getMessage();
        },
        
        /**
         * Returns a primitive value version of the error. Same as toString().
         * @method valueOf
         * @return {String} A primitive value version of the error.
         */
        valueOf : function () {
            return this.toString();
        }
    
    });
    
    /**
     * ComparisonFailure is subclass of Error that is thrown whenever
     * a comparison between two values fails. It provides mechanisms to retrieve
     * both the expected and actual value.
     *
     * @param {String} message The message to display when the error occurs.
     * @param {Object} expected The expected value.
     * @param {Object} actual The actual value that caused the assertion to fail.
     * @namespace Assert 
     * @extends Assert.Error
     * @class ComparisonFailure
     * @constructor
     */ 
    Y.Assert.ComparisonFailure = function (message, expected, actual){
    
        //call superclass
        arguments.callee.superclass.constructor.call(this, message);
        
        /**
         * The expected value.
         * @type Object
         * @property expected
         */
        this.expected = expected;
        
        /**
         * The actual value.
         * @type Object
         * @property actual
         */
        this.actual = actual;
        
        /**
         * The name of the error that occurred.
         * @type String
         * @property name
         */
        this.name = "ComparisonFailure";
        
    };
    
    //inherit methods
    Y.extend(Y.Assert.ComparisonFailure, Y.Assert.Error, {
    
        /**
         * Returns a fully formatted error for an assertion failure. This message
         * provides information about the expected and actual values.
         * @method toString
         * @return {String} A string describing the error.
         */
        getMessage : function () {
            return this.message + "\nExpected: " + this.expected + " (" + (typeof this.expected) + ")"  +
                "\nActual: " + this.actual + " (" + (typeof this.actual) + ")";
        }
    
    });
    
    /**
     * UnexpectedValue is subclass of Error that is thrown whenever
     * a value was unexpected in its scope. This typically means that a test
     * was performed to determine that a value was *not* equal to a certain
     * value.
     *
     * @param {String} message The message to display when the error occurs.
     * @param {Object} unexpected The unexpected value.
     * @namespace Assert
     * @extends Assert.Error
     * @class UnexpectedValue
     * @constructor
     */ 
    Y.Assert.UnexpectedValue = function (message, unexpected){
    
        //call superclass
        arguments.callee.superclass.constructor.call(this, message);
        
        /**
         * The unexpected value.
         * @type Object
         * @property unexpected
         */
        this.unexpected = unexpected;
        
        /**
         * The name of the error that occurred.
         * @type String
         * @property name
         */
        this.name = "UnexpectedValue";
        
    };
    
    //inherit methods
    Y.extend(Y.Assert.UnexpectedValue, Y.Assert.Error, {
    
        /**
         * Returns a fully formatted error for an assertion failure. The message
         * contains information about the unexpected value that was encountered.
         * @method getMessage
         * @return {String} A string describing the error.
         */
        getMessage : function () {
            return this.message + "\nUnexpected: " + this.unexpected + " (" + (typeof this.unexpected) + ") ";
        }
    
    });
    
    /**
     * ShouldFail is subclass of Error that is thrown whenever
     * a test was expected to fail but did not.
     *
     * @param {String} message The message to display when the error occurs.
     * @namespace Assert
     * @extends Assert.Error
     * @class ShouldFail
     * @constructor
     */  
    Y.Assert.ShouldFail = function (message){
    
        //call superclass
        arguments.callee.superclass.constructor.call(this, message || "This test should fail but didn't.");
        
        /**
         * The name of the error that occurred.
         * @type String
         * @property name
         */
        this.name = "ShouldFail";
        
    };
    
    //inherit methods
    Y.extend(Y.Assert.ShouldFail, Y.Assert.Error);
    
    /**
     * ShouldError is subclass of Error that is thrown whenever
     * a test is expected to throw an error but doesn't.
     *
     * @param {String} message The message to display when the error occurs.
     * @namespace Assert
     * @extends Assert.Error
     * @class ShouldError
     * @constructor
     */  
    Y.Assert.ShouldError = function (message){
    
        //call superclass
        arguments.callee.superclass.constructor.call(this, message || "This test should have thrown an error but didn't.");
        
        /**
         * The name of the error that occurred.
         * @type String
         * @property name
         */
        this.name = "ShouldError";
        
    };
    
    //inherit methods
    Y.extend(Y.Assert.ShouldError, Y.Assert.Error);
    
    /**
     * UnexpectedError is subclass of Error that is thrown whenever
     * an error occurs within the course of a test and the test was not expected
     * to throw an error.
     *
     * @param {Error} cause The unexpected error that caused this error to be 
     *                      thrown.
     * @namespace Assert
     * @extends Assert.Error
     * @class UnexpectedError
     * @constructor
     */  
    Y.Assert.UnexpectedError = function (cause){
    
        //call superclass
        arguments.callee.superclass.constructor.call(this, "Unexpected error: " + cause.message);
        
        /**
         * The unexpected error that occurred.
         * @type Error
         * @property cause
         */
        this.cause = cause;
        
        /**
         * The name of the error that occurred.
         * @type String
         * @property name
         */
        this.name = "UnexpectedError";
        
        /**
         * Stack information for the error (if provided).
         * @type String
         * @property stack
         */
        this.stack = cause.stack;
        
    };
    
    //inherit methods
    Y.extend(Y.Assert.UnexpectedError, Y.Assert.Error);
    

   
    /**
     * The ArrayAssert object provides functions to test JavaScript array objects
     * for a variety of cases.
     *
     * @class ArrayAssert
     * @static
     */
     
    Y.ArrayAssert = {
    
        /**
         * Asserts that a value is present in an array. This uses the triple equals 
         * sign so no type cohersion may occur.
         * @param {Object} needle The value that is expected in the array.
         * @param {Array} haystack An array of values.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method contains
         * @static
         */
        contains : function (needle, haystack, 
                               message) {
            
            Y.Assert._increment();               

            if (Y.Array.indexOf(haystack, needle) == -1){
                Y.Assert.fail(Y.Assert._formatMessage(message, "Value " + needle + " (" + (typeof needle) + ") not found in array [" + haystack + "]."));
            }
        },
    
        /**
         * Asserts that a set of values are present in an array. This uses the triple equals 
         * sign so no type cohersion may occur. For this assertion to pass, all values must
         * be found.
         * @param {Object[]} needles An array of values that are expected in the array.
         * @param {Array} haystack An array of values to check.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method containsItems
         * @static
         */
        containsItems : function (needles, haystack, 
                               message) {
            Y.Assert._increment();               
    
            //begin checking values
            for (var i=0; i < needles.length; i++){
                if (Y.Array.indexOf(haystack, needles[i]) == -1){
                    Y.Assert.fail(Y.Assert._formatMessage(message, "Value " + needles[i] + " (" + (typeof needles[i]) + ") not found in array [" + haystack + "]."));
                }
            }
        },
    
        /**
         * Asserts that a value matching some condition is present in an array. This uses
         * a function to determine a match.
         * @param {Function} matcher A function that returns true if the items matches or false if not.
         * @param {Array} haystack An array of values.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method containsMatch
         * @static
         */
        containsMatch : function (matcher, haystack, 
                               message) {
            
            Y.Assert._increment();               
            //check for valid matcher
            if (typeof matcher != "function"){
                throw new TypeError("ArrayAssert.containsMatch(): First argument must be a function.");
            }
            
            if (!Y.Array.some(haystack, matcher)){
                Y.Assert.fail(Y.Assert._formatMessage(message, "No match found in array [" + haystack + "]."));
            }
        },
    
        /**
         * Asserts that a value is not present in an array. This uses the triple equals 
         * Asserts that a value is not present in an array. This uses the triple equals 
         * sign so no type cohersion may occur.
         * @param {Object} needle The value that is expected in the array.
         * @param {Array} haystack An array of values.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method doesNotContain
         * @static
         */
        doesNotContain : function (needle, haystack, 
                               message) {
            
            Y.Assert._increment();               

            if (Y.Array.indexOf(haystack, needle) > -1){
                Y.Assert.fail(Y.Assert._formatMessage(message, "Value found in array [" + haystack + "]."));
            }
        },
    
        /**
         * Asserts that a set of values are not present in an array. This uses the triple equals 
         * sign so no type cohersion may occur. For this assertion to pass, all values must
         * not be found.
         * @param {Object[]} needles An array of values that are not expected in the array.
         * @param {Array} haystack An array of values to check.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method doesNotContainItems
         * @static
         */
        doesNotContainItems : function (needles, haystack, 
                               message) {
    
            Y.Assert._increment();               
    
            for (var i=0; i < needles.length; i++){
                if (Y.Array.indexOf(haystack, needles[i]) > -1){
                    Y.Assert.fail(Y.Assert._formatMessage(message, "Value found in array [" + haystack + "]."));
                }
            }
    
        },
            
        /**
         * Asserts that no values matching a condition are present in an array. This uses
         * a function to determine a match.
         * @param {Function} matcher A function that returns true if the items matches or false if not.
         * @param {Array} haystack An array of values.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method doesNotContainMatch
         * @static
         */
        doesNotContainMatch : function (matcher, haystack, 
                               message) {
            
            Y.Assert._increment();     
          
            //check for valid matcher
            if (typeof matcher != "function"){
                throw new TypeError("ArrayAssert.doesNotContainMatch(): First argument must be a function.");
            }
            
            if (Y.Array.some(haystack, matcher)){
                Y.Assert.fail(Y.Assert._formatMessage(message, "Value found in array [" + haystack + "]."));
            }
        },
            
        /**
         * Asserts that the given value is contained in an array at the specified index.
         * This uses the triple equals sign so no type cohersion will occur.
         * @param {Object} needle The value to look for.
         * @param {Array} haystack The array to search in.
         * @param {int} index The index at which the value should exist.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method indexOf
         * @static
         */
        indexOf : function (needle, haystack, index, message) {
        
            Y.Assert._increment();     

            //try to find the value in the array
            for (var i=0; i < haystack.length; i++){
                if (haystack[i] === needle){
                    if (index != i){
                        Y.Assert.fail(Y.Assert._formatMessage(message, "Value exists at index " + i + " but should be at index " + index + "."));                    
                    }
                    return;
                }
            }
            
            //if it makes it here, it wasn't found at all
            Y.Assert.fail(Y.Assert._formatMessage(message, "Value doesn't exist in array [" + haystack + "]."));
        },
            
        /**
         * Asserts that the values in an array are equal, and in the same position,
         * as values in another array. This uses the double equals sign
         * so type cohersion may occur. Note that the array objects themselves
         * need not be the same for this test to pass.
         * @param {Array} expected An array of the expected values.
         * @param {Array} actual Any array of the actual values.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method itemsAreEqual
         * @static
         */
        itemsAreEqual : function (expected, actual, 
                               message) {
            
            Y.Assert._increment();     
            
            //first check array length
            if (expected.length != actual.length){
                Y.Assert.fail(Y.Assert._formatMessage(message, "Array should have a length of " + expected.length + " but has a length of " + actual.length));
            }
           
            //begin checking values
            for (var i=0; i < expected.length; i++){
                if (expected[i] != actual[i]){
                    throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Values in position " + i + " are not equal."), expected[i], actual[i]);
                }
            }
        },
        
        /**
         * Asserts that the values in an array are equivalent, and in the same position,
         * as values in another array. This uses a function to determine if the values
         * are equivalent. Note that the array objects themselves
         * need not be the same for this test to pass.
         * @param {Array} expected An array of the expected values.
         * @param {Array} actual Any array of the actual values.
         * @param {Function} comparator A function that returns true if the values are equivalent
         *      or false if not.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @return {Void}
         * @method itemsAreEquivalent
         * @static
         */
        itemsAreEquivalent : function (expected, actual, 
                               comparator, message) {
            
            Y.Assert._increment();     

            //make sure the comparator is valid
            if (typeof comparator != "function"){
                throw new TypeError("ArrayAssert.itemsAreEquivalent(): Third argument must be a function.");
            }
            
            //first check array length
            if (expected.length != actual.length){
                Y.Assert.fail(Y.Assert._formatMessage(message, "Array should have a length of " + expected.length + " but has a length of " + actual.length));
            }
            
            //begin checking values
            for (var i=0; i < expected.length; i++){
                if (!comparator(expected[i], actual[i])){
                    throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Values in position " + i + " are not equivalent."), expected[i], actual[i]);
                }
            }
        },
        
        /**
         * Asserts that an array is empty.
         * @param {Array} actual The array to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isEmpty
         * @static
         */
        isEmpty : function (actual, message) {        
            Y.Assert._increment();     
            if (actual.length > 0){
                Y.Assert.fail(Y.Assert._formatMessage(message, "Array should be empty."));
            }
        },    
        
        /**
         * Asserts that an array is not empty.
         * @param {Array} actual The array to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method isNotEmpty
         * @static
         */
        isNotEmpty : function (actual, message) {        
            Y.Assert._increment();     
            if (actual.length === 0){
                Y.Assert.fail(Y.Assert._formatMessage(message, "Array should not be empty."));
            }
        },    
        
        /**
         * Asserts that the values in an array are the same, and in the same position,
         * as values in another array. This uses the triple equals sign
         * so no type cohersion will occur. Note that the array objects themselves
         * need not be the same for this test to pass.
         * @param {Array} expected An array of the expected values.
         * @param {Array} actual Any array of the actual values.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method itemsAreSame
         * @static
         */
        itemsAreSame : function (expected, actual, 
                              message) {
            
            Y.Assert._increment();     

            //first check array length
            if (expected.length != actual.length){
                Y.Assert.fail(Y.Assert._formatMessage(message, "Array should have a length of " + expected.length + " but has a length of " + actual.length));
            }
                        
            //begin checking values
            for (var i=0; i < expected.length; i++){
                if (expected[i] !== actual[i]){
                    throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Values in position " + i + " are not the same."), expected[i], actual[i]);
                }
            }
        },
        
        /**
         * Asserts that the given value is contained in an array at the specified index,
         * starting from the back of the array.
         * This uses the triple equals sign so no type cohersion will occur.
         * @param {Object} needle The value to look for.
         * @param {Array} haystack The array to search in.
         * @param {int} index The index at which the value should exist.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method lastIndexOf
         * @static
         */
        lastIndexOf : function (needle, haystack, index, message) {
        
            //try to find the value in the array
            for (var i=haystack.length; i >= 0; i--){
                if (haystack[i] === needle){
                    if (index != i){
                        Y.Assert.fail(Y.Assert._formatMessage(message, "Value exists at index " + i + " but should be at index " + index + "."));                    
                    }
                    return;
                }
            }
            
            //if it makes it here, it wasn't found at all
            Y.Assert.fail(Y.Assert._formatMessage(message, "Value doesn't exist in array."));        
        }
        
    };


    /**
     * The ObjectAssert object provides functions to test JavaScript objects
     * for a variety of cases.
     *
     * @class ObjectAssert
     * @static
     */
    Y.ObjectAssert = {
    
        areEqual: function(expected, actual, message) {
            Y.Assert._increment();               
            Y.Object.each(expected, function(value, name){
                if (expected[name] != actual[name]){
                    throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, "Values should be equal for property " + name), expected[name], actual[name]);
                }
            });            
        },
        
        /**
         * Asserts that an object has a property with the given name.
         * @param {String} propertyName The name of the property to test.
         * @param {Object} object The object to search.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method hasKey
         * @static
         */    
        hasKey: function (propertyName, object, message) {
            Y.Assert._increment();               
            if (!Y.Object.hasKey(object, propertyName)){
                Y.fail(Y.Assert._formatMessage(message, "Property '" + propertyName + "' not found on object."));
            }    
        },
        
        /**
         * Asserts that an object has all properties of a reference object.
         * @param {Array} properties An array of property names that should be on the object.
         * @param {Object} object The object to search.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method hasKeys
         * @static
         */    
        hasKeys: function (properties, object, message) {
            Y.Assert._increment();  
            for (var i=0; i < properties.length; i++){
                if (!Y.Object.hasKey(object, properties[i])){
                    Y.fail(Y.Assert._formatMessage(message, "Property '" + properties[i] + "' not found on object."));
                }      
            }
        },
        
        /**
         * Asserts that a property with the given name exists on an object instance (not on its prototype).
         * @param {String} propertyName The name of the property to test.
         * @param {Object} object The object to search.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method ownsKey
         * @static
         */    
        ownsKey: function (propertyName, object, message) {
            Y.Assert._increment();               
            if (!object.hasOwnProperty(propertyName)){
                Y.fail(Y.Assert._formatMessage(message, "Property '" + propertyName + "' not found on object instance."));
            }     
        },
        
        /**
         * Asserts that all properties exist on an object instance (not on its prototype).
         * @param {Array} properties An array of property names that should be on the object.
         * @param {Object} object The object to search.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method ownsKeys
         * @static
         */    
        ownsKeys: function (properties, object, message) {
            Y.Assert._increment();        
            for (var i=0; i < properties.length; i++){
                if (!object.hasOwnProperty(properties[i])){
                    Y.fail(Y.Assert._formatMessage(message, "Property '" + properties[i] + "' not found on object instance."));
                }      
            }
        },
        
        /**
         * Asserts that an object owns no properties.
         * @param {Object} object The object to check.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method ownsNoKeys
         * @static
         */    
        ownsNoKeys : function (object, message) {
            Y.Assert._increment();  

            var keys = Y.Object.keys(object);
            
            if (keys.length > 0){
                Y.fail(Y.Assert._formatMessage(message, "Object owns " + keys.length + " properties but should own none."));
            }

        }     
    };


    
    /**
     * The DateAssert object provides functions to test JavaScript Date objects
     * for a variety of cases.
     *
     * @class DateAssert
     * @static
     */
     
    Y.DateAssert = {
    
        /**
         * Asserts that a date's month, day, and year are equal to another date's.
         * @param {Date} expected The expected date.
         * @param {Date} actual The actual date to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method datesAreEqual
         * @static
         */
        datesAreEqual : function (expected, actual, message){
            Y.Assert._increment();        
            if (expected instanceof Date && actual instanceof Date){
                var msg = "";
                
                //check years first
                if (expected.getFullYear() != actual.getFullYear()){
                    msg = "Years should be equal.";
                }
                
                //now check months
                if (expected.getMonth() != actual.getMonth()){
                    msg = "Months should be equal.";
                }                
                
                //last, check the day of the month
                if (expected.getDate() != actual.getDate()){
                    msg = "Days of month should be equal.";
                }                
                
                if (msg.length){
                    throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, msg), expected, actual);
                }
            } else {
                throw new TypeError("Y.Assert.datesAreEqual(): Expected and actual values must be Date objects.");
            }
        },
    
        /**
         * Asserts that a date's hour, minutes, and seconds are equal to another date's.
         * @param {Date} expected The expected date.
         * @param {Date} actual The actual date to test.
         * @param {String} message (Optional) The message to display if the assertion fails.
         * @method timesAreEqual
         * @static
         */
        timesAreEqual : function (expected, actual, message){
            Y.Assert._increment();
            if (expected instanceof Date && actual instanceof Date){
                var msg = "";
                
                //check hours first
                if (expected.getHours() != actual.getHours()){
                    msg = "Hours should be equal.";
                }
                
                //now check minutes
                if (expected.getMinutes() != actual.getMinutes()){
                    msg = "Minutes should be equal.";
                }                
                
                //last, check the seconds
                if (expected.getSeconds() != actual.getSeconds()){
                    msg = "Seconds should be equal.";
                }                
                
                if (msg.length){
                    throw new Y.Assert.ComparisonFailure(Y.Assert._formatMessage(message, msg), expected, actual);
                }
            } else {
                throw new TypeError("DateY.AsserttimesAreEqual(): Expected and actual values must be Date objects.");
            }
        }
        
    };

    
    Y.namespace("Test.Format");
    
    /* (intentionally not documented)
     * Basic XML escaping method. Replaces quotes, less-than, greater-than,
     * apostrophe, and ampersand characters with their corresponding entities.
     * @param {String} text The text to encode.
     * @return {String} The XML-escaped text.
     */
    function xmlEscape(text){
    
        return text.replace(/[<>"'&]/g, function(value){
            switch(value){
                case "<":   return "&lt;";
                case ">":   return "&gt;";
                case "\"":  return "&quot;";
                case "'":   return "&apos;";
                case "&":   return "&amp;";
            }
        });
    
    }
    
    /**
     * Returns test results formatted as a JSON string. Requires JSON utility.
     * @param {Object} result The results object created by TestRunner.
     * @return {String} A JSON-formatted string of results.
     * @namespace Test.Format
     * @method JSON
     * @static
     */
    Y.Test.Format.JSON = function(results) {
        return Y.JSON.stringify(results);
    };
    
    /**
     * Returns test results formatted as an XML string.
     * @param {Object} result The results object created by TestRunner.
     * @return {String} An XML-formatted string of results.
     * @namespace Test.Format
     * @method XML
     * @static
     */
    Y.Test.Format.XML = function(results) {
    
        var l = Y.Lang;
        var xml = "<" + results.type + " name=\"" + xmlEscape(results.name) + "\"";
        
        if (results.type == "test"){
            xml += " result=\"" + xmlEscape(results.result) + "\" message=\"" + xmlEscape(results.message) + "\">";
        } else {
            xml += " passed=\"" + results.passed + "\" failed=\"" + results.failed + "\" ignored=\"" + results.ignored + "\" total=\"" + results.total + "\">";
            Y.Object.each(results, function(value, prop){
                if (l.isObject(value) && !l.isArray(value)){
                    xml += arguments.callee(value);
                }
            });        
        }
    
        xml += "</" + results.type + ">";
        
        return xml;
    
    };
    
    /**
     * Returns test results formatted as an XML string.
     * @param {Object} result The results object created by TestRunner.
     * @return {String} An XML-formatted string of results.
     * @namespace Test.Format
     * @method XML
     * @static
     */
    Y.Test.Format.XML = function(results) {

        function serializeToXML(results){
            var l   = Y.Lang,
                xml = "<" + results.type + " name=\"" + xmlEscape(results.name) + "\"";
            
            if (l.isNumber(results.duration)){
                xml += " duration=\"" + results.duration + "\"";
            }
            
            if (results.type == "test"){
                xml += " result=\"" + results.result + "\" message=\"" + xmlEscape(results.message) + "\">";
            } else {
                xml += " passed=\"" + results.passed + "\" failed=\"" + results.failed + "\" ignored=\"" + results.ignored + "\" total=\"" + results.total + "\">";
                Y.Object.each(results, function(value, prop){
                    if (l.isObject(value) && !l.isArray(value)){
                        xml += serializeToXML(value);
                    }
                });       
            }

            xml += "</" + results.type + ">";
            
            return xml;    
        }

        return "<?xml version=\"1.0\" charset=\"UTF-8\"?>" + serializeToXML(results);

    };


    /**
     * Returns test results formatted in JUnit XML format.
     * @param {Object} result The results object created by TestRunner.
     * @return {String} An XML-formatted string of results.
     * @namespace Test.Format
     * @method JUnitXML
     * @static
     */
    Y.Test.Format.JUnitXML = function(results) {


        function serializeToJUnitXML(results){
            var l   = Y.Lang,
                xml = "",
                prop;
                
            switch (results.type){
                //equivalent to testcase in JUnit
                case "test":
                    if (results.result != "ignore"){
                        xml = "<testcase name=\"" + xmlEscape(results.name) + "\">";
                        if (results.result == "fail"){
                            xml += "<failure message=\"" + xmlEscape(results.message) + "\"><![CDATA[" + results.message + "]]></failure>";
                        }
                        xml+= "</testcase>";
                    }
                    break;
                    
                //equivalent to testsuite in JUnit
                case "testcase":
                
                    xml = "<testsuite name=\"" + xmlEscape(results.name) + "\" tests=\"" + results.total + "\" failures=\"" + results.failed + "\">";
                    
                    Y.Object.each(results, function(value, prop){
                        if (l.isObject(value) && !l.isArray(value)){
                            xml += serializeToJUnitXML(value);
                        }
                    });             
                    
                    xml += "</testsuite>";
                    break;
                
                case "testsuite":
                    Y.Object.each(results, function(value, prop){
                        if (l.isObject(value) && !l.isArray(value)){
                            xml += serializeToJUnitXML(value);
                        }
                    });             

                    //skip output - no JUnit equivalent                    
                    break;
                    
                case "report":
                
                    xml = "<testsuites>";
                
                    Y.Object.each(results, function(value, prop){
                        if (l.isObject(value) && !l.isArray(value)){
                            xml += serializeToJUnitXML(value);
                        }
                    });             
                    
                    xml += "</testsuites>";            
                
                //no default
            }
            
            return xml;
     
        }

        return "<?xml version=\"1.0\" charset=\"UTF-8\"?>" + serializeToJUnitXML(results);
    };
    


    Y.namespace("Test");
    
    /**
     * An object capable of sending test results to a server.
     * @param {String} url The URL to submit the results to.
     * @param {Function} format (Optiona) A function that outputs the results in a specific format.
     *      Default is Y.Test.Format.XML.
     * @constructor
     * @namespace Test
     * @class Reporter
     */
    Y.Test.Reporter = function(url, format) {
    
        /**
         * The URL to submit the data to.
         * @type String
         * @property url
         */
        this.url = url;
    
        /**
         * The formatting function to call when submitting the data.
         * @type Function
         * @property format
         */
        this.format = format || Y.Test.Format.XML;
    
        /**
         * Extra fields to submit with the request.
         * @type Object
         * @property _fields
         * @private
         */
        this._fields = new Object();
        
        /**
         * The form element used to submit the results.
         * @type HTMLFormElement
         * @property _form
         * @private
         */
        this._form = null;
    
        /**
         * Iframe used as a target for form submission.
         * @type HTMLIFrameElement
         * @property _iframe
         * @private
         */
        this._iframe = null;
    };
    
    Y.Test.Reporter.prototype = {
    
        //restore missing constructor
        constructor: Y.Test.Reporter,
    
        /**
         * Adds a field to the form that submits the results.
         * @param {String} name The name of the field.
         * @param {Variant} value The value of the field.
         * @return {Void}
         * @method addField
         */
        addField : function (name, value){
            this._fields[name] = value;    
        },
        
        /**
         * Removes all previous defined fields.
         * @return {Void}
         * @method addField
         */
        clearFields : function(){
            this._fields = new Object();
        },
    
        /**
         * Cleans up the memory associated with the TestReporter, removing DOM elements
         * that were created.
         * @return {Void}
         * @method destroy
         */
        destroy : function() {
            if (this._form){
                this._form.parentNode.removeChild(this._form);
                this._form = null;
            }        
            if (this._iframe){
                this._iframe.parentNode.removeChild(this._iframe);
                this._iframe = null;
            }
            this._fields = null;
        },
    
        /**
         * Sends the report to the server.
         * @param {Object} results The results object created by TestRunner.
         * @return {Void}
         * @method report
         */
        report : function(results){
        
            //if the form hasn't been created yet, create it
            if (!this._form){
                this._form = document.createElement("form");
                this._form.method = "post";
                this._form.style.visibility = "hidden";
                this._form.style.position = "absolute";
                this._form.style.top = 0;
                document.body.appendChild(this._form);
            
                //IE won't let you assign a name using the DOM, must do it the hacky way
                if (Y.UA.ie){
                    this._iframe = document.createElement("<iframe name=\"yuiTestTarget\" />");
                } else {
                    this._iframe = document.createElement("iframe");
                    this._iframe.name = "yuiTestTarget";
                }
    
                this._iframe.src = "javascript:false";
                this._iframe.style.visibility = "hidden";
                this._iframe.style.position = "absolute";
                this._iframe.style.top = 0;
                document.body.appendChild(this._iframe);
    
                this._form.target = "yuiTestTarget";
            }
    
            //set the form's action
            this._form.action = this.url;
        
            //remove any existing fields
            while(this._form.hasChildNodes()){
                this._form.removeChild(this._form.lastChild);
            }
            
            //create default fields
            this._fields.results = this.format(results);
            this._fields.useragent = navigator.userAgent;
            this._fields.timestamp = (new Date()).toLocaleString();
    
            //add fields to the form
            Y.Object.each(this._fields, function(value, prop){
                if (typeof value != "function"){
                    var input = document.createElement("input");
                    input.type = "hidden";
                    input.name = prop;
                    input.value = value;
                    this._form.appendChild(input);
                }
            }, this);
    
            //remove default fields
            delete this._fields.results;
            delete this._fields.useragent;
            delete this._fields.timestamp;
            
            if (arguments[1] !== false){
                this._form.submit();
            }
        
        }
    
    };

    /**
     * Creates a new mock object.
     * @class Mock
     * @constructor
     * @param {Object} template (Optional) An object whose methods
     *      should be stubbed out on the mock object.
     */
    Y.Mock = function(template){
    
        //use blank object is nothing is passed in
        template = template || {};
        
        var mock = null;
        
        //try to create mock that keeps prototype chain intact
        try {
            mock = Y.Object(template);
        } catch (ex) {
            mock = {};
            Y.log("Couldn't create mock with prototype.", "warn", "Mock");
        }
        
        //create new versions of the methods so that they don't actually do anything
        Y.Object.each(template, function(name){
            if (Y.Lang.isFunction(template[name])){
                mock[name] = function(){
                    Y.Assert.fail("Method " + name + "() was called but was not expected to be.");
                };
            }
        });
        
        //return it
        return mock;    
    };
        
    /**
     * Assigns an expectation to a mock object. This is used to create
     * methods and properties on the mock object that are monitored for
     * calls and changes, respectively.
     * @param {Object} mock The object to add the expectation to.
     * @param {Object} expectation An object defining the expectation. For
     *      a method, the keys "method" and "args" are required with
     *      an optional "returns" key available. For properties, the keys
     *      "property" and "value" are required.
     * @return {void}
     * @method expect
     * @static
     */ 
    Y.Mock.expect = function(mock /*:Object*/, expectation /*:Object*/){

        //make sure there's a place to store the expectations
        if (!mock.__expectations) {
            mock.__expectations = {};
        }

        //method expectation
        if (expectation.method){
            var name = expectation.method,
                args = expectation.args || expectation.arguments || [],
                result = expectation.returns,
                callCount = Y.Lang.isNumber(expectation.callCount) ? expectation.callCount : 1,
                error = expectation.error,
                run = expectation.run || function(){};
                
            //save expectations
            mock.__expectations[name] = expectation;
            expectation.callCount = callCount;
            expectation.actualCallCount = 0;
                
            //process arguments
            Y.Array.each(args, function(arg, i, array){
                if (!(array[i] instanceof Y.Mock.Value)){
                    array[i] = Y.Mock.Value(Y.Assert.areSame, [arg], "Argument " + i + " of " + name + "() is incorrect.");
                }
            });
        
            //if the method is expected to be called
            if (callCount > 0){
                mock[name] = function(){   
                    try {
                        expectation.actualCallCount++;
                        Y.Assert.areEqual(args.length, arguments.length, "Method " + name + "() passed incorrect number of arguments.");
                        for (var i=0, len=args.length; i < len; i++){
                            //if (args[i]){
                                args[i].verify(arguments[i]);
                            //} else {
                            //    Y.Assert.fail("Argument " + i + " (" + arguments[i] + ") was not expected to be used.");
                            //}
                            
                        }                
    
                        run.apply(this, arguments);
                        
                        if (error){
                            throw error;
                        }
                    } catch (ex){
                        //route through TestRunner for proper handling
                        Y.Test.Runner._handleError(ex);
                    }
                    
                    return result;
                };
            } else {
            
                //method should fail if called when not expected
                mock[name] = function(){
                    try {
                        Y.Assert.fail("Method " + name + "() should not have been called.");
                    } catch (ex){
                        //route through TestRunner for proper handling
                        Y.Test.Runner._handleError(ex);
                    }                    
                };
            }
        } else if (expectation.property){
            //save expectations
            mock.__expectations[name] = expectation;
        }
    };

    /**
     * Verifies that all expectations of a mock object have been met and
     * throws an assertion error if not.
     * @param {Object} mock The object to verify..
     * @return {void}
     * @method verify
     * @static
     */ 
    Y.Mock.verify = function(mock /*:Object*/){    
        try {
            Y.Object.each(mock.__expectations, function(expectation){
                if (expectation.method) {
                    Y.Assert.areEqual(expectation.callCount, expectation.actualCallCount, "Method " + expectation.method + "() wasn't called the expected number of times.");
                } else if (expectation.property){
                    Y.Assert.areEqual(expectation.value, mock[expectation.property], "Property " + expectation.property + " wasn't set to the correct value."); 
                }
            });
        } catch (ex){
            //route through TestRunner for proper handling
            Y.Test.Runner._handleError(ex);
        }
    };

    Y.Mock.Value = function(method, originalArgs, message){
        if (this instanceof Y.Mock.Value){
            this.verify = function(value){
                var args = [].concat(originalArgs || []);
                args.push(value);
                args.push(message);
                method.apply(null, args);
            };
        } else {
            return new Y.Mock.Value(method, originalArgs, message);
        }
    };
    
    Y.Mock.Value.Any        = Y.Mock.Value(function(){});
    Y.Mock.Value.Boolean    = Y.Mock.Value(Y.Assert.isBoolean);
    Y.Mock.Value.Number     = Y.Mock.Value(Y.Assert.isNumber);
    Y.Mock.Value.String     = Y.Mock.Value(Y.Assert.isString);
    Y.Mock.Value.Object     = Y.Mock.Value(Y.Assert.isObject);
    Y.Mock.Value.Function   = Y.Mock.Value(Y.Assert.isFunction);



}, '3.0.0' ,{requires:['substitute','event-base']});
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
YUI.add("node-event-simulate",function(A){A.Node.prototype.simulate=function(C,B){A.Event.simulate(A.Node.getDOMNode(this),C,B);};},"3.0.0",{requires:["node-base","event-simulate"]});