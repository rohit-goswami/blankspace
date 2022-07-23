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

    uint testCounter;
    Test[] public tests; // Test array
    mapping(string => uint) public indexByTests; // uid Test -> index Test in tests
    mapping(address => string[]) public testsByOwners; // Owner -> Array uid Test

    address owner;    

    event NewTest(address indexed from, address indexed test, string indexed uid);

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not the owner of this smart contract");
        _;
    }

    constructor() {
        owner = msg.sender;
        testCounter = 0;
    }

    function newTest(string calldata _cidImage, string calldata _cidTest, address _test, string calldata _uid) public onlyOwner {
        
        // Create Test
        Test memory test = Test(
            _cidImage,
            _cidTest,
            tx.origin,
            _test,
            block.timestamp
        );

        // Push the uid to the owner
        testsByOwners[tx.origin].push(_uid);

        // Set the index of the test
        indexByTests[_uid] = testCounter;

        // Push the test to the list
        tests.push(test);

        // Increment the counter
        testCounter += 1;

        emit NewTest(tx.origin, _test, _uid);
    }

    function getTestById(string calldata _uid) public view returns(Test memory) {
        return tests[indexByTests[_uid]];
    }

    function getAllTests() public view returns(Test[] memory) {
        return tests;
    }

    function getAllTestsByOwner(address _owner) public view returns(Test[] memory) {
        Test[] memory testsByOwner = new Test[](testsByOwners[_owner].length);

        // Loop all the tests of the owner
        for (uint i = 0; i < testsByOwners[_owner].length; i++) {
            string memory uid = testsByOwners[_owner][i];
            uint index = indexByTests[uid];
            testsByOwner[i] = tests[index];
        }

        return testsByOwner;
    }
}