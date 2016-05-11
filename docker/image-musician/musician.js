// AUTHORS ALBASINI Romain & SELIMI Dardan
var map = require('hashmap');
var orchestra = new map();
orchestra.set("ti-ta-ti","piano");
orchestra.set("pouet","trumpet");
orchestra.set("trulu","flute");
orchestra.set("gzi-gzi","violin");
orchestra.set("boum-boum", "drum");

var uuid = require('node-uuid');
var dgram = require('dgram'); 
var server = dgram.createSocket("udp4"); 
var instrument = process.argv[2];
var mus = new Musician(instrument);
var udp = new UDP_sender();

function Musician(instrument) {
	this.uuid = uuid.v4();
	this.instrument = instrument;
	this.sound = instrumentMap.get(instrument);

	Musician.prototype.update = function (){
		console.log("Playing: " + this.instrument);
		var data = {
			uuid : this.uuid,
			sound: this.sound
		};
	
		var payload = JSON.stringify(data);
		message = new Buffer(payload);		
	}
	setInterval(this.update.bind(this), 1000);
}

function UDP_sender(){
	server.send(message, 0, message.length, 8777, "224.1.1.1");
	console.log("Sent " + message + " to the matrix...");
}
