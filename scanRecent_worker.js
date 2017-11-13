// get the recent transactions from the blockchain directly

var window = self;		// need to give access of window object to web3
importScripts('web3.min.js');

	if (typeof web3 !== 'undefined') {
	  console.warn("Using web3 detected from external source like Metamask")
	  // Use Mi0xa86e0a5ab51612e245fa96461cfc7df3129595950xa86e0a5ab51612e245fa96461cfc7df312959595st/MetaMask's provider
	  web3 = new Web3(web3alert.currentProvider);
	} else {
	  console.warn("No web3 detected. Falling back to http://localhost:8545");
	  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}

	onmessage = function(e) {
		startScan(e.data);	// receive the address before scanning
	};

function startScan(ethAddr) {
	var currentBlock = web3.eth.blockNumber;
	var count = 0;

	for (var i = currentBlock; i >= 0 && count < 3; i--) {
		var block = web3.eth.getBlock(i, true);
		if (block != null && block.transactions != null) {
			block.transactions.forEach( function(e) {
				if (ethAddr == e.to && count < 3) {
					postMessage('<li><pre>' + new Date(block.timestamp * 1000).toLocaleString('en-US',{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
 					+ ': From :' + e.from + ', Value : ' + web3.fromWei(e.value,'ether'));
					count++;
				};
			});
		};
	};
	postMessage('scan_finished');
};
