import { put, call } from 'redux-saga/effects';
import { IResendReceiptPayload, resendReceiptAction } from './receipt.actions';
import * as API from '../../util/api';
import { Action } from 'typescript-fsa';

export function* resendReceipt(action: Action<IResendReceiptPayload>) {
  try {
    const result: API.Response = yield call(API.call, {
      endpoint: `/donations/${action.payload.donationID}/receipt`,
      method: API.Method.POST,
      token: action.payload.token,
      data: action.payload,
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(resendReceiptAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(resendReceiptAction.failed({ params: action.payload, error: ex as Error }));
  }
}
