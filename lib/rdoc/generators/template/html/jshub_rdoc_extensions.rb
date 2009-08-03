# Extends RDoc with additional tags and patterns.
# Based on code sample in SimpleMarkup:
# Influenced by original extensions in the Rio project documentation:
# ref: http://rio.rubyforge.org/
#
# class WikiHtml < SM::ToHtml
#   def handle_special_WIKIWORD(special)
#     "<font color=red>" + special.text + "</font>"
#   end
# end
# p = SM::SimpleMarkup.new
# p.add_word_pair("{", "}", :STRIKE)
# p.add_html("no", :STRIKE)
# 
# p.add_special(/\b([A-Z][a-z]+[A-Z]\w+)/, :WIKIWORD)
# h = WikiHtml.new
# h.add_tag(:STRIKE, "<strike>", "</strike>")
# 
# puts "<body>" + p.convert(ARGF.read, h) + "</body>"

module Generators #:nodoc: all
  #####################################################################
  #
  # Handle common markup tasks for the various Html classes
  #

  module MarkUp

    # Convert a string in markup format into HTML. We keep a cached
    # SimpleMarkup object lying around after the first time we're
    # called per object.

    def markup(str, remove_para=false)
      return '' unless str
      
      # see what we are acting upon
      #puts str.inspect
      
      unless defined? @markup
        @markup = SM::SimpleMarkup.new

        @markup.add_html("no", :STRIKE) 
        @markup.add_html("js", :SYNTAXHIGHLIGHTJS) 
        @markup.add_html("mf", :SYNTAXHIGHLIGHTHTML) 

        @markup.add_special(/<css\b[^>]*>(.*?)<\/css>/, :SYNTAXHIGHLIGHTCSS)

      end
      unless defined? @html_formatter
        @html_formatter = HyperlinkHtml.new(self.path, self)
        @html_formatter.add_tag(:STRIKE, "<strike>", "</strike>")
        @html_formatter.add_tag(:SYNTAXHIGHLIGHTHTML, '<pre class="brush: xml;">', '</pre>')
        @html_formatter.add_tag(:SYNTAXHIGHLIGHTJS, '<pre class="brush: js;">', '</pre>')
      end

      res = @markup.convert(str, @html_formatter)

    end
  end
end
module Generators
  class HyperlinkHtml < SM::ToHtml

    def handle_special_SYNTAXHIGHLIGHTCSS(special)
      puts special.inspect
      '<pre class="brush: css;">' + special.text + '</pre>'
    end  
  
  end
end
# End UGLY
