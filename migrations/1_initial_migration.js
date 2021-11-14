// eslint-disable-next-line no-undef
const RaceCoin = artifacts.require('RaceCoin');
module.exports = (deployer) => {
  deployer.deploy(RaceCoin);
};
