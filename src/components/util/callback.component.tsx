import React from 'react'

import store from './../../store';
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
        Auth.handleCallback(store)
    }
    
    render() {
        console.log("Render", this.props.children)
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