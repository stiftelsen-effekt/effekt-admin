import { Action } from 'typescript-fsa';
import { DeleteTaxUnitAction, IDeleteTaxUnitActionParams, IUpdateTaxUnitActionParams, UpdateTaxUnitAction } from './taxunits.actions';
import * as API from '../../util/api';
import { call, put, select } from 'redux-saga/effects';
import { AppState } from '../../models/state';
import { getDonorTaxUnitsAction } from '../donors/donor-page.actions';
import { IDonor } from '../../models/types';

export function* updateTaxUnit(action: Action<IUpdateTaxUnitActionParams>) {
  try {
    const data: API.TypedResponse<string> = yield call(API.call, {
      endpoint: `/tax/${action.payload.id}`,
      method: API.Method.PUT,
      token: action.payload.token,
      data: { taxUnit: action.payload.taxUnit },
    });
    if (API.isOk(data))
      yield put(UpdateTaxUnitAction.done({ params: action.payload, result: data.status === 200 }));
    else throw new Error(data.content);
  } catch (ex) {
    yield put(UpdateTaxUnitAction.failed({ params: action.payload, error: ex as Error }));
  }

  const donor: IDonor | undefined = yield select((state: AppState) => state.donorPage.donor);
  if (donor) {
    yield put(getDonorTaxUnitsAction.started({ id: donor.id, token: action.payload.token }));
  }
}

export function* deleteTaxUnit(action: Action<IDeleteTaxUnitActionParams>) {
  try {
    const data: API.TypedResponse<string> = yield call(API.call, {
      endpoint: `/donors/${action.payload.donorId}/taxunits/${action.payload.id}`,
      method: API.Method.DELETE,
      token: action.payload.token,
      data: { transferId: action.payload.transferId },
    });
    if (API.isOk(data))
      yield put(DeleteTaxUnitAction.done({ params: action.payload, result: data.status === 200 }));
    else throw new Error(data.content);
  } catch (ex) {
    yield put(DeleteTaxUnitAction.failed({ params: action.payload, error: ex as Error }));
  }

  const donor: IDonor | undefined = yield select((state: AppState) => state.donorPage.donor);
  if (donor) {
    yield put(getDonorTaxUnitsAction.started({ id: donor.id, token: action.payload.token }));
  }
}
