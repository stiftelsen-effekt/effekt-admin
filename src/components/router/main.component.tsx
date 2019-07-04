import React from 'react'

import LoginComponent from './../app/login/login.component'
import CallbackComponent from './../util/callback.component';

import { PrivateRoute } from './private.component';
import { Route } from 'react-router';

import { AppState, AuthStep } from './../../models/state';
import { connect } from 'react-redux';

import { AdminPanel } from '../app/admin.component';
import { Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';

class MainRouter extends React.Component<IStateProps> {
    render() {
        return (
        <HashRouter>
            <Switch>
                {/* Login handling */}
                <Route exact path="/callback" render={(routeProps) => <CallbackComponent {...routeProps} authStep={this.props.authStep}/>}/>
                <Route exact path="/login" component={LoginComponent}></Route>

                <PrivateRoute path="/" component={AdminPanel} authStep={this.props.authStep}/>
            </Switch>
        </HashRouter>)
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