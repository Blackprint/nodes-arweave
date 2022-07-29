//> {Transaction, Context} = /_init.js

/**
 * Submit a transaction to be processed in the blockchain
 * @blackprint node
 * @summary Arweave Tx
 */
Blackprint.registerNode("Arweave/Transaction/Add/Tag",
class TagNode extends Blackprint.Node {
	static input = {
		/** Transaction that you want to add a tag into */
		Tx: Transaction,
		/** Content type tag */
		ContentType: String,
		/** Tags in key-value object */
		KV: Object,
	};

	static output = {
		/** Transaction that can be submitted to blockchain */
		Tx: Transaction,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Add tags";

		this._toast = new NodeToast(iface);
	}

	update(){
		let {Input, Output} = this.ref;

		if(Input.Tx == null)
			return this._toast.warn("Tx is required");

		let Tx = Input.Tx;

		if(Input.ContentType != ''){
			if(Input.ContentType.includes('/') === false)
				return this._toast.warn("ContentType looks invalid type");

			this._toast.clear();
			Tx._data.addTag('Content-Type', Input.ContentType);
		}

		if(Input.KV != null){
			let kv = Input.KV;

			for(let key in kv)
				Tx._data.addTag(key, kv[key]);
		}

		this._toast.clear();
		Output.Tx = Input.Tx;
	}
});