Blackprint.registerNode("Arweave/Blocks/Info",
class InfoNode extends Blackprint.Node {
	static input = {
		API: Arweave,
		Hash: String,
		Refresh: Blackprint.Port.Trigger(async function(){
			// this == node (Blackprint.Node)
			let hash = this.input.Hash;

			if(hash === '')
				this.output.Data = await this.input.API.blocks.getCurrent();
			else this.output.Data = await this.input.API.blocks.get(hash);
		}),
	};

	static output = { Data: Object };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Block Info";
	}
});