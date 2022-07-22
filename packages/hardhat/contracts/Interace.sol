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

    function removeAccount(address _account) external onlyOwner {
        SBTFactory(sbtFactory).removeAccount(_account);
    }

    function createSBT(string calldata _name, string calldata _symbol, string calldata _cidImage, string calldata _cidTest) external  returns (address) {
        address newTestAddress = SBTFactory(sbtFactory).createSBT(_name,_symbol);
        newTest(_cidImage,_cidTest,newTestAddress);
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
    function newTest(string calldata _cidImage, string calldata _cidTest, address _test) internal {
        TestContract(test).newTest(_cidImage,_cidTest,_test);
    }

    function getAllTests() public view returns(TestContract.Test[] memory) {
        return TestContract(test).getAllTests();
    }

    function getAllTestsOfACompany(address _company) public view returns(TestContract.Test[] memory) {
        return TestContract(test).getAllTestsOfACompany(_company);
    }

    // SumbissionContract Functions
    function newSubmission(string calldata _cidSubmission, address _test) public {
        SubmissionContract(submission).newSubmission(_cidSubmission,_test);
    }

    function getAllSubmissions() public view returns(SubmissionContract.Submission[] memory) {
        return SubmissionContract(submission).getAllSubmissions();
    }

    function getAllSubmissionsOfATest(address _test) public view returns(SubmissionContract.Submission[] memory) {
        return SubmissionContract(submission).getAllSubmissionsOfATest(_test);
    }
}