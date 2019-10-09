const ERC721PropertyToken = artifacts.require('ERC721PropertyToken');
const { BN, expectEvent, expectRevert } = require('openzeppelin-test-helpers');
const {expect} = require('chai');

contract('TestERC721PropertyToken', accounts => {

  const account_one = accounts[0];
  const account_two = accounts[1];
  const firstTokenId =  new BN(1);
  const secondTokenId = new BN(2);
  const thirdTokenId = new BN(3);
  const unknownTokenId  = new BN(99);


  describe('match erc721 spec', function () {
    beforeEach(async function () { 
      this.token = await ERC721PropertyToken.new('RealEstateToken','RET',{from: account_one});

      await this.token.mint(account_one,firstTokenId);
      await this.token.mint(account_one,secondTokenId);
      await this.token.mint(account_two,thirdTokenId);
    })

    it('should return total supply', async function () { 
      expect(await this.token.totalSupply()).to.be.bignumber.equal(new BN(3));
    })

    it('should get token balance', async function () { 
      expect(await this.token.balanceOf(account_one)).to.be.bignumber.equal(new BN(2));
      expect(await this.token.balanceOf(account_two)).to.be.bignumber.equal(new BN(1));
    })

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it('should return token uri', async function () { 
      expect(await this.token.tokenURI(firstTokenId)).to.be.equal(
        'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1'
      );
    })

    it('should transfer token from one owner to another', async function () { 

      const tx = await this.token.transferFrom(account_one,account_two,secondTokenId,{from: account_one});
      
      await expectEvent.inLogs(tx.logs,'Transfer',
        { from: account_one, to: account_two, tokenId: secondTokenId });

      expect(await this.token.balanceOf(account_one)).to.be.bignumber.equal(new BN(1));
      expect(await this.token.balanceOf(account_two)).to.be.bignumber.equal(new BN(2));

    })
  });

  describe('have ownership properties', function () {
    beforeEach(async function () { 
      this.token = await ERC721PropertyToken.new('RealEstateToken','RET',{from: account_one});
      await this.token.mint(account_one,firstTokenId);
      await this.token.mint(account_one,secondTokenId);
      await this.token.mint(account_two,thirdTokenId);
    })

    it('should fail when minting when address is not contract owner', async function () { 
      await expectRevert(
        this.token.mint(account_two,new BN(99),{from: account_two}),
        'Caller is not the owner'
      );
    })

    it('should return contract owner', async function () { 
      expect( await this.token.ownerOf(thirdTokenId)).to.be.equal(account_two);
    })

  });
})
