import React from 'react';
import { Component, ReactNode } from 'react'
import { connect } from 'react-redux';
import { AppState, AuthStep } from '../../../models/state';
import { loginBegin, loginCacheCheck } from '../../../authenticate/loginout.actions';
import { Redirect } from 'react-router';
import { LoginWrapper, LoginButton, LoginHeader } from './login.component.style';

class LoginComponent extends Component<IStateProps & IDispatchProps, any> {
    constructor(props: IStateProps & IDispatchProps) {
        super(props)

        this.props.loginCacheCheck()
    }

    loginClick = () => {
        this.props.loginBegin()
    }

    render(): ReactNode {
        if (this.props.authStep === AuthStep.LOGGED_IN) {
            return (
                <Redirect to="/" />
            )
        } else if (this.props.authStep === AuthStep.SHOW_LOGIN_SCREEN) {
            return(
                <LoginWrapper>
                    <div>
                        <LoginHeader>GiEffektivt administrasjon</LoginHeader>
                        <LoginButton onClick={this.loginClick}>Autoriser</LoginButton>
                    </div>
                </LoginWrapper>)
        }
        else {
            return(<div></div>)
        }
        
    }
}

//TODO: Remove accessKey
interface IStateProps {
    authStep: AuthStep,
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        authStep: state.auth.authStep
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