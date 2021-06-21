// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract RaceCoin {

  struct Race {
    address creator;
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
  mapping(address => string[]) myEvents; // Events signed up to
  Race[] events;

  function createRace(string memory raceName, int maxParticipants, uint startingTime) public {
    require(eventNames[raceName] == false, 'A race with this name already exists');

    eventNames[raceName] = true;
    events.push(Race({
      creator: msg.sender,
      name: raceName,
      maxParticipants: maxParticipants,
      startingTime: startingTime
    }));
  }

  function racesRunByMe() public view returns (Race[] memory) {
    Race[] memory racesCreatedByMe;
    for (uint i = 0; i < events.length; i++) {
      if (events[i].creator == msg.sender) {
        racesCreatedByMe[i] = events[i];
      }
    }
    return racesCreatedByMe;
  }

  function currentRaces() public view returns (Race[] memory) {
    return events;
  }

  function signup(string memory raceName) public {
    require(eventNames[raceName] == true, 'You can only sign up to an existing race');
    results[raceName].push(Result({
      time: 0,
      participant: msg.sender
    }));
    myEvents[msg.sender].push(raceName);
  }

  function getUserEvents() public view returns (string[] memory) {
    return myEvents[msg.sender];
  }
}