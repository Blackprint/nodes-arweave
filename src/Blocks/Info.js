Blackprint.registerNode("Arweave/Blocks/Info",
class InfoNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Block Info";

		let node = this;
		this.input = {
			API: Arweave,
			Hash: String,
			Refresh: Blackprint.Port.Trigger(async function(){
				let hash = node.input.Hash;

				if(hash === '')
					node.output.Data = await node.input.API.blocks.getCurrent();
				else node.output.Data = await node.input.API.blocks.get(hash);
			})
		};

		this.output = {Data: Object};
	}
});