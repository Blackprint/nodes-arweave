Blackprint.registerNode("Arweave/Connection/HTTP",
class HTTPNode extends Blackprint.Node {
	static output = { API: Arweave };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Arweave Connection";
		iface.description = "HTTP";
	}

	imported(){
		this.output.API = new Arweave({
		    host: 'arweave.net',// Hostname or IP address for a Arweave host
		    port: 443,          // Port
		    protocol: 'https',  // Network protocol http or https
		    timeout: 20000,     // Network request timeouts in milliseconds
		    logging: false,     // Enable network request logging
		});
	}
});