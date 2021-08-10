
import { put, call, select } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import { IAccessToken } from "../authentication/auth";
import { AppState } from "../../models/state";
import { IAvtaleGiroFilter, IPagination, IVippsAgreement } from "../../models/types";
import * as API from "./../../util/api"
import { fetchAvtaleGiroAgreementsAction, fetchAvtaleGiroHistogramAction, fetchAvtaleGiroReportAction, IFetchAgreementActionParams } from "./avtalegiro.actions";
import { fetchAvtaleGiroAction } from "./avtalegiro.actions";

export function* fetchAvtaleGiroAgreements (action: any) {
    try {
        const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        
        const pagination: IPagination = yield select((state: AppState) => state.avtaleGiroAgreements.pagination)
        const filter: IAvtaleGiroFilter = yield select((state: AppState) => state.avtaleGiroAgreements.filter)

        const result: API.Response = yield call(API.call, {
            endpoint: "/avtalegiro/agreements",
            method: API.Method.POST,
            token: token.token,
            data: {
                ...pagination,
                filter
            }
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchAvtaleGiroAgreementsAction.done({params: action.payload, result: result.content}))
    } catch(ex) {
        yield put(fetchAvtaleGiroAgreementsAction.failed({params: action.payload, error: ex}))
    }
}


export function* fetchAvtaleGiroHistogram() {
    try {
        const result: API.Response = yield call(API.call, {
            method: API.Method.GET,
            endpoint: "/avtalegiro/histogram"
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchAvtaleGiroHistogramAction.done({result: result.content}))
    }
    catch(ex) {
        yield put(fetchAvtaleGiroHistogramAction.failed({error: ex}))
    }
}

export function* fetchAvtaleGiroReport() {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)

    try {
        const result: API.Response = yield call(API.call, {
            method: API.Method.GET,
            endpoint: "/avtalegiro/report",
            token: token.token
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchAvtaleGiroReportAction.done({result: result.content[0]}))
    }
    catch(ex) {
        yield put(fetchAvtaleGiroReportAction.failed({error: ex}))
    }
}

export function* fetchAvtaleGiro(action: Action<IFetchAgreementActionParams>) {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)

    try {
        const result: IVippsAgreement = yield call(API.call, {
            method: API.Method.GET,
            endpoint: `/avtalegiro/agreement/${action.payload.id}`,
            token: token.token
        })
        if (result)
            yield put(fetchAvtaleGiroAction.done({params: action.payload, result}))
    }
    catch(ex) {
        yield put(fetchAvtaleGiroAction.failed({ params: action.payload, error: ex }))
    }
}
