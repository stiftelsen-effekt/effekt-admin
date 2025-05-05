import { SagaIterator } from "redux-saga";
import { takeLatest, put, select, call as sagaCall } from "redux-saga/effects";
import { fetchFundraisersAction } from "./fundraisers-list.actions";
import { fetchFundraiserAction } from "./fundraiser.actions";
import * as API from "../../util/api";
import { AppState } from "../../models/state";
import { toastError } from "../../util/toasthelper";
import { Action } from "typescript-fsa";

/**
 * Sagas for fetching fundraisers
 */

export function* fetchFundraisersSaga(action: Action<{ token: string }>): SagaIterator {
  try {
    const state: AppState = yield select();
    const pagination = state.fundraisers.pagination;
    const filter = state.fundraisers.filter;

    const result: API.Response = yield sagaCall(API.call, {
      endpoint: "/fundraisers/list",
      token: action.payload.token,
      method: API.Method.POST,
      data: {
        pagination,
        filter,
      },
    });

    if (result.status !== 200) throw new Error(result.content);

    yield put(
      fetchFundraisersAction.done({
        params: action.payload,
        result: {
          fundraisers: result.content.rows,
          pages: result.content.pages,
          statistics: result.content.statistics,
        },
      }),
    );
  } catch (ex) {
    toastError("Error", "Error fetching fundraisers");
    yield put(fetchFundraisersAction.failed({ params: action.payload, error: ex as Error }));
  }
}

/**
 * Sagas for fetching a specific fundraiser
 */

export function* fetchFundraiserSaga(action: Action<{ token: string; id: number }>): SagaIterator {
  try {
    const result: API.Response = yield sagaCall(API.call, {
      endpoint: `/fundraisers/${action.payload.id}`,
      token: action.payload.token,
      method: API.Method.GET,
    });

    if (result.status !== 200) throw new Error(result.content);

    yield put(
      fetchFundraiserAction.done({
        params: action.payload,
        result: result.content,
      }),
    );
  } catch (ex) {
    toastError("Error", "Error fetching fundraiser");
    yield put(fetchFundraiserAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* fundraisersSaga(): SagaIterator {
  yield takeLatest(fetchFundraisersAction.started.type, fetchFundraisersSaga);
  yield takeLatest(fetchFundraiserAction.started.type, fetchFundraiserSaga);
}
