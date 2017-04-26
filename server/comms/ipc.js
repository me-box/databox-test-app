import {sendmessage} from './websocket';
import ipc from 'node-ipc'
import fs from 'fs'
import {savedata, printstorage} from '../datastore';

let counter = 0;


const  _deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


export default function init(){
	
	ipc.config.id   = 'webserver';
    ipc.config.retry= 1500;
       
    ipc.config.silent=true;
 	console.log("-- INITED THE UNIX WEBSERVER IPC SOCKET!! --");
 	
 	try{
 		_deleteFolderRecursive("/tmp/app.webserver");
 	}catch(err){
 		//no op
 	}
 	try{
 		fs.unlinkSync("/tmp/app.webserver");
	}catch(err){
		//noop
	}
	ipc.serve(
			function(){
				ipc.server.on(
					'message',
					function(data,socket){
						//console.log("**->app message");
						const msg = JSON.parse(data.toString());
						//console.log(msg);
						if (msg.type && msg.type==="control"){
							if (msg.payload && msg.payload.command === "init"){
								console.log("saving");
								console.log(msg.payload.data.id);
								console.log(msg.payload.data);

								savedata(msg.payload.data.id, msg.payload.data);
								printstorage();
							}
						}
						const channel = msg.channel; //this is set to the user's github acc name
						delete(msg.channel); 
						sendmessage(channel, "databox", "message", msg)
					}
				);
			
				ipc.server.on(
					'debug',
					function(data,socket){
						//console.log("**->debug message");
						//ipc.log('!!!!!!!!!!!!! got a debug message : '.debug, data);
						const msg = JSON.parse(data.toString());
						//console.log(msg);
						const channel = msg.channel; //this is set to the user's github acc name
						delete(msg.channel); 
						sendmessage(channel, "databox", "debug", msg)
					}
				);
			
				ipc.server.on(
					'bulbsout',
					function(data,socket){
						//console.log("**->bulbs out message");
						//ipc.log('!!!!!!!!!!!!! got a debug message : '.debug, data);
						const msg = JSON.parse(data.toString());
						//console.log(msg);
						const channel = msg.channel; //this is set to the user's github acc name
						delete(msg.channel); 
						sendmessage(channel, "databox", "bulbsout", msg)
					}
				);    
			
				ipc.server.on(
					'pipstaprint',
					function(data,socket){
						//console.log("**->pipsta print message");
						//ipc.log('!!!!!!!!!!!!! got a debug message : '.debug, data);
						const msg = JSON.parse(data.toString());
						//console.log(msg);
						const channel = msg.channel; //this is set to the user's github acc name
						delete(msg.channel); 
						sendmessage(channel, "databox", "pipstaprint", msg)
					}
				); 
			}
    );
	
    ipc.server.start();
}
