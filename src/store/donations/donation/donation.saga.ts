import { put, select, call } from 'redux-saga/effects';
import { Action, AnyAction } from 'typescript-fsa';
import {
  fetchDonationAction,
  IFetchDonationActionParams,
  fetchHistogramAction,
} from './donation.actions';
import { IAccessToken } from '../../../auth/auth';
import { AppState } from '../../state';
import * as API from '../../../util/api';

export function* fetchDonation(action: Action<IFetchDonationActionParams>) {
  try {
    const accessToken: IAccessToken = yield select(
      (state: AppState) => state.auth.currentToken,
    );
    const result: API.Response = yield call(API.call, {
      endpoint: `/donations/${action.payload.id}`,
      token: accessToken.token,
      method: API.Method.GET,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(
      fetchDonationAction.done({
        params: action.payload,
        result: result.content,
      }),
    );
  } catch (ex) {
    yield put(
      fetchDonationAction.failed({ params: action.payload, error: ex }),
    );
  }
}

export function* fetchHistogram(action: AnyAction) {
  try {
    const result: API.Response = yield call(API.call, {
      method: API.Method.GET,
      endpoint: '/donations/histogram',
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchHistogramAction.done({ result: result.content }));
  } catch (ex) {
    yield put(fetchHistogramAction.failed({ error: ex }));
  }
}
