import { put, call, select } from "redux-saga/effects";
import { exportDonorsAction, fetchDonorsAction } from "./donors-list.actions";
import * as API from "../../util/api";
import { AppState } from "../../models/state";
import { Action } from "typescript-fsa";
import { DateTime } from "luxon";
import { toastError } from "../../util/toasthelper";

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

export function* exportDonors(action: Action<{ token: string }>) {
  try {
    const state: AppState = yield select();
    const { token } = action.payload;

    const result: { blob: Blob; filename?: string } = yield call(API.callForBlob, {
      endpoint: "/donors/list",
      method: API.Method.POST,
      token,
      data: {
        ...state.donors.pagination,
        filter: state.donors.filter,
        export: true,
      },
    });

    const filename =
      result.filename || `donors_export_${DateTime.now().toISO({ includeOffset: true })}.csv`;

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

    yield put(exportDonorsAction.done({ params: action.payload, result: undefined }));
  } catch (error) {
    toastError("Failed export", (error as Error).message);
    yield put(exportDonorsAction.failed({ params: action.payload, error: error as Error }));
  }
}
