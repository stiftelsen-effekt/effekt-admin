import { call, put, select } from 'redux-saga/effects'
import * as API from '../../../../util/api'
import { searchDonorsSuccess, searchDonorFailure } from './donor-selection.actions';
import { AppState } from '../../../../models/state';
import { IAccessToken } from '../../../../authenticate/auth';

export const getApiToken = (state: AppState) => state.auth.currentToken

export function* searchDonors(action: any) {
    try {
        const accessToken: IAccessToken = yield select(getApiToken);
        var data = yield call(API.call, {
            endpoint: "/donors/search/", 
            method: API.Method.GET,
            token: accessToken.token,
            data: {
                q: action.payload
            }
        })
        if (data.status !== 200) 
            throw "Request error"
        yield put(searchDonorsSuccess(data.content))
    }
    catch(ex) {
        yield put(searchDonorFailure(ex))
    }
}