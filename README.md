#Screenshare

Screenshare is an application that allows a user to share their current session on a website. This currently works for Firefox, Chrome, Opera and Safari. For mobile devices, Chrome and Firefox are supported on Android.



##Requirements

You must have NodeJS > 0.6.x installed, with socket.io and express modules. You can download the latest copy of NodeJS [here](http://nodejs.org).

    npm install socket.io
    npm install express

1. Run app.js. `node app.js`
    
2. Navigate in your browser to `http://localhost:3000 (Client Page)` and `http://localhost:3000/admin.html (Admin Page)`

    >   This will bring up 2 pages. The first page will be the client page and the other will be the administration page.

3. On the client page mouse over the 'Help' tab

4. Enter in a key, then click the Create Key button.

5. On the admin page type in the key you just created and hit enter.

    > Now you should be able to see exactly what is happening on the client screen. There are still plenty of bugs with this application but it is in a usable state for anyone to begin playing with.




##TODOs:

1. configure mutation observers to send over only affected DOM elements (completed)

2. Configure Mutation observers to detect removal and addition of DOM elements (completed)

3. Detect scrolling and emulate on admin side (completed)

4. correct mouse pointer offset (completed)

5. Find proper way to hard code currently computed css to each element before initial sendscreen (completed)

6. Support multi page sites

7. IE support

8. Full mobile support



##Credits



###Client

This application makes use of the [mutation-summary](http://code.google.com/p/mutation-summary/) library developed by Rafael Weinstein.

The ever so awesome [jQuery](http://jquery.com) library.

[sessvars](http://www.thomasfrank.se/sessionvars.html) by Thomas Frank.

###Server

[NodeJS](http://nodejs.org) - Server side JavaScript.

[Socket.io](http://socket.io) - Library for NodeJS that does an awesome job at handling websockets.

[Express](http://expressjs.com) - Extremely powerful web framework for NodeJS.