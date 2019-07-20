import { call, put, select } from 'redux-saga/effects'
import * as API from '../../../../util/api'
import {    fetchPaymentMethodsFailure, 
            fetchPaymentMethodsSuccess,
            createDistribitionAndInsertDonationAction, 
            ICreateDistributionParams, 
            IInsertDonationParams } from './single-donation.actions';
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
            throw new Error(data.content)
        yield put(fetchPaymentMethodsSuccess(data.content))
    }
    catch(ex) {
        yield put(fetchPaymentMethodsFailure(ex))
    }
}

export function* createDistributionCall(params: ICreateDistributionParams) {
    try {
        const accessToken: IAccessToken = yield select(getApiToken);
        var data = yield call(API.call, {
            endpoint: "/donations/distribution/",
            method: API.Method.POST,
            token: accessToken.token,
            data: params
        })
        if (data.status !== 200)
            throw new Error(data.content)
        return data.content
    } catch (ex) {
        throw ex
    }
        
}

export function* insertDonationCall(params: IInsertDonationParams) {
    try {
        const accessToken: IAccessToken = yield select(getApiToken);
        var data = yield call(API.call, {
            endpoint: "/donations/confirm",
            method: API.Method.POST,
            token: accessToken.token,
            data: params
        })
        if (data.status !== 200)
            throw new Error(data.content)
        return data.content
    } catch (ex) {
        throw ex
    }
}

export function* createDistributionAndInsertDonation(action: any) {
    try {
        let KID = yield call(createDistributionCall, action.payload.distribution);
        let donationData = {
            ...action.payload.donation,
            KID: KID
        }
        yield call(insertDonationCall, donationData)

        yield put(createDistribitionAndInsertDonationAction.done({ params: action.payload, result: "OK" }))
    } catch (ex) {
        yield put(createDistribitionAndInsertDonationAction.failed({ params: action.payload, error: ex }))
    }
}