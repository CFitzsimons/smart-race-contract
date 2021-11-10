import React from 'react';
import { Provider } from 'react-redux'
import './App.css';

import Sidebar from './components/sidebar/sidebar';
import TopBar from './components/topbar/topbar';

import store from './actions/store';


const App = () => (
  <Provider store={store}>
    <TopBar />
    <Sidebar />
  </Provider>
);

export default App;
