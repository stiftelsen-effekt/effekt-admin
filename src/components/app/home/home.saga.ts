import { call, put, select } from 'redux-saga/effects'
import * as API from '../../../util/api'
import { AppState } from '../../../models/state';
import { IAccessToken } from '../../../authenticate/auth';
import { IAPIParameters } from '../../../util/api';
import { fetchDonorSuccess } from './home.actions';

export const getApiToken = (state: AppState) => state.currentToken

export function* fetchDonor() {
    const accessToken: IAccessToken = yield select(getApiToken);
    const donorResponse = yield call(API.call, {
        endpoint: '/donors/27',
        token: accessToken.token,
        method: API.Method.GET
    } as IAPIParameters);
    yield put(fetchDonorSuccess(donorResponse.content));
}