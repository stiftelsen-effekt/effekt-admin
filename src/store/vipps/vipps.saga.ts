import { put, call, select } from "redux-saga/effects";
import { toast } from "react-toastify";
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
  createVippsMatchingRuleAction,
  deleteVippsMatchingRuleAction,
  fetchAgreementHistogramAction,
  fetchAgreementsReportAction,
  fetchChargeHistogramAction,
  fetchVippsAgreementAction,
  fetchVippsAgreementChargesAction,
  fetchVippsAgreementsAction,
  fetchVippsMatchingRulesAction,
  updateVippsAmountAction,
  updateVippsStatusAction,
  updateVippsChargeDayAction,
  updateVippsDistributionAction,
  ICreateVippsMatchingRuleActionParams,
  IDeleteVippsMatchingRuleActionParams,
  IFetchAgreementActionParams,
  IFetchVippsAgreementChargesActionParams,
  IFetchVippsAgreementsActionParams,
  IFetchVippsAgreementsReportActionParams,
  IFetchVippsChargeHistogramActionParams,
  IFetchVippsMatchingRuleActionParams,
  IRefundVippsChargeActionParams,
  IUpdateVippsAmountActionParams,
  IUpdateVippsStatusActionParams,
  IUpdateVippsChargeDayActionParams,
  IUpdateVippsDistributionActionParams,
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

    yield put(fetchAgreementsReportAction.done({ params: action.payload, result: result.content }));
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

export function* fetchVippsMatchingRules(action: Action<IFetchVippsMatchingRuleActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/vipps/matchingrules",
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchVippsMatchingRulesAction.done({ params: action.payload, result: result.content }),
    );
  } catch (ex) {
    yield put(fetchVippsMatchingRulesAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* createVippsMatchingRule(action: Action<ICreateVippsMatchingRuleActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.POST,
      endpoint: "/vipps/matchingrules",
      token: action.payload.token,
      data: action.payload.rule,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      createVippsMatchingRuleAction.done({ params: action.payload, result: result.content }),
    );
    yield put(fetchVippsMatchingRulesAction.started({ token: action.payload.token }));
  } catch (ex) {
    yield put(createVippsMatchingRuleAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* deleteVippsMatchingRule(action: Action<IDeleteVippsMatchingRuleActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.DELETE,
      endpoint: `/vipps/matchingrules/${action.payload.id}`,
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      deleteVippsMatchingRuleAction.done({ params: action.payload, result: result.content }),
    );
    yield put(fetchVippsMatchingRulesAction.started({ token: action.payload.token }));
  } catch (ex) {
    yield put(deleteVippsMatchingRuleAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* updateVippsAmount(action: Action<IUpdateVippsAmountActionParams>) {
  try {
    const result = yield call(API.call, {
      method: API.Method.PUT,
      endpoint: `/vipps/agreement/${action.payload.urlcode}/price`,
      token: action.payload.token,
      data: { price: action.payload.amount },
    });
    // Price endpoint returns { status: 200, content: response }
    if (result && result.status === 200) {
      yield put(updateVippsAmountAction.done({ params: action.payload, result: undefined }));
      toast.success("Amount updated successfully");

      // Update the agreement client-side to reflect the new amount
      const currentAgreement: IVippsAgreement | undefined = yield select(
        (state: AppState) => state.vippsAgreements.currentAgreement,
      );

      if (currentAgreement?.id) {
        yield put(
          fetchVippsAgreementAction.started({
            id: currentAgreement.id,
            token: action.payload.token,
          }),
        );
      }
    }
  } catch (ex) {
    yield put(updateVippsAmountAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* updateVippsStatus(action: Action<IUpdateVippsStatusActionParams>) {
  try {
    const result = yield call(API.call, {
      method: API.Method.PUT,
      endpoint: `/vipps/agreement/${action.payload.urlcode}/cancel`,
      token: action.payload.token,
    });
    // Cancel endpoint returns { status: 200, content: response }
    if (result && result.status === 200) {
      yield put(updateVippsStatusAction.done({ params: action.payload, result: undefined }));
      toast.success("Agreement cancelled successfully");

      // Update the agreement client-side to reflect the new status
      const currentAgreement: IVippsAgreement | undefined = yield select(
        (state: AppState) => state.vippsAgreements.currentAgreement,
      );

      if (currentAgreement?.id) {
        yield put(
          fetchVippsAgreementAction.started({
            id: currentAgreement.id,
            token: action.payload.token,
          }),
        );
      }
    }
  } catch (ex) {
    yield put(updateVippsStatusAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* updateVippsChargeDay(action: Action<IUpdateVippsChargeDayActionParams>) {
  try {
    const result = yield call(API.call, {
      method: API.Method.PUT,
      endpoint: `/vipps/agreement/${action.payload.urlcode}/chargeday`,
      token: action.payload.token,
      data: { chargeDay: action.payload.chargeDay },
    });
    // Charge day endpoint returns just true when successful
    if (result) {
      yield put(updateVippsChargeDayAction.done({ params: action.payload, result: undefined }));
      toast.success("Charge day updated successfully");

      // Update the agreement client-side to reflect the new charge day
      const currentAgreement: IVippsAgreement | undefined = yield select(
        (state: AppState) => state.vippsAgreements.currentAgreement,
      );

      if (currentAgreement?.id) {
        yield put(
          fetchVippsAgreementAction.started({
            id: currentAgreement.id,
            token: action.payload.token,
          }),
        );
      }
    }
  } catch (ex) {
    yield put(updateVippsChargeDayAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* updateVippsDistribution(action: Action<IUpdateVippsDistributionActionParams>) {
  try {
    const result = yield call(API.call, {
      method: API.Method.PUT,
      endpoint: `/vipps/agreement/${action.payload.urlcode}/distribution`,
      token: action.payload.token,
      data: { distribution: action.payload.distribution },
    });
    if (result) {
      yield put(updateVippsDistributionAction.done({ params: action.payload, result }));
      toast.success("Distribution updated successfully");

      // Fetch the current agreement to get the agreement ID for refetching
      const currentAgreement: IVippsAgreement | undefined = yield select(
        (state: AppState) => state.vippsAgreements.currentAgreement,
      );

      // Refetch the agreement to get the updated distribution data
      if (currentAgreement?.id) {
        yield put(
          fetchVippsAgreementAction.started({
            id: currentAgreement.id,
            token: action.payload.token,
          }),
        );
      }
    }
  } catch (ex) {
    yield put(updateVippsDistributionAction.failed({ params: action.payload, error: ex as Error }));
  }
}
