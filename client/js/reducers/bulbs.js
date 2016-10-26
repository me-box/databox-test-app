import {BULB_MESSAGE} from '../constants/ActionTypes';

           

export default function bulbs(state = {}, action) {  	
	
  	switch (action.type) {	  
	  case BULB_MESSAGE:
	  	if (action.data.actuator_id){
	     	return Object.assign({}, state, {[action.data.actuator_id] : Object.assign({}, state[action.data.actuator_id] || {},  {[action.data.method] : action.data.data})});  
	  	}
	  	return state;
	  	 
	  default:
	    return state;
	}
}