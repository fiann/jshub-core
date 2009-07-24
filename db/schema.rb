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

ActiveRecord::Schema.define(:version => 20090724155533) do

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
    t.text     "results_json"
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

  create_table "plugins", :force => true do |t|
    t.string   "type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "products", :force => true do |t|
    t.string   "name"
    t.string   "image_file"
    t.decimal  "price",      :precision => 8, :scale => 2, :default => 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "tag_configuration_plugin_parameters", :force => true do |t|
    t.integer "tag_configuration_plugin_id", :null => false
    t.string  "param_name"
    t.string  "param_value"
  end

  create_table "tag_configuration_plugins", :force => true do |t|
    t.integer "tag_configuration_id", :null => false
    t.integer "plugin_id",            :null => false
  end

  create_table "tag_configuration_revision_messages", :force => true do |t|
    t.integer "tag_configuration_revision_id", :null => false
    t.integer "position"
    t.string  "message"
  end

  create_table "tag_configuration_revisions", :force => true do |t|
    t.integer  "tag_configuration_id", :null => false
    t.integer  "revision_number"
    t.text     "generated_code"
    t.string   "sha1_debug"
    t.string   "sha1_production"
    t.integer  "user_id",              :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tag_configurations", :force => true do |t|
    t.string   "name",          :null => false
    t.integer  "user_id"
    t.string   "site_name"
    t.string   "jshub_version"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_agents", :force => true do |t|
    t.string   "ua_string"
    t.string   "family"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "email_address"
    t.string   "hashed_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name",            :limit => 30
  end

end
