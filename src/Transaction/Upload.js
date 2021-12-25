//> {Transaction, NodeToast, Context} = /_init.js
//> {Arweave, Blackprint} = window

Blackprint.registerNode("Arweave/Transaction/Upload",
class UploadNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Upload file";
		iface.description = "Arweave Tx";

		this.input = {
			API: Arweave,
			Signer: Signer,
			Data: Blackprint.Port.Union([ ArrayBuffer, String ])
		};

		this.output = {
			Tx: Transaction
		};

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.const;

		if(Input.API == null)
			return this._toast.warn("API is required");

		if(Input.Signer == null)
			return this._toast.warn("Signer is required");

		if(Input.Data == null)
			return this._toast.warn("Data is required");

		let signer = Input.Signer;
		if(signer === Context._BrowserWallet)
			signer = void 0;

		this._toast.clear();

		Output.Tx = new Transaction(await Input.API.createTransaction({
			data: Input.Data
		}, signer._data), 'upload_file');
	}
});