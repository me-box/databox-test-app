import { APP_MESSAGE } from '../constants/ActionTypes';

export default function layout(state = {}, action) {
  	switch (action.type) {
	  	
	  case APP_MESSAGE:
	  	return  Object.assign({}, state, {[action.id]:action.layout});
	  									
	  
	  default:
	    return state;
	}
}

