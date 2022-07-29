//> {Transaction, NodeToast, Context} = /_init.js
//> {Arweave, Blackprint} = window

/**
 * This node is used to transfer AR coin balance
 * from a sender's wallet to target's wallet
 * @blackprint node
 * @summary Arweave Tx
 */
Blackprint.registerNode("Arweave/Transaction/Balance",
class BalanceNode extends Blackprint.Node {
	static input = {
		/** API that already connected to Arweave's blockchain */
		API: Arweave,
		/** Sender wallet's signer */
		Signer: Signer,
		/** Target wallet's address */
		Target: String,
		/** 1 AR = 1000,000,000,000 Winston (12 zeros) */
		Winston: String,
	};

	static output = {
		/**
		 * Transaction
		 * You can submit this to blockchain to execute this transaction
		 */
		Tx: Transaction,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Transfer balance";

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.ref;

		if(Input.API == null)
			return this._toast.warn("API is required");

		if(Input.Signer == null)
			return this._toast.warn("Signer is required");

		if(Input.Target == null)
			return this._toast.warn("Target is required");

		if(Input.Winston == null)
			return this._toast.warn("Winston is required");

		let signer = Input.Signer;
		if(signer === Context._BrowserWallet)
			signer = void 0;

		Output.Tx = new Transaction(await Input.API.createTransaction({
			target: Input.Target,
			quantity: Input.Winston,
		}, signer._data), 'balance');
	}
});