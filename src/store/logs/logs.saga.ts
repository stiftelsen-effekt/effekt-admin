import { put, select, call } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import { IAccessToken } from "../authentication/auth";
import { AppState } from "../../models/state";
import * as API from "../../util/api"
import { fetchLogEntryAction, IFetchLogEntryActionParams } from "./logs.actions";

export function* fetchLogEntry(action: Action<IFetchLogEntryActionParams>) {
    try {
        const accessToken: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        const result: API.Response = yield call(API.call, {
            endpoint: `/logging/${action.payload.id}`,
            token: accessToken.token,
            method: API.Method.GET
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchLogEntryAction.done({ params: action.payload, result: result.content }))
    }
    catch (ex) {
        yield put(fetchLogEntryAction.failed({ params: action.payload, error: ex }))
    }
}