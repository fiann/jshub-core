$debug("Defining Document");
/**
 * @class  DOMDocument - The Document interface represents the entire HTML 
 *      or XML document. Conceptually, it is the root of the document tree, 
 *      and provides the primary access to the document's data.
 *
 * @extends DOMNode
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  implementation : DOMImplementation - the creator Implementation
 */
var DOMDocument = function(implementation, docParentWindow) {
    // if (!( implementation === undefined && docParentWindow == undefined)) {
    //     print("DD",implementation, docParentWindow, docParentWindow && docParentWindow.isInner);
    // }
    //$log("\tcreating dom document");
    this.DOMNode = DOMNode;
    this.DOMNode(this);
    
    this.doctype = null;                  // The Document Type Declaration (see DocumentType) associated with this document
    this.implementation = implementation; // The DOMImplementation object that handles this document.
    
    // "private" variable providing the read-only document.parentWindow property
    this._parentWindow = docParentWindow;
    try {
        if (docParentWindow.$thisWindowsProxyObject)
            this._parentWindow = docParentWindow.$thisWindowsProxyObject;
    } catch(e){}

    this.nodeName  = "#document";
    this._id = 0;
    this._lastId = 0;
    this._parseComplete = false;                   // initially false, set to true by parser
    this._url = "";
    
    this.ownerDocument = null;
    
    this._performingImportNodeOperation = false;
};
DOMDocument.prototype = new DOMNode;
__extend__(DOMDocument.prototype, {	

    addEventListener        : function(type, fn){ __addEventListener__(this, type, fn); },
	removeEventListener     : function(type){ __removeEventListener__(this, type); },
	attachEvent             : function(type, fn){ __addEventListener__(this, type, fn); },
	detachEvent             : function(type){ __removeEventListener__(this, type); },
	dispatchEvent           : function(event, bubbles){ __dispatchEvent__(this, event, bubbles); },

    toString : function(){
        return '[object DOMDocument]';
    },
    addEventListener        : function(){ this._parentWindow.addEventListener.apply(this, arguments); },
	removeEventListener     : function(){ this._parentWindow.removeEventListener.apply(this, arguments); },
	attachEvent             : function(){ this._parentWindow.addEventListener.apply(this, arguments); },
	detachEvent             : function(){ this._parentWindow.removeEventListener.apply(this, arguments); },
	dispatchEvent           : function(){ this._parentWindow.dispatchEvent.apply(this, arguments); },

    get styleSheets(){ 
        return [];/*TODO*/ 
    },
    get all(){
        return this.getElementsByTagName("*");
    },
    get documentElement(){
        var i, length = this.childNodes?this.childNodes.length:0;
        for(i=0;i<length;i++){
           if(this.childNodes[i].nodeType == DOMNode.ELEMENT_NODE){
                return this.childNodes[i];
            }
        }
        return null;
    },
    get parentWindow(){
        return this._parentWindow;
    },
    loadXML : function(xmlString) {
        // create SAX Parser
        var parser = new XMLP(xmlString+'');
        
        // create DOM Document
        if(this === $document){
            $debug("Setting internal window.document");
            $document = this;
        }
        // populate Document with Parsed Nodes
        try {
            // make sure thid document object is empty before we try to load ...
            this.childNodes = new DOMNodeList(this, this);
            this.firstChild = null;
            this.lastChild = null;
            this.attributes = new DOMNamedNodeMap(this, this);
            this._namespaces = new DOMNamespaceNodeMap(this, this);
            this._readonly = false;
 
            __parseLoop__(this.implementation, this, parser);
        } catch (e) {
            $error(e);
        }
 
        // set parseComplete flag, (Some validation Rules are relaxed if this is false)
        this._parseComplete = true;
        return this;
    },
    load: function(url,xhr_options){
		$debug("Loading url into DOM Document: "+ url + " - (Asynch? "+this._parentWindow.document.async+")");
        var scripts, _this = this;
        var xhr;
        if (url == "about:blank"){
            xhr = ({
                open: function(){},
                send: function(){
                    this.responseText = "<html><head><title></title></head><body></body></html>";
                    this.onreadystatechange();
                },
                status: 200
            });
        } else if (url.indexOf("data:") === 0) {
            url = url.slice(5);
            var fields = url.split(",");
            var content = fields[1];
            var fields = fields[0].split(";");
            if(fields[1] === "base64" || (fields[1] && fields[1].indexOf("charset=") === 0 && fields[2] === "base64" ) ) {
                content = Base64.decode(content);
            } else {
                content = unescape(content);
            }
            if(fields[0] === "text/html") {
            } else if(fields[0] === "image/png") {
                throw new Error("png");
            } else {
                content =  "<html><head><title></title></head><body>"+content+"</body></html>";
            }
            xhr = ({
                open: function(){},
                send: function(){
                    var self = this;
                    setTimeout(function(){
                        self.responseText = content;
                        self.onreadystatechange();
                    },0);
                },
                status: 200
            });
        } else {
            xhr = new _this._parentWindow.XMLHttpRequest();
        }
        xhr_options = xhr_options || {};
        var method = (xhr_options.method || "GET").toUpperCase();
        xhr.open(method, url, this._parentWindow.document.async);
        // FIXME: not all XHRs have this right now
        xhr.setRequestHeader && xhr.setRequestHeader('Content-Type', xhr_options["Content-Type"] || 'application/x-www-form-urlencoded');
        xhr.setRequestHeader && xhr.setRequestHeader('Cookie', _this.cookie);
        // print("rf",xhr_options["referer"]);
        xhr.setRequestHeader && xhr_options["referer"] && xhr.setRequestHeader('Referer', xhr_options["referer"]);
        // print(_this._parentWindow.location.href);
        xhr.onreadystatechange = function(){
            // print(url,xhr.status,xhr.responseText);
            if(xhr.status === 302) {
                // print(302,xhr.responseHeaders["location"]);
                _this.load(xhr.responseHeaders["location"],{});
                return;
            }
            if (xhr.status != 200) {
                $warn("Could not retrieve XHR content from " + url + ": status code " + xhr.status);
                _this.loadXML(
                    "<html><head></head><body>"+
                        "<h1>No File</h1>"+
                        "</body></html>");
            } else {
                try{
        	        _this.loadXML(xhr.responseText, xhr.__url);
                    _this.__original_text__ = xhr.responseText;
                    if(xhr.responseHeaders && xhr.responseHeaders["set-cookie"]) {
                        try {
                            _this.cookie = xhr.responseHeaders["set-cookie"];
                        } catch(e) {
                            $error("could not set cookie: "+e);
                        }
                    }
                    if(xhr.responseHeaders) {
                        var h = _this.__headers__ = {};
                        for(var key in xhr.responseHeaders) {
                            h[key] = xhr.responseHeaders[key];
                        }
                    }
                }catch(e){
                    $error("Error Parsing XML - ",e);
                    _this.loadXML(
                        "<html><head></head><body>"+
                            "<h1>Parse Error</h1>"+
                            "<p>"+e.toString()+"</p>"+  
                            "</body></html>");
                }
            }
            _this._url = url;
            
            if ( url != "about:blank" ) {
        	$info("Sucessfully loaded document at "+url);
            }

            // first fire body-onload event
            var bodyLoad = _this.createEvent();
            bodyLoad.initEvent("load");
            try {  // assume <body> element, but just in case....
                _this.getElementsByTagName('body')[0].
                  dispatchEvent( bodyLoad, false );
            } catch (e){;}

            // then fire this onload event
            //event = _this.createEvent();
            //event.initEvent("load");
            //_this.dispatchEvent( event, false );
			
			//also use DOMContentLoaded event
            var domContentLoaded = _this.createEvent();
            domContentLoaded.initEvent("DOMContentLoaded");
            _this.dispatchEvent( domContentLoaded, false );
            
            //finally fire the window.onload event
            if(_this === _this._parentWindow.document){
                var windowLoad = _this.createEvent();
                windowLoad.initEvent("load", false, false);
                _this._parentWindow.dispatchEvent( windowLoad, false );
            }
            
        };
        xhr.send(xhr_options["data"]);
    },
	createEvent             : function(eventType){ 
        var event;
        if(eventType === "UIEvents"){ event = new UIEvent();}
        else if(eventType === "MouseEvents"){ event = new MouseEvent();}
        else{ event = new Event(); } 
        return event;
    },
    createExpression        : function(xpath, nsuriMap){ 
        return new XPathExpression(xpath, nsuriMap);
    },
    createElement : function(tagName) {
          //$debug("DOMDocument.createElement( "+tagName+" )");
          // throw Exception if the tagName string contains an illegal character
          if (__ownerDocument__(this).implementation.errorChecking 
            && (!__isValidName__(tagName))) {
            throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
          }
        
          // create DOMElement specifying 'this' as ownerDocument
          var node = new DOMElement(this);
        
          // assign values to properties (and aliases)
          node.tagName  = tagName;
        
          return node;
    },
    createDocumentFragment : function() {
          // create DOMDocumentFragment specifying 'this' as ownerDocument
          var node = new DOMDocumentFragment(this);
          return node;
    },
    createTextNode: function(data) {
          // create DOMText specifying 'this' as ownerDocument
          var node = new DOMText(this);
        
          // assign values to properties (and aliases)
          node.data      = data;
        
          return node;
    },
    createComment : function(data) {
          // create DOMComment specifying 'this' as ownerDocument
          var node = new DOMComment(this);
        
          // assign values to properties (and aliases)
          node.data      = data;
        
          return node;
    },
    createCDATASection : function(data) {
          // create DOMCDATASection specifying 'this' as ownerDocument
          var node = new DOMCDATASection(this);
        
          // assign values to properties (and aliases)
          node.data      = data;
        
          return node;
    },
    createProcessingInstruction : function(target, data) {
          // throw Exception if the target string contains an illegal character
          //$log("DOMDocument.createProcessingInstruction( "+target+" )");
          if (__ownerDocument__(this).implementation.errorChecking 
            && (!__isValidName__(target))) {
            throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
          }
        
          // create DOMProcessingInstruction specifying 'this' as ownerDocument
          var node = new DOMProcessingInstruction(this);
        
          // assign values to properties (and aliases)
          node.target    = target;
          node.data      = data;
        
          return node;
    },
    createAttribute : function(name) {
        // throw Exception if the name string contains an illegal character
        //$log("DOMDocument.createAttribute( "+target+" )");
        if (__ownerDocument__(this).implementation.errorChecking 
            && (!__isValidName__(name))) {
            throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
        }
        
        // create DOMAttr specifying 'this' as ownerDocument
        var node = new DOMAttr(this);
        
        // assign values to properties (and aliases)
        node.name     = name;
        
        return node;
    },
    createElementNS : function(namespaceURI, qualifiedName) {
        //$log("DOMDocument.createElementNS( "+namespaceURI+", "+qualifiedName+" )");
          // test for exceptions
          if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if the Namespace is invalid
            if (!__isValidNamespace__(this, namespaceURI, qualifiedName)) {
              throw(new DOMException(DOMException.NAMESPACE_ERR));
            }
        
            // throw Exception if the qualifiedName string contains an illegal character
            if (!__isValidName__(qualifiedName)) {
              throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
            }
          }
        
          var qname = __parseQName__(qualifiedName);

          // create DOMElement specifying 'this' as ownerDocument
          if(namespaceURI === "http://www.w3.org/2000/svg"){
              var node = SVGDocument.prototype.createElement.call( this, qname.localName );
          } else {
              var node  = new DOMElement(this);
          }

          // assign values to properties (and aliases)
          node.namespaceURI = namespaceURI;
          node.prefix       = qname.prefix;
          node.localName    = qname.localName;
          node.tagName      = qualifiedName;
        
          return node;
    },
    createAttributeNS : function(namespaceURI, qualifiedName) {
          // test for exceptions
          if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if the Namespace is invalid
            if (!__isValidNamespace__(this, namespaceURI, qualifiedName, true)) {
              throw(new DOMException(DOMException.NAMESPACE_ERR));
            }
        
            // throw Exception if the qualifiedName string contains an illegal character
            if (!__isValidName__(qualifiedName)) {
              throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
            }
          }
        
          // create DOMAttr specifying 'this' as ownerDocument
          var node  = new DOMAttr(this);
          var qname = __parseQName__(qualifiedName);
        
          // assign values to properties (and aliases)
          node.namespaceURI = namespaceURI;
          node.prefix       = qname.prefix;
          node.localName    = qname.localName;
          node.name         = qualifiedName;
          node.nodeValue    = "";
        
          return node;
    },
    createNamespace : function(qualifiedName) {
          // create DOMNamespace specifying 'this' as ownerDocument
          var node  = new DOMNamespace(this);
          var qname = __parseQName__(qualifiedName);
        
          // assign values to properties (and aliases)
          node.prefix       = qname.prefix;
          node.localName    = qname.localName;
          node.name         = qualifiedName;
          node.nodeValue    = "";
        
          return node;
    },
    /** from David Flanagan's JavaScript - The Definitive Guide
     * 
     * @param {String} xpathText
     *     The string representing the XPath expression to evaluate.
     * @param {Node} contextNode 
     *     The node in this document against which the expression is to
     *     be evaluated.
     * @param {Function} nsuriMapper 
     *     A function that will map from namespace prefix to to a full 
     *     namespace URL or null if no such mapping is required.
     * @param {Number} resultType 
     *     Specifies the type of object expected as a result, using
     *     XPath conversions to coerce the result. Possible values for
     *     type are the constrainsts defined by the XPathResult object.
     *     (null if not required)
     * @param {XPathResult} result 
     *     An XPathResult object to be reused or null
     *     if you want a new XPathResult object to be created.
     * @returns {XPathResult} result
     *     A XPathResult object representing the evaluation of the 
     *     expression against the given context node.
     * @throws {Exception} e
     *     This method may throw an exception if the xpathText contains 
     *     a syntax error, if the expression cannot be converted to the
     *     desired resultType, if the expression contains namespaces 
     *     that nsuriMapper cannot resolve, or if contextNode is of the 
     *     wrong type or is not assosciated with this document.
     * @seealso
     *     Document.evaluate
     */
    evaluate: function(xpathText, contextNode, nsuriMapper, resultType, result){
        try {
            return new XPathExpression(xpathText, contextNode, nsuriMapper, resultType, result).evaluate();
        } catch(e) {
print("xpath failure: " + e);
            throw e;
        }
        
    },
    getElementById : function(elementId) {
          var retNode = null,
              node;
          // loop through all Elements in the 'all' collection
          var all = this.all;
          for (var i=0; i < all.length; i++) {
            node = all[i];
            // if id matches & node is alive (ie, connected (in)directly to the documentElement)
            if (node.id == elementId) {
                if((__ownerDocument__(node).documentElement._id == this.documentElement._id)){
                    retNode = node;
                    //$log("Found node with id = " + node.id);
                    break;
                }
            }
          }
          
          //if(retNode == null){$log("Couldn't find id " + elementId);}
          return retNode;
    },
    normalizeDocument: function(){
	    this.documentElement.normalize();
    },
    get nodeType(){
        return DOMNode.DOCUMENT_NODE;
    },
    get xml(){
        //$log("Serializing " + this);
        return this.documentElement.xml;
    },
	toString: function(){ 
	    return "DOMDocument" +  (typeof this._url == "string" ? ": " + this._url : ""); 
    },
	get defaultView(){ 
        var doc = this;
		return { getComputedStyle: function(elem){
			return doc._parentWindow.getComputedStyle(elem);
		}};
	},
    _genId : function() {
          this._lastId += 1;                             // increment lastId (to generate unique id)
          return this._lastId;
    }
});


var __isValidNamespace__ = function(doc, namespaceURI, qualifiedName, isAttribute) {

      if (doc._performingImportNodeOperation == true) {
        //we're doing an importNode operation (or a cloneNode) - in both cases, there
        //is no need to perform any namespace checking since the nodes have to have been valid
        //to have gotten into the DOM in the first place
        return true;
      }
    
      var valid = true;
      // parse QName
      var qName = __parseQName__(qualifiedName);
    
    
      //only check for namespaces if we're finished parsing
      if (this._parseComplete == true) {
    
        // if the qualifiedName is malformed
        if (qName.localName.indexOf(":") > -1 ){
            valid = false;
        }
    
        if ((valid) && (!isAttribute)) {
            // if the namespaceURI is not null
            if (!namespaceURI) {
            valid = false;
            }
        }
    
        // if the qualifiedName has a prefix
        if ((valid) && (qName.prefix == "")) {
            valid = false;
        }
    
      }
    
      // if the qualifiedName has a prefix that is "xml" and the namespaceURI is
      //  different from "http://www.w3.org/XML/1998/namespace" [Namespaces].
      if ((valid) && (qName.prefix == "xml") && (namespaceURI != "http://www.w3.org/XML/1998/namespace")) {
        valid = false;
      }
    
      return valid;
};

/**
 * @method DOMImplementation._parseQName - parse the qualified name
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  qualifiedName : string - The qualified name
 * @return : QName
 */
function __parseQName__(qualifiedName) {
  var resultQName = new Object();

  resultQName.localName = qualifiedName;  // unless the qname has a prefix, the local name is the entire String
  resultQName.prefix    = "";

  // split on ':'
  var delimPos = qualifiedName.indexOf(':');

  if (delimPos > -1) {
    // get prefix
    resultQName.prefix    = qualifiedName.substring(0, delimPos);

    // get localName
    resultQName.localName = qualifiedName.substring(delimPos +1, qualifiedName.length);
  }

  return resultQName;
};

// $w.Document = DOMDocument;

// Local Variables:
// espresso-indent-level:4
// c-basic-offset:4
// tab-width:4
// End:
