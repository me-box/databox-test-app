import {sendmessage} from './websocket';
import ipc from 'node-ipc'
let counter = 0;

export default function init(){
	
	ipc.config.id   = 'webserver';
    ipc.config.retry= 1500;
 	console.log("INITED THE UNIX WEBSERVER IPC SOCKET!!");
 	
    ipc.serve(
        function(){
            ipc.server.on(
                'message',
                function(data,socket){
                    console.log("SEEEN A MESSAGE MESSSAGE!!!");
                    const msg = JSON.parse(data.toString());
					console.log(msg);
					const channel = msg.channel; //this is set to the user's github acc name
					delete(msg.channel); 
					sendmessage(channel, "databox", "message", msg)
                }
            );
            
            ipc.server.on(
                'debug',
                function(data,socket){
                    //ipc.log('!!!!!!!!!!!!! got a debug message : '.debug, data);
                    const msg = JSON.parse(data.toString());
					console.log("SEEEN A DEBIG MESSSAGE!!!");
					console.log(msg);
					const channel = msg.channel; //this is set to the user's github acc name
					delete(msg.channel); 
					sendmessage(channel, "databox", "debug", msg)
                }
            );
        }
    );
 
    ipc.server.start();
}