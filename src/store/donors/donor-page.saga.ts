import { put, call, select } from 'redux-saga/effects';
import * as API from '../../util/api';
import { IAvtaleGiro, IDistributionSearchResultItem, IDistributionShare, IDonation, IDonor, IVippsAgreement } from '../../models/types';
import { getDonorAction, getDonorAvtalegiroAgreementsAction, getDonorDistributionsAction, getDonorDonationsAction, getDonorVippsAgreementsAction, getDonorYearlyAggregatesAction } from './donor-page.actions';
import { IAccessToken } from '../authentication/auth';
import { getApiToken } from './donor-selection.saga';

export function* getDonor(action: any) {
  try {
    const accessToken: IAccessToken = yield select(getApiToken)
    const data: API.TypedResponse<IDonor> = yield call(API.call, {
      endpoint: `/donors/${action.payload}`,
      method: API.Method.GET,
      token: accessToken.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorAction.done({ params: action.payload, result: data.content as IDonor }));
  } catch (ex) {
    yield put(getDonorAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* getDonorDonations(action: any) {
  try {
    const accessToken: IAccessToken = yield select(getApiToken)
    const data: API.TypedResponse<Array<IDonation>> = yield call(API.call, {
      endpoint: `/donors/${action.payload}/donations`,
      method: API.Method.GET,
      token: accessToken.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorDonationsAction.done({ params: action.payload, result: data.content as Array<IDonation> }));
  } catch (ex) {
    yield put(getDonorDonationsAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* getDonorDistributions(action: any) {
  try {
    const accessToken: IAccessToken = yield select(getApiToken)
    const data: API.TypedResponse<Array<IDistributionSearchResultItem>> = yield call(API.call, {
      endpoint: `/donors/${action.payload}/distributions`,
      method: API.Method.GET,
      token: accessToken.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorDistributionsAction.done({ params: action.payload, result: data.content as Array<IDistributionSearchResultItem> }));
  } catch (ex) {
    yield put(getDonorDistributionsAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* getDonorAvtalegiroAgreements(action: any) {
  try {
    const accessToken: IAccessToken = yield select(getApiToken)
    const data: API.TypedResponse<Array<IAvtaleGiro>> = yield call(API.call, {
      endpoint: `/donors/${action.payload}/recurring/avtalegiro`,
      method: API.Method.GET,
      token: accessToken.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorAvtalegiroAgreementsAction.done({ params: action.payload, result: data.content as Array<IAvtaleGiro> }));
  } catch (ex) {
    yield put(getDonorAvtalegiroAgreementsAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* getDonorVippsAgreements(action: any) {
  try {
    const accessToken: IAccessToken = yield select(getApiToken)
    const data: API.TypedResponse<Array<IVippsAgreement>> = yield call(API.call, {
      endpoint: `/donors/${action.payload}/recurring/vipps`,
      method: API.Method.GET,
      token: accessToken.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorVippsAgreementsAction.done({ params: action.payload, result: data.content as Array<IVippsAgreement> }));
  } catch (ex) {
    yield put(getDonorVippsAgreementsAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* getDonorYearlyAggregates(action: any) {
  try {
    const accessToken: IAccessToken = yield select(getApiToken)
    const data: API.TypedResponse<Array<IDistributionShare & { year: number }>> = yield call(API.call, {
      endpoint: `/donors/${action.payload}/donations/aggregated`,
      method: API.Method.GET,
      token: accessToken.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorYearlyAggregatesAction.done({ params: action.payload, result: data.content as Array<IDistributionShare & { year: number }> }));
  } catch (ex) {
    yield put(getDonorYearlyAggregatesAction.failed({ params: action.payload, error: ex as Error }));
  }
}