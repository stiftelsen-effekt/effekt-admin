import { put, call, select } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import { AppState } from "../../models/state";
import {
  IPagination,
  IVippsAgreement,
  IVippsAgreementChargeFilter,
  IVippsAgreementFilter,
} from "../../models/types";
import * as API from "../../util/api";
import {
  fetchAgreementHistogramAction,
  fetchAgreementsReportAction,
  fetchChargeHistogramAction,
  fetchVippsAgreementAction,
  fetchVippsAgreementChargesAction,
  fetchVippsAgreementsAction,
  IFetchAgreementActionParams,
  IFetchVippsAgreementChargesActionParams,
  IFetchVippsAgreementsActionParams,
  IFetchVippsAgreementsReportActionParams,
  IFetchVippsChargeHistogramActionParams,
  IRefundVippsChargeActionParams,
} from "./vipps.actions";

export function* fetchVippsAgreements(action: Action<IFetchVippsAgreementsActionParams>) {
  try {
    const pagination: IPagination = yield select(
      (state: AppState) => state.vippsAgreements.pagination,
    );
    const filter: IVippsAgreementFilter = yield select(
      (state: AppState) => state.vippsAgreements.filter,
    );

    const result: API.Response = yield call(API.call, {
      endpoint: "/vipps/agreements",
      method: API.Method.POST,
      token: action.payload.token,
      data: {
        ...pagination,
        filter,
      },
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchVippsAgreementsAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(fetchVippsAgreementsAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* fetchVippsAgreementCharges(
  action: Action<IFetchVippsAgreementChargesActionParams>,
) {
  try {
    const pagination: IPagination = yield select(
      (state: AppState) => state.vippsAgreementCharges.pagination,
    );
    const filter: IVippsAgreementChargeFilter = yield select(
      (state: AppState) => state.vippsAgreementCharges.filter,
    );

    const result: API.Response = yield call(API.call, {
      endpoint: "/vipps/charges",
      method: API.Method.POST,
      token: action.payload.token,
      data: {
        ...pagination,
        filter,
      },
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchVippsAgreementChargesAction.done({ params: action.payload, result: result.content }),
    );
  } catch (ex) {
    yield put(
      fetchVippsAgreementChargesAction.failed({ params: action.payload, error: ex as Error }),
    );
  }
}

export function* fetchChargeHistogram(action: Action<IFetchVippsChargeHistogramActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/vipps/histogram/charges",
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchChargeHistogramAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(fetchChargeHistogramAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* fetchAgreementHistogram(action: any) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/vipps/histogram/agreements",
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchAgreementHistogramAction.done({ result: result.content }));
  } catch (ex) {
    yield put(fetchAgreementHistogramAction.failed({ error: ex as Error }));
  }
}

export function* fetchAgreementsReport(action: Action<IFetchVippsAgreementsReportActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/vipps/agreements/report",
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchAgreementsReportAction.done({ params: action.payload, result: result.content[0] }),
    );
  } catch (ex) {
    yield put(fetchAgreementsReportAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* fetchVippsAgreement(action: Action<IFetchAgreementActionParams>) {
  try {
    const result: IVippsAgreement = yield call(API.call, {
      method: API.Method.GET,
      endpoint: `/vipps/agreement/${action.payload.id}`,
      token: action.payload.token,
    });
    if (result) yield put(fetchVippsAgreementAction.done({ params: action.payload, result }));
  } catch (ex) {
    yield put(fetchVippsAgreementAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* refundVippsAgreementCharge(action: Action<IRefundVippsChargeActionParams>) {
  try {
    yield call(API.call, {
      method: API.Method.POST,
      endpoint: `/vipps/agreement/${action.payload.agreementId}/charge/${action.payload.chargeId}/refund`,
      token: action.payload.token,
    });
  } catch (ex) {
    throw ex;
  }
}
