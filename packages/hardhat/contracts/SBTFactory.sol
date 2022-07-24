// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./SBT.sol";
import "./SBTPoM.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract SBTFactory {
    
    address immutable public tokenImplementation;
    address immutable public tokenImplementationPoM;
    address public owner; 
    
    mapping(address => bool) public allowedAddresses;
    mapping(address => address) public ownerOfSBT;
    mapping(address => string) public cidPoM;

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
        tokenImplementationPoM = address(new SBTPoM());
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

    function createSBTPoM(string calldata _name, string calldata _symbol, string calldata _cid) external onlyAllowedAccounts returns (address) {
        address clone = Clones.clone(tokenImplementationPoM);
        SBTPoM(clone).initialize(_name, _symbol);
        ownerOfSBT[clone] = tx.origin;
        cidPoM[clone] = _cid;
        return clone;
    }

    function mint(address _contract, address _to, string calldata _cid) public onlyAllowedAccounts returns(uint256){
        require(ownerOfSBT[_contract] == tx.origin, "You're not the owner of this SBT contract");
        return SBT(_contract).mint(_to,_cid);
    }

    function mintPoM(address _contract, address _to) public returns(uint256){
        return SBTPoM(_contract).mint(_to, cidPoM[_contract]);
    }

    function revoke(address _contract, uint256 _tokenId) public onlyAllowedAccounts {
        require(ownerOfSBT[_contract] == tx.origin, "You're not the owner of this SBT contract");
        SBT(_contract).revoke(_tokenId);
    }
    
    function ownerOf(address _contract, uint256 _tokenId) public view returns (address){
        return SBT(_contract).ownerOf(_tokenId);
    }
    
    function balanceOf(address _contract, address _address) public view returns (uint256) {
        return SBT(_contract).balanceOf(_address);
    }
} 