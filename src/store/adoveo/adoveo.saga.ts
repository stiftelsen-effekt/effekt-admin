import { SagaIterator } from "redux-saga";
import { put, select, call as sagaCall } from "redux-saga/effects";
import {
  fetchAdoveoAction,
  createAdoveoAction,
  ICreateAdoveoActionParams,
} from "./adoveo-list.actions";
import * as API from "../../util/api";
import { AppState } from "../../models/state";
import { toastError } from "../../util/toasthelper";
import { Action } from "typescript-fsa";
import { toast } from "react-toastify";

export function* fetchAdoveoSaga(action: Action<{ token: string }>): SagaIterator {
  try {
    const state: AppState = yield select();
    const pagination = state.adoveo.pagination;
    const filter = state.adoveo.filter;

    const result: API.Response = yield sagaCall(API.call, {
      endpoint: "/adoveo/list",
      token: action.payload.token,
      method: API.Method.POST,
      data: {
        pagination,
        filter,
      },
    });

    if (result.status !== 200) throw new Error(result.content);

    yield put(
      fetchAdoveoAction.done({
        params: action.payload,
        result: {
          fundraisers: result.content.rows,
          pages: result.content.pages,
          statistics: result.content.statistics,
        },
      }),
    );
  } catch (ex) {
    toastError("Error", "Error fetching Adoveo fundraisers");
    yield put(fetchAdoveoAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* createAdoveoSaga(action: Action<ICreateAdoveoActionParams>): SagaIterator {
  try {
    const result: API.Response = yield sagaCall(API.call, {
      endpoint: "/adoveo",
      token: action.payload.token,
      method: API.Method.POST,
      data: {
        name: action.payload.name,
        donorId: action.payload.donorId,
        adoveoId: action.payload.adoveoId,
        orgShares: action.payload.orgShares,
        useStandardSplit: action.payload.useStandardSplit,
      },
    });

    if (result.status !== 200) throw new Error(result.content);

    yield put(
      createAdoveoAction.done({
        params: action.payload,
        result: result.content,
      }),
    );

    toast.success("Adoveo fundraiser created successfully");

    yield put(fetchAdoveoAction.started({ token: action.payload.token }));
  } catch (ex) {
    toastError("Error", "Error creating Adoveo fundraiser");
    yield put(createAdoveoAction.failed({ params: action.payload, error: ex as Error }));
  }
}
