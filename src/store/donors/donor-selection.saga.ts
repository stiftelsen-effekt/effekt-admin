import { call, put } from "redux-saga/effects";
import * as API from "../../util/api";
import { IFetchSearchDonorsActionParams, searchDonorAction } from "./donor-selection.actions";
import { Action } from "typescript-fsa";

export function* searchDonors(action: Action<IFetchSearchDonorsActionParams>) {
  const token = action.payload.token;
  delete action.payload.token;
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/donors/list/",
      method: API.Method.POST,
      token: token,
      data: {
        filter: action.payload.filter,
        page: action.payload.page,
        limit: action.payload.limit,
        sort: action.payload.sort,
      },
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(searchDonorAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(searchDonorAction.failed({ params: action.payload, error: ex as Error }));
  }
}
