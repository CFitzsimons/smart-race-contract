import smartContract from './contract';

const {
  getContract,
  getAccount,
} = smartContract;

const createEvent = async (event) => {
  const contract = getContract();
  const account = await getAccount();
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

// const getEventsCreatedByMe = async () => {
//   const contract = await getContract();
//   console.log(contract.methods);
//   const results = await contract.methods.racesRunByMe().call();
//   return results;
// };

const getEvents = async () => {
  const contract = await getContract();
  const account = await getAccount();
  const results = await contract.methods.currentRaces().call();
  const transformedResults = results.map((result) => ({
    isCreator: result[0].toLowerCase() === account.toLowerCase(),
    creator: result[0],
    name: result[1],
    max: parseInt(result[2], 10),
    start: parseInt(result[3], 10),
  }));
  return transformedResults;
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
