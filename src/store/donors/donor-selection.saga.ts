import { call, put } from 'redux-saga/effects';
import * as API from '../../util/api';
import { IFetchSearchDonorsActionParams, searchDonorAction } from './donor-selection.actions';
import { Action } from 'typescript-fsa';

export function* searchDonors(action: Action<IFetchSearchDonorsActionParams>) {
  const token = action.payload.token;
  delete action.payload.token;
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: '/donors/search/',
      method: API.Method.POST,
      token: token,
      data: action.payload,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(searchDonorAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(searchDonorAction.failed({ params: action.payload, error: ex as Error }));
  }
}
