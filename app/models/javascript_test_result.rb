class JavascriptTestResult < ActiveRecord::Base
  
  require "rexml/document"
  require "rexml/xpath"
  
  belongs_to :litmus_test_page
  belongs_to :user_agent
  
  validates_presence_of :user_agent
  
  # create from the xml format supplied by the yuitest logger
  # see http://developer.yahoo.com/yui/3/yuitest/ for reference and examples
  def self.from_xml(xml) 
    doc = REXML::Document.new xml
    raise "XML parsing error, no document root" unless doc.root
    result = JavascriptTestResult.new
    result.results_xml = xml
    result.suite = REXML::XPath.match(doc, '/testsuite@name').join(', ')
    result.passed = doc.root.attributes["passed"]
    result.failed = doc.root.attributes["failed"]
    result.ignored = doc.root.attributes["ignored"]
    return result
  end
  
end
