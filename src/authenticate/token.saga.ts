import { call, put, select } from 'redux-saga/effects'
import { IAccessKey } from './auth'
import { fetchTokenAction } from './token.actions';
import * as API from '../util/api';
import { AppState } from '../models/state';
import { AnyAction } from 'redux';

export const getApiKey = (state: AppState) => state.auth.accessKey

export function* fetchToken(action: AnyAction) {
    const accessKey: IAccessKey = yield select(getApiKey);
    try {
        const tokenResponse = yield call(API.call, {
            endpoint: '/auth/token', 
            method: API.Method.GET, 
            data: { key: accessKey.key },
            handleUnauthorized: true
        });
        yield put(fetchTokenAction.done({params: action.payload, result: tokenResponse.content}));
    } catch(ex) {
        yield put(fetchTokenAction.failed({params: action.payload, error: ex}));
    }
}