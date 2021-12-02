/* eslint-disable no-restricted-globals */
import { put, call, select } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { IAccessToken } from '../authentication/auth';
import { AppState } from '../../models/state';
import { IAvtaleGiroFilter, IPagination } from '../../models/types';
import * as API from './../../util/api';
import {
  fetchAvtaleGiroAgreementsAction,
  fetchAvtaleGiroHistogramAction,
  fetchAvtaleGiroReportAction,
  fetchAvtaleGiroValidationTableAction,
  IFetchAgreementActionParams,
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

export function* fetchAvtaleGiroAgreements(action: any) {
  try {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken);

    const pagination: IPagination = yield select(
      (state: AppState) => state.avtaleGiroAgreements.pagination
    );
    const filter: IAvtaleGiroFilter = yield select(
      (state: AppState) => state.avtaleGiroAgreements.filter
    );

    const result: API.Response = yield call(API.call, {
      endpoint: '/avtalegiro/agreements',
      method: API.Method.POST,
      token: token.token,
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
    yield put(fetchAvtaleGiroAgreementsAction.failed({ params: action.payload, error: ex }));
  }
}

export function* fetchAvtaleGiroHistogram() {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/avtalegiro/histogram',
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchAvtaleGiroHistogramAction.done({ result: result.content }));
  } catch (ex) {
    yield put(fetchAvtaleGiroHistogramAction.failed({ error: ex }));
  }
}

export function* fetchAvtaleGiroReport() {
  const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken);

  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/avtalegiro/report',
      token: token.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchAvtaleGiroReportAction.done({ result: result.content[0] }));
  } catch (ex) {
    yield put(fetchAvtaleGiroReportAction.failed({ error: ex }));
  }
}

export function* fetchAvtaleGiroValidationTable() {
  const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken);

  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/avtalegiro/validation',
      token: token.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchAvtaleGiroValidationTableAction.done({ result: result.content }));
  } catch (ex) {
    yield put(fetchAvtaleGiroValidationTableAction.failed({ error: ex }));
  }
}

export function* fetchAvtaleGiro(action: Action<IFetchAgreementActionParams>) {
  const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken);

    try {
        const result: API.Response = yield call(API.call, {
            method: API.Method.GET,
            endpoint: `/avtalegiro/agreement/${action.payload.id}`,
            token: token.token
        })
        if (result)
            yield put(fetchAvtaleGiroAction.done({params: action.payload, result: result.content}))
    }
    catch(ex) {
        yield put(fetchAvtaleGiroAction.failed({ params: action.payload, error: ex }))
    }
}

export function* updateAvtaleGiroAmount(action: Action<IUpdateAvtaleGiroAmountActionParams>) {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
    const KID = action.payload.KID
    const amount = action.payload.amount

    try {
        const result: API.Response = yield call(API.call, {
            method: API.Method.POST,
            endpoint: `/avtalegiro/${action.payload.KID}/amount`,
            token: token.token,
            data: {
                KID,
                amount
            }
        })
        if (result) {
          yield put(updateAvtaleGiroAmountAction.done({params: action.payload, result: amount}))
          location.reload()
        }
    }
    catch(ex) {
        yield put(updateAvtaleGiroAmountAction.failed({ params: action.payload, error: ex }))
    }
}

export function* updateAvtaleGiroStatus(action: Action<IUpdateAvtaleGiroStatusActionParams>) {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
    const KID = action.payload.KID
    const status = action.payload.status

    try {
        const result: API.Response = yield call(API.call, {
            method: API.Method.POST,
            endpoint: `/avtalegiro/${action.payload.KID}/status`,
            token: token.token,
            data: {
                KID,
                active: status
            }
        })
        if (result) {
          yield put(updateAvtaleGiroStatusAction.done({params: action.payload, result: status}))
          location.reload()
        }
    }
    catch(ex) {
        yield put(updateAvtaleGiroStatusAction.failed({ params: action.payload, error: ex }))
    }
}

export function* updateAvtaleGiroPaymentDate(action: Action<IUpdateAvtaleGiroPaymentDateActionParams>) {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
    const KID = action.payload.KID
    const paymentDate = action.payload.paymentDate

    try {
      const result: API.Response = yield call(API.call, {
          method: API.Method.POST,
          endpoint: `/avtalegiro/${action.payload.KID}/paymentdate`,
          token: token.token,
          data: {
              KID,
              paymentDate
          }
      })
      if (result) {
        yield put(updateAvtaleGiroPaymentDateAction.done({params: action.payload, result: paymentDate}))
        location.reload()
      }
    }
    catch(ex) {
        yield put(updateAvtaleGiroPaymentDateAction.failed({ params: action.payload, error: ex }))
    }
}

export function* updateAvtaleGiroDistribution(action: Action<IUpdateAvtaleGiroDistributionActionParams>) {
  const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken)
  const KID = action.payload.KID
  const distribution = action.payload.distribution

  try {
      const result: API.Response = yield call(API.call, {
          method: API.Method.POST,
          endpoint: `/avtalegiro/${KID}/distribution`,
          token: token.token,
          data: {
              distribution
          }
      })
      if (result) {
          yield put(updateAvtaleGiroDistributionAction.done({params: action.payload, result: true}))
          location.reload()
      }
  }
  catch(ex) {
      yield put(updateAvtaleGiroDistributionAction.failed({ params: action.payload, error: ex }))
  }
}
