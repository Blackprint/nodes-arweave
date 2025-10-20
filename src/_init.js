// This script will run first, and then the other files
// depends on blackprint.config.js configuration

//> Optional, just for Blackprint Editor
// Let the Blackprint Editor know the source URL where
// the registerNode and registerInterface belongs to
let Blackprint = window.Blackprint.loadScope({
	// You can find the URL on Blackprint menu -> Modules
	// This will also be exported to JSON if this module's nodes is being used
	url: import.meta.url,

	// This will autoload (*.sf.mjs) and (*.sf.css) file for Browser
	// hasInterface: true,

	// This will autoload (*.docs.json) for Browser
	hasDocs: true,
});

// Prepare stuff when the page is loading
// maybe like loading our dependencies for the nodes
var [ Arweave ] = await Blackprint.DepsLoader.js({
	window: ['Arweave'],

	// need to use 'npm install' first or must exist on node_modules, will dynamically imported
	local: ['arweave'],

	// for browser, Deno, or supported environment that have internet access
	cdn: ["https://cdn.jsdelivr.net/npm/arweave@^1.15.7/bundles/web.bundle.min.js"]
});

// Global shared context
let Context = Blackprint.createContext('Arweave');

// This is needed to avoid duplicated event listener when using hot reload
// Event listener that registered with same slot will be replaced
Context.EventSlot = {slot: 'my-private-event-slot'};

class NodeToast {
	constructor(iface){
		this.iface = iface;
	}

	clear(){
		if(this.haveInfo)
			this.haveInfo.destroy();
		if(this.haveWarn)
			this.haveWarn.destroy();
		if(this.haveError)
			this.haveError.destroy();

		this.haveInfo = false;
		this.haveWarn = false;
		this.haveError = false;
	}

	_reduceText(text){
		return text.replace(/\w{15,}/g, full => full.slice(0, 5)+'...');
	}

	info(text){
		if(!this.iface.$decoration) return;
		text = this._reduceText(text);

		if(this.haveInfo)
			this.haveInfo.text = text;
		else
			this.haveInfo = this.iface.$decoration.info(text);
	}

	warn(text){
		if(!this.iface.$decoration) return;
		text = this._reduceText(text);

		if(this.haveWarn)
			this.haveWarn.text = text;
		else
			this.haveWarn = this.iface.$decoration.warn(text);
	}

	error(text){
		if(!this.iface.$decoration) return;
		text = this._reduceText(text);

		if(this.haveError)
			this.haveError.text = text;
		else
			this.haveError = this.iface.$decoration.error(text);
	}

	success(text){
		if(!this.iface.$decoration) return;
		this.iface.$decoration.success(this._reduceText(text));
	}
}

Context.NodeToast = NodeToast;

class Transaction {
	constructor(data, type){
		this._data = data;
		this._type = type;
	}
}

class Signer {
	constructor(data){
		this._data = data;
	}
}

Context.Transaction = Transaction;
Context.Signer = Signer;
Context._BrowserWallet = new Signer();

// Fix minified class name
Blackprint.utils.renameTypeName({
	'Transaction': Transaction,
	'Signer': Signer,
	'Arweave': Arweave,
});

let Blob = window.Blob; // Browser/Deno
if(Blob === void 0) // Node.js
	Blob = (await import('node:buffer')).Blob;