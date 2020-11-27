import React from 'react';

import { Provider } from 'react-redux';
import store from './store/store';

import MainRouter from './components/router/main.component';

// TODO: Move styling somewhere else?
import 'react-datepicker/dist/react-datepicker.css';
import './components/shared/elements/datepicker/datepicker-effekt.css';
import 'react-toastify/dist/ReactToastify.css';
import './components/shared/elements/react-table/base.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
};

export default App;
