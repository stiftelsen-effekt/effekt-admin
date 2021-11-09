import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStep, AppState } from '../../models/state';
import {
  loginBegin,
  loginCacheCheck,
  loginFailure,
} from '../../store/authentication/loginout.actions';
import { Redirect } from 'react-router';
import { LoginWrapper, LoginButton, LoginHeader, LoginError } from './login.component.style';

export const LoginComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const authStep: AuthStep = useSelector((state: AppState) => state.auth.authStep);
  const loginError: String | undefined = useSelector((state: AppState) => state.auth.loginError);

  if (authStep === AuthStep.LOGGED_IN) {
    return <Redirect to="/" />;
  } else if (authStep === AuthStep.SHOW_CONNECTION_FAILED) {
    return (
      <div>
        <div>
          Noe gikk galt når vi forsøkte å hente din aksess-token. Er du koblet til internet? Du kan{' '}
          <button onClick={() => dispatch(loginCacheCheck())}>prøve igjen.</button>
        </div>
        <div>
          Du kan også forsøke å{' '}
          <button onClick={() => dispatch(loginFailure('Henting av token feilet'))}></button>logge
          inn på nytt
        </div>
      </div>
    );
  } else if (authStep === AuthStep.SHOW_LOGIN_SCREEN) {
    let loginErrorElement =
      loginError != null ? <LoginError>{loginError}</LoginError> : <div></div>;

    return (
      <LoginWrapper>
        <div>
          <LoginHeader>GiEffektivt administrasjon</LoginHeader>
          {loginErrorElement}
          <LoginButton onClick={() => dispatch(loginBegin())}>Autoriser</LoginButton>
        </div>
      </LoginWrapper>
    );
  } else if (authStep === AuthStep.INITIAL) {
    return <Redirect to="/"></Redirect>;
  } else {
    console.log('No auth step provided');
    return <div>No auth step provided</div>;
  }
};
