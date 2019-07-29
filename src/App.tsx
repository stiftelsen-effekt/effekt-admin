import React from 'react';

import store from './store';
import { Provider } from 'react-redux';

import MainRouter from './components/router/main.component'

//TODO: Move styling somewhere else?
import "react-datepicker/dist/react-datepicker.css";
import "./components/app/style/elements/datepicker/datepicker-effekt.css";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainRouter></MainRouter>
    </Provider>
  );
}

export default App;
