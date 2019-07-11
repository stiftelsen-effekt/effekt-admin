import { call, put, select } from 'redux-saga/effects'
import * as API from '../../../../util/api'
import { fetchPaymentMethodsFailure, fetchPaymentMethodsSuccess } from './single-donation.actions';

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