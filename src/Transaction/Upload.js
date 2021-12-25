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
			Data: Blackprint.Port.Union([ ArrayBuffer, Blob, String ])
		};

		this.output = {
			Tx: Transaction,
			Fee: String, // in Winston
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

		let {Signer, Data} = Input;
		if(Signer === Context._BrowserWallet)
			Signer = void 0;

		this._toast.clear();

		let unsigned = await Input.API.createTransaction({
			data: Data instanceof Blob ? await Data.arrayBuffer() : Data
		}, Signer._data);

		let tx = new Transaction(unsigned, 'upload_file');

		if(Data.type)
			unsigned.addTag('Content-Type', Data.type);

		Output.Fee = tx._data.reward;
		Output.Tx = tx;
	}
});