import { APP_MESSAGE, APP_REMOVED } from '../constants/ActionTypes';

export default function layout(state = {}, action) {
  	switch (action.type) {
	  
	  case APP_REMOVED:
	  	return Object.keys(state).reduce((acc, key)=>{
	  		if (key !== action.appId){
	  			acc[key] = state[key];
	  		}
	  		return acc;
	  	},{})
	  	
	  	
	  case APP_MESSAGE:
	  	return  Object.assign({}, state, {[action.id]:action.layout});
	  									
	  
	  default:
	    return state;
	}
}

