import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { AuthStep, AppState } from '../../store/state';
import {
  loginBegin,
  loginCacheCheck,
  loginFailure,
} from '../../store/auth/loginout.actions';
import {
  LoginWrapper,
  LoginButton,
  LoginHeader,
  LoginError,
} from './login.component.style';

export const LoginComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const authStep: AuthStep = useSelector(
    (state: AppState) => state.auth.authStep,
  );
  const loginError: string | undefined = useSelector(
    (state: AppState) => state.auth.loginError,
  );

  if (authStep === AuthStep.LOGGED_IN) {
    return <Redirect to="/" />;
  }
  if (authStep === AuthStep.SHOW_CONNECTION_FAILED) {
    return (
      <div>
        <div>
          Noe gikk galt når vi forsøkte å hente din aksess-token. Er du koblet
          til internet? Du kan
          <button type="button" onClick={() => dispatch(loginCacheCheck())}>
            prøve igjen.
          </button>
        </div>
        <div>
          Du kan også forsøke å
          <button
            type="button"
            onClick={() => dispatch(loginFailure('Henting av token feilet'))}
          >
            logge inn på nytt
          </button>
        </div>
      </div>
    );
  }
  if (authStep === AuthStep.SHOW_LOGIN_SCREEN) {
    const loginErrorElement =
      loginError != null ? <LoginError>{loginError}</LoginError> : <div />;

    return (
      <LoginWrapper>
        <div>
          <LoginHeader>GiEffektivt administrasjon</LoginHeader>
          {loginErrorElement}
          <LoginButton onClick={() => dispatch(loginBegin())}>
            Autoriser
          </LoginButton>
        </div>
      </LoginWrapper>
    );
  }
  if (authStep === AuthStep.INITIAL) {
    return <Redirect to="/" />;
  }

  return <div>No auth step provided</div>;
};
