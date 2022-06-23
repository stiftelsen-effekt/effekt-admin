import React from 'react';
import { Redirect } from 'react-router';
import { LoginWrapper, LoginButton, LoginHeader, LoginError } from './login.component.style';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginComponent: React.FunctionComponent = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, error, user } = useAuth0();

  if (!isAuthenticated && !isLoading && !error) {
    return (
      <LoginWrapper>
        <div>
          <LoginHeader>GiEffektivt administrasjon</LoginHeader>
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
    return <Redirect to="/" />;
  } else {
    return <Redirect to="/"></Redirect>;
  }
};
