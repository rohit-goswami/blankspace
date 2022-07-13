const hre = require("hardhat");

async function main() {

  const Sbt = await hre.ethers.getContractFactory("SBT");
  const sbt = await Sbt.deploy();

  await sbt.deployed();



  console.log("contract deployed at :", sbt.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});