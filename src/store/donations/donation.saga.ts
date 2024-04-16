import { put, call } from "redux-saga/effects";
import {
  fetchDonationAction,
  IFetchDonationActionParams,
  fetchHistogramAction,
  IFetchDonationsHistogramActionParams,
  IFetchTransactionCostsReportActionParams,
  fetchTransactionCostsReportAction,
  IUpdateDonationActionParams,
  updateDonationAction,
} from "./donation.actions";
import { Action } from "typescript-fsa";
import * as API from "../../util/api";

export function* fetchDonation(action: Action<IFetchDonationActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      endpoint: `/donations/${action.payload.id}`,
      token: action.payload.token,
      method: API.Method.GET,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchDonationAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(fetchDonationAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* updateDonation(action: Action<IUpdateDonationActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.PUT,
      endpoint: `/donations/${action.payload.donation.id}`,
      token: action.payload.token,
      data: action.payload.donation,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(updateDonationAction.done({ params: action.payload, result: result.content }));
    yield put(
      fetchDonationAction.started({ id: action.payload.donation.id, token: action.payload.token }),
    );
  } catch (ex) {
    yield put(updateDonationAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* fetchHistogram(action: Action<IFetchDonationsHistogramActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/donations/histogram",
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchHistogramAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(fetchHistogramAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* fetchTransactionCostsReport(
  action: Action<IFetchTransactionCostsReportActionParams>,
) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/donations/transaction_costs_report",
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchTransactionCostsReportAction.done({ params: action.payload, result: result.content }),
    );
  } catch (ex) {
    yield put(
      fetchTransactionCostsReportAction.failed({ params: action.payload, error: ex as Error }),
    );
  }
}
