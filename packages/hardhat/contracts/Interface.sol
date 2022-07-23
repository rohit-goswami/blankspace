// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./SBTFactory.sol";
import "./SBT.sol";
import "./TestContract.sol";
import "./SubmissionContract.sol";

contract Interface {

    address immutable owner;
    address immutable sbtFactory;
    address immutable test;
    address immutable submission;

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not the owner of this SC");
        _;
    }

    constructor() {
        owner = msg.sender;
        sbtFactory = address(new SBTFactory());
        test = address(new TestContract());
        submission = address(new SubmissionContract());
    }

    /**
     * SBTFactory Functions
    */
    function addNewAccount(address _account) external onlyOwner {
        SBTFactory(sbtFactory).addNewAccount(_account);
    }

    function createSBTAllowed(address _account) public view returns(bool){
        return SBTFactory(sbtFactory).allowedAddresses(_account);
    }

    function removeAccount(address _account) external onlyOwner {
        SBTFactory(sbtFactory).removeAccount(_account);
    }

    function createSBT(string calldata _name, string calldata _symbol, string calldata _cidImage, string calldata _cidTest, string calldata _uid) external  returns (address) {
        address newTestAddress = SBTFactory(sbtFactory).createSBT(_name,_symbol);
        newTest(_cidImage,_cidTest,newTestAddress,_uid);
        return newTestAddress;
    }

    /**
     * SBT Functions
    */
    function mint(address _contract, address _to, string calldata _cid) external {
        SBTFactory(sbtFactory).mint(_contract,_to,_cid);
    }

    function revoke(address _contract, uint256 _tokenId) external {
         SBTFactory(sbtFactory).revoke(_contract,_tokenId);
    }

    /**
     * TestContract Functions
    */
    function newTest(string calldata _cidImage, string calldata _cidTest, address _test, string calldata _uid) internal {
        TestContract(test).newTest(_cidImage,_cidTest,_test,_uid);
    }

    function getTestById(string calldata _uid) public view returns(TestContract.Test memory) {
        return TestContract(test).getTestById(_uid);
    }

    function getAllTests() public view returns(TestContract.Test[] memory) {
        return TestContract(test).getAllTests();
    }

    function getAllTestsByOwner(address _owner) public view returns(TestContract.Test[] memory) {
        return TestContract(test).getAllTestsByOwner(_owner);
    }

    /**
     * SumbissionContract Functions
    */
    function newSubmission(string calldata _submissionId, string calldata _testId, string calldata _cidSubmission, address _sbt) public {
        SubmissionContract(submission).newSubmission(_submissionId, _testId, _cidSubmission, _sbt);
    }

    function getSubmissionById(string calldata _uid) public view returns(SubmissionContract.Submission memory){
        return SubmissionContract(submission).getSubmissionById(_uid);
    }

    function getAllSubmissionsByTest(string calldata _uid) public view returns(SubmissionContract.Submission[] memory) {
        return SubmissionContract(submission).getAllSubmissionsByTest(_uid);
    }

    function setSubmissionPassed(string calldata _uid) public  {
        require(SBTFactory(sbtFactory).ownerOfSBT(getSubmissionById(_uid).sbt) == msg.sender,"You cannot correct this submission");
        SubmissionContract(submission).setSubmissionPassed(_uid);
    }

    function setSubmissionFailed(string calldata _uid) public  {
        require(SBTFactory(sbtFactory).ownerOfSBT(getSubmissionById(_uid).sbt) == msg.sender,"You cannot correct this submission");
        SubmissionContract(submission).setSubmissionFailed(_uid);
    }
}