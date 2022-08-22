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
		Refresh: Blackprint.Port.Trigger(async function({ iface }){
			let node = iface.node;
			let hash = node.input.Hash;

			if(hash === '')
				node.output.Data = await node.input.API.blocks.getCurrent();
			else node.output.Data = await node.input.API.blocks.get(hash);
			
			node.routes.routeOut();
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