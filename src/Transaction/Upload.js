//> {Transaction, NodeToast, Context} = /_init.js
//> {Arweave, Blackprint} = window

/**
 * Submit a transaction to be processed in the blockchain
 * @blackprint node
 * @summary Arweave Tx
 */
Blackprint.registerNode("Arweave/Transaction/Upload",
class UploadNode extends Blackprint.Node {
	static input = {
		/** API that already connected to Arweave's blockchain */
		API: Arweave,
		/** Sender wallet's signer for signing the transaction */
		Signer: Signer,
		/** Data that will be uploaded */
		Data: Blackprint.Port.Union([ ArrayBuffer, Blob, String ]),
	};

	static output = {
		/**
		 * Transaction
		 * You can submit this to blockchain to execute this transaction
		 */
		Tx: Transaction,
		/** Estimated fee in Winston */
		Fee: String,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Upload file";

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.ref;

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