let contract = null;

const getContract = () => {
  if (contract === null) {
    // TODO: Error state
    // https://github.com/CFitzsimons/smart-race-contract/issues/1
    return null;
  }
  return contract;
};

const setContract = (newContract) => {
  contract = newContract;
};

export default {
  getContract,
  setContract,
};
