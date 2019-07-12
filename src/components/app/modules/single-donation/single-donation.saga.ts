import { call, put, select } from 'redux-saga/effects'
import * as API from '../../../../util/api'
import { fetchPaymentMethodsFailure, fetchPaymentMethodsSuccess, createDistributionAction } from './single-donation.actions';
import { AppState } from '../../../../models/state';
import { IAccessToken } from '../../../../authenticate/auth';

const getApiToken = (state: AppState) => state.auth.currentToken

export function* fetchPaymentMethods(action: any) {
    try {
        var data = yield call(API.call, {
            endpoint: "/payment/methods/", 
            method: API.Method.GET
        })
        if (data.status !== 200) 
            throw new Error("Request error")
        yield put(fetchPaymentMethodsSuccess(data.content))
    }
    catch(ex) {
        yield put(fetchPaymentMethodsFailure(ex))
    }
}

export function* createDistribution(action: any) {
    try {
        const accessToken: IAccessToken = yield select(getApiToken);
        var data = yield call(API.call, {
            endpoint: "/donations/distribution/",
            method: API.Method.POST,
            token: accessToken.token,
            data: action.payload
        })
        if (data.status !== 200)
            throw new Error("Request error")
        yield put(createDistributionAction.done(data.content))
    } catch (ex) {
        yield put(createDistributionAction.failed(ex))
    }
}