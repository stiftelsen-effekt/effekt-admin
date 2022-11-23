import { call, put } from 'redux-saga/effects';
import * as API from '../../util/api';
import { fetchActiveOrganizationsAction, fetchAllOrganizationsAction } from './organizations.action';

export function* fetchActiveOrganizations(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: '/organizations/active/',
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(
      fetchActiveOrganizationsAction.done({ params: action.payload, result: data.content })
    );
  } catch (ex) {
    yield put(fetchActiveOrganizationsAction.failed({ error: (ex as Error) }));
  }
}

export function* fetchAllOrganizations(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: '/organizations/all/',
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(
      fetchAllOrganizationsAction.done({ params: action.payload, result: data.content })
    );
  } catch (ex) {
    yield put(fetchAllOrganizationsAction.failed({ error: (ex as Error) }));
  }
}