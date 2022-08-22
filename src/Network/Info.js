/**
 * Get network info for Arweave blockchain
 * @blackprint node
 * @summary Arweave
 */
Blackprint.registerNode("Arweave/Network/Info",
class InfoNode extends Blackprint.Node {
	static input = {
		/** API that already connected to Arweave's blockchain */
		API: Arweave,
		/** Refresh/fetch the info */
		Refresh: Blackprint.Port.Trigger(async function({ iface }){
			let node = iface.node;
			node.output.Data = await node.input.API.network.getInfo();
		})
	};

	static output = {
		/** Raw response data */
		Data: Blackprint.Port.StructOf(Object, {
			/** Current block number */
			Blocks: {type: Number, field: 'blocks'},
			/** Current info */
			Current: {type: String, field: 'current'},
			/** Number of active peers */
			Peers: {type: Number, field: 'peers'},
		}),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Network Info";
	}
});