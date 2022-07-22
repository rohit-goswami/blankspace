// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SubmissionContract {

    enum Result {PENDING,PASSED,FAILED}
    
    struct Submission {
        string cidSubmission;
        address account;
        address test;
        uint256 date;
        Result result;
    }

    Submission[] listOfAllSubmisions;
    mapping(address => Submission[]) listOfAllSubmissionsOfATest;

    address owner;   

    event NewSubmission(address indexed from, address indexed test, uint256 indexed date);

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not the owner of this smart contract");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function newSubmission(string calldata _cidSubmission, address _test) public onlyOwner {
        Submission memory submission = Submission(
            _cidSubmission,
            tx.origin,
            _test,
            block.timestamp,
            Result.PENDING
        );
        listOfAllSubmisions.push(submission);
        listOfAllSubmissionsOfATest[_test].push(submission);
        emit NewSubmission(tx.origin,_test,block.timestamp);
    }

    function getAllSubmissions() public view returns(Submission[] memory){
        return listOfAllSubmisions;
    }

    function getAllSubmissionsOfATest(address _test) public view returns(Submission[] memory){
        return listOfAllSubmissionsOfATest[_test];
    }
}