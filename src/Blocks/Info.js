/**
 * Get current block info for Arweave blockchain
 * @blackprint node
 * @summary Arweave
 */
Blackprint.registerNode("Arweave/Blocks/Info",
class InfoNode extends Blackprint.Node {
	static input = {
		/** API that already connected to Arweave's blockchain */
		API: Arweave,
		/** Block hash */
		Hash: String,
		/** Refresh/fetch the info */
		Refresh: Blackprint.Port.Trigger(async function(){
			// this == node (Blackprint.Node)
			let hash = this.input.Hash;

			if(hash === '')
				this.output.Data = await this.input.API.blocks.getCurrent();
			else this.output.Data = await this.input.API.blocks.get(hash);
		}),
	};

	static output = {
		/** Raw response data */
		Data: Object,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Block Info";
	}
});