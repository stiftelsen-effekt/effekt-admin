import React from 'react';
import { Component, ReactNode } from 'react'
import { connect } from 'react-redux';
import { AppState } from '../../../models/state';
import { loginBegin } from '../../../authenticate/login.actions';
import { IAccessKey } from '../../../authenticate/auth';

class LoginComponent extends Component<IStateProps & IDispatchProps, any> {
    loginClick = () => {
        this.props.loginBegin()
    }

    render(): ReactNode {
        return(
            <button onClick={this.loginClick}>Login</button>)
    }
}

//TODO: Remove accessKey
interface IStateProps {
    accessKey: IAccessKey | undefined,
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        accessKey: state.accessKey
    }
}

interface IDispatchProps {
    loginBegin: Function,
}
const mapDispatchToProps: IDispatchProps = {
    loginBegin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)