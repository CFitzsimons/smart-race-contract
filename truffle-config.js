const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require("fs");
module.exports = {
  contracts_build_directory: './src/contractInterfaces',
  networks: {
    dev: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
