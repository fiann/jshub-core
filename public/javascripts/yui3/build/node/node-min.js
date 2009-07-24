/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0b1
build: 1163
*/
YUI.add("node-base",function(E){var P={},M={},H={},K=Array.prototype.slice,J=".",F="nodeName",N="nodeType",B="ownerDocument",L="tagName",D="_yuid",G=E.Base,C=E.Base.prototype,I=function(S,Q){var R=null;this[D]=E.stamp(S);if(!this[D]){this[D]=E.guid();}P[this[D]]=S;I._instances[this[D]]=this;if(Q){R={restricted:Q};H[this[D]]=true;}this._lazyAttrInit=true;this._silentInit=true;G.call(this,R);},O=function(R){var Q=null;if(R){Q=(typeof R==="string")?function(S){return E.Selector.test(S,R);}:function(S){return R(I.get(S));};}return Q;};I.NAME="Node";I.DOM_EVENTS={abort:true,blur:true,change:true,click:true,close:true,command:true,contextmenu:true,drag:true,dragstart:true,dragenter:true,dragover:true,dragleave:true,dragend:true,drop:true,dblclick:true,error:true,focus:true,keydown:true,keypress:true,keyup:true,load:true,mousedown:true,mousemove:true,mouseout:true,mouseover:true,mouseup:true,mousemultiwheel:true,mousewheel:true,submit:true,mouseenter:true,mouseleave:true,scroll:true,reset:true,resize:true,select:true,textInput:true,unload:true};E.mix(I.DOM_EVENTS,E.Env.evt.plugins);I._instances={};I.plug=function(){var Q=K.call(arguments,0);Q.unshift(I);E.Base.plug.apply(E.Base,Q);return I;};I.unplug=function(){var Q=K.call(arguments,0);Q.unshift(I);E.Base.unplug.apply(E.Base,Q);return I;};I.getDOMNode=function(Q){if(Q){if(Q instanceof I){Q=P[Q[D]];}else{if(!Q[F]||E.DOM.isWindow(Q)){Q=null;}}}return Q||null;};I.scrubVal=function(T,R,S){if(R&&T){if(typeof T==="object"||typeof T==="function"){if(N in T||E.DOM.isWindow(T)){if(H[R[D]]&&!R.contains(T)){T=null;}else{T=I.get(T);}}else{if(T.item||(T[0]&&T[0][N])){T=E.all(T);}else{S=(S===undefined)?4:S;if(S>0){for(var Q in T){if(T.hasOwnProperty&&T.hasOwnProperty(Q)){T[Q]=I.scrubVal(T[Q],R,--S);}}}}}}}else{if(T===undefined){T=R;}}return T;};I.addMethod=function(Q,S,R){if(Q&&S&&typeof S==="function"){I.prototype[Q]=function(){R=R||this;var U=K.call(arguments),T;if(U[0]&&U[0] instanceof I){U[0]=I.getDOMNode(U[0]);}if(U[1]&&U[1] instanceof I){U[1]=I.getDOMNode(U[1]);}U.unshift(P[this[D]]);T=I.scrubVal(S.apply(R,U),this);return T;};}else{}};I.importMethod=function(S,Q,R){if(typeof Q==="string"){R=R||Q;I.addMethod(R,S[Q],S);}else{E.each(Q,function(T){I.importMethod(S,T);});}};I.get=function(S,T,R){var Q=null;if(typeof S==="string"){if(S.indexOf("doc")===0){S=E.config.doc;}else{if(S.indexOf("win")===0){S=E.config.win;}else{S=E.Selector.query(S,T,true);}}}if(S){Q=I._instances[S[D]];if(!Q){Q=new I(S,R);}else{if(R){H[Q[D]]=true;Q._set("restricted",true);}}}return Q;};I.create=function(){return I.get(E.DOM.create.apply(E.DOM,arguments));};I.ATTRS={text:{getter:function(){return E.DOM.getText(P[this[D]]);},setter:function(Q){E.DOM.setText(P[this[D]],Q);return Q;}},"options":{getter:function(){return this.getElementsByTagName("option");}},"children":{getter:function(){var T=P[this[D]],S=T.children,U,R,Q;if(S===undefined){U=T.childNodes;S=[];for(R=0,Q=U.length;R<Q;++R){if(U[R][L]){S[S.length]=U[R];}}}return E.all(S);}},value:{getter:function(){return E.DOM.getValue(P[this[D]]);},setter:function(Q){E.DOM.setValue(P[this[D]],Q);return Q;}},restricted:{writeOnce:true,value:false}};I.DEFAULT_SETTER=function(Q,S){var R=P[this[D]],T;if(Q.indexOf(J)>-1){T=Q;Q=Q.split(J);E.Object.setValue(R,Q,S);}else{if(R[Q]!==undefined){R[Q]=S;}}return S;};I.DEFAULT_GETTER=function(Q){var R=P[this[D]],S;if(Q.indexOf&&Q.indexOf(J)>-1){S=E.Object.getValue(R,Q.split(J));}else{S=R[Q];}return S?E.Node.scrubVal(S,this):S;};E.extend(I,E.Base);E.mix(I.prototype,{toString:function(){var S="",R=this[D]+": not bound to a node",Q=P[this[D]];if(Q){S+=Q[F];if(Q.id){S+="#"+Q.id;}if(Q.className){S+="."+Q.className.replace(" ",".");}S+=" "+this[D];}return S||R;},_addDOMAttr:function(Q){var R=P[this[D]];if(R&&R[Q]!==undefined){this.addAttr(Q,{getter:function(){return I.DEFAULT_GETTER.call(this,Q);},setter:function(S){return I.DEFAULT_SETTER.call(this,Q,S);}});}else{}},get:function(Q){if(!this.attrAdded(Q)){if(I.re_aria&&I.re_aria.test(Q)){this._addAriaAttr(Q);}else{return I.DEFAULT_GETTER.apply(this,arguments);}}return C.get.apply(this,arguments);},set:function(Q,R){if(!this.attrAdded(Q)){if(I.re_aria&&I.re_aria.test(Q)){this._addAriaAttr(Q);}else{if(Q.indexOf(J)<0&&this._yuievt.events["Node:"+Q+"Change"]){this._addDOMAttr(Q);}else{I.DEFAULT_SETTER.call(this,Q,R);return this;}}}C.set.apply(this,arguments);return this;},create:I.create,compareTo:function(Q){var R=P[this[D]];if(Q instanceof E.Node){Q=E.Node.getDOMNode(Q);}return R===Q;},inDoc:function(R){var Q=P[this[D]];R=(R)?I.getDOMNode(R):Q[B];if(R.documentElement){return E.DOM.contains(R.documentElement,Q);}},getById:function(S){var R=P[this[D]],Q=E.DOM.byId(S,R[B]);if(Q&&E.DOM.contains(R,Q)){Q=E.get(Q);}else{Q=null;}return Q;},ancestor:function(Q){return I.get(E.DOM.elementByAxis(P[this[D]],"parentNode",O(Q)));},previous:function(R,Q){return I.get(E.DOM.elementByAxis(P[this[D]],"previousSibling",O(R),Q));},next:function(S,R,Q){return I.get(E.DOM.elementByAxis(P[this[D]],"nextSibling",O(R),Q));},query:function(Q){return E.get(E.Selector.query(Q,P[this[D]],true));},queryAll:function(Q){return E.all(E.Selector.query(Q,P[this[D]]));},test:function(Q){return E.Selector.test(P[this[D]],Q);},remove:function(){var Q=P[this[D]];Q.parentNode.removeChild(Q);return this;},invoke:function(X,R,Q,W,V,U){var T=P[this[D]],S;if(R&&R instanceof E.Node){R=I.getDOMNode(R);}if(Q&&Q instanceof E.Node){Q=I.getDOMNode(Q);}S=T[X](R,Q,W,V,U);return E.Node.scrubVal(S,this);},destructor:function(){},each:function(R,Q){Q=Q||this;return R.call(Q,this);},item:function(Q){return this;},size:function(){return P[this[D]]?1:0;},insert:function(R,Q){if(R){if(typeof Q==="number"){Q=P[this[D]].childNodes[Q];}if(typeof R!=="string"){R=E.Node.getDOMNode(R);}if(!Q||(!H[this[D]]||(typeof Q!=="string"&&this.contains(Q)))){E.DOM.addHTML(P[this[D]],R,Q);}}return this;},prepend:function(Q){return this.insert(Q,0);},append:function(Q){return this.insert(Q,null);},setContent:function(Q){E.DOM.addHTML(P[this[D]],Q,"replace");
return this;},hasMethod:function(R){var Q=P[this[D]];return(Q&&(typeof Q==="function"));}},true);E.Node=I;E.get=E.Node.get;E.Array._diff=function(R,Q){var V=[],X=false,T,S,W,U;outer:for(T=0,W=R.length;T<W;T++){X=false;for(S=0,U=Q.length;S<U;S++){if(R[T]===Q[S]){X=true;continue outer;}}if(!X){V[V.length]=R[T];}}return V;};E.Array.diff=function(R,Q){return{added:E.Array._diff(Q,R),removed:E.Array._diff(R,Q)};};var A=function(R){var S=R.doc||E.config.doc,Q=R.nodes||[];if(typeof Q==="string"){this._query=Q;Q=E.Selector.query(Q,S);}E.stamp(this);A._instances[this[D]]=this;M[this[D]]=Q;if(R.restricted){H=this[D];}};A.NAME="NodeList";A.getDOMNodes=function(Q){return M[Q[D]];};A._instances=[];A.each=function(Q,T,S){var R=M[Q[D]];if(R&&R.length){E.Array.each(R,T,S||Q);}else{}};A.addMethod=function(Q,T,S){var R=A._getTempNode();if(Q&&T){A.prototype[Q]=function(){var V=[],U=arguments;E.Array.each(M[this[D]],function(a){var Z="_yuid",X=E.Node._instances[a[Z]],Y,W;if(!X){P[R[Z]]=a;X=R;}Y=S||X;W=T.apply(Y,U);if(W!==undefined&&W!==X){V[V.length]=W;}});return V.length?V:this;};}else{}};A.importMethod=function(S,Q,R){if(typeof Q==="string"){R=R||Q;A.addMethod(Q,S[Q]);}else{E.each(Q,function(T){A.importMethod(S,T);});}};A._getTempNode=function(){var Q=A._tempNode;if(!Q){Q=E.Node.create("<div></div>");A._tempNode=Q;}return Q;};E.mix(A.prototype,{item:function(Q){return E.get((M[this[D]]||[])[Q]);},each:function(S,R){var Q=this;E.Array.each(M[this[D]],function(U,T){U=E.get(U);return S.call(R||U,U,T,Q);});return Q;},batch:function(S,R){var T=this,Q=A._getTempNode();E.Array.each(M[this[D]],function(W,V){var U=E.Node._instances[W[D]];if(!U){P[Q[D]]=W;U=Q;}return S.call(R||U,U,V,T);});return T;},some:function(S,R){var Q=this;return E.Array.some(M[this[D]],function(U,T){U=E.get(U);R=R||U;return S.call(R,U,T,Q);});},indexOf:function(Q){return E.Array.indexOf(M[this[D]],E.Node.getDOMNode(Q));},filter:function(Q){return E.all(E.Selector.filter(M[this[D]],Q));},modulus:function(S,R){R=R||0;var Q=[];A.each(this,function(U,T){if(T%S===R){Q.push(U);}});return E.all(Q);},odd:function(){return this.modulus(2,1);},even:function(){return this.modulus(2);},destructor:function(){delete A._instances[this[D]];},refresh:function(){var R,Q,S=M[this[D]];if(this._query){if(M[this[D]]&&M[this[D]][0]&&M[this[D]][0].ownerDocument){R=M[this[D]][0].ownerDocument;}M[this[D]]=E.Selector.query(this._query,R||E.config.doc);Q=E.Array.diff(S,M[this[D]]);Q.added=Q.added?E.all(Q.added):null;Q.removed=Q.removed?E.all(Q.removed):null;this.fire("refresh",Q);}return this;},on:function(S,R,Q){Q=Q||this;this.batch(function(T){T.on.call(T,S,R,Q);});},after:function(S,R,Q){Q=Q||this;this.batch(function(T){T.after.call(T,S,R,Q);});},size:function(){return M[this[D]].length;},get:function(R){var Q=[],S=A._getTempNode();A.each(this,function(U){var T=E.Node._instances[U[D]];if(!T){P[S[D]]=U;T=S;}Q[Q.length]=T.get(R);});return Q;},toString:function(){var T="",S=this[D]+": not bound to any nodes",Q=M[this[D]],R;if(Q&&Q[0]){R=Q[0];T+=R[F];if(R.id){T+="#"+R.id;}if(R.className){T+="."+R.className.replace(" ",".");}if(Q.length>1){T+="...["+Q.length+" items]";}}return T||S;}},true);A.importMethod(E.Node.prototype,["append","detach","detachAll","insert","plug","prepend","remove","set","setContent","unplug"]);E.NodeList=A;E.all=function(R,T,Q){var S=new A({nodes:R,doc:T,restricted:Q});return S;};E.Node.all=E.all;E.Array.each(["replaceChild","appendChild","insertBefore","removeChild","hasChildNodes","cloneNode","hasAttribute","removeAttribute","scrollIntoView","getElementsByTagName","focus","blur","submit","reset","select"],function(Q){E.Node.prototype[Q]=function(U,S,R){var T=this.invoke(Q,U,S,R);return T;};});I.importMethod(E.DOM,["contains","setAttribute","getAttribute"]);if(!document.documentElement.hasAttribute){E.Node.prototype.hasAttribute=function(Q){return E.DOM.getAttribute(E.Node.getDOMNode(this),Q)!=="";};}E.NodeList.importMethod(E.Node.prototype,["getAttribute","setAttribute"]);(function(){var R=document.createElement("div"),Q="_yuid";E.stamp(R);if(R[Q]===R.cloneNode(true)[Q]){E.Node.prototype.cloneNode=function(S){var T=E.Node.getDOMNode(this).cloneNode(S);T[Q]=E.guid();return E.get(T);};}})();(function(R){var Q=["hasClass","addClass","removeClass","replaceClass","toggleClass"];R.Node.importMethod(R.DOM,Q);R.NodeList.importMethod(R.Node.prototype,Q);})(E);E.Node.prototype.delegate=function(V,U,Q,T){T=T||this;var S=Array.prototype.slice.call(arguments,4),R=["delegate",U,E.Node.getDOMNode(this),V,Q,T];R=R.concat(S);return E.on.apply(E,R);};},"3.0.0b1",{requires:["dom-base","base","selector"]});YUI.add("node-style",function(A){(function(C){var B=["getStyle","getComputedStyle","setStyle","setStyles"];C.Node.importMethod(C.DOM,B);"getComputedStyle","setStyle","setStyles";C.NodeList.importMethod(C.Node.prototype,B);})(A);},"3.0.0b1",{requires:["dom-style","node-base"]});YUI.add("node-screen",function(A){A.each(["winWidth","winHeight","docWidth","docHeight","docScrollX","docScrollY"],function(B){A.Node.ATTRS[B]={getter:function(){var C=Array.prototype.slice.call(arguments);C.unshift(A.Node.getDOMNode(this));return A.DOM[B].apply(this,C);}};});A.Node.ATTRS.scrollLeft={getter:function(){var B=A.Node.getDOMNode(this);return("scrollLeft" in B)?B.scrollLeft:A.DOM.docScrollX(B);},setter:function(C){var B=A.Node.getDOMNode(this);if(B){if("scrollLeft" in B){B.scrollLeft=C;}else{if(B.document||B.nodeType===9){A.DOM._getWin(B).scrollTo(C,A.DOM.docScrollY(B));}}}else{}}};A.Node.ATTRS.scrollTop={getter:function(){var B=A.Node.getDOMNode(this);return("scrollTop" in B)?B.scrollTop:A.DOM.docScrollY(B);},setter:function(C){var B=A.Node.getDOMNode(this);if(B){if("scrollTop" in B){B.scrollTop=C;}else{if(B.document||B.nodeType===9){A.DOM._getWin(B).scrollTo(A.DOM.docScrollX(B),C);}}}else{}}};A.Node.importMethod(A.DOM,["getXY","setXY","getX","setX","getY","setY"]);A.Node.ATTRS.region={getter:function(){var B=A.Node.getDOMNode(this);if(B&&!B.tagName){if(B.nodeType===9){B=B.documentElement;
}else{if(B.alert){B=B.document.documentElement;}}}return A.DOM.region(B);}};A.Node.ATTRS.viewportRegion={getter:function(){return A.DOM.viewportRegion(A.Node.getDOMNode(this));}};A.Node.importMethod(A.DOM,"inViewportRegion");A.Node.prototype.intersect=function(B,D){var C=A.Node.getDOMNode(this);if(B instanceof A.Node){B=A.Node.getDOMNode(B);}return A.DOM.intersect(C,B,D);};A.Node.prototype.inRegion=function(B,D,E){var C=A.Node.getDOMNode(this);if(B instanceof A.Node){B=A.Node.getDOMNode(B);}return A.DOM.inRegion(C,B,D,E);};},"3.0.0b1",{requires:["dom-screen"]});YUI.add("node-aria",function(A){A.Node.re_aria=/^(?:role$|aria-)/;A.Node.prototype._addAriaAttr=function(B){this.addAttr(B,{getter:function(){return A.Node.getDOMNode(this).getAttribute(B,2);},setter:function(C){A.Node.getDOMNode(this).setAttribute(B,C);return C;}});};},"3.0.0b1",{requires:["node-base"]});YUI.add("node",function(A){},"3.0.0b1",{skinnable:false,use:["node-base","node-style","node-screen","node-aria"]});