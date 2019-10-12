# Udacity Blockchain Capstone

The capstone builds a ERC721 token and zkSNARK based a decentralized housing product. 

## Getting Started

Install truffle - `npm install -g truffle`

Install node dependencies packages - `npm install` 


## Testing 
Using the steps below, you must generate a proof first in order for tests to work correctly.

1. Install Zokrates -- `curl -LSfs get.zokrat.es | sh`
2. Set the following environment variables

  ```
  export PATH=$PATH:$HOME/.zokrates/bin
  export ZOKRATES_HOME=$HOME/.zokrates/stdlib
  ```
3. `cd zokrates/code/square`
4. `zokrates compile -i square.code`
5. `zokrates compute-witness -a <number> <square of the number>`.
6. `zokrates generate-proof`

**NOTE**: zkSNARK's proving key and verification have already been created. 
So don't run `zokrates setup` command to create a trusted setup. 

Run tests: `truffle tests`

## Deployment 

Create a .env file in `eth-contracts` directory and set the following variables:

```
INFURA_KEY=
MNEMONIC=
NETWORK='rinkeby'
NFT_CONTRACT_ADDRESS=
OWNER_ADDRESS=
```
Deploy the contracts - `truffle deploy --network rinkeby`

After creating witness and generating proof as mentioned in the testing section above, 
mint new tokens -- `node scripts/mint.js` 


## Deployed Contracts (on Rinkeby Testnet)

### Verifier 

Contract Address: 0x636FEe07B3275D542c932aa680592712faC2BD15
Txn Hash: 0x67e1bc247ce10531e96277278f763694ea16a604a9b28000971acdf931120d6e

### SolnSquareVerifier 

Contract Address:  0x15583023B05b8bE30B26869E052367e53c958E09
Txn Hash: 0x4ba55a71692d995a8337ba7d7bf7246a9bdc56fd4154fd48c6836b473e17c344 


## OpenSea Account

https://rinkeby.opensea.io/assets/realestatetoken-5

Tokens minted by:
https://rinkeby.opensea.io/accounts/0x55b090e67117655be1b38e49aa9a86b1d8ef8105

5 Tokens purchased by:
https://rinkeby.opensea.io/accounts/0x5a773af3181e27bce8a0b7789ef134ed226748c1



## Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
