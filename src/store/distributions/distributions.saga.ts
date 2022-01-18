import { fetchDistributionAction, fetchDistributionsAction, IFetchDistributionActionParams } from './distribution.actions';
import { put, call, select } from 'redux-saga/effects';
import * as API from '../../util/api';
import { AppState } from '../../models/state';
import { IAccessToken } from '../authentication/auth';
import { IPagination, IDistributionFilter, IDistributionShare } from '../../models/types';
import { Action } from 'typescript-fsa';
import Decimal from 'decimal.js';

export function* fetchDistribution(action: Action<IFetchDistributionActionParams>) {
  try {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken);

    const result: API.Response = yield call(API.call, {
      endpoint: `/distributions/${action.payload.kid}`,
      method: API.Method.GET,
      token: token.token
    });
    if (result.status !== 200) throw new Error(result.content);

    let formattedShares: IDistributionShare[] = [];

    result.content.distribution.forEach((dist: any) => {
      formattedShares.push({organizationId: dist.ID, abbriv: dist.abbriv, share: dist.percentage_share})
    });

    yield put(fetchDistributionAction.done({ params: action.payload, result: {
       kid: action.payload.kid,
       donor: result.content.donor,
       distribution: formattedShares
    } }));
  } catch (ex) {
    yield put(fetchDistributionAction.failed({ params: action.payload, error: ex }));
  }
}

export function* fetchDistributions(action: any) {
  try {
    const token: IAccessToken = yield select((state: AppState) => state.auth.currentToken);

    const pagination: IPagination = yield select(
      (state: AppState) => state.distributions.pagination
    );
    const filter: IDistributionFilter = yield select(
      (state: AppState) => state.distributions.filter
    );

    const result: API.Response = yield call(API.call, {
      endpoint: '/distributions/search',
      method: API.Method.POST,
      token: token.token,
      data: {
        ...pagination,
        filter,
      },
    });
    if (result.status !== 200) throw new Error(result.content);
    yield put(fetchDistributionsAction.done({ params: action.payload, result: result.content }));
  } catch (ex) {
    yield put(fetchDistributionsAction.failed({ params: action.payload, error: ex }));
  }
}
