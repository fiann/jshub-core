class LitmusTestRun < ActiveRecord::Base
  has_many :litmus_test_pages, :dependent => :destroy

  validates_presence_of :label
end
