/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0b1
build: 1163
*/
YUI.add("node-event-simulate",function(A){A.Node.prototype.simulate=function(C,B){A.Event.simulate(A.Node.getDOMNode(this),C,B);};},"3.0.0b1",{requires:["node-base","event-simulate"]});