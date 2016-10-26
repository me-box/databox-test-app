import io from 'socket.io-client';
import {newMessage, debugMessage, bulbMessage, pipstaMessage} from '../actions/AppActions';

export default function init(namespace, appId, dispatch) {
  
  const socket = io('/'+namespace, {path: '/socket.io'});
 
  socket.on("connect", function(){
  	  console.log(`CALLING JOIN ON ${appId}`);
      socket.emit("join", appId);
  });

  socket.on("message", function(data){
    dispatch(newMessage(data));
  });
  
  socket.on("debug", function(data){
    dispatch(debugMessage(data));
  });
  
  socket.on("bulbsout", function(data){
  	dispatch(bulbMessage(data));
  });
  
  socket.on("notify", function(data){
  	console.log("notify message");
  	console.log(data);
  });
  
  socket.on("pipstaprint", function(data){
	dispatch(pipstaMessage(data));
  });
  
  socket.on("plugout", function(data){
  	console.log("plugout message");
  	console.log(data);
  });

};
   
