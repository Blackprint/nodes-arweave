/**
 * Get a wallet signer from browser extension
 * @blackprint node
 * @summary Arweave
 */
Blackprint.registerNode("Arweave/Wallet/Browser",
class BrowserNode extends Blackprint.Node {
	static output = {
		/** Wallet's signer */
		Signer: Signer,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Browser Wallet";
	}

	imported(){
		this.output.Signer = Context._BrowserWallet;
	}
});