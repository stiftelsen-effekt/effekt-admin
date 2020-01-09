import { put, call } from "redux-saga/effects";
import { fetchTotalByPeriodAction, IFetchTotalByPeriodActionParams } from "./graphing.actions";
import { Action } from "typescript-fsa";
import * as API from "../../../util/api"
import { DateTime } from "luxon";

export function* fetchTotalByPeriod(action: Action<IFetchTotalByPeriodActionParams>) {
    try {
        const result = yield call(API.call, {
            endpoint: "/donations/total",
            method: API.Method.GET,
            data: {
                fromDate: DateTime.fromJSDate(action.payload.from).toISODate(),
                toDate: DateTime.fromJSDate(action.payload.to).toISODate()
            }
        })
        if (result.status !== 200)
            throw new Error(result.content)
        yield put(fetchTotalByPeriodAction.done({params: action.payload, result: result.content}))
    }
    catch(ex) {
        yield put(fetchTotalByPeriodAction.failed({ params: action.payload, error: ex }))
    }
}