import { deleteDonationAction, fetchDonationsAction } from "./donations-list.actions";
import { put, call, select } from "redux-saga/effects";
import * as API from "../../../util/api"
import { AppState } from "../../../store/state";
import { IAccessToken } from "../../../auth";
import { IPagination, IDonationFilter } from "../../../types";

export function* fetchDonations (action: any) {
    try {
        const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        
        const pagination: IPagination = yield select((state: AppState) => state.donations.pagination)
        const filter: IDonationFilter = yield select((state: AppState) => state.donations.filter)

        const result: API.Response = yield call(API.call, {
            endpoint: "/donations",
            method: API.Method.POST,
            token: token.token,
            data: {
                ...pagination,
                filter
            }
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchDonationsAction.done({params: action.payload, result: result.content}))
    } catch(ex) {
        yield put(fetchDonationsAction.failed({params: action.payload, error: ex}))
    }
}

export function* deleteDonation(action: any) {
    try {
        const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)

        const result: API.Response = yield call(API.call, {
            endpoint: `/donations/${action.payload}`,
            method: API.Method.DELETE,
            token: token.token,
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(deleteDonationAction.done({params: action.payload, result: result.content}))
        yield put(fetchDonationsAction.started(undefined))
    } catch(ex) {
        yield put(deleteDonationAction.failed({params: action.payload, error: ex}))
    }
}