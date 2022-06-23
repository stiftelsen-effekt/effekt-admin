import React from 'react';

import { LoginComponent } from '../login/login.component';
import { PrivateRoute } from './PrivateRoute';
import { Route } from 'react-router';
import { AdminPanel } from '../AdminPanel';
import { Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';

export const MainRouter: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={LoginComponent}></Route>
        <PrivateRoute path="/" component={AdminPanel} />
      </Switch>
    </HashRouter>
  );
};
