import request from 'superagent';
import {FETCHED_APPSTORE_LIST, FETCHING_APPSTORE_LIST} from '../constants/ActionTypes';
import config from '../config';

export function fetchedAppStoreList(list){
	return {
		type : FETCHED_APPSTORE_LIST,
		list
	}
}

export function fetchingAppStoreList(){
	return {
		type : FETCHING_APPSTORE_LIST,
	}
}

export function fetchAppStoreList() {
	
	return function (dispatch, getState) { 
		
		dispatch(fetchingAppStoreList());

		request
  			.get(`${config.appstore.API}/app/list`)
  			.set('Accept', 'application/json')
  			.type('json')
  			.end(function(err, res){
  				if (err){
  					console.log(err);
  				}else{
  					dispatch(fetchedAppStoreList(res.body.apps));
  	 			}
  	 		});		
	}
}