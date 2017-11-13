# Ethereum-FrontEnd

## Installation

You need to have a geth node running in the machine as this app uses web3 which connects to geth locally. For example, you can use the below command to start geth (testnet):

```
geth --testnet --syncmode "fast" --rpc --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303" --ws --wsorigins='*'
```

Note that both RPC and WebSocket are used. This app is tested for geth under Ubuntu, though it should work in other platform

## Testing
This app uses web worker. Since chrome does not support web worker if the html is access locally (e.g. file://), you can do the following:
- start Chrome with parameter "allow-file-access-from-files". E.g. google-chrome --allow-file-access-from-files
- use Firefox to test
- install a web server like Apache or node.js http-server

To run it, just access home.html

## Structure and Dataflow
In this version, this app is written in pure JavaScript/HTML/CSS with jquery. It is pretty asynchronous and it subscribes to the geth web socket interface to hear new transactions. For other block-related queries, it goes through web3 rpc interface. In addition, the Web Storage Object is used to store the bookmark. Since it uses localStorage, the bookmark will survive even when the browser is closed (unless it is cleared explicitly through the "clear bookmarks" button in the home page).
