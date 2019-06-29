import React from 'react'

import { Auth } from './../../authenticate/auth';
import { Redirect, RouteProps } from 'react-router';

interface ICallbackProps extends RouteProps {
    authorized: boolean
}

class CallbackComponent extends React.Component<ICallbackProps> {
    constructor(props: ICallbackProps) {
        super(props)
        //Perhaps not right place to keep?
        //Leave component presentational and dumb
        Auth.handleCallback()
    }
    
    render() {
        if (this.props.authorized) {
            return (
                <Redirect to="/" />
            )
        }
        else {
            return (
                <div><h4>Loading</h4></div>
            )
        }
    }
}

export default CallbackComponent