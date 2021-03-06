---
layout: help
---

# Deployment

These instructions are intended to enable a developer to:

* Run the application under an existing Apache server
* Deploy the application to a server (soon)

## Running under Phusion Passenger

Phusion Passenger integrates Rails applications with the Apache web server, and in particular allows for multiple Rails applications to be hosted easily under one domain name using URLs rather than virtual hosts.

For installation instructions please see the Phusion Passenger website and section on Sub-URIs:

* <http://www.modrails.com/install.html>
* <http://www.modrails.com/documentation/Users%20guide.html#deploying_rails_to_sub_uri>
 
The jsHub application comes pre-configured to run on the URL `/core/` and this can be changed in the `environments/passenger.rb` file.

Below is a sample Apache configuration:

    <VirtualHost *:80>
      ServerName localhost
      DocumentRoot /Library/WebServer/Documents/jshub-core
      RailsEnv passenger
      RailsBaseURI /core
    </VirtualHost>

A useful utility on Mac OS X is the [Passenger Pane][pp] for the setting up virtual hosts as an alternative during development.

  [pp]: http://www.fngtps.com/passenger-preference-pane

## Deploying to servers

Deployment is undertaken using Capistrano and requires the following gems:

* capistrano 2.5.8
* capistrano-ext 1.2.1

Information on the deployment setting can be found in the `config/deploy.rb` and `config/deploy/*` files.

More information on this feature will be forthcoming.