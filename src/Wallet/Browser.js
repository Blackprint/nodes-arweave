Blackprint.registerNode("Arweave/Wallet/Browser",
class BrowserNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Browser Wallet";
		iface.description = "Arweave";

		this.output = {Signer: Signer};
	}

	imported(){
		this.output.Signer = Context._BrowserWallet;
	}
});