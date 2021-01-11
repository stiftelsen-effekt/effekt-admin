import { call, put, select } from 'redux-saga/effects';
import * as API from '../../../../util/api';
import {
  createDistribitionAndInsertDonationAction,
  ICreateDistributionParams,
  fetchPaymentMethodsAction,
  ICreateDonationParams,
} from './single-donation.actions';
import { AppState } from '../../../state';
import { IAccessToken } from '../../../../auth/auth';

const getApiToken = (state: AppState) => state.auth.currentToken;

export function* fetchPaymentMethods(action: any) {
  try {
    const data = yield call(API.call, {
      endpoint: '/payment/methods/',
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(
      fetchPaymentMethodsAction.done({
        params: action.params,
        result: data.content,
      }),
    );
  } catch (ex) {
    yield put(fetchPaymentMethodsAction.failed(ex));
  }
}

export function* createDistributionCall(params: ICreateDistributionParams) {
  const accessToken: IAccessToken = yield select(getApiToken);
  const data = yield call(API.call, {
    endpoint: '/distributions/',
    method: API.Method.POST,
    token: accessToken.token,
    data: params,
  });
  if (data.status !== 200) throw new Error(data.content);
  return data.content;
}

export function* insertDonationCall(params: ICreateDonationParams) {
  const accessToken: IAccessToken = yield select(getApiToken);
  const data = yield call(API.call, {
    endpoint: '/donations/confirm',
    method: API.Method.POST,
    token: accessToken.token,
    data: params,
  });
  if (data.status !== 200) throw new Error(data.content);
  return data.content;
}

export function* insertDonation(action: any) {
  try {
    yield call(insertDonationCall, action.payload);
    // TODO: Refactor to use common "done" action for insertion of donation
    yield put(
      createDistribitionAndInsertDonationAction.done({
        params: action.payload,
        result: 'OK',
      }),
    );
  } catch (ex) {
    yield put(
      createDistribitionAndInsertDonationAction.failed({
        params: action.payload,
        error: ex,
      }),
    );
  }
}

export function* createDistributionAndInsertDonation(action: any) {
  try {
    const KID = yield call(createDistributionCall, action.payload.distribution);
    const donationData = {
      ...action.payload.donation,
      KID,
    };
    yield call(insertDonationCall, donationData);

    yield put(
      createDistribitionAndInsertDonationAction.done({
        params: action.payload,
        result: 'OK',
      }),
    );
  } catch (ex) {
    yield put(
      createDistribitionAndInsertDonationAction.failed({
        params: action.payload,
        error: ex,
      }),
    );
  }
}
