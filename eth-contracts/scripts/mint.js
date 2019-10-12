const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const ZKP = require('../../zokrates/code/square/proof.json');
require('dotenv').config();
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const NETWORK = process.env.NETWORK
const NUM_TOKENS = process.env.NUM_TOKENS || 1

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

const NFT_ABI =[{
  "constant": false,
  "inputs": [
    {
      "name": "to",
      "type": "address"
    },
    {
      "name": "a",
      "type": "uint256[2]"
    },
    {
      "name": "b",
      "type": "uint256[2][2]"
    },
    {
      "name": "c",
      "type": "uint256[2]"
    },
    {
      "name": "input",
      "type": "uint256[2]"
    }
  ],
  "name": "mintTo",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];

async function main() {
  try {
  let provider;
  console.log('NETWORK: ',NETWORK);

  if (NETWORK.startsWith('127.0.0.1'))  {
    provider = new HDWalletProvider(MNEMONIC,`http://${NETWORK}`);
  } else { 
    provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
  }

  const web3Instance = new web3(
    provider
  )

  if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_TOKENS; i++) {
      const result = await nftContract.methods.mintTo(
        OWNER_ADDRESS,
        ZKP.proof.a,
        ZKP.proof.b,
        ZKP.proof.c,
        ZKP.inputs
      ).send({ from: OWNER_ADDRESS });
      console.log("Minted token Transaction: " + result.transactionHash)
    }
    process.exit(0);
  } 
  }catch (error) {
    console.log(error);
    process.exit(-1);
  }
}

main() 
