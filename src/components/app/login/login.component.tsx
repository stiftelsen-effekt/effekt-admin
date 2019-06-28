import React from 'react';
import { Component, ReactNode } from 'react'
import { connect } from 'react-redux';
import { AppState } from '../../../models/state';
import { loginBegin } from '../../../authenticate/login.actions';
import { Redirect } from 'react-router';
import { Auth } from '../../../authenticate/auth';

class LoginComponent extends Component<IStateProps & IDispatchProps, any> {
    constructor(props: IStateProps & IDispatchProps) {
        super(props)

        Auth.tryCachedKey()
    }

    loginClick = () => {
        this.props.loginBegin()
    }

    render(): ReactNode {
        if (this.props.authorized) {
            return (
                <Redirect to="/" />
            )
        } else {
            return(
                <button onClick={this.loginClick}>Login</button>)
        }
        
    }
}

//TODO: Remove accessKey
interface IStateProps {
    authorized: boolean,
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        authorized: state.authorized
    }
}

interface IDispatchProps {
    loginBegin: Function,
}
const mapDispatchToProps: IDispatchProps = {
    loginBegin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)