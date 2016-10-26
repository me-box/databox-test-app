import {PIPSTA_MESSAGE} from '../constants/ActionTypes';

           

export default function pipsta(state = {}, action) {  	
	
  	switch (action.type) {	  
	  case PIPSTA_MESSAGE:
	  	if (action.data.actuator_id){
	     	return Object.assign({}, state, {[action.data.actuator_id] : Object.assign({}, state[action.data.actuator_id] || {},  {[action.data.method] : action.data.data})});  
	  	}
	  	return state;
	  	 
	  default:
	    return state;
	}
}