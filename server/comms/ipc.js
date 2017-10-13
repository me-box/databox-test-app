import {sendmessage} from './websocket';
import net from 'net'
import {savedata} from '../datastore';
import JsonSocket from 'json-socket';


/*const NETSTRING_SEPARATOR_CODE = 58;

const readfirstpacket = (netstring, { encoding = 'utf-8', response = 'string' }={})=>{

	netstring = new Buffer(netstring, encoding);
	
	for (let i = 0; i < netstring.length ; i++) {
		let val = netstring[i];
        //First find the ':' - NETSTRING_SEPARATOR character.
        if (NETSTRING_SEPARATOR_CODE === val) {
        	let len = netstring.toString(encoding, 0, i);
            len = Number.parseInt(len);
        	const stringStart = i + 1;
        	const string = netstring.slice(stringStart, stringStart + len);
        	return {remaining: len - string.length, chunk: string.toString(encoding)}
        }
	}
	return {remaining:0, chunk: ""};
}

*/
const handleMsg = (data)=>{
	try {
		const {type, msg} = data;//JSON.parse(data.toString('utf8'));
		let channel = "";
		console.log("test server, sending", msg);
		switch (type){

			case "debug":
			case "message":
				if (msg.type==="control"){
					console.log("------------> seen an init message <-------------------------");
					if (msg.payload && msg.payload.command === "init"){
						console.log("*** SAVING DATA", JSON.stringify(msg.payload.data,null, 4));
						savedata(msg.payload.data.id, msg.payload.data);
					}
				}
				channel = msg.channel;
				delete(msg.channel); 
				sendmessage(channel, "databox", type, msg);
				break;

			

			default:
				channel = msg.channel;
				delete(msg.channel); 
				sendmessage(channel, "databox", type, msg)
		}
	}catch(err){
		console.log("error parsing data", data);
	}
}

export default function init(){
	
	console.log("INITING THE SERVER!");

	var server = net.createServer();

	server.on('connection', function(socket) { //This is a standard net.Socket
    	socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket
	    socket.on('message', function(message) {
	       console.log("got a message!!");
	       handleMsg(message);
	    });
	});

	server.on('error', function(err) { //This is a standard net.Socket
    	console.log(err);
	});

    server.listen(8435, '0.0.0.0');
}


    /*
	var server = net.createServer(function(socket) {
		
		let remaining = 0;
		let chunks = [];

		socket.on('data', function(data){
			console.log("incoming data!");

			if (remaining < 0){
				console.log("resetting..remaining is", remaining);
				chunks  = [];
				remaining = 0;
			}
			else if (remaining == 0){
				chunks = [];
				try{
					const pkt = readfirstpacket(data);
				
					if (pkt.remaining == 0)	{

						handleMsg(pkt.chunk);
					}else{
						remaining = pkt.remaining;
						chunks.push(pkt.chunk);
					}
				}catch(err){
					console.log("error reading first packet");
					remaining = 0;
					chunks = [];
				};
			}
			else{
				remaining = remaining - (data.length-1);
				chunks.push(data.slice(0, data.length-1));

				if (remaining == 0){
					const pkt = chunks.reduce((acc, c)=>{
						acc += c;
						return acc;
					},"");
					handleMsg(pkt);
				}
			}
		});
	});

	server.listen(8435, '0.0.0.0');*/
