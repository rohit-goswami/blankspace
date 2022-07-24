const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("🚩 SBTFactory test 🤓", function () {
  let sbtFactory;
  let owner;
  let account1;
  let TX;
  describe("SBTFactory", function () {
    it("Should deploy the SBTFactory", async function () {
      const SBTFactory = await ethers.getContractFactory("SBTFactory");
      [owner, account1] = await ethers.getSigners();
      sbtFactory = await SBTFactory.deploy();
      await sbtFactory.deployed();
    });
  });
  describe("Add a new account", function () {
    describe("addNewAccount()", function () {
      it("Should revert with the right error if called from an account that is not the owner", async function () {
        await expect(
          sbtFactory.connect(account1).addNewAccount(account1.address)
        ).to.be.revertedWith("You're not the owner of this SC");
      });
      it("Should add the new account", async function () {
        const TX = await sbtFactory.addNewAccount(account1.address);
        expect(await sbtFactory.allowedAddresses(account1.address)).to.be.equal(
          true
        );
      });
    });
  });
  describe("Create a new SBT", function () {
    describe("createSBT()", function () {
      it("Should revert with the right error if called from an account not allowed", async function () {
        await expect(
          sbtFactory.createSBT("Solidity Basics", "SBT")
        ).to.be.revertedWith("You're not allowed to create a new SBT");
      });
      it("Should clone a SBT contract", async function () {
        TX = await sbtFactory
          .connect(account1)
          .createSBT("Solidity Basics", "SBT");
        expect(TX).not.to.be.reverted;
      });
    });
    describe("Emit an event", function () {
      describe("CreateSBT()", function () {
        it("Should emit an event on createSBT", async function () {
          await expect(
            sbtFactory.connect(account1).createSBT("Solidity Basics", "SBT")
          )
            .to.emit(sbtFactory, "CreateSBT")
            .withArgs(account1.address, anyValue);
        });
      });
    });
  });
});
