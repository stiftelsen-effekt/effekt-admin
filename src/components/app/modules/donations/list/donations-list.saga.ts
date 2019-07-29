import { Action } from "typescript-fsa";
import { fetchDonationsAction, IFetchDonationsParams } from "./donations-list.actions";
import { put, call, select } from "redux-saga/effects";
import * as API from "../../../../../util/api"
import { AppState } from "../../../../../models/state";
import { IAccessToken } from "../../../../../authenticate/auth";

export function* fetchDonations (action: Action<IFetchDonationsParams>) {
    try {
        const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        const result: API.Response = yield call(API.call, {
            endpoint: "/donations",
            method: API.Method.POST,
            token: token.token,
            data: action.payload
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchDonationsAction.done({params: action.payload, result: result.content}))
    } catch(ex) {
        yield put(fetchDonationsAction.failed({params: action.payload, error: ex}))
    }
}