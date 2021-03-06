

const hre = require("hardhat");

async function main() {

	// Interface
	const Interface = await ethers.getContractFactory("Interface");
	const interface = await Interface.deploy();
	await interface.deployed();

	console.log("Contract interface deployed at :", interface.address);

	// // Tests
	// const Test = await ethers.getContractFactory("TestContract");
	// const test = await Test.deploy();
	// await test.deployed();

	// console.log("Contract test deployed at :", test.address);

	
	// // SBT
	// const SBT = await ethers.getContractFactory("SBT");
	// const sbt = await SBT.deploy();
	// await sbt.deployed();

	// console.log("Contract SBT deployed at :", sbt.address);

	
	// // SBT
	// const SBTPoM = await ethers.getContractFactory("SBTPoM");
	// const sbtPoM = await SBTPoM.deploy();
	// await sbtPoM.deployed();

	// console.log("Contract SBTPoM deployed at :", sbtPoM.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});