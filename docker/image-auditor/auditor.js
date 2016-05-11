// AUTHORS ALBASINI Romain & SELIMI Dardan
var map = require('hashmap');
var dgram = require('dgram');
var net = require('net');
var musicianPlaying = new map();
var orchestra = new map();
orchestra.set("ti-ta-ti","piano");
orchestra.set("pouet","trumpet");
orchestra.set("trulu","flute");
orchestra.set("gzi-gzi","violin");
orchestra.set("boum-boum", "drum");
var udp = new UDP_receptionist();
var tcp = new TCP_sender();

// TCP
function TCP_sender(){
	var serverTCP = net.createServer((client) => {
		var activeMusicians = [];	
		var payload;
		musicianPlaying.forEach(function(val, key) {
			//checking if the sound senders have been active the last 5 seconds
			if(val.activeSince.getTime() <= Date.now() - 5000){
				activeMusicians.push(val);
			}
			else{ //remove it if so from the map
				musicianPlaying.remove(key);
			}
		});
		
		payload = JSON.stringify(activeMusicians);
		
		client.write(payload);
		client.end();

	});
	serverTCP.on('error connection probably lost, maybe...', (err) => {
		throw err;
	});
	serverTCP.listen(2205, () => {
		console.log('Listening on port: ' + 2205);
	});
}

// UDP
function UDP_receptionist(){
	
	var serverUDP = dgram.createSocket('udp4');	

	serverUDP.bind(8777, function() {
		console.log("Listening on " + 8777);
		serverUDP.addMembership("224.1.1.1");
	});

	serverUDP.on('message', function(data, source) {
		var musicianDataSent = JSON.parse(data);
		var musician = {}; 
		console.log("Data incoming: " + data + " -> Source port: " + source.port);
		
		musician.uuid = musicianDataSent.uuid;
		musician.instrument = orchestra.get(musicianDataSent.sound);
		
		var time = new Date();
		musician.activeSince = time;
		
		musicianPlaying.set(musician.uuid, musician);
		musicianPlaying.forEach(function(val, key) {
			console.log(key + " : " + JSON.stringify(val));
		});
	});
}
