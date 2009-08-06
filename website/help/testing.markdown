---
layout: help
---

# Testing

These instructions are intended to enable a developer to:

* run the jsHub Unit Tests in a local web browser
* create additional Unit Testscases and pages
* run the jsHub Unit Test Suite in a headless browser
* run the jsHub Unit Test Suite from a Continuous Integration server (soon)

## Syntax highlighting

*CSS*

Single line

<pre class="brush: css;">
#container {background-color:#00CCFF; border:1px dotted black; padding:1em; cursor:pointer;}
</pre>

Multi-line

<pre class="brush: css;">
#container {
background-color:#00CCFF; 
border:1px dotted black; 
padding:1em; cursor:pointer;
}
</pre>

Multi-line indented

<pre class="brush: css;">
#container {
  background-color:#00CCFF; 
  border:1px dotted black; 
  padding:1em; cursor:pointer;
}
</pre>

*Microformat*

<pre class="brush: html;">
<div class="hpage"><span class="page-name">Example page</span></div>
</pre>

<pre class="brush: html;">
<div class="hpage">
<span class="page-name">Example page</span>
</div>
</pre>

<pre class="brush: html;">
<div class="hpage">
  <span class="page-name">Example page</span>
</div>
</pre>

*Javascript*

<pre class="brush: js;">
function test() { var a; a = 10; return a; }
</pre>

<pre class="brush: js;">
function test() {
var a;
a = 10;
return a;
}
</pre>

<pre class="brush: js;">
function test() {
  var a;
  a = 10;
  return a;
}
</pre>
