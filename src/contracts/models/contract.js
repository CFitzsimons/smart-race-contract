let contract = null;
let account = null;

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

const setAccount = async () => {
  const accounts = await window.ethereum.enable();
  const selectedAccount = accounts[0];
  account = selectedAccount;
  return account;
};

const getAccount = async () => {
  if (!account) {
    return setAccount();
  }
  return account;
};

export default {
  getContract,
  setContract,
  getAccount,
  setAccount,
};
