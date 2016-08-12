import mqtt from 'mqtt';  
import {sendmessage} from './websocket';

let counter = 0;

export default function init(){
	const client = mqtt.connect('mqtt://mosquitto:1883')
	
	client.on('connect', () => {  
  		client.subscribe('webapp')
	})

	client.on('message', (topic, message) => {  
		try {
			const msg = JSON.parse(message.toString());
			const channel = msg.channel;
			sendmessage(msg.channel, "databox", "message", msg.payload)
		}
		catch(err){
			console.log(err);
		}
	});
}
