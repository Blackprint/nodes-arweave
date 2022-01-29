Blackprint.registerNode("Arweave/Wallet/Browser",
class BrowserNode extends Blackprint.Node {
	static output = { Signer: Signer };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Browser Wallet";
		iface.description = "Arweave";
	}

	imported(){
		this.output.Signer = Context._BrowserWallet;
	}
});