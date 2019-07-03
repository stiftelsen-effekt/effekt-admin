import {  Auth, IAccessKey } from './auth'
import { call, select, put } from 'redux-saga/effects'
import * as API from '../util/api'
import { AppState } from '../models/state';
import { logoutSuccess, logoutFailure } from './loginout.actions';

export const getApiKey = (state: AppState) => state.auth.accessKey

export function* login() {
    //Exits the app entirely and moves on to 3rd party login
    yield Auth.login()
}

export function* logout() {
    try {
        const accessKey: IAccessKey = yield select(getApiKey);
        yield call(API.call, {
            endpoint: "/auth/logout", 
            method: API.Method.POST,
            data: {
                key: accessKey.key
            }
        })
        Auth.clear();
        yield put(logoutSuccess())
    }
    catch(ex) {
        yield put(logoutFailure(ex))
    }
}

export function* callback() {
    yield call(Auth.handleCallback);
}

export function* loginCacheCheck() {
    yield call(Auth.tryCachedKey);
}