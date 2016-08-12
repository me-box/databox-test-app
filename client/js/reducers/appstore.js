import { FETCHED_APPSTORE_LIST } from '../constants/ActionTypes';


export default function appstore(state = [], action) {
  	switch (action.type) {
  	 
      case FETCHED_APPSTORE_LIST:
    	  	return Object.assign([], state, action.list.map((a)=>{
    	  		return {manifest:a.manifest, author: a.poster}
    	  	}));

  	  default:
  	    return state;
  	
  	}
}