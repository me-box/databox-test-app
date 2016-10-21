import { APP_REMOVED, APP_MESSAGE, APP_RESET, DEBUG_MESSAGE,  DEBUG_TOGGLE_PAUSE } from '../constants/ActionTypes';


export function togglePause(){
	return {
		type: DEBUG_TOGGLE_PAUSE,
	}
}

export function appRemoved(appId) {
  return {
    type: APP_REMOVED,
    appId,
  };
}


export function debugMessage(data){
	return {
		type: DEBUG_MESSAGE,
		data
	}
}

export function newMessage(msg) {
 
  if (!msg)
  	return;

  
  if (msg.type === "control" && msg.payload.command==="reset"){
  	return {
  		type: APP_RESET,
  	}
  }
  
  const {sourceId, payload, layout} = msg;
  const {id, name, view, data} = payload;
  const {options, values} = data;
 
  return {
    type: APP_MESSAGE,
    id,
    sourceId,
    layout,
    name,
    view,
    options,
    values,
  }
}