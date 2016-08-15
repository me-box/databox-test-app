import { APP_MESSAGE, APP_REMOVED } from '../constants/ActionTypes';


const addIfNew = (state, action) =>{
	switch (action.type){

		case APP_MESSAGE:
		
			//can make this more efficient if need 
			if (state.map(t=>{return t.id}).indexOf(action.id) !== -1){
				return state.map(t=>{
					if (t.id === action.id){
						t.name = action.name;
					}
					return t;
				});
			}
			return [...state, {id:action.id, name:action.name, view:action.view, data:[]}]

		default:
			return state;
	}
}

const app = (state, action) =>{
	switch (action.type){
		case APP_MESSAGE:

			if (state.id !== action.id){
				return state;
			}
			if (action.policy === "replace"){
				return Object.assign({}, state, {data: action.data, view:action.view})
			}else{
				return Object.assign({}, state, {data: [...state.data, action.data], view:action.view})
			}
			
		default:
			return state;
	}
}


export default function apps(state = [], action) {
  	switch (action.type) {
	  
	  case APP_REMOVED:
	  	
	  	return state.filter((app)=>{
	  		console.log("looking at app");
	  		console.log(app);
	  		return app.id != action.appId;
	  	});
	  	
	  case APP_MESSAGE:
	  
	  	return addIfNew(state, action).map(a=>{
	  		return app(a, action);
	  	})

	  default:
	    return state;
	}
}