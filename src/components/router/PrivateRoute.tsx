import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router';

interface IPrivateRouteProps {
  component: React.FC;
}

export const PrivateRoute: React.FC<IPrivateRouteProps & RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading && !isAuthenticated)
    return <Route {...rest} render={(props) => <span>Loading...</span>} />;

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else
    return (
      <Route
        {...rest}
        render={(props) => (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )}
      />
    );
};
