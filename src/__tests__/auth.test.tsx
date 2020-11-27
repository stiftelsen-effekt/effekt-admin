import { Auth, AuthUtil } from '../auth';
import { callback, loginSuccess } from '../authenticate/loginout.saga';
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  FETCH_ACCESS_KEY_SUCCESS,
} from '../store/auth/loginout.actions';
import { fetchTokenAction } from '../authenticate/token.actions';
import 'jest-localstorage-mock';

delete window.location;

window.location = {
  assign: jest.fn().mockImplementation((url: string): string => url),
};

describe('authentification class', () => {
  describe('Should setup login correctly before rederecting', () => {
    const url = Auth.login();

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
    const state = AuthUtil.setAuthState();
    const wrongReturnState = `${state}xxx`;

    const setupCallbackState = (state: string) => {
      const callbackUrl =
        `?key=70771d6c362ba17fea06d051c12ed3771c29c053c798d4b0cc1a7e20bb2cf802` +
        `&expires=Fri%20Aug%2002%202019%2010%3A19%3A53%20GMT%2B0200%20(Central%20European%20Summer%20Time)` +
        `&state=${state}`;

      Object.defineProperty(AuthUtil, 'getCurrentUrlParameters', {
        value: callbackUrl,
      });
    };

    const runCallbackSaga = () => {
      const gen = callback();
      return gen.next();
    };

    it('Should dispatch error action when state mismatch on callback', () => {
      setupCallbackState(wrongReturnState);

      const action = runCallbackSaga();

      expect(action.value.type).toEqual(LOGIN_FAILURE);
    });

    it('Should handle success correctly', () => {
      setupCallbackState(state);
      Object.defineProperty(AuthUtil, 'authState', { value: state });
      const successAction = runCallbackSaga();
      expect(successAction.value.type).toEqual(LOGIN_SUCCESS);
    });

    it('Should set access key after login and fetch token', () => {
      setupCallbackState(state);
      const successAction = runCallbackSaga();

      const gen = loginSuccess(successAction);
      const setAccessKeyAction = gen.next();
      expect(setAccessKeyAction.value.payload.action.type).toEqual(
        FETCH_ACCESS_KEY_SUCCESS,
      );
      const action = gen.next();
      expect(action.value.payload.action.type).toEqual(
        fetchTokenAction.started.type,
      );
    });
  });
});
