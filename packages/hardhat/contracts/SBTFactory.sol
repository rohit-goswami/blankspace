// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./SBT.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract SBTFactory {
    
    address immutable public tokenImplementation;
    address public owner; 
    
    mapping(address => bool) public allowedAddresses;
    mapping(address => address) public ownerOfSBT;

    event CreateSBT(address indexed from, address indexed SBTAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not the owner of this SC");
        _;
    }
    modifier onlyAllowedAccounts() {
        require(allowedAddresses[tx.origin] == true, "You're not allowed to create a new SBT");
        _;
    }

    constructor() {
        owner = msg.sender;
        tokenImplementation = address(new SBT());
    }

    function addNewAccount(address _newAccount) public onlyOwner {
        allowedAddresses[_newAccount] = true;
    }

    function removeAccount(address _account) public onlyOwner {
        allowedAddresses[_account] = false;
    }

    function createSBT(string calldata _name, string calldata _symbol) external onlyAllowedAccounts returns (address) {
        address clone = Clones.clone(tokenImplementation);
        SBT(clone).initialize(_name, _symbol);
        ownerOfSBT[clone] = tx.origin;
        emit CreateSBT(tx.origin,clone);
        return clone;
    }


    function mint(address _contract, address _to, string calldata _cid) public onlyAllowedAccounts returns(uint256){
        require(ownerOfSBT[_contract] == tx.origin, "You're not the owner of this SBT contract");
        return SBT(_contract).mint(_to,_cid);
    }

    function revoke(address _contract, uint256 _tokenId) public onlyAllowedAccounts {
        require(ownerOfSBT[_contract] == tx.origin, "You're not the owner of this SBT contract");
        SBT(_contract).revoke(_tokenId);
    }
    
    function ownerOf(address _contract, uint256 _tokenId) public view returns (address){
        return SBT(_contract).ownerOf(_tokenId);
    }
} 