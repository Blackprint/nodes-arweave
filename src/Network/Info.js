Blackprint.registerNode("Arweave/Network/Info",
class InfoNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Network Info";

		let node = this;
		this.input = {
			API: Arweave,
			Refresh: Blackprint.Port.Trigger(async function(){
				let temp = await node.input.API.network.getInfo();
				let output = node.output;

				output.Blocks = temp.blocks;
				output.Current = temp.current;
				output.Peers = temp.peers;
				output.Raw = temp;
			})
		};

		this.output = {
			Blocks: Number,
			Current: String,
			Peers: Number,
			Raw: Object,
		};
	}
});