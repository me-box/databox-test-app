import request from 'superagent';
import config from '../config';

export function pull(name){
	
	return new Promise((resolve,reject)=>{
		
		request
   			.post(`${config.containermanager.API}/pull-app`)
   			.send({
  				"name": name,
			})
			.type("form")
   			.set('Accept', 'application/json')
   			.end((err, data)=>{
     			if (err) {
       				console.log('error creating repo!');
       				console.log(err);
       				reject(err);
     			} 
     			else {
     			 	resolve(data.body);
     			}
     		});
   	}); 			 	
}

export function launch(name){
	return new Promise((resolve,reject)=>{
		request
			.post(`${config.containermanager.API}/launch-container`)
			.send({
				repoTag:`${config.registry.URL}/${name}:latest`,
			})
			.type("form")
			.set('Accept', 'application/json')
	   			.end((err, data)=>{
	     			if (err) {
	       				console.log('error creating repo!');
	       				console.log(err);
	       				reject(err);
	     			} 
	     			else {
	     			 	resolve(data.body);
	     			}
	     	}); 		
	});	
}
