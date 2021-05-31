import Web3 from 'web3';

import contract from './contract';
import RaceCoin from '../interfaces/RaceCoin.json';

const connect = async (contractAddress) => {
  const web3 = new Web3(Web3.givenProvider);
  let smartContract = null;
  try {
    smartContract = new web3.eth.Contract(RaceCoin.abi, contractAddress);
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.log(err);
  }
  contract.setContract(smartContract);
  return smartContract;
};

export default connect;
