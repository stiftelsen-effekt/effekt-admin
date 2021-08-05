import React from 'react'

import { Redirect, RouteProps } from 'react-router';
import { AuthStep } from '../../models/state';
import { loginCallback } from '../../store/authentication/loginout.actions';
import { connect } from 'react-redux';

interface ICallbackProps extends RouteProps {
    authStep: AuthStep
}

class CallbackComponent extends React.Component<ICallbackProps & IDispatchProps> {
    constructor(props: ICallbackProps & IDispatchProps) {
        super(props)
        
        this.props.loginCallback()
    }
    
    render() {
        if (this.props.authStep === AuthStep.LOGGED_IN) {
            return (
                <Redirect to="/" />
            )
        }
        else if (this.props.authStep === AuthStep.SHOW_LOGIN_SCREEN) {
            return (
                <Redirect to="/login" ></Redirect>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

interface IDispatchProps {
    loginCallback: Function
}
const mapDispatchToProps: IDispatchProps = {
    loginCallback
}

export default connect(null, mapDispatchToProps)(CallbackComponent)