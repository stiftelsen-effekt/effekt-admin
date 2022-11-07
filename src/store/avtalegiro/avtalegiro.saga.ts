/* eslint-disable no-restricted-globals */
import { put, call, select } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { AppState } from '../../models/state';
import {
  IAvtaleGiro,
  IAvtaleGiroFilter,
  IDonation,
  IHistogramBucket,
  IPagination,
} from '../../models/types';
import * as API from './../../util/api';
import {
  fetchAvtaleGiroAgreementsAction,
  fetchAvtaleGiroExpectedByDateAction,
  fetchAvtaleGiroHistogramAction,
  fetchAvtaleGiroMissingByDateAction,
  fetchAvtaleGiroRecievedByDateAction,
  fetchAvtaleGiroReportAction,
  fetchAvtaleGiroValidationTableAction,
  IFetchAgreementActionParams,
  IFetchAvtaleGiroAgreementsActionParams,
  IFetchAvtaleGiroDateValidationParams,
  IFetchAvtaleGiroHistogramActionParams,
  IFetchAvtaleGiroReportActionParams,
  IFetchAvtaleGiroValidationTableActionParams,
  IUpdateAvtaleGiroAmountActionParams,
  IUpdateAvtaleGiroDistributionActionParams,
  IUpdateAvtaleGiroPaymentDateActionParams,
  IUpdateAvtaleGiroStatusActionParams,
  updateAvtaleGiroAmountAction,
  updateAvtaleGiroDistributionAction,
  updateAvtaleGiroPaymentDateAction,
  updateAvtaleGiroStatusAction,
} from './avtalegiro.actions';
import { fetchAvtaleGiroAction } from './avtalegiro.actions';

export function* fetchAvtaleGiroAgreements(action: Action<IFetchAvtaleGiroAgreementsActionParams>) {
  try {
    const pagination: IPagination = yield select(
      (state: AppState) => state.avtaleGiroAgreements.pagination
    );
    const filter: IAvtaleGiroFilter = yield select(
      (state: AppState) => state.avtaleGiroAgreements.filter
    );

    const result: API.Response = yield call(API.call, {
      endpoint: '/avtalegiro/agreements',
      method: API.Method.POST,
      token: action.payload.token,
      data: {
        ...pagination,
        filter,
      },
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchAvtaleGiroAgreementsAction.done({ params: action.payload, result: result.content })
    );
  } catch (ex) {
    yield put(
      fetchAvtaleGiroAgreementsAction.failed({
        error: new Error(typeof ex === 'string' ? ex : ''),
        params: action.payload,
      })
    );
  }
}

export function* fetchAvtaleGiroHistogram(action: Action<IFetchAvtaleGiroHistogramActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/avtalegiro/histogram',
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchAvtaleGiroHistogramAction.done({
        params: action.payload,
        result: result.content as IHistogramBucket[],
      })
    );
  } catch (ex) {
    yield put(
      fetchAvtaleGiroHistogramAction.failed({
        params: action.payload,
        error: new Error(typeof ex === 'string' ? ex : ''),
      })
    );
  }
}

export function* fetchAvtaleGiroReport(action: Action<IFetchAvtaleGiroReportActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/avtalegiro/report',
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchAvtaleGiroReportAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(
      fetchAvtaleGiroReportAction.failed({
        params: action.payload,
        error: new Error(typeof ex === 'string' ? ex : ''),
      })
    );
  }
}

export function* fetchAvtaleGiroValidationTable(
  action: Action<IFetchAvtaleGiroValidationTableActionParams>
) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/avtalegiro/validation',
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchAvtaleGiroValidationTableAction.done({ params: action.payload, result: result.content })
    );
  } catch (ex) {
    yield put(
      fetchAvtaleGiroValidationTableAction.failed({
        params: action.payload,
        error: new Error(typeof ex === 'string' ? ex : ''),
      })
    );
  }
}

export function* fetchAvtaleGiroMissingByDate(
  action: Action<IFetchAvtaleGiroDateValidationParams>
) {
  try {
    const result: API.TypedResponse<Array<IAvtaleGiro>> = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/avtalegiro/missing/',
      data: { date: action.payload.date.toISO() },
      token: action.payload.token,
    });
    if (API.isOk(result))
      yield put(
        fetchAvtaleGiroMissingByDateAction.done({
          params: action.payload,
          result: result.content,
        })
      );
    else throw new Error(result.content);
  } catch (ex) {
    yield put(
      fetchAvtaleGiroMissingByDateAction.failed({
        error: new Error(typeof ex === 'string' ? ex : ''),
        params: action.payload,
      })
    );
  }
}

export function* fetchAvtaleGiroRecievedByDate(
  action: Action<IFetchAvtaleGiroDateValidationParams>
) {
  try {
    const result: API.TypedResponse<Array<IDonation>> = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/avtalegiro/recieved/',
      data: { date: action.payload.date.toISO() },
      token: action.payload.token,
    });
    if (API.isOk(result))
      yield put(
        fetchAvtaleGiroRecievedByDateAction.done({
          params: action.payload,
          result: result.content,
        })
      );
    else throw new Error(result.content);
  } catch (ex) {
    yield put(
      fetchAvtaleGiroRecievedByDateAction.failed({
        error: new Error(typeof ex === 'string' ? ex : ''),
        params: action.payload,
      })
    );
  }
}

export function* fetchAvtaleGiroExpectedByDate(
  action: Action<IFetchAvtaleGiroDateValidationParams>
) {
  try {
    const result: API.TypedResponse<Array<IAvtaleGiro>> = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/avtalegiro/expected/',
      data: { date: action.payload.date.toISO() },
      token: action.payload.token,
    });
    if (API.isOk(result))
      yield put(
        fetchAvtaleGiroExpectedByDateAction.done({
          params: action.payload,
          result: result.content,
        })
      );
    else throw new Error(result.content);
  } catch (ex) {
    yield put(
      fetchAvtaleGiroExpectedByDateAction.failed({
        error: new Error(typeof ex === 'string' ? ex : ''),
        params: action.payload,
      })
    );
  }
}

export function* fetchAvtaleGiro(action: Action<IFetchAgreementActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: `/avtalegiro/agreement/${action.payload.id}`,
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    const donationsResult = yield call(API.call, {
      endpoint: `/avtalegiro/donations/${result.content.KID}`,
      method: API.Method.GET,
      token: action.payload.token,
    });
    if (donationsResult.status !== 200) throw new Error(donationsResult.content);
    result.content.affiliatedDonations = donationsResult.content;
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchAvtaleGiroAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(
      fetchAvtaleGiroAction.failed({
        error: ex as Error,
        params: action.payload,
      })
    );
  }
}

export function* updateAvtaleGiroAmount(action: Action<IUpdateAvtaleGiroAmountActionParams>) {
  const KID = action.payload.KID;
  const amount = action.payload.amount;

  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.POST,
      endpoint: `/avtalegiro/${action.payload.KID}/amount`,
      token: action.payload.token,
      data: {
        KID,
        amount,
      },
    });
    if (result) {
      yield put(updateAvtaleGiroAmountAction.done({ params: action.payload, result: amount }));
    }
  } catch (ex) {
    yield put(
      updateAvtaleGiroAmountAction.failed({
        error: new Error(typeof ex === 'string' ? ex : ''),
        params: action.payload,
      })
    );
  }
}

export function* updateAvtaleGiroStatus(action: Action<IUpdateAvtaleGiroStatusActionParams>) {
  const KID = action.payload.KID;
  const status = action.payload.status;

  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.POST,
      endpoint: `/avtalegiro/${action.payload.KID}/status`,
      token: action.payload.token,
      data: {
        KID,
        active: status,
      },
    });
    if (result) {
      yield put(updateAvtaleGiroStatusAction.done({ params: action.payload, result: status }));
    }
  } catch (ex) {
    yield put(
      updateAvtaleGiroStatusAction.failed({
        error: new Error(typeof ex === 'string' ? ex : ''),
        params: action.payload,
      })
    );
  }
}

export function* updateAvtaleGiroPaymentDate(
  action: Action<IUpdateAvtaleGiroPaymentDateActionParams>
) {
  const KID = action.payload.KID;
  const paymentDate = action.payload.paymentDate;

  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.POST,
      endpoint: `/avtalegiro/${action.payload.KID}/paymentdate`,
      token: action.payload.token,
      data: {
        KID,
        paymentDate,
      },
    });
    if (result) {
      yield put(
        updateAvtaleGiroPaymentDateAction.done({ params: action.payload, result: paymentDate })
      );
    }
  } catch (ex) {
    yield put(
      updateAvtaleGiroPaymentDateAction.failed({
        error: new Error(typeof ex === 'string' ? ex : ''),
        params: action.payload,
      })
    );
  }
}

export function* updateAvtaleGiroDistribution(
  action: Action<IUpdateAvtaleGiroDistributionActionParams>
) {
  const KID = action.payload.KID;
  const distribution = action.payload.distribution;

  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.POST,
      endpoint: `/avtalegiro/${KID}/distribution`,
      token: action.payload.token,
      data: {
        distribution,
      },
    });
    if (result) {
      yield put(updateAvtaleGiroDistributionAction.done({ params: action.payload, result: true }));
    }
  } catch (ex) {
    yield put(
      updateAvtaleGiroDistributionAction.failed({
        error: new Error(typeof ex === 'string' ? ex : ''),
        params: action.payload,
      })
    );
  }
}
