import React from "react";
import { Navigate } from "react-router-dom";
import { LoginWrapper, LoginButton, LoginHeader } from "./login.component.style";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginComponent: React.FunctionComponent = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, error, user } = useAuth0();

  if (!isAuthenticated && !isLoading && !error) {
    return (
      <LoginWrapper>
        <div>
          <LoginHeader>Administrasjon</LoginHeader>
          <LoginButton onClick={() => loginWithRedirect()}>Autoriser</LoginButton>
        </div>
      </LoginWrapper>
    );
  } else if (error) {
    return (
      <div>
        <div>
          Noe gikk galt når vi forsøkte å hente din aksess-token. Er du koblet til internet?
        </div>
        <div>
          Du kan også forsøke å <button onClick={() => loginWithRedirect()}></button>logge inn på
          nytt
        </div>
      </div>
    );
  } else if (user) {
    return <Navigate to="/" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};
