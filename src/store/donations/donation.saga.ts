import { put, select, call } from "redux-saga/effects";
import { fetchDonationAction, IFetchDonationActionParams } from "./donation.actions";
import { Action } from "typescript-fsa";
import { IAccessToken } from "../../authenticate/auth";
import { AppState } from "../../models/state";
import * as API from "../../util/api"

export function* fetchDonation(action: Action<IFetchDonationActionParams>) {
    try {
        const accessToken: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        const result: API.Response = yield call(API.call, {
            endpoint: `/donations/${action.payload.id}`,
            token: accessToken.token,
            method: API.Method.GET
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchDonationAction.done({ params: action.payload, result: result.content }))
    }
    catch (ex) {
        yield put(fetchDonationAction.failed({ params: action.payload, error: ex }))
    }
}