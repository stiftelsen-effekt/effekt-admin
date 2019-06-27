import React, { ComponentType } from 'react'
import { RouteProps, Route, Redirect } from 'react-router';

interface IPrivateRouteProps {
    authorized: boolean,
    component: ComponentType 
}

export const PrivateRoute: React.SFC<IPrivateRouteProps & RouteProps> = ({component: Component, authorized, ...rest}) => {
    return (
        <Route {...rest} render={props => (authorized === true 
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
        }/>
    )
}