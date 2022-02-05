//plugin to build smart contract tests using Waffle in Hardhat
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks:{
    ropsten:{
      url: 'https://eth-ropsten.alchemyapi.io/v2/svzS6xIIPxkq0T1holdy1gcFsrNiUYXL',
      accounts: ['c7ee49f17bf50a4e2c0348b3ff7e2cac80af780cd58ea746a4e4c25fc9bc5b09']
    }
  }
};

