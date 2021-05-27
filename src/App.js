import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Web3 from 'web3';
import ContractInterface from './contractInterfaces/RaceCoin.json';

import Navigation from './components/navigation';
import Login from './components/login';
import Events from './components/events';

const web3 = new Web3(Web3.givenProvider);

let contract = null;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState([]);
  const authenticate = async (contractAddress) => {
    console.log('Attempting ot auth...', ContractInterface, contractAddress);
    contract = new web3.eth.Contract(ContractInterface.abi, contractAddress);
    setIsAuthenticated(true);
    const results = await contract.methods.currentRaces().call();
    setEvents(
      results.map((result) => ({
        name: result[0],
        max: result[1],
      }),)
    );
  };
  return (
    <ThemeProvider theme={createMuiTheme({ palette: { type: 'dark' }})}>
      <Box height="90vh">
          <Login isAuthenticated={isAuthenticated} authenticate={authenticate}>
            <Navigation title="Events" />
            <Events contract={contract} events={events} />
          </Login>
      </Box>
    </ThemeProvider>
  );
};

export default App;
