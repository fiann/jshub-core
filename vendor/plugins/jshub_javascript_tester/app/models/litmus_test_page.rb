class LitmusTestPage < ActiveRecord::Base
  belongs_to :litmus_test_run
  has_many :javascript_test_results, :dependent => :destroy
  
  validates_presence_of :url

  def self.external
    external = LitmusResource::Test.find(self[:external_id])
  end
  
  def name
    if /\/test(\/external\/[0-9]+)?\/unit\/(.+)/.match url
      $~[2]
    else
      url
    end
  end

end
