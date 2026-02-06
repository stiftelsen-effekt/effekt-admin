import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { EffektLoadingSpinner } from "../style/elements/loading-spinner";

export const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return (
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
    );
  }

  if (isAuthenticated && user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};
