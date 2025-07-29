import {
  exportDistributionsAction,
  fetchDistributionAction,
  fetchDistributionsAction,
  IFetchDistributionActionParams,
  IFetchDistributionsActionParams,
} from "./distribution.actions";
import { put, call, select } from "redux-saga/effects";
import * as API from "../../util/api";
import { AppState } from "../../models/state";
import { IPagination, IDistributionFilter, IDistribution } from "../../models/types";
import { Action } from "typescript-fsa";
import { DateTime } from "luxon";
import { toastError } from "../../util/toasthelper";

export function* fetchDistribution(action: Action<IFetchDistributionActionParams>) {
  try {
    const distributionResult: API.TypedResponse<IDistribution> = yield call(API.call, {
      endpoint: `/distributions/${action.payload.kid}`,
      method: API.Method.GET,
      token: action.payload.token,
    });
    if (distributionResult.status !== 200) throw new Error(distributionResult.content);

    const donationsResult = yield call(API.call, {
      endpoint: `/donations/all/${action.payload.kid}`,
      method: API.Method.GET,
      token: action.payload.token,
    });
    if (donationsResult.status !== 200) throw new Error(donationsResult.content);

    yield put(
      fetchDistributionAction.done({
        params: action.payload,
        result: {
          distribution: distributionResult.content,
          affilliatedDonations: donationsResult.content,
        },
      }),
    );
  } catch (ex) {
    yield put(
      fetchDistributionAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}

export function* fetchDistributions(action: Action<IFetchDistributionsActionParams>) {
  try {
    const pagination: IPagination = yield select(
      (state: AppState) => state.distributions.pagination,
    );
    const filter: IDistributionFilter = yield select(
      (state: AppState) => state.distributions.filter,
    );

    const result: API.Response = yield call(API.call, {
      endpoint: "/distributions/search",
      method: API.Method.POST,
      token: action.payload.token,
      data: {
        ...pagination,
        filter,
      },
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchDistributionsAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(
      fetchDistributionsAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}

export function* exportDistributions(action: Action<{ token: string }>) {
  try {
    const state: AppState = yield select();
    const { token } = action.payload;

    const result: { blob: Blob; filename?: string } = yield call(API.callForBlob, {
      endpoint: "/distributions/search",
      method: API.Method.POST,
      token,
      data: {
        ...state.distributions.pagination,
        filter: state.distributions.filter,
        export: true,
      },
    });

    const filename =
      result.filename ||
      `distributions_export_${DateTime.now().toISO({ includeOffset: true })}.csv`;

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

    yield put(exportDistributionsAction.done({ params: action.payload, result: undefined }));
  } catch (error) {
    toastError("Failed export", (error as Error).message);
    yield put(exportDistributionsAction.failed({ params: action.payload, error: error as Error }));
  }
}
