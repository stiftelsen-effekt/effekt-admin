import { Auth, AuthUtil } from '../store/authentication/auth';
import { callback, loginSuccess } from '../store/authentication/loginout.saga';
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  FETCH_ACCESS_KEY_SUCCESS,
} from '../store/authentication/loginout.actions';
import { fetchTokenAction } from '../store/authentication/token.actions';
import 'jest-localstorage-mock';

delete window.location;

window.location = {
  assign: jest.fn().mockImplementation((url: string): string => url),
};

describe('authentification class', () => {
  describe('Should setup login correctly before rederecting', () => {
    let url = Auth.login();

    it('Should change location to a valid OAuth endpoint on login', () => {
      expect(url).toContain('client_id');
      expect(url).toContain('state');
      expect(url).toContain('scope');
      expect(url).toContain('redirect_uri');
      expect(url).toContain('response_type');
    });

    it('Should set localstorage state on login', () => {
      expect(localStorage.getItem(AuthUtil.AUTH_STATE_KEY)).not.toBe(null);
    });
  });

  describe('Should handle callback correctly', () => {
    let state = AuthUtil.setAuthState();
    let wrongReturnState = state + 'xxx';

    const setupCallbackState = (state: string) => {
      let callbackUrl =
        `?key=70771d6c362ba17fea06d051c12ed3771c29c053c798d4b0cc1a7e20bb2cf802` +
        `&expires=Fri%20Aug%2002%202019%2010%3A19%3A53%20GMT%2B0200%20(Central%20European%20Summer%20Time)` +
        `&state=${state}`;

      Object.defineProperty(AuthUtil, 'getCurrentUrlParameters', { value: callbackUrl });
    };

    const runCallbackSaga = () => {
      let gen = callback();
      return gen.next();
    };

    it('Should dispatch error action when state mismatch on callback', () => {
      setupCallbackState(wrongReturnState);

      var action = runCallbackSaga();

      expect(action.value.type).toEqual(LOGIN_FAILURE);
    });

    it('Should handle success correctly', () => {
      setupCallbackState(state);
      Object.defineProperty(AuthUtil, 'authState', { value: state });
      var successAction = runCallbackSaga();
      expect(successAction.value.type).toEqual(LOGIN_SUCCESS);
    });

    it('Should set access key after login and fetch token', () => {
      setupCallbackState(state);
      var successAction = runCallbackSaga();

      let gen = loginSuccess(successAction);
      let setAccessKeyAction = gen.next();
      expect(setAccessKeyAction.value.payload.action.type).toEqual(FETCH_ACCESS_KEY_SUCCESS);
      let action = gen.next();
      expect(action.value.payload.action.type).toEqual(fetchTokenAction.started.type);
    });
  });
});
