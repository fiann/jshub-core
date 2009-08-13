---
layout: homepage
---

# jsHub Core

* Documentation: <http://jshub.org/core/website/>
* License: <http://jshub.org/legal/>
* Latest Stable Release: <http://github.com/jshub/jshub-core/downloads/>
* Discuss: <http://groups.google.com/group/jshub-users/>
* Contributor Info: 
  * [Liam Clancy (metafeather)][mf]
  * [Fiann O'Hagan (fiann)][fo]

  [mf]: http://github.com/metafeather
  [fo]: http://github.com/fiann

This application is a Ruby on Rails application for development of the jsHub javascript library.

Application features:

* Modular source code
* Plugins
* Unit test pages
* Automated test suite and runner
* Continuous integration and cross-browser testing support
* Developer help and guides

## About jsHub

jsHub.org is a non-profit that is sponsoring several projects to make the deployment of data capture for web analytics and other online optimization solutions more professional.

## License

jsHub Core is released under the BSD license and is copyright (c) 2009, jsHub.inc. A copy of the BSD license can be found in the LICENSE file.

## Getting the code

Downloads:   

* <http://github.com/jshub/jshub-core/downloads/>

Unzip the archive anywhere on your computer

## Quickstart for running the application

This application is a traditional Ruby on Rails application, meaning that you can
configure and run it the way you would a normal Rails application:

 1. Change to the unzipped application: `cd /path/to/app`
 2. Load the database schema: `rake db:migrate`
 3. Start the web server: `./script/server` (run with `--help` for options)
 4. Go to `http://localhost:3000/` for the homepage

For more detailed instructions please see the [installation guide](help/install.html "Installation") and our website at [http://jshub.org/](http://jshub.org/)
