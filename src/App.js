import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Web3 from 'web3';
import ContractInterface from './contractInterfaces/RaceCoin.json';
import momentUtils from '@date-io/moment';

import Navigation from './components/navigation';
import Login from './components/login';
import Events from './components/events';

const web3 = new Web3(Web3.givenProvider);

let contract = null;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState([]);
  const refresh = async () => {
    const results = await contract.methods.currentRaces().call();
    setEvents(
      results.map((result) => ({
        name: result[0],
        max: parseInt(result[1], 10),
        start: parseInt(result[2], 10),
      }),)
    );
  }
  const authenticate = async (contractAddress) => {
    contract = new web3.eth.Contract(ContractInterface.abi, contractAddress);
    await refresh();
    setIsAuthenticated(true);
  };
  return (
    <MuiPickersUtilsProvider utils={momentUtils}>
      <ThemeProvider theme={createMuiTheme({ palette: { type: 'dark' }})}>
        <Box height="90vh">
            <Login isAuthenticated={isAuthenticated} authenticate={authenticate}>
              <Navigation title="Events" />
              <Events refreshEvents={refresh} contract={contract} events={events} />
            </Login>
        </Box>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default App;
