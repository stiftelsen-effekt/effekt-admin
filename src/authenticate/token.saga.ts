import { call, put, select } from 'redux-saga/effects'
import { IAccessKey } from './auth'
import { fetchTokenSuccess, fetchTokenFailure } from './token.actions';
import * as API from '../util/api';
import { AppState } from '../models/state';

export const getApiKey = (state: AppState) => state.auth.accessKey

export function* fetchToken() {
    const accessKey: IAccessKey = yield select(getApiKey);
    try {
        const tokenResponse = yield call(API.call, {
            endpoint: '/auth/token', 
            method: API.Method.GET, 
            data: { key: accessKey.key }
        });
        yield put(fetchTokenSuccess(tokenResponse.content));
    } catch(ex) {
        yield put(fetchTokenFailure(ex));
    }
}