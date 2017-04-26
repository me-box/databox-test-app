import { APP_REMOVED, APP_MESSAGE, APP_RESET, DEBUG_MESSAGE,  DEBUG_TOGGLE_PAUSE, BULB_MESSAGE, PIPSTA_MESSAGE } from '../constants/ActionTypes';


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

export function bulbMessage(data){
	return {
		type: BULB_MESSAGE,
		data
	}
}

export function pipstaMessage(data){
	return {
		type: PIPSTA_MESSAGE,
		data
	}
}

export function newMessage(msg) {
  
  if (!msg)
    return;
  
  console.log("seen message");
  console.log(msg);
  
  return function (dispatch, getState) {
  
    if (msg.type === "control" && msg.payload.command==="reset"){
      dispatch({type: APP_RESET})
      return;
    }

    const {sourceId, payload={}, layout} = msg;
    const {id, name, view, data={}} = payload;


    //TODO - this is a special case for uibuilder - not to make standard

    if (view === "uibuilder"){
        const mappings = getState().uibuilder.mappings[data.id] || [];
        mappings.map((item)=>{
          item.onData({msg:data}, 0, item.mapping);
        }); 
    }

    dispatch({
      type: APP_MESSAGE,
      id,
      sourceId,
      layout,
      name,
      view,
      data,
    });
  }
}
