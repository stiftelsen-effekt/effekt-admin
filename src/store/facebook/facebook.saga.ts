import { put, call } from 'redux-saga/effects';
import * as API from '../../util/api';
import { Action } from 'typescript-fsa';
import {
  IRegisterCampaignActionParams,
  registerCampaignAction,
  processDonationsAction,
  IProcessDonationsActionParams,
} from './facebook.actions';

export function* registerFBCampaign(action: Action<IRegisterCampaignActionParams>) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: `/facebook/register/campaign`,
      method: API.Method.POST,
      token: action.payload.token,
      data: action.payload.campaign,
    });
    if (data.status !== 200) throw new Error(data.content);
    else {
      yield put(registerCampaignAction.done({ params: action.payload, result: data.content }));
    }
  } catch (ex) {
    yield put(registerCampaignAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* processFBDonations(action: Action<IProcessDonationsActionParams>) {
  try {
    const formData = new FormData();
    formData.append('metaOwnerID', action.payload.metaOwnerID.toString());

    var data: API.Response = yield call(API.call, {
      endpoint: `/facebook/register/donations`,
      method: API.Method.POST,
      token: action.payload.token,
      formData,
    });
    if (data.status !== 200) throw new Error(data.content);
    else {
      yield put(processDonationsAction.done({ params: action.payload, result: data.content }));
    }
  } catch (ex) {
    yield put(processDonationsAction.failed({ params: action.payload, error: ex as Error }));
  }
}
