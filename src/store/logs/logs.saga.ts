import { put, call } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import * as API from "../../util/api";
import { fetchLogEntryAction, IFetchLogEntryActionParams } from "./logs.actions";

export function* fetchLogEntry(action: Action<IFetchLogEntryActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      endpoint: `/logging/${action.payload.id}`,
      token: action.payload.token,
      method: API.Method.GET,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchLogEntryAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(fetchLogEntryAction.failed({ params: action.payload, error: ex as Error }));
  }
}
