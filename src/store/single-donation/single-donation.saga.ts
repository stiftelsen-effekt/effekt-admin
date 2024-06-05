import { call, put } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import * as API from "../../util/api";
import {
  createDistribitionAndInsertDonationAction,
  ICreateDistributionParams,
  fetchPaymentMethodsAction,
  ICreateDonationParams,
  ICreateDistributionAndInsertDonationParams,
  IInsertDonationParams,
} from "./single-donation.actions";

export function* fetchPaymentMethods(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/payment/methods/",
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
      endpoint: "/distributions/",
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

export function* insertDonationCall(donation: ICreateDonationParams, token: string) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/donations/confirm",
      method: API.Method.POST,
      token: token,
      data: donation,
    });
    if (data.status !== 200) throw new Error(data.content);
    return data.content;
  } catch (ex) {
    throw ex;
  }
}

export function* insertDonation(action: Action<IInsertDonationParams>) {
  try {
    yield call(insertDonationCall, action.payload.donation, action.payload.token);
    //TODO: Refactor to use common "done" action for insertion of donation
    yield put(
      createDistribitionAndInsertDonationAction.done({
        params: action.payload as any,
        result: "OK",
      }),
    );
  } catch (ex) {
    yield put(
      createDistribitionAndInsertDonationAction.failed({
        params: action.payload as any,
        error: ex as Error,
      }),
    );
  }
}

export function* createDistributionAndInsertDonation(
  action: Action<ICreateDistributionAndInsertDonationParams>,
) {
  try {
    let kidResult = yield call(
      createDistributionCall,
      action.payload.distribution,
      action.payload.token,
    );
    let donationData = {
      ...action.payload.donation,
      KID: kidResult.KID,
    };
    console.log("saga", action);

    yield call(insertDonationCall, donationData, action.payload.token);

    console.log("saga", action);
    yield put(
      createDistribitionAndInsertDonationAction.done({ params: action.payload, result: "OK" }),
    );
  } catch (ex) {
    yield put(
      createDistribitionAndInsertDonationAction.failed({
        params: action.payload,
        error: ex as Error,
      }),
    );
  }
}
