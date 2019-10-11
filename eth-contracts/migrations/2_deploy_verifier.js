const SquareVerifier = artifacts.require("Verifier");

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier);
};
