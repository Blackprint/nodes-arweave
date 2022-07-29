/**
 * Connect to Arweave's blockchain via HTTP/HTTPS
 * @blackprint node
 * @summary HTTP
 */
Blackprint.registerNode("Arweave/Connection/HTTP",
class HTTPNode extends Blackprint.Node {
	static output = {
		/** API object from Arweave's library */
		API: Arweave,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Arweave Connection";
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