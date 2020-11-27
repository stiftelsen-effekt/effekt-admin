import { IAccessKey } from '../../auth';

export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_CALLBACK = 'LOGIN_CALLBACK';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const FETCH_ACCESS_KEY_SUCCESS = 'FETCH_ACCESS_KEY_SUCCESS';

export const LOGIN_CACHE_CHECK = 'LOGIN_CACHE_CHECK';
export const LOGIN_CACHE_FAILURE = 'LOGIN_CACHE_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SESSION_INVALID = 'SESSION_INVALID';

export const loginBegin = () => {
  return {
    type: LOGIN_BEGIN,
  };
};

export const loginCallback = () => {
  return {
    type: LOGIN_CALLBACK,
  };
};

export const loginFailure = (error: string) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const loginSuccess = (accessKey: IAccessKey) => {
  return {
    type: LOGIN_SUCCESS,
    payload: accessKey,
  };
};

export const fetchAccessKeySuccess = (accessKey: IAccessKey) => {
  return {
    type: FETCH_ACCESS_KEY_SUCCESS,
    payload: accessKey,
  };
};

export const loginCacheCheck = () => {
  return {
    type: LOGIN_CACHE_CHECK,
  };
};

export const loginCacheFailure = () => {
  return {
    type: LOGIN_CACHE_FAILURE,
  };
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

export const logoutFailure = (ex: Error) => {
  return {
    type: LOGOUT_FAILURE,
    payload: ex,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const sessionInvalid = () => {
  return {
    type: SESSION_INVALID,
  };
};
