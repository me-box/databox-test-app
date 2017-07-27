import http  from 'http';
import express from 'express';
import expressSession from 'express-session';
import connectredis from 'connect-redis';
import bodyparser from 'body-parser';
import config from './config';
import websocketinit from './comms/websocket';
import request from 'superagent';
import initPassport from './strategies';
import mongoose from 'mongoose';
import ipcinit from './comms/ipc';
import {lookup} from './datastore';
const RedisStore = connectredis(expressSession);

const app = express();
app.use('/', express.static("static"));
app.use(expressSession(
                      {
                        store: new RedisStore({
                            host: config.redis.host,
                            port: config.redis.port,
                        }),

                        key: 'myexpress.sid',
                        /*resave: false,
                        rolling: false,
                        saveUninitialized:false, //else passport will save empty object to store, which forces logout!
                        cookie:{
                            maxAge: 2*24*60*60*1000, //2 days
                        },*/
                        secret: config.secret,
                      }
));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
initPassport(app);

const server = http.createServer(app);
let PORT = 9090

if (process.argv.length > 2){
   PORT = parseInt(process.argv[2]);
}


const ensureAuthenticated = (req, res, next) => {
  
  if (req.isAuthenticated()){
    return  next(null);
  }
  console.log("not authenticated - so redirecting!");
  res.redirect("/auth/github");
};


websocketinit(['databox'],server);
ipcinit();

app.get('/', ensureAuthenticated, function(req,res){
  res.render('index');
});

app.get('/login', function(req,res){
  res.render('login');	
});

app.use('/auth', require('./routes/auth'));
app.use('/comms',ensureAuthenticated, require('./routes/comms'));

//check registration!!!!!!

app.get('/ui/init/:id', function(req,res){
  
  const result = lookup(req.params.id);

  if (result){
    res.send({success:true, init:result});
  }
  else{
    res.send({success:false});
  }
});

//redirect any failed routes to root
app.use(function(req,res){
    res.redirect("/");
});

console.log("listening on port " + PORT);
server.listen(PORT);
