import React from 'react';

import store from './store';
import { Provider } from 'react-redux';

import MainRouter from './components/router/Main';

//TODO: Move styling somewhere else?
import 'react-datepicker/dist/react-datepicker.css';
import './components/style/elements/datepicker/datepicker-effekt.css';
import 'react-toastify/dist/ReactToastify.css';
import './components/style/elements/react-table/base.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainRouter></MainRouter>
    </Provider>
  );
};

export default App;
