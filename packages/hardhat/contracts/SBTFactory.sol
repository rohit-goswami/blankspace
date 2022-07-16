// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./SBT.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract SBTFactory {
    address immutable public tokenImplementation;
    address public owner; 
    mapping(address => bool) public allowedAddresses;

    event CreateSBT(address indexed from, address indexed SBTAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not the owner of this SC");
        _;
    }
    modifier onlyAllowedAccounts() {
        require(allowedAddresses[msg.sender] == true, "You're not allowed to create a new SBT");
        _;
    }

    constructor() {
        owner = msg.sender;
        tokenImplementation = address(new SBT());
    }

    function addNewAccount(address _newAccount) public onlyOwner {
        allowedAddresses[_newAccount] = true;
    }

    function createSBT(string calldata _name, string calldata _symbol) external onlyAllowedAccounts returns (address) {
        address clone = Clones.clone(tokenImplementation);
        SBT(clone).initialize(_name, _symbol);
        emit CreateSBT(msg.sender,clone);
        return clone;
    }
} 