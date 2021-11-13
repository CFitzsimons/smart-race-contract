import React from 'react';
import { Provider } from 'react-redux'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
// import ThemeProvider from '@mui/material/'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import './App.css';

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

const MainView = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));


const App = () => (
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <TopBar />
      <Sidebar />
      <Offset />
      <MainView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicDashboard />} />
          </Routes>
        </BrowserRouter>
      </MainView>
    </Provider>
  </ThemeProvider>

);

export default App;
