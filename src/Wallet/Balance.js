/**
 * Submit a transaction to be processed in the blockchain
 * @blackprint node
 * @summary Arweave
 */
Blackprint.registerNode("Arweave/Wallet/Balance",
class BalanceNode extends Blackprint.Node {
	static input = {
		/** API that already connected to Arweave's blockchain */
		API: Arweave,
		/** Wallet's address */
		Address: String,
	};
	static output = {
		/** Wallet balance in Winston */
		Balance: String,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Wallet Balance";

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.ref;

		if(Input.API == null)
			return this._toast.warn("API is required");

		if(Input.Address === '')
			return this._toast.warn("Address is required");

		this._toast.clear();
		Output.Balance = await Input.API.wallets.getBalance(Input.Address);
		// Input.API.ar.winstonToAR
	}
});