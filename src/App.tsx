import React from 'react';
import './App.css';

import store from './store';
import { Provider } from 'react-redux';

import MainRouter from './components/router/main.component'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainRouter></MainRouter>
    </Provider>
  );
}

export default App;
