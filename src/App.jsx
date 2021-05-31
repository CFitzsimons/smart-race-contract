import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import momentUtils from '@date-io/moment';

import Navigation from './components/navigation';
import Login from './components/login';
import Events from './components/events';

import connect from './contracts/models/connect';
import event from './contracts/models/event';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [events, setEvents] = useState([]);
  const refresh = async () => {
    const results = await event.getEvents();
    setEvents(
      results.map((result) => ({
        name: result[0],
        max: parseInt(result[1], 10),
        start: parseInt(result[2], 10),
      })),
    );
  };
  const authenticate = async (contractAddress) => {
    const contract = await connect(contractAddress);
    if (!contract) {
      // TODO: Present an error
      // https://github.com/CFitzsimons/smart-race-contract/issues/1
      return;
    }
    await refresh();
    setIsAuthenticated(true);
  };

  useEffect(() => {
    (async () => {
      if (process && process.env && process.env.REACT_APP_CONTRACT_ADDRESS) {
        // Attempt to read the contract address from the .env, if we fail,
        // ask for the address from the user
        const contract = await connect(process.env.REACT_APP_CONTRACT_ADDRESS);
        if (contract) {
          await refresh();
          setIsAuthenticated(true);
        }
      }
    })();
  }, []);
  return (
    <MuiPickersUtilsProvider utils={momentUtils}>
      <ThemeProvider theme={createMuiTheme({ palette: { type: 'dark' } })}>
        <Box height="90vh">
          {
            isAuthenticated !== null ? (
              <Login isAuthenticated={isAuthenticated} authenticate={authenticate}>
                <Navigation title="Events" />
                <Events refreshEvents={refresh} events={events} />
              </Login>
            ) : null
          }
        </Box>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default App;
