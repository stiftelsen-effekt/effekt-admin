import {
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
