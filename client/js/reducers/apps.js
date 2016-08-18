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


const addGaugeData = (state, action) =>{
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

const app = (state, action) =>{
	switch (action.type){
		case APP_MESSAGE:

			if (state.id !== action.id){
				return state;
			}
			
			if (["list", "text"].indexOf(action.view) != -1){ //replace data with new
				return Object.assign({}, state, {data: action.data, view:action.view})
			}else{	//append data to current
				return Object.assign({}, state, {data: [...state.data, action.data], view:action.view})
			}
			
		default:
			return state;
	}
}


const append = (state = {data:[]}, action)=>{
	return (Object.assign({}, ...state, {data: [...state.data, action.data], view:action.view, id: action.id}));
}

const replace = (state = {data:{}}, action)=>{
	return (Object.assign({}, ...state, {data: action.data, view: action.view, id:action.id}));
}

const gauge = (state = {data:[], min:999999, max:-999999}, action)=>{
  
  switch (action.type) {
  	case APP_MESSAGE:
  		if (action.data.type === "data"){ //TODO HANDLE INIT TYPES!
    		return Object.assign({}, ...state, {	data: addGaugeData(state, action),
    									     	view: action.view,
    									     	id: action.id,
    									     	min:  Math.min(Number(action.data.x), state.min),
    									     	max:  Math.max(Number(action.data.x), state.max),
    									    });
    	}
    	return state;
  	default:
    	return state;
  }
}


const addData = (currentdata, action) =>{

	if (action.view === "gauge"){
		return gauge(currentdata,action);
	}
	else if (["list", "text"].indexOf(action.view) !== -1){
	  	return replace(currentdata, action);
	}
	else {
		return append(currentdata, action);
	}
}

export default function apps(state = {}, action) {
  	switch (action.type) {
	  
	  case APP_REMOVED:
	  	
	  	return Object.keys(state).reduce((acc, key)=>{
	  		if (key !== action.appId){
	  			acc[key] = state[key];
	  		}
	  		return acc;
	  	},{})
	  
	  	
	  case APP_MESSAGE:
	  	return Object.assign({}, state, {[action.id] : addData(state[action.id], action)});
	  

	  default:
	    return state;
	}
}