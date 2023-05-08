import { fetchLogsAction, IFetchLogsActionParams } from "./logs-list.actions";
import { put, call, select } from "redux-saga/effects";
import * as API from "../../util/api";
import { AppState } from "../../models/state";
import { IPagination } from "../../models/types";
import { Action } from "typescript-fsa";

export function* fetchLogs(action: Action<IFetchLogsActionParams>) {
  try {
    const pagination: IPagination = yield select((state: AppState) => state.logs.pagination);
    const filesearch: string = yield select((state: AppState) => state.logs.filter.filesearch);

    const result: API.Response = yield call(API.call, {
      endpoint: "/logging/",
      method: API.Method.POST,
      token: action.payload.token,
      data: {
        ...pagination,
        filesearch,
      },
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchLogsAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(
      fetchLogsAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}
