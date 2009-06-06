# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20090601000000) do

  create_table "javascript_test_results", :force => true do |t|
    t.integer  "litmus_test_page_id"
    t.integer  "user_agent_id",                      :null => false
    t.string   "suite"
    t.integer  "passed",              :default => 0
    t.integer  "failed",              :default => 0
    t.integer  "ignored",             :default => 0
    t.text     "results_xml"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "litmus_test_pages", :force => true do |t|
    t.integer  "litmus_test_run_id", :null => false
    t.integer  "external_id"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "litmus_test_runs", :force => true do |t|
    t.string   "label"
    t.string   "external_vendor"
    t.boolean  "use_defaults"
    t.boolean  "not_external"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_agents", :force => true do |t|
    t.string   "ua_string"
    t.string   "family"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
