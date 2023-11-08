import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { EffektLoadingSpinner } from "../style/elements/loading-spinner";

interface IPrivateRouteProps {
  component: React.FC;
}

export const PrivateRoute: React.FC<IPrivateRouteProps & RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading)
    return (
      <Route
        {...rest}
        render={(props) => (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EffektLoadingSpinner></EffektLoadingSpinner>
          </div>
        )}
      />
    );

  if (isAuthenticated && user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else
    return (
      <Route
        {...rest}
        render={(props) => (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )}
      />
    );
};
