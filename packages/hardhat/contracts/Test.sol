// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Test {
    string public cid = "None";

    function setCid(string memory _cid) public {
        cid = _cid;
    }
}