import React from 'react';
import './App.css';

import store from './store';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import LoginComponent from './components/app/login/login.component'
import { createBrowserHistory } from 'history';
import HomeComponent from './components/app/home/home.component'
import { PrivateRoute } from './components/router/privateRoute.component';
import { CallbackComponent } from './components/util/callback.component';
import { Auth } from './authenticate/auth';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <PrivateRoute exact path="/" component={HomeComponent} authorized={false}/>

        {/* Login handling */}
        <Route path="/callback" render={(props) => {
          try {
            Auth.handleCallback(store)
            return <CallbackComponent/>
          } catch(ex) {
            return <div>Login failed</div>
          };
        }}></Route>
        <Route path="/login" component={LoginComponent}></Route>
      </Router>
    </Provider>
  );
}

export default App;
