import http  from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyparser from 'body-parser';
import websocketinit from './comms/websocket';
import request from 'superagent';
import ipcinit from './comms/ipc';
import {lookup} from './datastore';

const app = express();
app.use('/', express.static("static"));
app.use(cookieParser());


app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const server = http.createServer(app);
let PORT = 9090

if (process.argv.length > 2){
   PORT = parseInt(process.argv[2]);
}

websocketinit(['databox'],server);
ipcinit();

app.get('/', function(req,res){
  if (req.query && req.query.username){
    console.log("setting cookie", req.query.username);
    res.cookie('username', req.query.username, { maxAge:60 * 1000 });
  }
  res.render('index');
});


app.use('/comms', require('./routes/comms'));


app.get('/ui/init/:id', function(req,res){
  
  const result = lookup(req.params.id);

  if (result){
    res.send({success:true, init:result});
  }
  else{
    res.send({success:false});
  }
});

console.log("listening on port " + PORT);
server.listen(PORT);
