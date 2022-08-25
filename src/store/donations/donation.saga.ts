import { put, call } from 'redux-saga/effects';
import {
  fetchDonationAction,
  IFetchDonationActionParams,
  fetchHistogramAction,
  IFetchDonationsHistogramActionParams,
  deleteDonationAction,
  IDeleteDonationActionParams,
} from './donation.actions';
import { fetchDonationsAction } from './donations-list.actions';
import { Action } from 'typescript-fsa';
import * as API from '../../util/api';

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
    yield put(fetchDonationAction.failed({ params: action.payload, error: (ex as Error) }));
  }
}

export function* fetchHistogram(action: Action<IFetchDonationsHistogramActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/donations/histogram',
      token: action.payload.token
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchHistogramAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(fetchHistogramAction.failed({ params: action.payload, error: (ex as Error) }));
  }
}

export function* deleteDonation(action: Action<IDeleteDonationActionParams>) {
  try {
    const result: API.Response = yield call(API.call, {
      endpoint: `/donations/${action.payload.id}`,
      method: API.Method.DELETE,
      token: action.payload.token,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(deleteDonationAction.done({ params: action.payload, result: result.content }));
    yield put(fetchDonationsAction.started({ token: action.payload.token }));
  } catch (ex) {
    yield put(deleteDonationAction.failed({ params: action.payload, error: ex as Error }));
  }
}
