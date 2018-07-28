






********************************************  Contact List (Assignment) **********************************************


Contact List is a website where you can create contact by clicking the add contact button and you send OTP by going to person's profile and hitting send message button. You can create as much contacts as you want but you can only send OTP after adding them to twilio dashboard(as this project uses trial version of twilio).




----------------------------------------------------------------------------------------------------------------------
TECHNOLOGIES USED :-
-----------------------------------------------------------------------------------------------------------------------

FRONTEND :- HTML, CSS, Javascript, Materializecss
BACKEND  :- Node js, MongoDB, Npm, Express.js, Socket.io, Twilio, Ejs.

---------------------------------------------------------------------------------------------------------------------
SOFTWARE/ TOOLS USED :-
----------------------------------------------------------------------------------------------------------------------

Text Editor - Atom
Browser - Google Chrome
Deployment - Heroku
Version Control -Git,Github
Database-as-a-service for MongoDB :- mLab

-----------------------------------------------------------------------------------------------------------------------
WEBSITE WITHOUT ANY SETUP :-
-----------------------------------------------------------------------------------------------------------------------

To use the website online without having to setup anything visit site : https://radiant-gorge-95869.herokuapp.com/

------------------------------------------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------------------------------------------
CONFIGURING DATABASE :-
---------------------------------------------------------------------------------------------------------------------------

Since I have used mLab which is nothing but Database-as-a-service for MongoDB so we don't have to take the pain of establishing database locally rather all you need is an internet connection for using the database.

---------------------------------------------------------------------------------------------------------------------------
QUICKSTART :-
----------------------------------------------------------------------------------------------------------------------------

1. Open the terminal/cmd and switch to the project directory.

2. Install the required node modules/dependencies by running the command "npm install".

3. Run the project by running app.js file from terminal/cmd by using command " node app.js".

4. Now, open in browser "localhost:<port no>" with port no as mentioned in your code or as indicated by the message received 
   stating at what port server is listening or is being started.

-----------------------------------------------------------------------------------------------------------------------------
URLs :-
------------------------------------------------------------------------------------------------------------------------------

1. Home page : /

2. Contact Info page : /contacts/:id

3. OTP compose page : /contacts/:id/compose

4. List of sent OTP msgs page : /sentMessages


--------------------------------------------------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------------------------------------------
FILE STRUCTURE :-
------------------------------------------------------------------------------------------------------------------------------

kisan-project
 >.git
 > node_modules/
 > public/
    > JavaScripts/
	      > index.js
	      > materialiseinit.js
    >stylesheets/
      	  >style.css
 > views/
    > partials/
          >footer.ejs
          >header.ejs
    >compose.ejs
    >contactInfo.ejs
    >index.ejs
    >sentMessages.ejs
 > .env
 > .gitignore
 > app.js
 > package-lock.json
 > package.json

--------------------------------------------------------------------------------------------------------------------------------
 Updated files

 To view updated files go to -> https://github.com/shubhamkpuri/Contact-app
--------------------------------------------------------------------------------------------------------------------------------
Working of Each file and Folder
 
 1. .git -> This file contains the different version logs and changes in 		each  files.

 2.  node_modules/ -> contains npm modules
 
 3.  public/ -> contains publicly served javascript and css files 
 		3.1 JavaScript/ -> contains javascript files
 			3.1.1  index.js-> contains socket varibles and initilisation 
 			3.1.2  materialiseinit.js -> contains materialise initilisation

 		3.2 stylesheets/ -> contains changes in made to change materialise
 			3.2.1  style.css -> contains override behavior of materialise css

 4.  views/ -> contains different pages
 		4.1 partials/ -> contains header and footer
 			4.1.1 footer.ejs -> contains footer files to be included on all pages
 			4.1.2 header.ejs -> contains header files to be included on all pages
 		4.2 compose.ejs -> this page contains the OTP to be send to contact using twilio.
 		4.3 contactInfo.ejs -> this page contains information of contact
 		4.4 index.ejs -> this page contains add contact form and list of all contacts.
 		4.5 sentMessages -> this page contains all the sent OTP msgs to contacts.

 6. app.js -> contains server initilisation and all the routes and  models.






--------------------------------------------------------------------------------------------------------------
 ASSUMPTIONS 

 1. That user cannot change the OTP is randomly generated.
-------------------------------------------------------------------------------------------------------------

---------------------------------------------Creator Information---------------------------------------------

   Name :- Shubham Kumar Puri
   Email Id :- shubhampuri8169@gmail.com
   Phone Number :- 7053620980