import React from 'react';
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Sidebar from './components/sidebar';
import TopBar from './components/topbar';
import PublicDashboard from './components/publicRaces/dashboard';

import store from './actions/store';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <TopBar />
      <Sidebar />
      <Offset />
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicDashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

export default App;
