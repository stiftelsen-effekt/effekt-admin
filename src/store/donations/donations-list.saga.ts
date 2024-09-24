import {
  deleteDonationAction,
  fetchDonationsAction,
  IDeleteDonationActionParams,
  IFetchDonationsActionParams,
} from "./donations-list.actions";
import { put, call, select } from "redux-saga/effects";
import * as API from "../../util/api";
import { AppState } from "../../models/state";
import { IPagination, IDonationFilter } from "../../models/types";
import { Action } from "typescript-fsa";
import { AdminPanelLocale } from "../../models/locale";

const locale = process.env.REACT_APP_LOCALE as AdminPanelLocale;

export function* fetchDonations(action: Action<IFetchDonationsActionParams>) {
  try {
    const pagination: IPagination = yield select((state: AppState) => state.donations.pagination);
    const filter: IDonationFilter = yield select((state: AppState) => state.donations.filter);

    const result: API.Response = yield call(API.call, {
      endpoint: `/donations?locale=${locale}`,
      method: API.Method.POST,
      token: action.payload.token,
      data: {
        ...pagination,
        filter,
      },
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchDonationsAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(fetchDonationsAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* deleteDonation(action: Action<IDeleteDonationActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      endpoint: `/donations/${action.payload.id}`,
      method: API.Method.DELETE,
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(deleteDonationAction.done({ params: action.payload, result: result.content }));
    yield put(fetchDonationsAction.started({ token: action.payload.token }));
  } catch (ex) {
    yield put(deleteDonationAction.failed({ params: action.payload, error: ex as Error }));
  }
}
