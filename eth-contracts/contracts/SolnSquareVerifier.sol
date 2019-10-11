pragma solidity >=0.4.21 <0.6.0;

import "./ERC721PropertyToken.sol";
import "./Verifier.sol";

contract SolnSquareVerifier is ERC721PropertyToken {
    uint256 private _currentTokenId = 0;
    Verifier verifierContract; 

    struct Proof {
        uint256 tokenId;
        address proverAddress;
    }

    Proof [] proofs;

    mapping(bytes32 => Proof) private submittedProof;

    event ProofAdded(address indexed prover, uint256 tokenId);

    constructor(
        address verifierAddress,
        string memory name, 
        string memory symbol
    ) ERC721PropertyToken(
        name,
        symbol
    ) public 
    {
        verifierContract = Verifier(verifierAddress);
    }

    function mintTo(
        address to,
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[2] calldata input
    ) 
        external 
      
    {
        uint256 tokenId = _getNextTokenId();
        require(verifierContract.verifyTx(a,b,c,input),'Invalid proof');

        bytes32 key = keccak256(
            abi.encodePacked(
                a[0],a[1],b[0][0],b[0],b[1],b[1][0],b[1][1],c[0],c[1],input[0],input[1]
            )
         );

        require(proofIsUnique(key),'Proof is not unique');
        addProof(tokenId,to,key); 
        
        super.mint(to,tokenId); 
        _incrementTokenId();
    }

    function proofIsUnique(bytes32 key) internal view returns(bool)  {
        if (submittedProof[key].proverAddress == address(0x0)) {
            return true;
        } else {
            return false;
        }
    }

    function addProof(
        uint256 tokenId,
        address prover,
        bytes32 key
    ) internal
    {
        
        Proof memory p = Proof({tokenId: tokenId,proverAddress: prover});
        submittedProof[key] = p;
        proofs.push(p);
        emit ProofAdded(prover,tokenId);
    }

    function  _getNextTokenId() private view returns(uint256) {
        return _currentTokenId.add(1);
    }

    function _incrementTokenId() private {
        _currentTokenId = _currentTokenId.add(1);
    }

}

  


























