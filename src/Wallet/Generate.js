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
			Private: Object,
			Signer: Signer
		};

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.ref;

		let api = Input.API;

		this._toast.warn("Generating RSA...");
		let wallet = await api.wallets.generate();
		this._toast.clear();

		Output.Private = wallet;
		Output.Signer = new Signer(wallet);
		Output.Public = await api.wallets.jwkToAddress(wallet);
	}
});