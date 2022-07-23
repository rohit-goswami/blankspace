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

    // SBTFactory functions
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

    // SBT Functions
    function mint(address _contract, address _to, string calldata _cid) external {
        SBTFactory(sbtFactory).mint(_contract,_to,_cid);
    }

    function revoke(address _contract, uint256 _tokenId) external {
         SBTFactory(sbtFactory).revoke(_contract,_tokenId);
    }

    // TestContract Functions
    function newTest(string calldata _cidImage, string calldata _cidTest, address _test, string calldata _uid) internal {
        TestContract(test).newTest(_cidImage,_cidTest,_test,_uid);
    }

    function getTest(string calldata _uid) public view returns(TestContract.Test memory) {
        return TestContract(test).getTest(_uid);
    }

    function getAllTestsOfACompany(address _company) public view returns(string[] memory) {
        return TestContract(test).getAllTestsOfACompany(_company);
    }

    // SumbissionContract Functions
    function newSubmission(string calldata _cidSubmission, address _test, string calldata _uid) public {
        SubmissionContract(submission).newSubmission(_cidSubmission,_test,_uid);
    }

    function setResultSubmission(string calldata _uid, SubmissionContract.Result _result) public  {
        require(SBTFactory(sbtFactory).ownerOfSBT(getSubmission(_uid).test) == msg.sender,"You cannot correct this submission");
        SubmissionContract(submission).setResultSubmission(_uid,_result);

    }

    function getAllSubmissionsOfATest(address _test) public view returns(string[] memory) {
        return SubmissionContract(submission).getAllSubmissionsOfATest(_test);
    }

    function getSubmission(string calldata _uid) public view returns(SubmissionContract.Submission memory){
        return SubmissionContract(submission).getSubmission(_uid);
    }

    function getResultSubmission(string calldata _uid) public view returns(SubmissionContract.Result){
        return SubmissionContract(submission).getResultSubmission(_uid);
    }

}