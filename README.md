Databox test app
-----------------

This is the container that serves up the javascript for TESTING.  


The databox test app provides an environment for testing databox apps in the browser.  It runs in a docker container, and node-RED instances connect to it to send data, which it then sends to a the client over websockets.  To start, the client will call [hostname]/?username=[githubname].  The server will then put the username in a cookie, and use the username to create a websocket room between the server and client.   All data sent to the server from a node-red instance will have a channelID set to username, which the server will send across the websocket with roomid username.

