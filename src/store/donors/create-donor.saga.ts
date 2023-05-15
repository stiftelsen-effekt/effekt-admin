import { createDonorAction, ICreateDonorActionParams } from "./create-donor.actions";
import { put, call } from "redux-saga/effects";
import * as API from "../../util/api";
import { Action } from "typescript-fsa";

export function* createDonor(action: Action<ICreateDonorActionParams>) {
  try {
    var data: API.TypedResponse<"OK" | string> = yield call(API.call, {
      endpoint: `/donors/`,
      method: API.Method.POST,
      data: action.payload.donor,
      token: action.payload.token,
    });
    if (data.status !== 200) throw new Error(data.content);

    yield put(createDonorAction.done({ params: action.payload, result: true }));
  } catch (ex) {
    yield put(createDonorAction.failed({ params: action.payload, error: ex as Error }));
  }
}
