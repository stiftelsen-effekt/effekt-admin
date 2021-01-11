import queryString from 'querystring';
import shortid from 'shortid';
import { DEV_ENVIRONMENT, API_URL, API_AUTH } from '../config/config';
import { IAccessKey, ICallbackParameters } from './_types';

export class AuthUtil {
  static generateLoginUrl(): string {
    return (
      `${API_URL}/auth/login?` +
      `client_id=${API_AUTH.clientId}&` +
      `state=${this.setAuthState()}&` +
      `scope=${API_AUTH.permissions.join(' ')}&` +
      `redirect_uri=${encodeURIComponent(this.getCallbackUrl())}&` +
      `response_type=code`
    );
  }

  static getCallbackUrl(): string {
    if (DEV_ENVIRONMENT) return `http://localhost:3001/#/callback`;
    return `https://storage.googleapis.com/static.gieffektivt.no/index.html#/callback`;
  }

  /*
    TODO: Might be cleaner to move the fetching of cached keys to redux-saga
    */

  static readonly AUTH_STATE_KEY: string = 'auth_state';
  /* Returns a randomly generated state variable in local storage, used to compare to validate login callback */
  static get authState(): string | null {
    return localStorage.getItem(this.AUTH_STATE_KEY);
  }

  /* Stores a randomly generated state variable in local storage, used to compare to validate login callback */
  static setAuthState(): string {
    const shortId = shortid.generate();
    localStorage.setItem(this.AUTH_STATE_KEY, shortId);
    return shortId;
  }

  /* Clears the state variable in local storage, used to compare to validate login callback */
  static clearAuthState(): void {
    localStorage.removeItem(this.AUTH_STATE_KEY);
  }

  static readonly ACCESS_KEY_KEY: string = 'access_key';
  /* Gets the access key from localstorage, or returns null if no access key exists */
  static getStoredAccessKey(): IAccessKey | null {
    const accessKeyStr: string | null = localStorage.getItem(
      this.ACCESS_KEY_KEY,
    );
    if (accessKeyStr == null) return null;
    try {
      return JSON.parse(accessKeyStr);
    } catch (ex) {
      return null;
    }
  }

  /* Stores access key in local storage */
  static storeAccessKey(accessKey: IAccessKey): void {
    localStorage.setItem(this.ACCESS_KEY_KEY, JSON.stringify(accessKey));
  }

  /* Clears the access key from local storage */
  static clearAccessKey(): void {
    localStorage.removeItem(this.ACCESS_KEY_KEY);
  }

  /* Parses the querystring of the callback from the API authentification
       route, returns a clean object to work with */
  static parseCallback(): ICallbackParameters {
    const params = queryString.parse(this.getCurrentUrlParameters);
    return {
      key: params.key as string,
      expires: new Date(params.expires as string),
      state: params.state as string,
    };
  }

  // Helper
  static get getCurrentUrlParameters(): string {
    return window.location.hash.split('?')[1];
  }
}
