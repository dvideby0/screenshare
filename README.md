#Screenshare

Screenshare is an application that allows a user to share their current session on a website. This currently works for Firefox, Chrome, Opera and Safari. For mobile devices, Chrome and Firefox are supported on Android.

##Requirements

You must have NodeJS > 6.x installed, with socket.io and express modules.

Run app.js >node app.js.


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

[NodeJS](http://nodejs.org)
[Socket.io](http://socket.io)
[Express](http://expressjs.com)