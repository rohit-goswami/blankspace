// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./SBT.sol";

contract SBTPoM is SBT {
    
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;

    function mint(address to, string memory uri) public override returns(uint256){
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }
}