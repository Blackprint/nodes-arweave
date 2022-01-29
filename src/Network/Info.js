Blackprint.registerNode("Arweave/Network/Info",
class InfoNode extends Blackprint.Node {
	static input = {
		API: Arweave,
		Refresh: Blackprint.Port.Trigger(async function(){
			let temp = await this.input.API.network.getInfo();
			let output = this.output;

			output.Blocks = temp.blocks;
			output.Current = temp.current;
			output.Peers = temp.peers;
			output.Raw = temp;
		})
	};

	static output = {
		Blocks: Number,
		Current: String,
		Peers: Number,
		Raw: Object,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Network Info";
	}
});