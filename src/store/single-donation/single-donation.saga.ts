import { call, put } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import * as API from '../../util/api';
import {
  createDistribitionAndInsertDonationAction,
  ICreateDistributionParams,
  fetchPaymentMethodsAction,
  ICreateDonationParams,
  ICreateDistributionAndInsertDonationParams,
} from './single-donation.actions';

export function* fetchPaymentMethods(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: '/payment/methods/',
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(fetchPaymentMethodsAction.done({ params: action.params, result: data.content }));
  } catch (ex) {
    yield put(fetchPaymentMethodsAction.failed({ error: ex as Error }));
  }
}

export function* createDistributionCall(params: ICreateDistributionParams, token: string) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: '/distributions/',
      method: API.Method.POST,
      token: token,
      data: params.distribution,
    });
    if (data.status !== 200) throw new Error(data.content);
    return data.content;
  } catch (ex) {
    throw ex;
  }
}

export function* insertDonationCall(params: ICreateDonationParams, token: string) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: '/donations/confirm',
      method: API.Method.POST,
      token: token,
      data: params,
    });
    if (data.status !== 200) throw new Error(data.content);
    return data.content;
  } catch (ex) {
    throw ex;
  }
}

export function* insertDonation(action: Action<ICreateDonationParams>) {
  try {
    yield call(insertDonationCall, action.payload, action.payload.token);
    //TODO: Refactor to use common "done" action for insertion of donation
    yield put(
      createDistribitionAndInsertDonationAction.done({
        params: action.payload as any,
        result: 'OK',
      })
    );
  } catch (ex) {
    yield put(
      createDistribitionAndInsertDonationAction.failed({
        params: action.payload as any,
        error: ex as Error,
      })
    );
  }
}

export function* createDistributionAndInsertDonation(
  action: Action<ICreateDistributionAndInsertDonationParams>
) {
  try {
    let kidResult = yield call(
      createDistributionCall,
      action.payload.distribution,
      action.payload.token
    );
    let donationData = {
      ...action.payload.donation,
      KID: kidResult.KID,
    };
    yield call(insertDonationCall, donationData, action.payload.token);

    yield put(
      createDistribitionAndInsertDonationAction.done({ params: action.payload, result: 'OK' })
    );
  } catch (ex) {
    yield put(
      createDistribitionAndInsertDonationAction.failed({
        params: action.payload,
        error: ex as Error,
      })
    );
  }
}
