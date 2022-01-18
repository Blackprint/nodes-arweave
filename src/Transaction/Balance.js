//> {Transaction, NodeToast, Context} = /_init.js
//> {Arweave, Blackprint} = window

Blackprint.registerNode("Arweave/Transaction/Balance",
class BalanceNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Transfer balance";
		iface.description = "Arweave Tx";

		this.input = {
			API: Arweave,
			Signer: Signer,
			Target: String,
			Winston: String,
		};

		this.output = {
			Tx: Transaction
		};

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