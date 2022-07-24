// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SubmissionContract {

    enum Result {PENDING,PASSED,FAILED}
    
    struct Submission {
        string cidSubmission;
        address account;
        address sbt;
        uint256 date;
        Result result;
    }

    uint submissionCounter;
    Submission[] public submissions; // Submission array
    mapping(string => uint) public indexBySubmissions; // uid Submission -> index Submission in submissions
    mapping(string => string[]) public submissionsByTests; // uid Test -> Array uid Submission


    address owner;   

    event NewSubmission(address indexed from, string indexed submissionId, address indexed sbt);
    event CorrectedSubmission(address indexed reviser, string indexed uid);

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not the owner of this smart contract");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function newSubmission(string calldata _submissionId, string calldata _testId, string calldata _cidSubmission, address _sbt) public onlyOwner {

        // Create the Submission
        Submission memory submission = Submission(
            _cidSubmission,
            tx.origin,
            _sbt,
            block.timestamp,
            Result.PENDING
        );

        // Push the uid to the Test
        submissionsByTests[_testId].push(_submissionId);

        // Set the index of the test
        indexBySubmissions[_submissionId] = submissionCounter;

        // Push the Submission to the list
        submissions.push(submission);

        // Increment the counter
        submissionCounter += 1;

        emit NewSubmission(tx.origin, _submissionId, _sbt);
    }

    function getSubmissionById(string calldata _uid) public view returns (Submission memory){
        return submissions[indexBySubmissions[_uid]];
    }

    function getAllSubmissionsByTest(string calldata _testId) public view returns(Submission[] memory){
       Submission[] memory submissionsByTest = new Submission[](submissionsByTests[_testId].length);

        // Loop all the submissions of the test
        for (uint i = 0; i < submissionsByTests[_testId].length; i++) {
            string memory uid = submissionsByTests[_testId][i];
            uint index = indexBySubmissions[uid];
            submissionsByTest[i] = submissions[index];
        }

        return submissionsByTest;
    }

    function setSubmissionPassed(string calldata _uid) public onlyOwner {
        require(submissions[indexBySubmissions[_uid]].result == Result.PENDING, "This submission has already been corrected");
        submissions[indexBySubmissions[_uid]].result = Result.PASSED;
        emit CorrectedSubmission(tx.origin,_uid);
    }

    function setSubmissionFailed(string calldata _uid) public onlyOwner {
        require(submissions[indexBySubmissions[_uid]].result == Result.PENDING, "This submission has already been corrected");
        submissions[indexBySubmissions[_uid]].result = Result.FAILED;
        emit CorrectedSubmission(tx.origin,_uid);
    }
}