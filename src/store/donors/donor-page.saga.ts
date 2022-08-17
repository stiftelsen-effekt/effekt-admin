import { put, call } from 'redux-saga/effects';
import * as API from '../../util/api';
import { IAvtaleGiro, IDistributionSearchResultItem, IDistributionShare, IDonation, IDonor, IVippsAgreement } from '../../models/types';
import { getDonorAction, getDonorAvtalegiroAgreementsAction, getDonorDistributionsAction, getDonorDonationsAction, getDonorVippsAgreementsAction, getDonorYearlyAggregatesAction, updateDonorDataAction, IFetchDonorActionParams, IFetchDonorAvtalegiroAgreementsActionParams, IFetchDonorDistributionsActionParams, IFetchDonorDonationsActionParams, IFetchDonorVippsAgreementsActionParams, IFetchDonorYearlyAggregatesActionParams, IUpdateDonorDataParams } from './donor-page.actions';
import { Action } from 'typescript-fsa';

export function* getDonor(action: Action<IFetchDonorActionParams>) {
  try {
    const data: API.TypedResponse<IDonor> = yield call(API.call, {
      endpoint: `/donors/${action.payload.id}`,
      method: API.Method.GET,
      token: action.payload.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorAction.done({ params: action.payload, result: data.content as IDonor }));
  } catch (ex) {
    yield put(getDonorAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* getDonorDonations(action: Action<IFetchDonorDonationsActionParams>) {
  try {
    const data: API.TypedResponse<Array<IDonation>> = yield call(API.call, {
      endpoint: `/donors/${action.payload.id}/donations`,
      method: API.Method.GET,
      token: action.payload.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorDonationsAction.done({ params: action.payload, result: data.content as Array<IDonation> }));
  } catch (ex) {
    yield put(getDonorDonationsAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* getDonorDistributions(action: Action<IFetchDonorDistributionsActionParams>) {
  try {
    const data: API.TypedResponse<Array<IDistributionSearchResultItem>> = yield call(API.call, {
      endpoint: `/donors/${action.payload.id}/distributions/aggregated`,
      method: API.Method.GET,
      token: action.payload.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorDistributionsAction.done({ params: action.payload, result: data.content as Array<IDistributionSearchResultItem> }));
  } catch (ex) {
    yield put(getDonorDistributionsAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* getDonorAvtalegiroAgreements(action: Action<IFetchDonorAvtalegiroAgreementsActionParams>) {
  try {
    const data: API.TypedResponse<Array<IAvtaleGiro>> = yield call(API.call, {
      endpoint: `/donors/${action.payload.id}/recurring/avtalegiro`,
      method: API.Method.GET,
      token: action.payload.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorAvtalegiroAgreementsAction.done({ params: action.payload, result: data.content as Array<IAvtaleGiro> }));
  } catch (ex) {
    yield put(getDonorAvtalegiroAgreementsAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* getDonorVippsAgreements(action: Action<IFetchDonorVippsAgreementsActionParams>) {
  try {
    const data: API.TypedResponse<Array<IVippsAgreement>> = yield call(API.call, {
      endpoint: `/donors/${action.payload.id}/recurring/vipps`,
      method: API.Method.GET,
      token: action.payload.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorVippsAgreementsAction.done({ params: action.payload, result: data.content as Array<IVippsAgreement> }));
  } catch (ex) {
    yield put(getDonorVippsAgreementsAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* getDonorYearlyAggregates(action: Action<IFetchDonorYearlyAggregatesActionParams>) {
  try {
    const data: API.TypedResponse<Array<IDistributionShare & { year: number }>> = yield call(API.call, {
      endpoint: `/donors/${action.payload.id}/donations/aggregated`,
      method: API.Method.GET,
      token: action.payload.token
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(getDonorYearlyAggregatesAction.done({ params: action.payload, result: data.content as Array<IDistributionShare & { year: number }> }));
  } catch (ex) {
    yield put(getDonorYearlyAggregatesAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* updateDonorData(action: Action<IUpdateDonorDataParams>) {
  try {
    const data: API.TypedResponse<boolean> = yield call(API.call, {
      endpoint: `/donors/${action.payload.donor.id}`,
      method: API.Method.PUT,
      token: action.payload.token,
      data: {
        id: action.payload.donor.id,
        name: action.payload.donor.name,
        email: action.payload.donor.email,
        ssn: action.payload.donor.ssn,
        newsletter: Boolean(action.payload.donor.newsletter),
        trash: Boolean(action.payload.donor.trash),
        registered: action.payload.donor.registered,
      }
    });
    if (data.status !== 200) throw new Error(data.content as string);

    yield put(updateDonorDataAction.done({ params: action.payload, result: data.content as boolean }));
  } catch (ex) {
    yield put(updateDonorDataAction.failed({ params: action.payload, error: ex as Error }));
  }
}
