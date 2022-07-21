// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Test {
    
    struct TestData {
        string ipfsHash;         
        uint256 uploadedOn;   
    }
    
    mapping (address => TestData[]) public ownerToTests;
    function uploadTest(
        string memory _ipfsHash
    ) public {
       uint256 uploadedOn = block.timestamp;
       TestData memory test = TestData(
            _ipfsHash,
            uploadedOn
        );

        ownerToTests[msg.sender].push(test);
    }

    function getTestCount(address _owner) public view returns (uint256){
        require(_owner != address(0));
        return ownerToTests[_owner].length;
    }

    function getTestDetails(address _owner, uint8 _index) public view returns (
        string memory _ipfsHash,
        uint256 _uplaodedOn
    ){
         TestData storage test = ownerToTests[_owner][_index];

        return( 
            test.ipfsHash,
            test.uploadedOn
        );

    
}}