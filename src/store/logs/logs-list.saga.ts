import { fetchLogsAction } from './logs-list.actions';
import { put, call, select } from 'redux-saga/effects';
import * as API from '../../util/api';
import { AppState } from '../../models/state';
import { IAccessToken } from '../authentication/auth';
import { IPagination } from '../../models/types';

export function* fetchLogs(action: any) {
  try {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken);

    const pagination: IPagination = yield select((state: AppState) => state.logs.pagination);
    const filesearch: string = yield select((state: AppState) => state.logs.filter.filesearch)

    const result: API.Response = yield call(API.call, {
      endpoint: '/logging/',
      method: API.Method.POST,
      token: token.token,
      data: {
        ...pagination,
        filesearch
      },
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchLogsAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(fetchLogsAction.failed({error: new Error(typeof ex === "string" ? ex : ""), params: action.payload}));
  }
}
