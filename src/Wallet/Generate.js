/**
 * Generate new wallet randomly
 * This may take a few minute on slow computer for generating RSA
 * @blackprint node
 * @summary Arweave
 */
Blackprint.registerNode("Arweave/Wallet/Generate",
class GenerateNode extends Blackprint.Node {
	static input = {
		/** API that already connected to Arweave's blockchain */
		API: Arweave,
	};

	static output = {
		/** Public key (wallet address) */
		Public: String,
		/** Private key this must be keep secret */
		Private: Object,
		/** This wallet's signer */
		Signer: Signer,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Generate Wallet";

		this._toast = new NodeToast(iface);
	}

	async update(){
		let {Input, Output} = this.ref;

		let api = Input.API;

		this._toast.warn("Generating RSA...");
		let wallet = await api.wallets.generate();
		this._toast.clear();

		Output.Private = wallet;
		Output.Signer = new Signer(wallet);
		Output.Public = await api.wallets.jwkToAddress(wallet);
	}
});