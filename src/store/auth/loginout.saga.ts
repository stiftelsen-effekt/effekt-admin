import { call, select, put } from 'redux-saga/effects';
import { Auth, IAccessKey } from '../../auth/auth';
import * as API from '../../util/api';
import { AppState } from '../state';
import {
  logoutSuccess,
  logoutFailure,
  fetchAccessKeySuccess,
} from './loginout.actions';
import { fetchTokenAction } from './token.actions';

export const getApiKey = (state: AppState) => state.auth.accessKey;

export function* login() {
  // Exits the app entirely and moves on to 3rd party login
  yield Auth.login();
}

export function* logout() {
  try {
    const accessKey: IAccessKey = yield select(getApiKey);
    yield call(API.call, {
      endpoint: '/auth/logout',
      method: API.Method.POST,
      data: {
        key: accessKey.key,
      },
    });
    Auth.clear();
    yield put(logoutSuccess());
  } catch (ex) {
    yield put(logoutFailure(ex));
  }
}

export function* loginSuccess(action: any) {
  yield put(fetchAccessKeySuccess(action.payload));
  yield put(fetchTokenAction.started(undefined));
}

export function* callback() {
  yield Auth.handleCallback();
}

export function* loginCacheCheck() {
  yield Auth.tryCachedKey();
}
