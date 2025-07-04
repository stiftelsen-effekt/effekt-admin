import { call, put } from "redux-saga/effects";
import * as API from "../../util/api";
import {
  fetchActiveRefferalsAction,
  fetchAllRefferalsAction,
  createReferralTypeAction,
  updateReferralTypeAction,
  toggleReferralTypeActiveAction,
  ICreateReferralTypeActionParams,
  IUpdateReferralTypeActionParams,
  IToggleReferralTypeActiveActionParams,
} from "./referrals.action";
import { toast } from "react-toastify";
import { Action } from "typescript-fsa";

export function* fetchActiveReferrals(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/referrals/types/",
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(fetchActiveRefferalsAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(fetchActiveRefferalsAction.failed({ error: ex as Error }));
  }
}

export function* fetchAllReferrals(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/referrals/types/all/",
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(fetchAllRefferalsAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(fetchAllRefferalsAction.failed({ error: ex as Error }));
  }
}

export function* createReferralType(action: Action<ICreateReferralTypeActionParams>) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/referrals/types",
      method: API.Method.POST,
      data: action.payload.referral,
      token: action.payload.token,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(createReferralTypeAction.done({ params: action.payload, result: data.content }));
    toast.success("Referral type created successfully");
    yield put(fetchAllRefferalsAction.started(undefined));
  } catch (ex) {
    yield put(createReferralTypeAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* updateReferralType(action: Action<IUpdateReferralTypeActionParams>) {
  try {
    const { id, ...updateData } = action.payload.referral;
    var data: API.Response = yield call(API.call, {
      endpoint: `/referrals/types/${id}`,
      method: API.Method.PUT,
      data: updateData,
      token: action.payload.token,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(updateReferralTypeAction.done({ params: action.payload, result: data.content }));
    toast.success("Referral type updated successfully");
    yield put(fetchAllRefferalsAction.started(undefined));
  } catch (ex) {
    yield put(updateReferralTypeAction.failed({ params: action.payload, error: ex as Error }));
  }
}

export function* toggleReferralTypeActive(action: Action<IToggleReferralTypeActiveActionParams>) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: `/referrals/types/${action.payload.referralId}/toggle-active`,
      method: API.Method.PUT,
      token: action.payload.token,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(
      toggleReferralTypeActiveAction.done({ params: action.payload, result: data.content }),
    );
    toast.success("Referral type status toggled successfully");
    yield put(fetchAllRefferalsAction.started(undefined));
  } catch (ex) {
    yield put(
      toggleReferralTypeActiveAction.failed({ params: action.payload, error: ex as Error }),
    );
  }
}
