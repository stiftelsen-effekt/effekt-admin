import { fetchDistributionsAction } from "./distribution-list.actions"
import { put, call, select } from "redux-saga/effects";
import * as API from "../../../util/api"
import { AppState } from "../../state";
import { IAccessToken } from "../../../auth";
import { IPagination, IDistributionFilter } from "../../../types";

export function* fetchDistributions (action: any) {
    try {
        const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
        
        const pagination: IPagination = yield select((state: AppState) => state.distributions.pagination)
        const filter: IDistributionFilter = yield select((state: AppState) => state.distributions.filter)

        const result: API.Response = yield call(API.call, {
            endpoint: "/distributions/search",
            method: API.Method.POST,
            token: token.token,
            data: {
                ...pagination,
                filter
            }
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchDistributionsAction.done({params: action.payload, result: result.content}))
    } catch(ex) {
        yield put(fetchDistributionsAction.failed({params: action.payload, error: ex}))
    }
}