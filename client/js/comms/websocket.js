import io from 'socket.io-client';
import {newMessage} from '../actions/AppActions';

export default function init(namespace, appId, dispatch) {
  
  const socket = io('/'+namespace, {path: '/socket.io'});
 
  socket.on("connect", function(){
  	  console.log(`CALLING JOING ON ${appId}`);
      socket.emit("join", appId);
  });

  socket.on("message", function(data){
  	//console.log(data);
    dispatch(newMessage(data));
  });

};
   
