Blackprint.registerNode("Arweave/Wallet/Generate",
class GenerateNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Generate Wallet";
		iface.description = "Arweave";

		this.input = {API: Arweave};
		this.output = {
			Public: String,
			Private: Object
		};

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.const;

		let api = Input.API;

		this._toast.warn("Generating...");
		let wallet = await api.wallets.generate();
		this._toast.clear();

		Output.Private = wallet;
		Output.Public = await api.wallets.jwkToAddress(wallet);
	}
});