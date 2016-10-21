import {DEBUG_MESSAGE, DEBUG_TOGGLE_PAUSE} from '../constants/ActionTypes';


export function sanitize(m) {
    return m.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

export function _format(o){
	return {
		timestamp: (new Date()).toLocaleString(),
		name: sanitize(((o.name?o.name:o.id)||"").toString()),
    	topic : sanitize((o.topic||"").toString()),
        property : sanitize(o.property?o.property:''),
     	payload : sanitize((o.msg||"").toString()),
    	format : sanitize((o.format||"").toString()),
    	level : o.level,
    	type: o.type,
    }
}
            
export default function debug(state = {messages: [], paused: false, buffer:[]}, action) {
  	
  	switch (action.type) {
	  
	  case DEBUG_MESSAGE:
	    if (!state.paused){
	  		return Object.assign({}, state, {messages: [_format(action.data),...state.messages].slice(0,15)});
	  	}else{
	  		return Object.assign({}, state, {buffer: [_format(action.data),...state.buffer].slice(0,15)});
	  	}
	  	
	  case DEBUG_TOGGLE_PAUSE:
	  	 if (state.paused){
	  	 	return Object.assign({}, state, {
	  	 		messages : [...state.buffer, ...state.messages].slice(0,15),
	  	 		buffer: [],
	  	 		paused: false,	
	  	 	}); 
	  	 }else{
	  	 	
	  	 	return Object.assign({}, state, {paused: true});
	  	 }
	  	 
	  default:
	    return state;
	}
}