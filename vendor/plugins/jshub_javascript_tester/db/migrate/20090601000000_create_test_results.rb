class CreateTestResults < ActiveRecord::Migration
  def self.up
  
    create_table :litmus_test_runs do |t|
      t.string  :label
      t.string  :external_vendor
      t.boolean :use_defaults
      t.boolean :not_external
      t.timestamps
    end  
  
    create_table :litmus_test_pages do |t|
      t.integer :litmus_test_run_id, :null => false
      t.integer :external_id
      t.string  :url
      t.timestamps
    end  
        
    create_table :javascript_test_results do |t|
      t.integer :litmus_test_page_id
      t.integer :user_agent_id, :null => false
      t.string  :suite
      t.integer :passed, :default => 0
      t.integer :failed, :default => 0
      t.integer :ignored, :default => 0
      t.text    :results_xml
      t.timestamps
    end    

    create_table :user_agents do |t|
      t.string  :ua_string
      t.string  :family
      t.timestamps
    end

  end
  
  def self.down
    drop_table :user_agents
    drop_table :javascript_test_results
    drop_table :litmus_test_pages
    drop_table :litmus_test_runs
  end
end
