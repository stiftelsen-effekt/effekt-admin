import React, { ComponentType } from 'react'
import { RouteProps, Route, Redirect } from 'react-router';
import { AuthStep } from '../../models/state';

interface IPrivateRouteProps {
    authStep: AuthStep,
    component: ComponentType 
}

export const PrivateRoute: React.FunctionComponent<IPrivateRouteProps & RouteProps> = ({component: Component, authStep, ...rest}) => {
    if (authStep === AuthStep.LOGGED_IN)
        return (<Route {...rest} render={props => <Component {...props} />} />)
    else
        return (<Route {...rest} render={props => <Redirect to={{pathname: '/login', state: {from: props.location}}}/>} />)
}