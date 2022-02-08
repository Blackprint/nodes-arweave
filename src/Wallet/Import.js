Blackprint.registerNode("Arweave/Wallet/Import",
class ImportNode extends Blackprint.Node {
	static input = {
		API: Arweave,
		Private: Blackprint.Port.Union([Object, Blob, String]),
	};
	static output = {
		Public: String,
		Private: Object,
		Signer: Signer
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Import Wallet";
		iface.description = "Arweave";

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.ref;

		if(Input.API == null)
			return this._toast.warn("API is required");

		if(!Input.Private)
			return this._toast.warn("Private Key is required");

		let privateKey = Input.Private;

		if(privateKey.constructor === Blob)
			privateKey = await Input.Blob.text();

		if(privateKey.constructor === String)
			privateKey = JSON.parse(privateKey);

		this._toast.clear();
		let api = Input.API;

		Output.Signer = new Signer(privateKey);
		Output.Public = await api.wallets.jwkToAddress(privateKey);
		Output.Private = privateKey;
	}
});