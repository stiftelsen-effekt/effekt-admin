import React from 'react'

import { LoginComponent } from '../login/login.component'
import CallbackComponent from './callback.component';

import { PrivateRoute } from './private.component';
import { Route } from 'react-router';

import { AppState, AuthStep } from './../../models/state';
import { connect } from 'react-redux';

import { AdminPanel } from '../admin.component';
import { Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { loginCacheCheck } from '../../authenticate/loginout.actions'

class MainRouter extends React.Component<IStateProps & IDispatchProps> {
    render() {
        return (
        <HashRouter>
            <Switch>
                {/* Login handling */}
                <Route exact path="/callback" render={(routeProps) => <CallbackComponent {...routeProps} authStep={this.props.authStep}/>}/>
                <Route exact path="/login" component={LoginComponent}></Route>

                <PrivateRoute path="/" component={AdminPanel} authStep={this.props.authStep} loginCacheCheck={this.props.loginCacheCheck}/>
            </Switch>
        </HashRouter>)
    }
}

interface IDispatchProps {
    loginCacheCheck: Function
}
const mapDispatchToProps: IDispatchProps = {
    loginCacheCheck
}

interface IStateProps {
    authStep: AuthStep
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        authStep: state.auth.authStep
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainRouter)