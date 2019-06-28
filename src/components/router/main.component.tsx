import React from 'react'

import LoginComponent from './../app/login/login.component'
import CallbackComponent from './../util/callback.component';

import { PrivateRoute } from './private.component';
import { Router, Route } from 'react-router';

import { AppState } from './../../models/state';
import { connect } from 'react-redux';

import { createBrowserHistory } from 'history';
import { AdminPanel } from '../app/admin.component';
const history = createBrowserHistory();

class MainRouter extends React.Component<IStateProps> {
    render() {
        return (
        <Router history={history}>
            {/* Login handling */}
            <Route exact path="/callback" render={(routeProps) => <CallbackComponent {...routeProps} authorized={this.props.authorized}/>}/>
            <Route exact path="/login" component={LoginComponent}></Route>

            <PrivateRoute path="/" component={AdminPanel} authorized={this.props.authorized}/>
        </Router>)
    }
}

interface IStateProps {
    authorized: boolean
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        authorized: state.authorized
    }
}

export default connect(mapStateToProps)(MainRouter)