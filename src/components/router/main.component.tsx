import React from 'react'

import LoginComponent from './../app/login/login.component'
import HomeComponent from './../app/home/home.component'
import CallbackComponent from './../util/callback.component';

import { PrivateRoute } from './private.component';
import { Router, Route } from 'react-router';

import { AppState } from './../../models/state';
import { connect } from 'react-redux';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class MainRouter extends React.Component<IStateProps> {
    render() {
        return (
        <Router history={history}>
            <PrivateRoute exact path="/" component={HomeComponent} authorized={this.props.authorized}/>

            {/* Login handling */}
            <Route path="/callback" render={(routeProps) => <CallbackComponent {...routeProps} authorized={this.props.authorized}/>}/>
            <Route path="/login" component={LoginComponent}></Route>
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