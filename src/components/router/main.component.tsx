import React from 'react'

import LoginComponent from './../app/login/login.component'
import CallbackComponent from './../util/callback.component';

import { PrivateRoute } from './private.component';
import { Router, Route } from 'react-router';

import { AppState, AuthStep } from './../../models/state';
import { connect } from 'react-redux';

import { createBrowserHistory } from 'history';
import { AdminPanel } from '../app/admin.component';
import { Switch } from 'react-router';
const history = createBrowserHistory();

class MainRouter extends React.Component<IStateProps> {
    render() {
        return (
        <Router history={history}>
            <Switch>
                {/* Login handling */}
                <Route exact path="/callback" render={(routeProps) => <CallbackComponent {...routeProps} authStep={this.props.authStep}/>}/>
                <Route exact path="/login" component={LoginComponent}></Route>

                <PrivateRoute path="/" component={AdminPanel} authStep={this.props.authStep}/>
            </Switch>
        </Router>)
    }
}

interface IStateProps {
    authStep: AuthStep
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        authStep: state.auth.authStep
    }
}

export default connect(mapStateToProps)(MainRouter)