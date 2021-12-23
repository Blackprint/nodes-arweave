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
	}

	async update(){
		let {Input, Output} = this.const;

		let api = Input.API;
		let wallet = await api.wallets.generate();

		Output.Private = wallet;
		Output.Public = api.wallets.jwkToAddress(wallet);
	}
});