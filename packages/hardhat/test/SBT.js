const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("🚩 SBT test 🤓", function () {
  let sbt;
  let owner;
  let account1;
  let TX;
  describe("SBT", function () {
    it("Should deploy the SBT", async function () {
      const SBT = await ethers.getContractFactory("SBT");
      [owner, account1] = await ethers.getSigners();
      sbt = await SBT.deploy();
      await sbt.deployed();
    });
  });
  describe("Call initialize", function () {
    describe("initialize()", function () {
      it("Should call the initialize function", async function () {
        TX = await sbt.initialize("Solidity Basics", "SBT");
        expect(TX).not.to.be.reverted;
      });
      it("Should set the token's name", async function () {
        expect(await sbt.name()).to.be.equal("Solidity Basics");
      });
      it("Should set the token's symbol", async function () {
        expect(await sbt.symbol()).to.be.equal("SBT");
      });
      it("Should revert, this function can only be called one time", async function () {
        await expect(sbt.initialize("Solidity Advanceds", "SAT")).to.be
          .reverted;
      });
    });
  });
  describe("Mint a new SBT Token", function () {
    describe("mint()", function () {
      it("Should revert if called from an account who is not the owner", async function () {
        await expect(
          sbt.connect(account1).mint(account1.address, "ipfs")
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
      it("Should mint the SBT Token", async function () {
        await expect(sbt.mint(account1.address, "ipfs")).not.to.be.reverted;
      });
      it(`The address1 should  has the SBT Token`, async function () {
        expect(await sbt.ownerOf(0)).to.be.equal(account1.address);
      });
    });
    describe("Transfer a SBT Token", function () {
      describe("transferFrom()", function () {
        it("Should revert because is a soulbound token", async function () {
          await expect(
            sbt
              .connect(account1)
              .transferFrom(account1.address, owner.address, 0)
          ).to.be.revertedWith("you can't transfer this SBT token");
        });
      });
    });
    describe("Events", function () {
      describe("Attest()", function () {
        it("Should emit an event on mint", async function () {
          await expect(sbt.mint(account1.address, "ipfs"))
            .to.emit(sbt, "Attest")
            .withArgs(account1.address, 1);
        });
      });
      describe("Revoke()", function () {
        it("Should emit an event on revoke", async function () {
          await expect(sbt.revoke(1))
            .to.emit(sbt, "Revoke")
            .withArgs("0x0000000000000000000000000000000000000000", 1);
        });
      });
    });
  });
});
