class UserAgent < ActiveRecord::Base
  
  SHORT_NAMES = {
    'Internet Explorer' => /MSIE ([0-9\.]+)/,
    'Firefox' => /Firefox\/([0-9\.]+)/,
    'Safari' => /Safari\/([0-9\.]+)/,
    'Opera' => /Opera\/([0-9\.]+)/,
  }
  
  OPERATING_SYSTEMS = {
    'Windows' => /Windows/,
    'Macintosh' => /Macintosh/
  }
  
  def browser_family
    SHORT_NAMES.each do |family, regex|
      if regex =~ ua_string
        return "#{family} #{$~[1]}"
      end
    end
    nil
  end
  
  def os_family
    OPERATING_SYSTEMS.each do |os_name, regex|
      if regex =~ ua_string 
        return os_name
      end
    end
    nil
  end
  
  def short_name
    if (os_family && browser_family)
      "#{browser_family}, #{os_family}"
    else
      ua_string
    end
  end
end
