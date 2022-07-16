// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./SBT.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract FactoryClone {
    address immutable tokenImplementation;

    constructor() {
        tokenImplementation = address(new SBT());
    }

    function createSBT(string calldata name, string calldata symbol) external returns (address) {
        address clone = Clones.clone(tokenImplementation);
        SBT(clone).initialize(name, symbol);
        return clone;
    }
} 