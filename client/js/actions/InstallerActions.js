import request from 'superagent';
import { TOGGLE_APP_RESOURCE, SELECT_APP_TO_INSTALL} from '../constants/ActionTypes';
import config from '../config';
import {INSTALL_LAUNCHED_APP} from '../constants/ActionTypes'; 
import {networkAccess, networkError, networkSuccess} from './NetworkActions';


export function launchApp(name){

	return function (dispatch, getState) { 

		dispatch(networkAccess(`launching app ${name}`));

		request
			.post(`${config.containermanager.API}/launch-container`)
			.send({
				repoTag:`${config.registry.URL}/${name}:latest`,
			})
			.type("form")
			.set('Accept', 'application/json')
   			.end((err, data)=>{
     			if (err) {
       				console.log('error launching  app');
       				console.log(err);
       				dispatch(networkError(`error launching app ${name}`));
     			} 
     			else {
     				dispatch(networkSuccess(`successfully launched app ${name}`));
     			}
     		});
    }	
}

export function install(app){

	return function (dispatch, getState) { 

		dispatch(networkAccess(`pulling app ${app.manifest.name}`));

		request
   			.post(`${config.containermanager.API}/pull-app`)
   			.send({
  				"name": app.manifest.name,
			})
			.type("form")
   			//.set('Accept', 'application/json')
   			.end((err, data)=>{
   				
     			if (err) {
     				console.log(err);
     				dispatch(networkError(`error pulling app ${app.manifest.name}`));
     			} 
     			else {
     				//console.log(data.body);
     			 	dispatch(launchApp(app.manifest.name))
     			}
     		});
	}	
}

export function selectApptoInstall(appId){

	return function (dispatch, getState) { 
		
		const a =  getState().appstore.reduce((acc, app)=>{
            return app.manifest.id === appId ? app : acc;
        },null);

        if (a){
        	dispatch({
        		type : SELECT_APP_TO_INSTALL,
				app: a
        	})
        }
	}
}


export function toggleResource(resource){

	/*
	const r = app.manifest.packages.map((p)=>{
				return p['driver-permissions'].reduce((acc, perm)=>{
					acc[perm] = {id: p.id, name: perm, required: p.required}
					return acc;
				},{})
			}).reduce((acc, resource)=>{
				
				Object.keys(resource).forEach((key)=>{
					const r = resource[key];
					acc[r.name] = acc[r.name] || {packages: [], required: false}
					if (r.required){
						acc[r.name].required = true;
					}
					if (acc[r.name].packages.indexOf(r.id) === -1){
						acc[r.name].packages.push(r.id)
					}
				});

				return acc;			
			},{});
	*/

	return {
			type: TOGGLE_APP_RESOURCE,
			resource: resource,
	}
}
