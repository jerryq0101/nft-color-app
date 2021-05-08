require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777" // Match any network id
    },

    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: 4,
      gas: 10000000
    },

    kovan: {
      host: "localhost",
      port: 5777,
      network_id: 3,
      gas: 12000000
    }

  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.7.0",
      optimizer: {
        enabled: true,
        runs: 200,

      }
    }
  }
}
