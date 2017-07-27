import {sendmessage} from './websocket';
import net from 'net'
import {savedata, printstorage} from '../datastore';

export default function init(){
	var server = net.createServer(function(socket) {
		socket.on('data', function(data){
			try {
				
				const {type, msg} = JSON.parse(data.toString('utf8'));
				let channel = "";
				
				switch (type){
					case "message":
						if (msg.type==="control"){
						
							if (msg.payload && msg.payload.command === "init"){
								savedata(msg.payload.data.id, msg.payload.data);
								printstorage();
							}
						}
						channel = msg.channel;
						delete(msg.channel); 
						sendmessage(channel, "databox", "message", msg);
						break;

					default:
						channel = msg.channel;
						delete(msg.channel); 
						sendmessage(channel, "databox", type, msg)
						
				}
			}catch(err){
				console.log("error parsing data", data.toString('utf8'));
			}
		});
	});

	server.listen(8435, '0.0.0.0');
}