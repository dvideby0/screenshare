#Screenshare

Screenshare is an application that allows a user to share their current session on a website. This currently works for Firefox, Chrome, Opera and Safari. For mobile devices, Chrome and Firefox are supported on Android.

[DEMO](http://www.youtube.com/watch?v=mqxTYcNXY-U) video here of it in action



##Requirements

You must have NodeJS > 0.6.x installed, with socket.io and express modules. You can download the latest copy of NodeJS [here](http://nodejs.org).

    npm install socket.io
    npm install express

######Run the Example

1. Run app.js. `node app.js`
    
2. Navigate in your browser to `http://localhost:3000 (Client Page)` and `http://localhost:3000/admin.html (Admin Page)`

    >   This will bring up 2 pages. The first page will be the client page and the other will be the administration page.

3. On the client page mouse over the 'Help' tab

4. Enter in a key, then click the Create Key button.

5. On the admin page type in the key you just created and hit enter.

    > Now you should be able to see exactly what is happening on the client screen. There are still plenty of bugs with this application but it is in a usable state for anyone to begin playing with.

######How To use

1. Make sure that your file structure follows `lib/js` & `lib/css`, then change the CDN and SocketCDN variables to your server environment.

2. Add the screenshare.js script `public/lib/js/screenshare.js` before the closing body tag `</body>` on your html file(s)

3. Run the app.js `node app.js`

4. Open your website (there should now be a help tab on the right of your page)

5. Enter in a key, then click the Create Key button.

6. Open up another browser page to `http://localhost:3000/admin.html`

7. On the admin page type the key you created on your site and hit enter

    > Now you should be able to see exactly what is happening on the client screen. There are still plenty of bugs with this application but it is in a usable state for anyone to begin playing with.

##TODOs:

1. Configure mutation observers to send over only affected DOM elements **(completed)**

2. Configure Mutation observers to detect removal and addition of DOM elements **(completed)**

3. Detect scrolling and emulate on admin side **(completed)**

4. Correct mouse pointer offset **(completed)**

5. Find proper way to hard code currently computed css to each element before initial sendscreen **(completed)**

6. Correct issues with dynamically loaded scripts not working across all browsers **(not started)**

7. Support multi page sites **(working but still a little buggy)**

8. IE support **(started, chrome frame flow working for IE, Tested WebRTC working as well)**

9. Full mobile support **(not started, currently works for Chrome and Firefox on Android)**

10. Fix issues with proper scrolling to top **(not started)**

11. Add SSL support **(not started)**

12. Harden socket access/Security **(not started)**

13. Service clustering **(not started)**

14. Logging **(not started)**

15. Handle local images **(started, added commented out code to handle relative images)**

16. Relative to absolute paths **(see above, still need to work on unaccessable css and scripts)**

17. Script optimization with minification, consolidation and compression **(not started)**



##Future Plans:

1. Integrate streaming audio

2. Chat integration

3. Video integration **(WebRTC)**

4. Queue system for routing to appropriate personel

5. Ability to view/manipulate iframe content

6. Record and playback functionality



##Credits



###Client

This application makes use of the [mutation-summary](http://code.google.com/p/mutation-summary/) library developed by Rafael Weinstein.

The ever so awesome [jQuery](http://jquery.com) library.

[sessvars](http://www.thomasfrank.se/sessionvars.html) by Thomas Frank.

[Chrome Frame](https://developers.google.com/chrome/chrome-frame/) by Google which is an IE plugin to allow IE users to have all the advantages of using Chrome

###Server

[NodeJS](http://nodejs.org) - Server side JavaScript.

[Socket.io](http://socket.io) - Library for NodeJS that does an awesome job at handling websockets.

[Express](http://expressjs.com) - Extremely powerful web framework for NodeJS.
