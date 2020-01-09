import { IAccessToken } from "../../../../authenticate/auth";
import { select, put, call } from "redux-saga/effects";
import { AppState } from "../../../../models/state";
import { resendRecieptAction } from "./reciept.actions";
import * as API from "../../../../util/api"

export function* resendReciept (action: any) {
    try {
        const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)

        const result: API.Response = yield call(API.call, {
            endpoint: "/donations/receipt",
            method: API.Method.POST,
            token: token.token,
            data: action.payload
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(resendRecieptAction.done({params: action.payload, result: result.content}))
    } catch(ex) {
        yield put(resendRecieptAction.failed({params: action.payload, error: ex}))
    }
}