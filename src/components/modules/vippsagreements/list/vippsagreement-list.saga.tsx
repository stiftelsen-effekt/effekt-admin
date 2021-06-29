
import { put, call, select } from "redux-saga/effects";
import * as API from "../../../../util/api"
import { AppState } from "../../../../models/state";
import { IAccessToken } from "../../../../authenticate/auth";
import { IPagination, IVippsAgreementFilter } from "../../../../models/types";
import { fetchVippsAgreementsAction } from "./vippsagreement-list.actions";

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