import { APP_MESSAGE, APP_REMOVED } from '../constants/ActionTypes';


const insertGaugeData = (state, action) =>{
	switch (action.type){

		case APP_MESSAGE:
		
			const idx = state.data.map(t=>{return t[0].id}).indexOf(action.data.id);

			if (idx == -1){
				return [...state.data, [action.data]]
			}
			
			const newdata = [state.data[idx][state.data[idx].length-1], action.data];
			return [...state.data.slice(0,idx), newdata, ...state.data.slice(idx+1)];

		default:
			return state;
	}
}


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
			
			//TODO: do this on views, not on policy!
			if (action.view === "gauge"){
				return Object.assign({}, ...state, {data:{
    														min:  Math.min(Number(action.data.value), state.min),
    									     				max:  Math.max(Number(action.data.value), state.max),
    									     				data: insertGaugeData(state, action),
    									     			   }
    									     	 	});
			}
			else if (["list", "message"].indexOf(action.view) != -1){ //replace data with new
				return Object.assign({}, state, {data: action.data, view:action.view})
			}else{	//append data to current
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