/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
(function(){var I={},B=new Date().getTime(),A,E,H=function(){if(window.addEventListener){return function(M,L,K,J){M.addEventListener(L,K,(!!J));};}else{if(window.attachEvent){return function(L,K,J){L.attachEvent("on"+K,J);};}else{return function(){};}}}(),F=function(){if(window.removeEventListener){return function(M,L,K,J){M.removeEventListener(L,K,!!J);};}else{if(window.detachEvent){return function(L,K,J){L.detachEvent("on"+K,J);};}else{return function(){};}}}(),D=function(){YUI.Env.windowLoaded=true;YUI.Env.DOMReady=true;F(window,"load",D);},C={"io.xdrReady":1,"io.xdrResponse":1},G=Array.prototype.slice;if(typeof YUI==="undefined"||!YUI){YUI=function(O,N,M,L,J){var K=this,R=arguments,Q,P=R.length;if(!(K instanceof YUI)){return new YUI(O,N,M,L,J);}else{K._init();for(Q=0;Q<P;Q++){K._config(R[Q]);}K._setup();return K;}};}YUI.prototype={_config:function(N){N=N||{};var O=this.config,L,K,J,M;M=O.modules;for(L in N){if(M&&L=="modules"){J=N[L];for(K in J){if(J.hasOwnProperty(K)){M[K]=J[K];}}}else{if(L=="win"){O[L]=N[L].contentWindow||N[L];O.doc=O[L].document;}else{O[L]=N[L];}}}},_init:function(){var J="3.0.0",K=this;if(J.indexOf("@")>-1){J="test";}K.version=J;K.Env={mods:{},cdn:"http://yui.yahooapis.com/"+J+"/build/",bootstrapped:false,_idx:0,_used:{},_attached:{},_yidx:0,_uidx:0,_loaded:{}};K.Env._loaded[J]={};if(YUI.Env){K.Env._yidx=(++YUI.Env._yidx);K.Env._guidp=("yui_"+J+"-"+K.Env._yidx+"-"+B).replace(/\./g,"_");K.id=K.stamp(K);I[K.id]=K;}K.constructor=YUI;K.config={win:window||{},doc:document,debug:true,useBrowserConsole:true,throwFail:true,bootstrap:true,fetchCSS:true,base:function(){var L,M,O,N;M=document.getElementsByTagName("script");for(O=0;O<M.length;O=O+1){N=M[O].src.match(/^(.*)yui\/yui[\.\-].*js(\?.*)?$/);L=N&&N[1];if(L){break;}}return L||K.Env.cdn;}(),loaderPath:"loader/loader-min.js"};},_setup:function(J){this.use("yui-base");},applyTo:function(P,O,L){if(!(O in C)){this.log(O+": applyTo not allowed","warn","yui");return null;}var K=I[P],N,J,M;if(K){N=O.split(".");J=K;for(M=0;M<N.length;M=M+1){J=J[N[M]];if(!J){this.log("applyTo not found: "+O,"warn","yui");}}return J.apply(K,L);}return null;},add:function(K,M,J,L){YUI.Env.mods[K]={name:K,fn:M,version:J,details:L||{}};return this;},_attach:function(K,O){var T=YUI.Env.mods,L=this.Env._attached,Q,P=K.length,M,N,R,S,J;for(Q=0;Q<P;Q=Q+1){M=K[Q];N=T[M];if(!L[M]&&N){L[M]=true;R=N.details;S=R.requires;J=R.use;if(S){this._attach(this.Array(S));}if(N.fn){N.fn(this);}if(J){this._attach(this.Array(J));}}}},use:function(){if(this._loading){this._useQueue=this._useQueue||new this.Queue();this._useQueue.add(G.call(arguments,0));return this;}var K=this,U=G.call(arguments,0),Z=YUI.Env.mods,b=K.Env._used,V,O=U[0],M=false,X=U[U.length-1],W=K.config.bootstrap,P,R,N,Q=[],J=[],S=K.config.fetchCSS,T=function(d){if(b[d]){return;}var Y=Z[d],c,e,a;if(Y){b[d]=true;e=Y.details.requires;a=Y.details.use;}else{if(!YUI.Env._loaded[K.version][d]){Q.push(d);}else{b[d]=true;}}if(e){if(K.Lang.isString(e)){T(e);}else{for(c=0;c<e.length;c=c+1){T(e[c]);}}}J.push(d);},L;if(typeof X==="function"){U.pop();}else{X=null;}L=function(Y){Y=Y||{success:true,msg:"not dynamic"};if(X){X(K,Y);}if(K.fire){K.fire("yui:load",K,Y);}K._loading=false;if(K._useQueue&&K._useQueue.size()&&!K._loading){K.use.apply(K,K._useQueue.next());}};if(O==="*"){U=[];for(P in Z){if(Z.hasOwnProperty(P)){U.push(P);}}if(X){U.push(X);}return K.use.apply(K,U);}if(K.Loader){M=true;V=new K.Loader(K.config);V.require(U);V.ignoreRegistered=true;V.allowRollup=false;V.calculate(null,(S)?null:"js");U=V.sorted;}N=U.length;for(R=0;R<N;R=R+1){T(U[R]);}N=Q.length;if(N){Q=K.Object.keys(K.Array.hash(Q));}if(W&&N&&K.Loader){K._loading=true;V=new K.Loader(K.config);V.onSuccess=L;V.onFailure=L;V.onTimeout=L;V.context=K;V.attaching=U;V.require((S)?Q:U);V.insert(null,(S)?null:"js");}else{if(W&&N&&K.Get&&!K.Env.bootstrapped){K._loading=true;U=K.Array(arguments,0,true);K.Get.script(K.config.base+K.config.loaderPath,{onEnd:function(){K._loading=false;K.Env.bootstrapped=true;K._attach(["loader"]);K.use.apply(K,U);}});return K;}else{if(N){}K._attach(J);L();}}return K;},namespace:function(){var J=arguments,N=null,L,K,M;for(L=0;L<J.length;L=L+1){M=(""+J[L]).split(".");N=this;for(K=(M[0]=="YAHOO")?1:0;K<M.length;K=K+1){N[M[K]]=N[M[K]]||{};N=N[M[K]];}}return N;},log:function(){},error:function(K,J){if(this.config.throwFail){throw (J||new Error(K));}else{this.message(K,"error");}return this;},guid:function(J){var K=this.Env._guidp+(++this.Env._uidx);return(J)?(J+K):K;},stamp:function(L,M){if(!L){return L;}var J=(typeof L==="string")?L:L._yuid;if(!J){J=this.guid();if(!M){try{L._yuid=J;}catch(K){J=null;}}}return J;}};A=YUI.prototype;for(E in A){YUI[E]=A[E];}YUI._init();H(window,"load",D);YUI.Env.add=H;YUI.Env.remove=F;})();YUI.add("yui-base",function(B){function A(){this._init();this.add.apply(this,arguments);}A.prototype={_init:function(){this._q=[];},next:function(){return this._q.shift();},add:function(){B.Array.each(B.Array(arguments,0,true),function(C){this._q.push(C);},this);return this;},size:function(){return this._q.length;}};B.Queue=A;(function(){B.Lang=B.Lang||{};var R=B.Lang,G="array",I="boolean",D="date",M="error",S="function",H="number",K="null",F="object",O="regexp",N="string",C=Object.prototype.toString,P="undefined",E={"undefined":P,"number":H,"boolean":I,"string":N,"[object Function]":S,"[object RegExp]":O,"[object Array]":G,"[object Date]":D,"[object Error]":M},J=/^\s+|\s+$/g,Q="";R.isArray=function(L){return R.type(L)===G;};R.isBoolean=function(L){return typeof L===I;};R.isFunction=function(L){return R.type(L)===S;};R.isDate=function(L){return R.type(L)===D;};R.isNull=function(L){return L===null;};R.isNumber=function(L){return typeof L===H&&isFinite(L);};R.isObject=function(T,L){return(T&&(typeof T===F||(!L&&R.isFunction(T))))||false;};R.isString=function(L){return typeof L===N;};R.isUndefined=function(L){return typeof L===P;};R.trim=function(L){try{return L.replace(J,Q);}catch(T){return L;}};R.isValue=function(T){var L=R.type(T);
switch(L){case H:return isFinite(T);case K:case P:return false;default:return !!(L);}};R.type=function(L){return E[typeof L]||E[C.call(L)]||(L?F:K);};})();(function(){var C=B.Lang,D=Array.prototype,E=function(M,J,L){var I=(L)?2:B.Array.test(M),H,G,F;if(I){try{return D.slice.call(M,J||0);}catch(K){F=[];for(H=0,G=M.length;H<G;H=H+1){F.push(M[H]);}return F;}}else{return[M];}};B.Array=E;E.test=function(H){var F=0;if(C.isObject(H)){if(C.isArray(H)){F=1;}else{try{if("length" in H&&!("tagName" in H)&&!("alert" in H)&&(!B.Lang.isFunction(H.size)||H.size()>1)){F=2;}}catch(G){}}}return F;};E.each=(D.forEach)?function(F,G,H){D.forEach.call(F||[],G,H||B);return B;}:function(G,I,J){var F=(G&&G.length)||0,H;for(H=0;H<F;H=H+1){I.call(J||B,G[H],H,G);}return B;};E.hash=function(H,G){var K={},F=H.length,J=G&&G.length,I;for(I=0;I<F;I=I+1){K[H[I]]=(J&&J>I)?G[I]:true;}return K;};E.indexOf=(D.indexOf)?function(F,G){return D.indexOf.call(F,G);}:function(F,H){for(var G=0;G<F.length;G=G+1){if(F[G]===H){return G;}}return -1;};E.numericSort=function(G,F){return(G-F);};E.some=(D.some)?function(F,G,H){return D.some.call(F,G,H);}:function(G,I,J){var F=G.length,H;for(H=0;H<F;H=H+1){if(I.call(J,G[H],H,G)){return true;}}return false;};})();(function(){var D=B.Lang,C="__",E=function(H,G){var F=G.toString;if(D.isFunction(F)&&F!=Object.prototype.toString){H.toString=F;}};B.merge=function(){var G=arguments,I={},H,F=G.length;for(H=0;H<F;H=H+1){B.mix(I,G[H],true);}return I;};B.mix=function(F,O,H,N,L,M){if(!O||!F){return F||B;}if(L){switch(L){case 1:return B.mix(F.prototype,O.prototype,H,N,0,M);case 2:B.mix(F.prototype,O.prototype,H,N,0,M);break;case 3:return B.mix(F,O.prototype,H,N,0,M);case 4:return B.mix(F.prototype,O,H,N,0,M);default:}}var K=M&&D.isArray(F),J,I,G;if(N&&N.length){for(J=0,I=N.length;J<I;++J){G=N[J];if(G in O){if(M&&D.isObject(F[G],true)){B.mix(F[G],O[G]);}else{if(!K&&(H||!(G in F))){F[G]=O[G];}else{if(K){F.push(O[G]);}}}}}}else{for(J in O){if(M&&D.isObject(F[J],true)){B.mix(F[J],O[J]);}else{if(!K&&(H||!(J in F))){F[J]=O[J];}else{if(K){F.push(O[J]);}}}}if(B.UA.ie){E(F,O);}}return F;};B.cached=function(H,F,G){F=F||{};return function(L,K){var J=(K)?Array.prototype.join.call(arguments,C):L,I=F[J];if(!(J in F)||(G&&F[J]==G)){F[J]=H.apply(H,arguments);}return F[J];};};})();(function(){B.Object=function(H){var G=function(){};G.prototype=H;return new G();};var E=B.Object,D=undefined,C=function(J,I){var H=(I===2),F=(H)?0:[],G;for(G in J){if(H){F++;}else{if(J.hasOwnProperty(G)){F.push((I)?J[G]:G);}}}return F;};E.keys=function(F){return C(F);};E.values=function(F){return C(F,1);};E.size=function(F){return C(F,2);};E.hasKey=function(G,F){return(F in G);};E.hasValue=function(G,F){return(B.Array.indexOf(E.values(G),F)>-1);};E.owns=function(G,F){return(G.hasOwnProperty(F));};E.each=function(J,I,K,H){var G=K||B,F;for(F in J){if(H||J.hasOwnProperty(F)){I.call(G,J[F],F,J);}}return B;};E.getValue=function(J,I){var H=B.Array(I),F=H.length,G;for(G=0;J!==D&&G<F;G=G+1){J=J[H[G]];}return J;};E.setValue=function(L,J,K){var I=B.Array(J),H=I.length-1,F,G=L;if(H>=0){for(F=0;G!==D&&F<H;F=F+1){G=G[I[F]];}if(G!==D){G[I[F]]=K;}else{return D;}}return L;};})();B.UA=function(){var F=function(J){var K=0;return parseFloat(J.replace(/\./g,function(){return(K++==1)?"":".";}));},I=navigator,H={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0,caja:I.cajaVersion,secure:false,os:null},E=I&&I.userAgent,G=B.config.win.location,D=G&&G.href,C;H.secure=D&&(D.toLowerCase().indexOf("https")===0);if(E){if((/windows|win32/i).test(E)){H.os="windows";}else{if((/macintosh/i).test(E)){H.os="macintosh";}}if((/KHTML/).test(E)){H.webkit=1;}C=E.match(/AppleWebKit\/([^\s]*)/);if(C&&C[1]){H.webkit=F(C[1]);if(/ Mobile\//.test(E)){H.mobile="Apple";}else{C=E.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);if(C){H.mobile=C[0];}}C=E.match(/AdobeAIR\/([^\s]*)/);if(C){H.air=C[0];}}if(!H.webkit){C=E.match(/Opera[\s\/]([^\s]*)/);if(C&&C[1]){H.opera=F(C[1]);C=E.match(/Opera Mini[^;]*/);if(C){H.mobile=C[0];}}else{C=E.match(/MSIE\s([^;]*)/);if(C&&C[1]){H.ie=F(C[1]);}else{C=E.match(/Gecko\/([^\s]*)/);if(C){H.gecko=1;C=E.match(/rv:([^\s\)]*)/);if(C&&C[1]){H.gecko=F(C[1]);}}}}}}return H;}();(function(){var F=["yui-base"],D,I=B.config,H=YUI.Env.mods,G,E;B.use.apply(B,F);if(I.core){D=I.core;}else{D=[];G=["get","loader","yui-log","yui-later"];for(E=0;E<G.length;E++){if(H[G[E]]){D.push(G[E]);}}}B.use.apply(B,D);})();},"3.0.0");YUI.add("get",function(A){(function(){var C=A.UA,B=A.Lang,E="text/javascript",F="text/css",D="stylesheet";A.Get=function(){var M={},K=0,U=false,W=function(a,X,b){var Y=b||A.config.win,c=Y.document,e=c.createElement(a),Z;for(Z in X){if(X[Z]&&X.hasOwnProperty(Z)){e.setAttribute(Z,X[Z]);}}return e;},T=function(Y,Z,X){var a={id:A.guid(),type:F,rel:D,href:Y};if(X){A.mix(a,X);}return W("link",a,Z);},S=function(Y,Z,X){var a={id:A.guid(),type:E,src:Y};if(X){A.mix(a,X);}return W("script",a,Z);},N=function(c){var X=M[c],Y,a,g,e,j,b,Z,f;if(X){Y=X.nodes;a=Y.length;g=X.win.document;e=g.getElementsByTagName("head")[0];if(X.insertBefore){j=L(X.insertBefore,c);if(j){e=j.parentNode;}}for(b=0;b<a;b=b+1){Z=Y[b];if(Z.clearAttributes){Z.clearAttributes();}else{for(f in Z){delete Z[f];}}e.removeChild(Z);}}X.nodes=[];},P=function(Y,Z,X){return{tId:Y.tId,win:Y.win,data:Y.data,nodes:Y.nodes,msg:Z,statusText:X,purge:function(){N(this.tId);}};},O=function(b,a,X){var Y=M[b],Z;if(Y&&Y.onEnd){Z=Y.context||Y;Y.onEnd.call(Z,P(Y,a,X));}},V=function(a,Z){var X=M[a],Y;if(X.timer){clearTimeout(X.timer);}if(X.onFailure){Y=X.context||X;X.onFailure.call(Y,P(X,Z));}O(a,Z,"failure");},L=function(X,a){var Y=M[a],Z=(B.isString(X))?Y.win.document.getElementById(X):X;if(!Z){V(a,"target node not found: "+X);}return Z;},I=function(a){var X=M[a],Z,Y;if(X.timer){clearTimeout(X.timer);}X.finished=true;if(X.aborted){Z="transaction "+a+" was aborted";V(a,Z);return;}if(X.onSuccess){Y=X.context||X;X.onSuccess.call(Y,P(X));}O(a,Z,"OK");},Q=function(Z){var X=M[Z],Y;if(X.onTimeout){Y=X.context||X;X.onTimeout.call(Y,P(X));
}O(Z,"timeout","timeout");},H=function(Z,c){var Y=M[Z],b,g,f,e,a,X,i;if(Y.timer){clearTimeout(Y.timer);}if(Y.aborted){b="transaction "+Z+" was aborted";V(Z,b);return;}if(c){Y.url.shift();if(Y.varName){Y.varName.shift();}}else{Y.url=(B.isString(Y.url))?[Y.url]:Y.url;if(Y.varName){Y.varName=(B.isString(Y.varName))?[Y.varName]:Y.varName;}}g=Y.win;f=g.document;e=f.getElementsByTagName("head")[0];if(Y.url.length===0){I(Z);return;}X=Y.url[0];if(!X){Y.url.shift();return H(Z);}if(Y.timeout){Y.timer=setTimeout(function(){Q(Z);},Y.timeout);}if(Y.type==="script"){a=S(X,g,Y.attributes);}else{a=T(X,g,Y.attributes);}J(Y.type,a,Z,X,g,Y.url.length);Y.nodes.push(a);if(Y.insertBefore){i=L(Y.insertBefore,Z);if(i){i.parentNode.insertBefore(a,i);}}else{e.appendChild(a);}if((C.webkit||C.gecko)&&Y.type==="css"){H(Z,X);}},G=function(){if(U){return;}U=true;var X,Y;for(X in M){if(M.hasOwnProperty(X)){Y=M[X];if(Y.autopurge&&Y.finished){N(Y.tId);delete M[X];}}}U=false;},R=function(Y,X,Z){Z=Z||{};var c="q"+(K++),a,b=Z.purgethreshold||A.Get.PURGE_THRESH;if(K%b===0){G();}M[c]=A.merge(Z,{tId:c,type:Y,url:X,finished:false,nodes:[]});a=M[c];a.win=a.win||A.config.win;a.context=a.context||a;a.autopurge=("autopurge" in a)?a.autopurge:(Y==="script")?true:false;if(Z.charset){a.attributes=a.attributes||{};a.attributes.charset=Z.charset;}setTimeout(function(){H(c);},0);return{tId:c};},J=function(Z,e,d,Y,c,b,X){var a=X||H;if(C.ie){e.onreadystatechange=function(){var f=this.readyState;if("loaded"===f||"complete"===f){e.onreadystatechange=null;a(d,Y);}};}else{if(C.webkit){if(Z==="script"){e.addEventListener("load",function(){a(d,Y);});}}else{e.onload=function(){a(d,Y);};e.onerror=function(f){V(d,f+": "+Y);};}}};return{PURGE_THRESH:20,_finalize:function(X){setTimeout(function(){I(X);},0);},abort:function(Y){var Z=(B.isString(Y))?Y:Y.tId,X=M[Z];if(X){X.aborted=true;}},script:function(X,Y){return R("script",X,Y);},css:function(X,Y){return R("css",X,Y);}};}();})();},"3.0.0");YUI.add("yui-log",function(A){(function(){var D=A,F="yui:log",B="undefined",C={debug:1,info:1,warn:1,error:1},E;D.log=function(I,Q,G,O){var H=D,P=H.config,K=false,N,L,J,M;if(P.debug){if(G){N=P.logExclude;L=P.logInclude;if(L&&!(G in L)){K=1;}else{if(N&&(G in N)){K=1;}}}if(!K){if(P.useBrowserConsole){J=(G)?G+": "+I:I;if(typeof console!=B&&console.log){M=(Q&&console[Q]&&(Q in C))?Q:"log";console[M](J);}else{if(typeof opera!=B){opera.postError(J);}}}if(H.fire&&!O){if(!E){H.publish(F,{broadcast:2,emitFacade:1});E=1;}H.fire(F,{msg:I,cat:Q,src:G});}}}return H;};D.message=function(){return D.log.apply(D,arguments);};})();},"3.0.0",{requires:["yui-base"]});YUI.add("yui-later",function(A){(function(){var B=A.Lang,C=function(K,E,L,G,H){K=K||0;E=E||{};var F=L,J=A.Array(G),I,D;if(B.isString(L)){F=E[L];}if(!F){}I=function(){F.apply(E,J);};D=(H)?setInterval(I,K):setTimeout(I,K);return{id:D,interval:H,cancel:function(){if(this.interval){clearInterval(D);}else{clearTimeout(D);}}};};A.later=C;B.later=C;})();},"3.0.0",{requires:["yui-base"]});YUI.add("yui",function(A){},"3.0.0",{use:["yui-base","get","yui-log","yui-later"]});

/**
 * jsHub tag module dependencies and configuration
 * @module jshub
 *//*--------------------------------------------------------------------------*/

// JSLint options
/*global YUI, jsHub */
"use strict";

YUI.add("jshub", function (Y) {

  // Initialise lifecycle triggers
  // Can be used to pre-configure data at page level if necessary
  jsHub.trigger("data-capture-start");

  // Data is ready to be parsed by Data Capture plugins
  jsHub.trigger("page-view");

  // Data capture phase is complete
  jsHub.trigger("data-capture-complete");

}, "2.0.0", {
  requires: ["yui", "jquery", "hub", "logger", "image-transport", "form-transport", "utilities", "microformats"], 
  after: ["jquery"]
});

/**
 * Core hub functionality for jsHub tag
 * @module hub
 * @class jsHub
 *//*--------------------------------------------------------------------------*/

// JSLint options
/*global YUI, jQuery */
"use strict";

YUI.add('hub', function (Y) {

  (function () {
    
    // global namespace
    var global = this, 
  
      // instance of jsHub object
      jsHub,
  
      /**
       * Core event dispatcher functionality of the hub
       * @class Hub
       * @property listeners
       */
      Hub = function () {
  
        // stores functions listening to various events
        var listeners = {},
      
      /** Plugins that have registered with the hub. */
      plugins = [],
  
        /**
         * a listener has an authentication token and a callback
         * @class Listener
         * @for Hub
         * @param token {string}
         * @param callback {function}
         */
        Listener = function (token, callback) {
          this.token = token;
          this.callback = callback;
        },
    
        /**
         * A simple event object
         * @class Event
         * @for Hub
         * @param name {string}
         * @param data {object}
         * @param timestamp {number} an optional timestamp value. 
         */
        Event = function (name, data, timestamp) {
          this.type = name;
          this.timestamp = timestamp || jsHub.safe.getTimestamp();
          this.data = data;
        },
    
        // the firewall filters event data before passing to listeners
        /**
         * A simple event object
         * @class EventDispatcher
         * @for Hub
         */
        EventDispatcher = function () {
      
          /**
           * Locate a token within a comma separate string.
           * @method containsToken
           * @param string {string}
           * @param token {string}
           */
          var containsToken = function (string, token) {
            string = string.split(",");
            for (var i = 0; i < string.length; i++) {
              if (token === Y.Lang.trim(string[i])) {
                return true;
              }
            }
            return false;
          },
      
          /**
           * TODO: Description
           * @method validate
           * @param token {string}
           * @param payload {object}
           */
          validate = function (token, payload) {
            var who = Y.Lang.trim(payload.event_visibility);
            if (who === undefined || who === "" || who === "*") {
              return true;
            }
            return containsToken(who, token);
          },
      
          /**
           * TODO: Description
           * @method filter
           * @param token {string}
           * @param data {object}
           */
          filter = function (token, data) {
            // TODO remove fields from data that do not validate
            var filtered = {};
            Y.Object.each(data, function (value, key) {
              if (/_visibility$/.test(key) === false) {
                var fieldVisibility = data[key + "_visibility"];
                if (typeof fieldVisibility !== 'string'
                    || fieldVisibility === "" 
                    || fieldVisibility === "*"
                    || containsToken(fieldVisibility, token)) {
                  filtered[key] = value;
                }
              }
            });
            return filtered;
          };
  
          /**
           * TODO: Description
           * @method dispatch
           * @param name {string} the name of the event
           * @param listener {Listener} the listener object to call back to
           * @param data {object}
           */        
          this.dispatch = function (name, listener, data, timestamp) {
            var evt, filteredData, extraData;
            
            if (validate(listener.token, data)) {
              // remove private fields from the data for each listener
              filteredData = filter(listener.token, data);
              // send to the listener
              evt = new Event(name, filteredData, timestamp);
              extraData = listener.callback(evt);
              // merge any additional data found by the listener into the data
              if (extraData) {
                Y.mix(data, extraData);
              }
            }
          };
        },
      
        firewall = new EventDispatcher(); 
  
        /**
         * Bind a listener to a named event.
         * @method bind
         * @for jsHub
         * @param eventName {string} the name of the event to bind.
         * Note that "*" is a special event name, which is taken to mean that 
         * the listener wants to be informed of every event that occurs 
         * (provided it has visibility of that event).
         * @param token {string} an identifier for the listener, which will
         * be matched against the value of the <code>data-visibility</code>
         * attribute of the DOM node containing the event.
         * @param callback {function} the function to call when an event is 
         * triggered. The function will be called with a single parameter containing
         * the event object.
         */
        this.bind = function (eventName, token, callback) {
          // TODO validate input data
          var list = listeners[eventName], found, i;
          if ('undefined' === typeof list) {
            list = [];
          }
          // if already present, then replace the callback function
          for (found = false, i = 0; i < list.length; i++) {
            if (list[i].token === token) {
              list[i].callback = callback;
              found = true;
              break;
            } 
          }
          // otherwise add it
          if (! found) {
            list.push(new Listener(token, callback));
          }
          listeners[eventName] = list;
        };
  
        /**
         * Fire a named event, and inform all listeners
         * @method trigger
         * @for jsHub
         * @param eventName {string}
         * @param data {object} a data object containing name=value fields for the event data
         * @param timestamp {number} a timestamp, which can be used to associate this event
         * with other events created due to the same user action in the browser. Optional, will
         * be created automatically if not supplied.
         */
        this.trigger = function (eventName, data, timestamp) {
          // empty object if not defined
          data = data || {};
          // find all registered listeners for the specific event, and for "*"
          var registered = (listeners[eventName] || []);
          var found, listener, listeners_all = (listeners["*"] || []), i, j;
          for (i = 0; i < listeners_all.length; i++) {
            listener = listeners_all[i];
            found = false;
            for (j = 0; j < registered.length; j++) {
              if (registered[j].token === listener.token) {
                found = true;
              }
            }
            if (!found) {
              registered.push(listener);
            }
          }
          for (var k = 0; k < registered.length; k++) {
            firewall.dispatch(eventName, registered[k], data, timestamp);
          }
      // additional special behavior for particular event types
          if (eventName === "plugin-initialization-start") {
            plugins.push(data);
          }
        };
      
      /**
       * Get information about plugins that have registered with
       * the hub using trigger("plugin-initialization-start").
       */
        this.getPluginInfo = function () {
          // take a deep copy to prevent the data being tampered with 
          var clone = [], i;
          for (i = 0; i < plugins.length; i++) {
            var plugin = plugins[i], plugin_clone = {};
            for (var field in plugin) {
              if (typeof plugin[field] === 'string' || typeof plugin[field] === 'number') {
                plugin_clone[field] = plugin[field];
              }
            }
            clone.push(plugin_clone);
          }
          return clone;
        };
      },
  
    // jsHub object in global namespace
    jsHub = global.jsHub = new Hub();
    
    // Create an object to return safe instances of important variables
    jsHub.safe = function (obj) {
      var safeObject;
      switch (obj) {
      case 'document' : 
        safeObject = {
          // no document DOM properties are available
          location : { 
            href : document.location.href,
            host : document.location.host,
            protocol : document.location.protocol,
            pathname : document.location.pathname
          },
          title : document.title,
          referrer : (document.referrer === null) ? "" : document.referrer,
          cookies : document.cookies,
          domain : 'Unsafe property'
        };
        break;      
      case '$' :
        // TODO this is not safe
        if (jQuery) {
          safeObject = jQuery;
          break;      
        }
      default :
        safeObject = null;
      }
      return safeObject;
    };
      
    /**
     * Get a timestamp for an event.
     * TODO add sequence / random component
     */
    jsHub.safe.getTimestamp = function () {
      return new Date().getTime();
    };
    
    /** 
     * Convert an object to a JSON representation
     */
    jsHub.safe.toJSONString = function (object) {
      // JSON only natively supported in some browsers
      if (JSON) {
        return JSON.stringify(object, null, 2);
      }
    };
  
  })();

}, '2.0.0' , {
  requires: ['yui'], 
  after: ['yui']
});

/**
 * Alias console wrapper for logging.
 * @module hub
 * @for jsHub
 *//*--------------------------------------------------------------------------*/
// TODO: Enable sending of logging data to remote servers

// JSLint options
/*global YUI, jsHub */
"use strict";

YUI.add('logger', function (Y) {

  (function () {
    // Initialise a logger instance based on what is available
    if (window.debug && window.debug.log) {
      // Use caching debug console wrapper
      jsHub.logger = window.debug;
    } else {
      // firebugx based stub functions
      // ref: http://getfirebug.com/firebug/firebugx.js
      if (!window.console || !console.firebug) {
        var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
        "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];      
        window.console = {};
        for (var i = 0; i < names.length; ++i) {
          window.console[names[i]] = function () {
            // Closure to keep 'i' correct if we use it in the function
            // http://groups.google.com/group/comp.lang.javascript/browse_thread/thread/54ab90e2d778dc14
            return function () {
              /* do nothing */
            }; 
          }(i);
        }
      }
      // Use whatever window.console is now available
      jsHub.logger = window.console;
    }
  })();

}, '2.0.0' , {
  requires: ['hub'],
  after: ['debug']
});

/**
 * Data transport via an Image URL 
 * Dispatches data to a webserver via an HTTP GET request.
 * The response is placed into a non-visible image in the page, and so any
 * data returned by the server is effectively ignored although it is expected
 * to typically be a single pixel GIF image
 * used in plugins
 * @module image-transport
 * @class ImageTranport
 *//*--------------------------------------------------------------------------*/

/*jslint strict: true */
/*global YUI, jsHub */
"use strict";

YUI.add('image-transport', function (Y) {

  (function ($) {

    ImageTransport = function () {
      
      /** 
       * Append a field to a query string url
       */
        var append = function (url, name, value) {
          return url + (url.indexOf('?') > -1 ? '&' : '?') 
            + encodeURIComponent(name) + "=" + encodeURIComponent(value);
        };
  
        /**
         * Send a request to the server as a GET request for an image. 
         * <p>Plugins can call this function to create an image object to send data to the
         * server. Data can be supplied in two locations: in a URL string which can be in
         * any format required by the server, and a data object.
         * <p>All text and numeric fields in the data object are URL encoded and used to build
         * a query string which is appended to the URL. 
         * @method dispatch
         * @for ImageTransport
         * @param url {string} a URL for the endpoint to send the data to. The URL is 
         * processed by the browser, and so it may be fully qualified or relative to the
         * page, as per a normal link. 
         * The URL may contain all the information required by the server, in any format
         * as specified by the plugin calling this function. Plugins must ensure that they
         * have correctly URL encoded any data fields in the URL.
         * If the url is not specified the method will return without taking any action.
         * @param data {object} an object containing name=value pairs that will be sent as 
         * query string data. The name of each field in the object will be used as the form 
         * field name. The value must be either a string, a number, or an array of strings 
         * and numbers, in which case multiple query string fields with the same name will 
         * be created. Any parameters which do not match this expected format will be ignored.
         * @return the ID of the iframe that has been created
         */
        this.dispatch = function (url, data) {
          jsHub.logger.group("ImageTransport: dispatch(" + url + ") entered");
          
      // base url must be defined
          if (typeof url !== 'string' || url.length < 1) {
            jsHub.logger.error("Base url (" + url + ") was not defined correctly");
            jsHub.logger.groupEnd();
            return null;
          }
      
      // add data to url if it is defined
          if (typeof data === 'object') {
            for (var field in data) {
              if (typeof data[field] === 'string' || typeof data[field] === 'number') {
                url = append(url, field, data[field]);
              } else if (!! data[field] && data[field].constructor === Array) {
                var values = data[field];				
                for (var i = 0; i < values.length; i++) {
                  if (typeof values[i] === 'string' || typeof values[i] === 'number') {
                    url = append(url, field, values[i]);
                  }
                }
              }
            }
          }
      
          var image = $('<img>');
          image.attr('src', url);
  
          jsHub.logger.log("Dispatched: " + url);
          jsHub.logger.groupEnd();
          return image[0];
      
        };
      };
    
    jsHub.dispatchViaImage = (new ImageTransport()).dispatch;
  })(jQuery);

  Y.log('image-transport module loaded', 'info', 'jsHub');
}, '2.0.0' , {
  requires: ['hub', 'jquery'], 
  after: ['hub']
});
    
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

  (function ($) {

    FormTransport = function () {
  
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
        var form, appendField, iframe, iframeID, field, array, i;
        
        /*
         * This data transport only supports POST or GET
         * TODO: validate url for security reasons, reject javascript: protocol etc
         */
        if (!(/^POST|GET$/i.test(method)) || !url) {
          return;
        }
        data = data || {};
    
        /**
         * Add a hidden field to the form
         * @param {Object} form
         * @param {Object} name
         * @param {Object} value
         */
        appendField = function (form, name, value) {
          if ("string" === typeof value || "number" === typeof value) {
            var input = $('<input type="hidden">');
            input.attr("name", name);
            input.attr("value", value);
            form.append(input);            
          }
        };
    
        // Create the form from a string via jQuery
        form = $('<form action="' + url + '" method="' + method + '"></form>');
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
        $('body').append(form);

        // Create the iframe from as string via jQuery
        iframeID = "jshub-iframe-" + jsHub.safe.getTimestamp();
        iframe = $('<iframe src="javascript:void(0)" name="' + iframeID + '" id="' + iframeID + '" '
          + 'style="display: none !important; width: 0px; height: 0px;" class="jshub-iframe"></iframe>');
      
        $('body').append(iframe);
    
        // Set the iframe as the submission target of the form, tied together by a timestamp
        form.attr("target", iframeID);

        // And send it ...
        form.submit();
        jsHub.trigger("form-transport-sent", {
          node: iframeID
        });
        return iframeID;
      };
    },
    
    jsHub.dispatchViaForm = (new FormTransport()).dispatch;
  })(jQuery);

  Y.log('form-transport module loaded', 'info', 'jsHub');
}, '2.0.0' , {
  requires: ['hub', 'jquery'], 
  after: ['hub']
});
    
/**
 * Enhancements to jQuery for common functions 
 * used in plugins
 * @module utilities
 * @class PluginAPI
 *//*--------------------------------------------------------------------------*/

/*jslint strict: true */
/*global YUI, jsHub */
"use strict";

YUI.add('utilities', function (Y) {
 
  (function () {
   
    var PluginAPI = {
  
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
     * Add the API as global functions on the core jsHub object
     */
    Y.mix(jsHub, PluginAPI);
  })();

}, '2.0.0' , {
  requires: ['hub'], 
  after: ['hub']
});

/**
 * Enhancements to jQuery for common functions
 * used in microformat plugins
 * @module microformats
 * @class MicroformatAPI
 */
/*--------------------------------------------------------------------------*/

// JSLint options
/*global YUI, jsHub, jQuery */
"use strict";

YUI.add('microformats', function (Y) {

  (function () {
  
    /*
     * trim whitespace at beginning and end of value and
     * remove multiple spaces
     */
    function trim(value) {
      if (value !== null) {
        value = value.replace(/&nbsp;/g, ' ');
        value = jQuery.trim(value);
        value = value.replace(/\s+/g, ' ');
      }
      return value;
    }
  
  
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
        value = trim(value);
        
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
       * present, or null if no data is found. The <code>value</code> field will be a string if
       * there is a single value, or an array of strings if there are multiple values found.
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
  
          /*
           * trim whitespace at beginning and end of the type
           */
          type = trim(type);
  
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
          } else if (valueNodes.length === 1) {
            value = jQuery(valueNodes[0]).html();
          } else {
            value = [];
            valueNodes.each(function () {
              value.push(jQuery(this).html());
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
    Y.mix($.fn, MicroformatAPI);
      
  })(jQuery);

}, '2.0.0' , {
  requires: ['hub'], 
  after: ['hub']
});