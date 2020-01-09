import React from 'react';
import { Component, ReactNode } from 'react'
import { connect } from 'react-redux';
import { AppState, AuthStep } from '../../models/state';
import { loginBegin, loginCacheCheck } from '../../authenticate/loginout.actions';
import { Redirect } from 'react-router';
import { LoginWrapper, LoginButton, LoginHeader, LoginError } from './login.component.style';

class LoginComponent extends Component<IStateProps & IDispatchProps, any> {
    constructor(props: IStateProps & IDispatchProps) {
        super(props)

        this.props.loginCacheCheck()
    }

    cacheCheck = () => {
        this.props.loginCacheCheck();
    }

    loginClick = () => {
        this.props.loginBegin()
    }

    render(): ReactNode {
        if (this.props.authStep === AuthStep.LOGGED_IN) {
            return (
                <Redirect to="/" />
            )
        } 
        else if (this.props.authStep === AuthStep.SHOW_CONNECTION_FAILED) {
            return (
                <div>Noe gikk galt når vi forsøkte å hente din aksess-token. Er du koblet til internet? Du kan <button onClick={this.cacheCheck}>prøve igjen.</button></div>
            )
        }
        else if (this.props.authStep === AuthStep.SHOW_LOGIN_SCREEN) {
            let loginError =
                (this.props.loginError != null ?
                <LoginError>{this.props.loginError}</LoginError> :
                <div></div>);

            return(
                <LoginWrapper>
                    <div>
                        <LoginHeader>GiEffektivt administrasjon</LoginHeader>
                        {loginError}
                        <LoginButton onClick={this.loginClick}>Autoriser</LoginButton>
                    </div>
                </LoginWrapper>)
        }
        else {
            return(<div></div>)
        }
        
    }
}

interface IStateProps {
    authStep: AuthStep,
    loginError?: string
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        authStep: state.auth.authStep,
        loginError: state.auth.loginError
    }
}

interface IDispatchProps {
    loginBegin: Function,
    loginCacheCheck: Function
}
const mapDispatchToProps: IDispatchProps = {
    loginBegin,
    loginCacheCheck
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)