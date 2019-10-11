const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('Verifier');
const { BN, expectEvent, expectRevert } = require('openzeppelin-test-helpers');
const {expect} = require('chai');
const Proof = require('../../zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', accounts => {

  describe('when a valid proof is provided', () => {
    beforeEach(async () => {
      this.verifier = await Verifier.new({from: accounts[0]});
      this.contract = await SolnSquareVerifier.new(this.verifier.address,'RealEstateToken','RET')
    });

    it('can mint a new token', async () => {
      const tx = await this.contract.mintTo(accounts[1],Proof.proof.a,Proof.proof.b,Proof.proof.c,Proof.inputs);
      await expectEvent.inLogs(
        tx.logs,
        'Transfer',
        {from: "0x0000000000000000000000000000000000000000",  to: accounts[1], tokenId: new BN(1)}
      );

      await expectEvent.inLogs(
        tx.logs,
        'ProofAdded',
        {prover: accounts[1], tokenId: new BN(1)}
      );


    });

    it('cannot mint a new token for the same proof', async () => {
      const tx = await this.contract.mintTo(accounts[1],Proof.proof.a,Proof.proof.b,Proof.proof.c,Proof.inputs);
      await expectRevert(
        this.contract.mintTo(accounts[1],Proof.proof.a,Proof.proof.b,Proof.proof.c,Proof.inputs),
        'Proof is not unique'
      );
    });

  });

  describe('invalid proof', () => {
    it('cannot mint a new token', async () => {
      await expectRevert(
        this.contract.mintTo(accounts[1],Proof.proof.a,Proof.proof.b,Proof.proof.c,[0x4,1]),
        'Invalid proof'
      );
    });
  });

  describe('without proof', () => {
    it('awner can mint a new token', async () => {
      const tx = await this.contract.mint(accounts[1],new BN(2));
      await expectEvent.inLogs(
        tx.logs,
        'Transfer',
        {from: "0x0000000000000000000000000000000000000000",  to: accounts[1], tokenId: new BN(2)}
      );
    });

    it('cannot be minted by non-owner', async () => {
      await expectRevert(
        this.contract.mint(accounts[1],new BN(3),{from: accounts[1]}),
        'Caller is not the owner'
      );
    });
  });


});
