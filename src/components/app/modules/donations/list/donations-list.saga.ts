import { fetchDonationsAction } from "./donations-list.actions";
import { put, call, select } from "redux-saga/effects";
import * as API from "../../../../../util/api"
import { AppState } from "../../../../../models/state";
import { IAccessToken } from "../../../../../authenticate/auth";
import { IDonationsPagination, IDonationFilter } from "../../../../../models/types";

export function* fetchDonations (action: any) {
    try {
        const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        
        const pagination: IDonationsPagination = yield select((state: AppState) => state.donations.pagination)
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