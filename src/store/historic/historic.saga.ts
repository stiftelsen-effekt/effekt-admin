import { put, select, call } from "redux-saga/effects";
import { registerHistoricDonationsAction, IRegisterHistoricDonationParams } from "./historic.actions"
import { Action } from "typescript-fsa";
import { IAccessToken } from "../../authenticate/auth";
import { AppState } from "../../models/state";
import * as API from "../../util/api"
import { IHistoricDonation } from "../../models/types";

export function* registerDonations(action: Action<IRegisterHistoricDonationParams>) {
    try {
        const accessToken: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        let form = new FormData()
        form.append('historic_donations', action.payload.csvFile)
        const result: API.Response = yield call(API.call, {
            endpoint: '/donations/history/register',
            token: accessToken.token,
            method: API.Method.POST,
            formData: form
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(registerHistoricDonationsAction.done({ params: action.payload, result: {registeredDonations: result.content.success, failedDonations: result.content.failures} }))
    }
    catch (ex) {
        yield put(registerHistoricDonationsAction.failed({ params: action.payload, error: ex }))
    }
}
