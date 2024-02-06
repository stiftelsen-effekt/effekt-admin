/* eslint-disable no-restricted-globals */
import { put, call, select } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import { AppState } from "../../models/state";
import { IAutoGiroFilter, IPagination } from "../../models/types";
import * as API from "../../util/api";
import {
  IFetchAutoGiroMandateActionParams,
  IFetchAutoGiroMandatesActionParams,
  fetchAutoGiroMandateAction,
  fetchAutoGiroMandatesAction,
} from "./autogiromedgivande.actions";

export function* fetchAutoGiroMandates(action: Action<IFetchAutoGiroMandatesActionParams>) {
  try {
    const pagination: IPagination = yield select(
      (state: AppState) => state.autoGiroMandates.pagination,
    );
    const filter: IAutoGiroFilter = yield select(
      (state: AppState) => state.autoGiroMandates.filter,
    );

    const result: API.Response = yield call(API.call, {
      endpoint: "/autogiro/mandates",
      method: API.Method.POST,
      token: action.payload.token,
      data: {
        ...pagination,
        filter,
      },
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchAutoGiroMandatesAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(
      fetchAutoGiroMandatesAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}

export function* fetchAutoGiroMandate(action: Action<IFetchAutoGiroMandateActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: `/autogiro/mandate/${action.payload.id}`,
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchAutoGiroMandateAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(
      fetchAutoGiroMandateAction.failed({
        error: ex as Error,
        params: action.payload,
      }),
    );
  }
}
