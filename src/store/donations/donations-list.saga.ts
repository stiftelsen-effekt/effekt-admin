import {
  deleteDonationAction,
  exportDonationsAction,
  fetchDonationsAction,
  IDeleteDonationActionParams,
  IFetchDonationsActionParams,
} from "./donations-list.actions";
import { put, call, select } from "redux-saga/effects";
import * as API from "../../util/api";
import { AppState } from "../../models/state";
import { IPagination, IDonationFilter } from "../../models/types";
import { Action } from "typescript-fsa";
import { DateTime } from "luxon";
import { toastError } from "../../util/toasthelper";
import { APP_LOCALE } from "../../config/config";

const locale = APP_LOCALE;

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

export function* exportDonations(action: Action<{ token: string }>) {
  try {
    const state: AppState = yield select();
    const { token } = action.payload;

    const result: { blob: Blob; filename?: string } = yield call(API.callForBlob, {
      endpoint: "/donations/",
      method: API.Method.POST,
      token,
      data: {
        ...state.donations.pagination,
        filter: state.donations.filter,
        export: true,
      },
    });

    const filename =
      result.filename || `donations_export_${DateTime.now().toISO({ includeOffset: true })}.csv`;

    // Create download link and trigger download
    const url = window.URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    yield put(exportDonationsAction.done({ params: action.payload, result: undefined }));
  } catch (error) {
    toastError("Failed export", (error as Error).message);
    yield put(exportDonationsAction.failed({ params: action.payload, error: error as Error }));
  }
}
