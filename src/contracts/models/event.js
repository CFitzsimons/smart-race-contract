import smartContract from './contract';

const {
  getContract,
} = smartContract;

const createEvent = async (event) => {
  const contract = getContract();
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  try {
    const gas = await contract.methods.createRace(
      event.title,
      event.maxParticipants,
      event.start,
    ).estimateGas();
    await contract.methods.createRace(
      event.title,
      event.maxParticipants,
      event.start,
    ).send({
      from: account,
      gas,
    });
  } catch (err) {
    // TODO: Handle failed events
    // https://github.com/CFitzsimons/smart-race-contract/issues/1
  }
};

const getEvents = async () => {
  const contract = await getContract();
  const results = contract.methods.currentRaces().call();
  return results;
};

const getUserEvents = async () => {
  const contract = getContract();
  const userEvents = await contract.methods.getUserEvents().call();
  return userEvents;
};

const signup = async (raceName) => {
  const contract = getContract();
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  // TODO: Handle failed events
  // https://github.com/CFitzsimons/smart-race-contract/issues/1
  const gas = await contract.methods.signup(raceName).estimateGas();
  await contract.methods.signup(raceName).send({
    from: account,
    gas,
  });
};

export default {
  createEvent,
  getUserEvents,
  signup,
  getEvents,
};
