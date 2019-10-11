// migrating the appropriate contracts
const SquareVerifier = artifacts.require("Verifier");
const SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(SolnSquareVerifier,SquareVerifier.address,'RealEstateToken','RET');
};
