// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract RaceCoin {

  struct Race {
    string name;
    int maxParticipants;
    uint startingTime;
  }

  struct Result {
    uint time;
    address participant;
  }

  int totalEvents;

  mapping(string => Result[]) results;
  mapping(string => bool) eventNames;
  Race[] events;

  function createRace(string memory raceName, int maxParticipants, uint startingTime) public {
    require(eventNames[raceName] == false, 'A race with this name already exists');

    eventNames[raceName] = true;
    events.push(Race({
      name: raceName,
      maxParticipants: maxParticipants,
      startingTime: startingTime
    }));
  }

  function currentRaces() public view returns (Race[] memory) {
    return events;
  }
}