import { takeLatest, put, call, select } from "redux-saga/effects";
import { fetchDonorsAction } from "./donors-list.actions";
import * as API from "../../util/api";
import { AppState } from "../../models/state";
import { Action } from "typescript-fsa";

export function* fetchDonors(action: Action<{ token: string }>) {
  try {
    const state: AppState = yield select();
    const { token } = action.payload;

    const result: API.Response = yield call(API.call, {
      endpoint: "/donors/list",
      method: API.Method.POST,
      token,
      data: {
        ...state.donors.pagination,
        filter: state.donors.filter,
      },
    });

    console.log(result);

    if (result.status !== 200) throw new Error(result.content);
    console.log(result.content);
    yield put(fetchDonorsAction.done({ params: action.payload, result: result.content }));
  } catch (error) {
    console.error(error);
    yield put(fetchDonorsAction.failed({ params: action.payload, error: error as Error }));
  }
}

export function* watchDonorsList() {
  yield takeLatest(fetchDonorsAction.started.type, fetchDonors);
}
