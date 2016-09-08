import { APP_MESSAGE, APP_REMOVED } from '../constants/ActionTypes';

const addGaugeData = (state, action) =>{
	switch (action.type){

		case APP_MESSAGE:
			
			console.log("adding gauge data and current data is ");
			console.log(state);
			
			const idx = state.data.map(t=>{return t[0].id}).indexOf(action.data.id);

			if (idx == -1){
				return [...state.data, [action.data]]
			}
			
			const newdata = [state.data[idx][state.data[idx].length-1], action.data];
			return [...state.data.slice(0,idx), newdata, ...state.data.slice(idx+1)];
			return state;
			
		default:
			return state;
	}
}

const append = (state = {data:[]}, action)=>{
	return (Object.assign({}, ...state, {data: [...state.data || [], action.data], view:action.view, sourceId: action.sourceId, id: action.id, name: action.name}));
}

const replace = (state = {data:{}}, action)=>{
	return (Object.assign({}, ...state, {data: action.data, view: action.view, sourceId: action.sourceId, id:action.id, name:action.name}));
}

const gauge = (state = {data:[], min:999999, max:-999999}, action)=>{
  
  switch (action.type) {
  	case APP_MESSAGE:
  		if (action.data.type === "data"){ //TODO HANDLE INIT TYPES!
    		return Object.assign({}, ...state, {	data: addGaugeData(state, action),
    									     	view: action.view,
    									     	id: action.id,
    									     	sourceId: action.sourceId,
    									     	name: action.name,
    									     	min:  Math.min(Number(action.data.x), state.min),
    									     	max:  Math.max(Number(action.data.x), state.max),
    									    });
    	}
    	return state;
    	
  	default:
    	return state;
  }
}

const indexFor = (data, sourceId)=>{
	for (let i = 0; i < data.length; i++){
		if (data[i].sourceId === sourceId)
			return i;
	}
	return -1;
}

const insert = (currentdata, action)=>{
	currentdata = currentdata || {};
	return Object.assign({}, currentdata, {[action.sourceId] : addData(currentdata[action.sourceId], action)});
	
}
const insert_old = (currentdata, action)=>{
	currentdata = currentdata || [];
	
	const index = indexFor(currentdata, action.sourceId); 
	
	if (index == -1){
		return [...currentdata, addData(currentdata, action)];
	}else{
		return [...currentdata.slice(0, index), addData(currentdata[index], action), ...currentdata.slice(index+1)];
	}	
}

const addData = (currentdata, action) =>{
	
	
	if (action.view === "gauge"){
		return gauge(currentdata,action);
	}
	else if (["list", "text"].indexOf(action.view) !== -1){
		currentdata = currentdata || {};
	  	return replace(currentdata, action);
	}
	else {
		currentdata = currentdata || {};
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
	  	return Object.assign({}, state, {
	  										[action.id] : insert(state[action.id], action),
	  									});
	  

	  default:
	    return state;
	}
}