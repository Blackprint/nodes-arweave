Blackprint.registerNode("Arweave/Wallet/Balance",
class BalanceNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Wallet Balance";
		iface.description = "Arweave";

		this.input = {
			API: Arweave,
			Address: String,
		};
		this.output = {Winston: Number};

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.const;

		if(Input.API === null)
			this._toast.warn("API is required");

		if(Input.Address === '')
			this._toast.warn("Address is required");

		Output.Winston = await Input.API.wallets.getBalance(Input.Address);
	}
});