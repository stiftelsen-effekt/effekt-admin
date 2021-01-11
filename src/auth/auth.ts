import { Action } from 'redux';

import {
  loginSuccess,
  loginCacheFailure,
  loginFailure,
} from '../store/auth/loginout.actions';

import store from '../store/store';
import { AuthUtil } from './auth.util';
import { IAccessKey, ICallbackParameters } from './_types';

export class Auth {
  static login(): any {
    AuthUtil.setAuthState();
    return window.location.assign(AuthUtil.generateLoginUrl());
  }

  static tryCachedKey(): Action {
    const storedAccessKey = AuthUtil.getStoredAccessKey();
    if (storedAccessKey) {
      return store.dispatch(loginSuccess(storedAccessKey));
    }
    return store.dispatch(loginCacheFailure());
  }

  /* Handles the callback route, tries to parse the URL parameters and stores the accessKey */
  static handleCallback(): Action {
    const callbackVariables: ICallbackParameters = AuthUtil.parseCallback();

    if (callbackVariables.state === AuthUtil.authState) {
      const key: IAccessKey = {
        key: callbackVariables.key,
        expires: callbackVariables.expires,
      };
      AuthUtil.storeAccessKey(key);
      return store.dispatch(loginSuccess(key));
    }

    return store.dispatch(
      loginFailure(
        `State mismatch, expected ${AuthUtil.authState} got ${callbackVariables.state}`,
      ),
    );
  }

  static clear() {
    AuthUtil.clearAccessKey();
  }
}
