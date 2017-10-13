/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;
exports.sendmessages = sendmessages;
exports.sendmessage = sendmessage;

var _socket = __webpack_require__(8);

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _namespaces = {};
var connected = {};

function init(nsps, server) {

  var io = _socket2.default.listen(server);

  nsps.forEach(function (namespace) {
    var nsp = io.of('/' + namespace);

    if (!_namespaces[namespace]) {

      _namespaces[namespace] = nsp;

      nsp.on('connection', function (socket) {

        socket.on('join', function (app) {
          console.log("joining client to room ", app);
          socket.join(app);
          //return app;
        });

        socket.on('leave', function (app) {
          console.log("leaving room: " + app);
          socket.leave(app);
        });

        socket.on('disconnect', function () {
          console.log("socket disconnect!");
        });
      });
    }
  });
}

function sendmessages(rooms, namespace, event, message) {
  rooms.forEach(function (room) {
    this.sendmessage(room, namespace, event, message);
  }.bind(this));
  return rooms.length;
};

function sendmessage(room, namespace, event, message) {

  if (_namespaces[namespace]) {
    _namespaces[namespace].to(room).emit(event, message);
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.savedata = savedata;
exports.lookup = lookup;
exports.printstorage = printstorage;
var store = {};

function savedata(id, data) {
	console.log("saving data!");
	store[id] = data;
}

function lookup(id) {
	return store[id];
}

function printstorage() {
	console.log(JSON.stringify(store, null, 4));
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _http = __webpack_require__(5);

var _http2 = _interopRequireDefault(_http);

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _cookieParser = __webpack_require__(6);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = __webpack_require__(7);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _websocket = __webpack_require__(1);

var _websocket2 = _interopRequireDefault(_websocket);

var _superagent = __webpack_require__(9);

var _superagent2 = _interopRequireDefault(_superagent);

var _ipc = __webpack_require__(10);

var _ipc2 = _interopRequireDefault(_ipc);

var _datastore = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use('/', _express2.default.static("static"));
app.use((0, _cookieParser2.default)());

app.set('view engine', 'html');
app.engine('html', __webpack_require__(13).renderFile);

var server = _http2.default.createServer(app);
var PORT = 9090;

if (process.argv.length > 2) {
  PORT = parseInt(process.argv[2]);
}

(0, _websocket2.default)(['databox'], server);
(0, _ipc2.default)();

app.get('/', function (req, res) {
  if (req.query && req.query.username) {
    res.cookie('username', req.query.username, { maxAge: 60 * 1000 });
  }
  res.render('index');
});

app.use('/comms', __webpack_require__(14));

app.get('/ui/init/:id', function (req, res) {

  var result = (0, _datastore.lookup)(req.params.id);

  if (result) {
    console.log("SENDING INIT DATA");
    res.send({ success: true, init: result });
  } else {
    res.send({ success: false });
  }
});

console.log("listening on port " + PORT);
server.listen(PORT);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = init;

var _websocket = __webpack_require__(1);

var _net = __webpack_require__(11);

var _net2 = _interopRequireDefault(_net);

var _datastore = __webpack_require__(2);

var _jsonSocket = __webpack_require__(12);

var _jsonSocket2 = _interopRequireDefault(_jsonSocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*const NETSTRING_SEPARATOR_CODE = 58;

const readfirstpacket = (netstring, { encoding = 'utf-8', response = 'string' }={})=>{

	netstring = new Buffer(netstring, encoding);
	
	for (let i = 0; i < netstring.length ; i++) {
		let val = netstring[i];
        //First find the ':' - NETSTRING_SEPARATOR character.
        if (NETSTRING_SEPARATOR_CODE === val) {
        	let len = netstring.toString(encoding, 0, i);
            len = Number.parseInt(len);
        	const stringStart = i + 1;
        	const string = netstring.slice(stringStart, stringStart + len);
        	return {remaining: len - string.length, chunk: string.toString(encoding)}
        }
	}
	return {remaining:0, chunk: ""};
}

*/
var handleMsg = function handleMsg(data) {
	try {
		var type = data.type;
		var msg = data.msg; //JSON.parse(data.toString('utf8'));

		var channel = "";
		console.log("test server, sending", msg);
		switch (type) {

			case "debug":
			case "message":
				if (msg.type === "control") {
					console.log("------------> seen an init message <-------------------------");
					if (msg.payload && msg.payload.command === "init") {
						console.log("*** SAVING DATA", JSON.stringify(msg.payload.data, null, 4));
						(0, _datastore.savedata)(msg.payload.data.id, msg.payload.data);
					}
				}
				channel = msg.channel;
				delete msg.channel;
				(0, _websocket.sendmessage)(channel, "databox", type, msg);
				break;

			default:
				channel = msg.channel;
				delete msg.channel;
				(0, _websocket.sendmessage)(channel, "databox", type, msg);
		}
	} catch (err) {
		console.log("error parsing data", data);
	}
};

function init() {

	console.log("INITING THE SERVER!");

	var server = _net2.default.createServer();

	server.on('connection', function (socket) {
		//This is a standard net.Socket
		socket = new _jsonSocket2.default(socket); //Now we've decorated the net.Socket to be a JsonSocket
		socket.on('message', function (message) {
			console.log("got a message!!");
			handleMsg(message);
		});
	});

	server.on('error', function (err) {
		//This is a standard net.Socket
		console.log(err);
	});

	server.listen(8435, '0.0.0.0');
}

/*
var server = net.createServer(function(socket) {
	let remaining = 0;
let chunks = [];
socket.on('data', function(data){
console.log("incoming data!");
if (remaining < 0){
console.log("resetting..remaining is", remaining);
chunks  = [];
remaining = 0;
}
else if (remaining == 0){
chunks = [];
try{
	const pkt = readfirstpacket(data);

	if (pkt.remaining == 0)	{
			handleMsg(pkt.chunk);
	}else{
		remaining = pkt.remaining;
		chunks.push(pkt.chunk);
	}
}catch(err){
	console.log("error reading first packet");
	remaining = 0;
	chunks = [];
};
}
else{
remaining = remaining - (data.length-1);
chunks.push(data.slice(0, data.length-1));
	if (remaining == 0){
	const pkt = chunks.reduce((acc, c)=>{
		acc += c;
		return acc;
	},"");
	handleMsg(pkt);
}
}
});
});
server.listen(8435, '0.0.0.0');*/

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("json-socket");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/channelID', function (req, res) {
	if (req.cookies && req.cookies.username) {
		res.send({ channelID: req.cookies.username });
		return;
	}
	res.status(500).send({ channelID: "", error: "can't find this user" });
	//res.send({channelID:req.user.username}); 		
});

module.exports = router;

/***/ })
/******/ ]);