Blackprint.registerNode("Arweave/Wallet/Import",
class ImportNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Import Wallet";
		iface.description = "Arweave";

		this.input = {
			API: Arweave,
			Object: Object,
			Blob: Blob,
		};
		this.output = {
			Public: String,
			Private: Object,
			Signer: Signer
		};

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.ref;

		if(Input.API == null)
			return this._toast.warn("API is required");

		if(Input.Object == null && Input.Blob == null)
			return this._toast.warn("Object or Blob is required");

		this._toast.clear();
		let api = Input.API;

		if(Input.API.Object)
			Output.Private = wallet;
		else Output.Private = JSON.parse(await Input.Blob.text());

		Output.Signer = new Signer(Output.Private);
		Output.Public = await api.wallets.jwkToAddress(Output.Private);
	}
});