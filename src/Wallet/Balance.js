Blackprint.registerNode("Arweave/Wallet/Balance",
class BalanceNode extends Blackprint.Node {
	static input = {
		API: Arweave,
		Address: String,
	};
	static output = { Winston: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Wallet Balance";
		iface.description = "Arweave";

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.ref;

		if(Input.API == null)
			return this._toast.warn("API is required");

		if(Input.Address === '')
			return this._toast.warn("Address is required");

		this._toast.clear();
		Output.Winston = await Input.API.wallets.getBalance(Input.Address);
		// Input.API.ar.winstonToAR
	}
});