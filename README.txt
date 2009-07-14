= jsHub Quickstart =

For more detailed instructions please see the INSTALL.txt file and the jsHub website at http://jshub.org/

== Getting the code ==

Downloadable zip:   

 *  http://jshub.org/download/

== Running the application ==

Unzip the archive anywhere on your computer and on the command line (Terminal.app on Mac OS X):

 1. Change to the unzipped application: <tt>cd /path/to/app</tt>
 2. Load the database schema: <tt>rake db:migrate</tt>
 3. Start the web server: <tt>./script/server</tt> (run with --help for options)
 4. Go to http://localhost:3000/ for the homepage
