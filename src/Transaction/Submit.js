/**
 * Submit a transaction to be processed in the blockchain
 * @blackprint node
 * @summary Arweave sign and submit Tx
 */
Blackprint.registerNode("Arweave/Transaction/Submit",
class SubmitNode extends Blackprint.Node {
	// Avoid automatically submit without user interaction
	static input = {
		/** Trigger the submission */
		Submit: Blackprint.Port.Trigger(function(){
			this.submit();
		}),
		/** API that already connected to Arweave's blockchain */
		API: Arweave,
		/** Sender wallet's signer for signing the transaction */
		Signer: Signer,
		/** Transaction to be submitted */
		Tx: Transaction,
	};

	static output = {
		/** Raw status response */
		Status: Object,
		/** Percentage of uploaded file */
		Percent: Number,
		/**
		 * Transaction id
		 * You can use this to explore or download your file
		 */
		TxId: String,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Submit Tx";

		this._toast = new NodeToast(iface);
	}

	_sign = null;
	async update(){
		let {Input, Output} = this.ref;

		if(Input.API == null)
			return this._toast.warn("API is required");

		if(Input.Signer == null)
			return this._toast.warn("Signer is required");

		if(Input.Tx == null)
			return this._toast.warn("Tx is required");

		let {API, Signer, Tx} = Input;

		this._toast.warn("Signing...");
		this._sign = await API.transactions.sign(Tx._data, Signer._data);
		this._toast.warn("Idle");
	}

	async submit(){
		await this._sign;

		let {Input, Output} = this.ref;
		this._toast.warn("Submitting...");

		let {API, Tx} = Input;
		if(Tx._type === 'balance'){
			Output.Status = await API.transactions.post(Tx._data);

			if(Output.Status.status === 200){
				this._toast.clear();
				this._toast.success("Submitted");

				Output.TxId = Tx._data.id;
			}
			else if(Output.Status.status >= 500)
				this._toast.warn("Server Error");
			else if(Output.Status.status >= 400)
				this._toast.warn("Invalid Transaction");
			else this._toast.warn("Unknown status");
		}
		else if(Tx._type === 'upload_file'){
			let uploader = Output.Status = await API.transactions.getUploader(Tx._data);

			while (!uploader.isComplete) {
				await uploader.uploadChunk();
				this._toast.warn(`Uploading ${uploader.uploadedChunks}/${uploader.totalChunks}`);
				Output.Percent = uploader.pctComplete;
			}

			this._toast.clear();
			this._toast.success("Uploaded");

			Output.TxId = Tx._data.id;
		}
	}
});