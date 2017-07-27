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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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


module.exports = {

    secret: 'asdaksgdsahgdhsagsfddafdsdqhjsgdjhsg',

    github: {
        CLIENT_ID: 'd09ad0a19d1c72a67136',
        CLIENT_SECRET: 'fa821c9abbedda742d366cdfff8ad3a00a694b65',
        CALLBACK: "http://databoxtest.upintheclouds.org/auth/github/callback",
        API: "https://api.github.com",
        RAW_URL: "https://raw.githubusercontent.com",
        URL: "https://github.com"
    },

    mongo: {
        url: 'mongodb://mongo/testpassport'
    },

    redis: {
        host: 'redis',
        port: 6379
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;
exports.sendmessages = sendmessages;
exports.sendmessage = sendmessage;

var _socket = __webpack_require__(13);

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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(5);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(_config2.default.mongo.url);

module.exports = _mongoose2.default.model('User', {
    username: String,
    githubId: String,
    email: String,
    accessToken: String
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _http = __webpack_require__(9);

var _http2 = _interopRequireDefault(_http);

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _expressSession = __webpack_require__(10);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectRedis = __webpack_require__(11);

var _connectRedis2 = _interopRequireDefault(_connectRedis);

var _bodyParser = __webpack_require__(12);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

var _websocket = __webpack_require__(2);

var _websocket2 = _interopRequireDefault(_websocket);

var _superagent = __webpack_require__(14);

var _superagent2 = _interopRequireDefault(_superagent);

var _strategies = __webpack_require__(15);

var _strategies2 = _interopRequireDefault(_strategies);

var _mongoose = __webpack_require__(5);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ipc = __webpack_require__(17);

var _ipc2 = _interopRequireDefault(_ipc);

var _datastore = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedisStore = (0, _connectRedis2.default)(_expressSession2.default);

var app = (0, _express2.default)();
app.use('/', _express2.default.static("static"));
app.use((0, _expressSession2.default)({
  store: new RedisStore({
    host: _config2.default.redis.host,
    port: _config2.default.redis.port
  }),

  key: 'myexpress.sid',
  /*resave: false,
  rolling: false,
  saveUninitialized:false, //else passport will save empty object to store, which forces logout!
  cookie:{
      maxAge: 2*24*60*60*1000, //2 days
  },*/
  secret: _config2.default.secret
}));

app.set('view engine', 'html');
app.engine('html', __webpack_require__(19).renderFile);
(0, _strategies2.default)(app);

var server = _http2.default.createServer(app);
var PORT = 9090;

if (process.argv.length > 2) {
  PORT = parseInt(process.argv[2]);
}

var ensureAuthenticated = function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {
    return next(null);
  }
  console.log("not authenticated - so redirecting!");
  res.redirect("/auth/github");
};

(0, _websocket2.default)(['databox'], server);
(0, _ipc2.default)();

app.get('/', ensureAuthenticated, function (req, res) {
  res.render('index');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.use('/auth', __webpack_require__(20));
app.use('/comms', ensureAuthenticated, __webpack_require__(21));

//check registration!!!!!!

app.get('/ui/init/:id', function (req, res) {

  var result = (0, _datastore.lookup)(req.params.id);

  if (result) {
    res.send({ success: true, init: result });
  } else {
    res.send({ success: false });
  }
});

//redirect any failed routes to root
app.use(function (req, res) {
  res.redirect("/");
});

console.log("listening on port " + PORT);
server.listen(PORT);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = initPassport;

var _passport = __webpack_require__(3);

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = __webpack_require__(16);

var _passportGithub2 = _interopRequireDefault(_passportGithub);

var _user = __webpack_require__(4);

var _user2 = _interopRequireDefault(_user);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitHubStrategy = _passportGithub2.default.Strategy;

function initPassport(app) {

	_passport2.default.use(new GitHubStrategy({
		clientID: _config2.default.github.CLIENT_ID,
		clientSecret: _config2.default.github.CLIENT_SECRET,
		callbackURL: _config2.default.github.CALLBACK
	}, function (accessToken, refreshToken, profile, cb) {

		_user2.default.findOne({ githubId: profile.id }, function (err, user) {
			if (user == null) {
				var newuser = new _user2.default({ githubId: profile.id,
					username: profile.username,
					accessToken: accessToken,
					email: profile.email
				});
				newuser.save(function (err) {
					return cb(err, user);
				});
			} else {

				return cb(null, user);
			}
		});
	}));

	_passport2.default.serializeUser(function (user, done) {
		done(null, user._id);
	});

	_passport2.default.deserializeUser(function (id, done) {
		console.log("-------------------------->>>>>>>>>>>>>>>> deserialusing user ");
		_user2.default.findById(id, function (err, user) {
			console.log(user);
			done(err, user);
		});
	});

	app.use(_passport2.default.initialize());
	app.use(_passport2.default.session());
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("passport-github");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = init;

var _websocket = __webpack_require__(2);

var _net = __webpack_require__(18);

var _net2 = _interopRequireDefault(_net);

var _datastore = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
	var server = _net2.default.createServer(function (socket) {
		socket.on('data', function (data) {
			try {
				var _JSON$parse = JSON.parse(data.toString('utf8'));

				var type = _JSON$parse.type;
				var msg = _JSON$parse.msg;

				var channel = "";

				switch (type) {
					case "message":
						if (msg.type === "control") {

							if (msg.payload && msg.payload.command === "init") {
								(0, _datastore.savedata)(msg.payload.data.id, msg.payload.data);
								(0, _datastore.printstorage)();
							}
						}
						channel = msg.channel;
						delete msg.channel;
						(0, _websocket.sendmessage)(channel, "databox", "message", msg);
						break;

					default:
						channel = msg.channel;
						delete msg.channel;
						(0, _websocket.sendmessage)(channel, "databox", type, msg);

				}
			} catch (err) {
				console.log("error parsing data", data.toString('utf8'));
			}
		});
	});

	server.listen(8435, '0.0.0.0');
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _passport = __webpack_require__(3);

var _passport2 = _interopRequireDefault(_passport);

var _user = __webpack_require__(4);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/logout', function (req, res) {

	if (req.user) {
		_user2.default.findOne({ username: req.user.username }).remove().exec();
	}

	req.logout();

	req.session.destroy(function (err) {
		res.redirect("/");
	});
});

router.get('/github', _passport2.default.authenticate('github', { scope: 'public_repo' }));

router.get('/github/callback', _passport2.default.authenticate('github', { failureRedirect: '/logout' }), function (req, res) {
	res.redirect('/');
});

module.exports = router;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/channelID', function (req, res) {
  res.send({ channelID: req.user.username });
});

module.exports = router;

/***/ })
/******/ ]);