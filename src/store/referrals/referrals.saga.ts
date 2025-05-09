import { call, put } from "redux-saga/effects";
import * as API from "../../util/api";
import { fetchActiveRefferalsAction, fetchAllRefferalsAction } from "./referrals.action";

export function* fetchActiveReferrals(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/referrals/types/",
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(fetchActiveRefferalsAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(fetchActiveRefferalsAction.failed({ error: ex as Error }));
  }
}

export function* fetchAllReferrals(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/referrals/types/all/",
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(fetchAllRefferalsAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(fetchAllRefferalsAction.failed({ error: ex as Error }));
  }
}
