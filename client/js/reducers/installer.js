import { FETCHED_APPSTORE_LIST, SELECT_APP_TO_INSTALL, TOGGLE_APP_RESOURCE } from '../constants/ActionTypes';


export default function installer(state = {permittedresources:[], app:null}, action) {
  	switch (action.type) {
  	 

    case TOGGLE_APP_RESOURCE: 
      return state;
  	 
    case SELECT_APP_TO_INSTALL:
      return Object.assign({}, state, {app:action.app});
    
    case FETCHED_APPSTORE_LIST:
  	  	return Object.assign({}, state, {apps:action.list.map((a)=>{
  	  				return {manifest:a.manifest, author: a.poster}
  	  		  })
  	  	});
	  
	  default:
	    return state;
	
	}
}