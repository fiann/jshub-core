class AddResultsJsonToJavascriptTestResults < ActiveRecord::Migration
  def self.up
    add_column :javascript_test_results, :results_json, :text
  end

  def self.down
    remove_column :javascript_test_results, :results_json
  end
end
