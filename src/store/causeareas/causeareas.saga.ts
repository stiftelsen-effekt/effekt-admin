import { call, put } from "redux-saga/effects";
import * as API from "../../util/api";
import { fetchActiveCauseareasAction, fetchAllCauseareasAction } from "./causeareas.action";

export function* fetchActiveCauseAreas(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/causeareas/active/",
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(fetchActiveCauseareasAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(fetchActiveCauseareasAction.failed({ error: ex as Error }));
  }
}

export function* fetchAllCauseAreas(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/causeareas/all/",
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(fetchAllCauseareasAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(fetchAllCauseareasAction.failed({ error: ex as Error }));
  }
}
