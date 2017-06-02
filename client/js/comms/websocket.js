import io from 'socket.io-client';
import {newMessage, debugMessage, bulbMessage, pipstaMessage} from '../actions/AppActions';

export default function init(namespace, appId, dispatch) {
  
  const socket = io('/'+namespace, {path: '/socket.io'});
  let startconnect;
  ///added a bit of a hack here to deal with a race condition.  It is possible that a new app has started
  //running before an old one has completed.  When the old one completes it sends a reset, which the new
  //one could then receive and unjoin the channel.  To fix we record the connect time and only disconnect if it
  //is greater than 2 seconds.  TO FIX: create unique one-time channelIDs at deploy time
  
  socket.on("connect", function(){
  	  console.log(`CALLING JOIN ON ${appId}`);
      socket.emit("join", appId);
      startconnect = Date.now();
  });

  socket.on("message", function(data){
  	 
  	if (data && data.type==="control"){
  		if ((Date.now() - startconnect) > 8000){
  	  		console.log("LEAVING CHANNEL " + data.payload.channel);
  			socket.emit("leave", data.payload.channel);
  		}else{
  			console.log("not leaving this channel as only just joined!");
  		}
  	}

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
   
