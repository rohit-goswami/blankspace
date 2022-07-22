// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TestContract {

    struct Test {
        string cidImage;
        string cidTest;
        address ownerTest;
        address test;
        uint256 date;
    }

    Test[] listOfAllTests;
    mapping(address => Test[]) listOfAllTestsOfACompany;

    address owner;    

    event NewTest(address indexed from, address indexed test, uint256 indexed date);

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not the owner of this smart contract");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function newTest(string calldata _cidImage, string calldata _cidTest, address _test) public onlyOwner {
        Test memory test = Test(
            _cidImage,
            _cidTest,
            tx.origin,
            _test,
            block.timestamp
        );
        listOfAllTests.push(test);
        listOfAllTestsOfACompany[tx.origin].push(test);
        emit NewTest(tx.origin,_test,block.timestamp);
    }
    
    function getAllTests() public view returns(Test[] memory) {
        return listOfAllTests;
    }
    function getAllTestsOfACompany(address _company) public view returns(Test[] memory) {
        return listOfAllTestsOfACompany[_company];
    }

}