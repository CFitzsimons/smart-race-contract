module.exports = {
  contracts_build_directory: './src/contractInterfaces',
  networks: {
    dev: {
      network_id: '*',
      port: 8545,
      host: '127.0.0.1',
    },
  },
  compilers: {
    solc: {
      version: '^0.8.0',
    },
  },
};
