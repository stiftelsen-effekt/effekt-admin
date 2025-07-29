/* eslint-disable no-restricted-globals */
import { put, call, select } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import { AppState } from "../../models/state";
import {
  IAutoGiro,
  IAutoGiroFilter,
  IDonation,
  IHistogramBucket,
  IPagination,
} from "../../models/types";
import * as API from "../../util/api";
import {
  exportAutoGiroAgreementsAction,
  fetchAutoGiroAgreementsAction,
  fetchAutoGiroExpectedByDateAction,
  fetchAutoGiroHistogramAction,
  fetchAutoGiroMissingByDateAction,
  fetchAutoGiroRecievedByDateAction,
  fetchAutoGiroReportAction,
  fetchAutoGiroValidationTableAction,
  IFetchAgreementActionParams,
  IFetchAutoGiroAgreementsActionParams,
  IFetchAutoGiroDateValidationParams,
  IFetchAutoGiroHistogramActionParams,
  IFetchAutoGiroReportActionParams,
  IFetchAutoGiroValidationTableActionParams,
  IUpdateAutoGiroAmountActionParams,
  IUpdateAutoGiroDistributionActionParams,
  IUpdateAutoGiroPaymentDateActionParams,
  IUpdateAutoGiroStatusActionParams,
  updateAutoGiroAmountAction,
  updateAutoGiroDistributionAction,
  updateAutoGiroPaymentDateAction,
  updateAutoGiroStatusAction,
} from "./autogiro.actions";
import { fetchAutoGiroAction } from "./autogiro.actions";
import { DateTime } from "luxon";
import { toastError } from "../../util/toasthelper";

export function* fetchAutoGiroAgreements(action: Action<IFetchAutoGiroAgreementsActionParams>) {
  try {
    const pagination: IPagination = yield select(
      (state: AppState) => state.autoGiroAgreements.pagination,
    );
    const filter: IAutoGiroFilter = yield select(
      (state: AppState) => state.autoGiroAgreements.filter,
    );

    const result: API.Response = yield call(API.call, {
      endpoint: "/autogiro/agreements",
      method: API.Method.POST,
      token: action.payload.token,
      data: {
        ...pagination,
        filter,
      },
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchAutoGiroAgreementsAction.done({ params: action.payload, result: result.content }),
    );
  } catch (ex) {
    yield put(
      fetchAutoGiroAgreementsAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}

export function* fetchAutoGiroHistogram(action: Action<IFetchAutoGiroHistogramActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/autogiro/histogram",
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchAutoGiroHistogramAction.done({
        params: action.payload,
        result: result.content as IHistogramBucket[],
      }),
    );
  } catch (ex) {
    yield put(
      fetchAutoGiroHistogramAction.failed({
        params: action.payload,
        error: new Error(typeof ex === "string" ? ex : ""),
      }),
    );
  }
}

export function* fetchAutoGiroReport(action: Action<IFetchAutoGiroReportActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/autogiro/report",
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchAutoGiroReportAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(
      fetchAutoGiroReportAction.failed({
        params: action.payload,
        error: new Error(typeof ex === "string" ? ex : ""),
      }),
    );
  }
}

export function* fetchAutoGiroValidationTable(
  action: Action<IFetchAutoGiroValidationTableActionParams>,
) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/autogiro/validation",
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchAutoGiroValidationTableAction.done({ params: action.payload, result: result.content }),
    );
  } catch (ex) {
    yield put(
      fetchAutoGiroValidationTableAction.failed({
        params: action.payload,
        error: new Error(typeof ex === "string" ? ex : ""),
      }),
    );
  }
}

export function* fetchAutoGiroMissingByDate(action: Action<IFetchAutoGiroDateValidationParams>) {
  try {
    const result: API.TypedResponse<Array<IAutoGiro>> = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/autogiro/missing/",
      data: { date: action.payload.date.toISO() },
      token: action.payload.token,
    });
    if (API.isOk(result))
      yield put(
        fetchAutoGiroMissingByDateAction.done({
          params: action.payload,
          result: result.content,
        }),
      );
    else throw new Error(result.content);
  } catch (ex) {
    yield put(
      fetchAutoGiroMissingByDateAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}

export function* fetchAutoGiroRecievedByDate(action: Action<IFetchAutoGiroDateValidationParams>) {
  try {
    const result: API.TypedResponse<Array<IDonation>> = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/autogiro/recieved/",
      data: { date: action.payload.date.toISO() },
      token: action.payload.token,
    });
    if (API.isOk(result))
      yield put(
        fetchAutoGiroRecievedByDateAction.done({
          params: action.payload,
          result: result.content,
        }),
      );
    else throw new Error(result.content);
  } catch (ex) {
    yield put(
      fetchAutoGiroRecievedByDateAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}

export function* fetchAutoGiroExpectedByDate(action: Action<IFetchAutoGiroDateValidationParams>) {
  try {
    const result: API.TypedResponse<Array<IAutoGiro>> = yield call(API.call, {
      method: API.Method.GET,
      endpoint: "/autogiro/expected/",
      data: { date: action.payload.date.toISO() },
      token: action.payload.token,
    });
    if (API.isOk(result))
      yield put(
        fetchAutoGiroExpectedByDateAction.done({
          params: action.payload,
          result: result.content,
        }),
      );
    else throw new Error(result.content);
  } catch (ex) {
    yield put(
      fetchAutoGiroExpectedByDateAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}

export function* fetchAutoGiro(action: Action<IFetchAgreementActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: `/autogiro/agreement/${action.payload.id}`,
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    const donationsResult = yield call(API.call, {
      endpoint: `/autogiro/donations/${result.content.KID}`,
      method: API.Method.GET,
      token: action.payload.token,
    });
    if (donationsResult.status !== 200) throw new Error(donationsResult.content);
    result.content.affiliatedDonations = donationsResult.content;
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchAutoGiroAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(
      fetchAutoGiroAction.failed({
        error: ex as Error,
        params: action.payload,
      }),
    );
  }
}

export function* updateAutoGiroAmount(action: Action<IUpdateAutoGiroAmountActionParams>) {
  const KID = action.payload.KID;
  const amount = action.payload.amount;

  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.POST,
      endpoint: `/autogiro/${action.payload.KID}/amount`,
      token: action.payload.token,
      data: {
        KID,
        amount,
      },
    });
    if (result) {
      yield put(updateAutoGiroAmountAction.done({ params: action.payload, result: amount }));
    }
  } catch (ex) {
    yield put(
      updateAutoGiroAmountAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}

export function* updateAutoGiroStatus(action: Action<IUpdateAutoGiroStatusActionParams>) {
  const KID = action.payload.KID;
  const status = action.payload.status;

  try {
    if (status !== 0 && status !== 1) throw new Error("Invalid status");

    const result: API.Response = yield call(API.call, {
      method: API.Method.PUT,
      endpoint: `/autogiro/${KID}/${status === 1 ? "activate" : "cancel"}`,
      token: action.payload.token,
    });
    if (result) {
      yield put(updateAutoGiroStatusAction.done({ params: action.payload, result: status }));
    }
  } catch (ex) {
    yield put(
      updateAutoGiroStatusAction.failed({
        error: new Error(typeof ex === "string" ? ex : (ex as Error).message),
        params: action.payload,
      }),
    );
  }
}

export function* updateAutoGiroPaymentDate(action: Action<IUpdateAutoGiroPaymentDateActionParams>) {
  const KID = action.payload.KID;
  const paymentDate = action.payload.paymentDate;

  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.POST,
      endpoint: `/autogiro/${action.payload.KID}/paymentdate`,
      token: action.payload.token,
      data: {
        KID,
        paymentDate,
      },
    });
    if (result) {
      yield put(
        updateAutoGiroPaymentDateAction.done({ params: action.payload, result: paymentDate }),
      );
    }
  } catch (ex) {
    yield put(
      updateAutoGiroPaymentDateAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}

export function* updateAutoGiroDistribution(
  action: Action<IUpdateAutoGiroDistributionActionParams>,
) {
  const KID = action.payload.KID;
  const distribution = action.payload.distribution;

  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.PUT,
      endpoint: `/autogiro/${KID}/`,
      token: action.payload.token,
      data: {
        distribution: distribution,
      },
    });
    if (result) {
      yield put(updateAutoGiroDistributionAction.done({ params: action.payload, result: true }));
    }
  } catch (ex) {
    yield put(
      updateAutoGiroDistributionAction.failed({
        error: new Error(typeof ex === "string" ? ex : ""),
        params: action.payload,
      }),
    );
  }
}

export function* exportAutoGiroAgreements(action: Action<{ token: string }>) {
  try {
    const state: AppState = yield select();
    const { token } = action.payload;

    const result: { blob: Blob; filename?: string } = yield call(API.callForBlob, {
      endpoint: "/autogiro/agreements",
      method: API.Method.POST,
      token,
      data: {
        ...state.autoGiroAgreements.pagination,
        filter: state.autoGiroAgreements.filter,
        export: true,
      },
    });

    const filename =
      result.filename ||
      `autogiro_agreements_export_${DateTime.now().toISO({ includeOffset: true })}.csv`;

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

    yield put(exportAutoGiroAgreementsAction.done({ params: action.payload, result: undefined }));
  } catch (error) {
    toastError("Failed export", (error as Error).message);
    yield put(
      exportAutoGiroAgreementsAction.failed({ params: action.payload, error: error as Error }),
    );
  }
}
