
import { AnyAction } from "redux";
import { put, call, select } from "redux-saga/effects";
import { IAccessToken } from "../../authenticate/auth";
import { AppState } from "../../models/state";
import { IPagination, IVippsAgreementFilter } from "../../models/types";
import * as API from "./../../util/api"
import { fetchAgreementHistogramAction, fetchChargeHistogramAction, fetchVippsAgreementsAction } from "./vipps.actions";

export function* fetchVippsAgreements (action: any) {
    try {
        console.log("fetching agreements")
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

//TODO: this is incomplete
export function* fetchVippsCharges (action: any) {
    try {
        console.log("fetching agreements")
        const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        
        const pagination: IPagination = yield select((state: AppState) => state.vippsAgreements.pagination)
        const filter: IVippsAgreementFilter = yield select((state: AppState) => state.vippsAgreements.filter)

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
        yield put(fetchVippsAgreementsAction.done({params: action.payload, result: result.content}))
    } catch(ex) {
        yield put(fetchVippsAgreementsAction.failed({params: action.payload, error: ex}))
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
