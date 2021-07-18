
import { put, call, select } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import { IAccessToken } from "../../authenticate/auth";
import { AppState } from "../../models/state";
import { IPagination, IVippsAgreement, IVippsAgreementChargeFilter, IVippsAgreementFilter } from "../../models/types";
import * as API from "./../../util/api"
import { fetchAgreementHistogramAction, fetchAgreementsReportAction, fetchChargeHistogramAction, fetchVippsAgreementAction, fetchVippsAgreementChargesAction, fetchVippsAgreementsAction, IFetchAgreementActionParams, IRefundVippsChargeActionParams } from "./vipps.actions";

export function* fetchVippsAgreements (action: any) {
    try {
        const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        
        const pagination: IPagination = yield select((state: AppState) => state.vippsAgreements.pagination)
        const filter: IVippsAgreementFilter = yield select((state: AppState) => state.vippsAgreements.filter)

        const result: API.Response = yield call(API.call, {
            endpoint: "/vipps/agreements",
            method: API.Method.POST,
            token: token.token,
            data: {
                ...pagination,
                filter
            }
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchVippsAgreementsAction.done({params: action.payload, result: result.content}))
    } catch(ex) {
        yield put(fetchVippsAgreementsAction.failed({params: action.payload, error: ex}))
    }
}

export function* fetchVippsAgreementCharges (action: any) {
    try {
        const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        
        const pagination: IPagination = yield select((state: AppState) => state.vippsAgreementCharges.pagination)
        const filter: IVippsAgreementChargeFilter = yield select((state: AppState) => state.vippsAgreementCharges.filter)

        const result: API.Response = yield call(API.call, {
            endpoint: "/vipps/charges",
            method: API.Method.POST,
            token: token.token,
            data: {
                ...pagination,
                filter
            }
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchVippsAgreementChargesAction.done({params: action.payload, result: result.content}))
    } catch(ex) {
        yield put(fetchVippsAgreementChargesAction.failed({params: action.payload, error: ex}))
    }
}

export function* fetchChargeHistogram() {
    try {
        const result: API.Response = yield call(API.call, {
            method: API.Method.GET,
            endpoint: "/vipps/histogram/charges"
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchChargeHistogramAction.done({result: result.content}))
    }
    catch(ex) {
        yield put(fetchChargeHistogramAction.failed({error: ex}))
    }
}

export function* fetchAgreementHistogram() {
    try {
        const result: API.Response = yield call(API.call, {
            method: API.Method.GET,
            endpoint: "/vipps/histogram/agreements"
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchAgreementHistogramAction.done({result: result.content}))
    }
    catch(ex) {
        yield put(fetchAgreementHistogramAction.failed({error: ex}))
    }
}

export function* fetchAgreementsReport() {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)

    try {
        const result: API.Response = yield call(API.call, {
            method: API.Method.GET,
            endpoint: "/vipps/agreements/report",
            token: token.token
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchAgreementsReportAction.done({result: result.content[0]}))
    }
    catch(ex) {
        yield put(fetchAgreementsReportAction.failed({error: ex}))
    }
}

export function* fetchVippsAgreement(action: Action<IFetchAgreementActionParams>) {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)

    try {
        const result: IVippsAgreement = yield call(API.call, {
            method: API.Method.GET,
            endpoint: `/vipps/agreement/${action.payload.id}`,
            token: token.token
        })
        if (result)
            yield put(fetchVippsAgreementAction.done({params: action.payload, result}))
    }
    catch(ex) {
        yield put(fetchVippsAgreementAction.failed({ params: action.payload, error: ex }))
    }
}

export function* refundVippsAgreementCharge(action: Action<IRefundVippsChargeActionParams>) {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)

    try {
        yield call(API.call, {
            method: API.Method.POST,
            endpoint: `/vipps/agreement/${action.payload.agreementId}/charge/${action.payload.chargeId}/refund`,
            token: token.token
        })
    }
    catch(ex) {
        throw new Error(ex)
    }
}
