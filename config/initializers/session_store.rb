# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_jshub-core_session',
  :secret      => '2bb3460894cb0b5723435caf90936a2935bd52d7f376026ccfd373acdbf4f5db69a205b299950dd72a69449d957b49872e4e0390bef1bd1317350b5d45462ca5'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
