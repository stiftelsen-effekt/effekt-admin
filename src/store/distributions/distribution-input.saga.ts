import { put, call } from 'redux-saga/effects';
import * as API from '../../util/api';
import { createDistributionAction, ICreateDistributionActionParams } from './distribution-input.actions';
import { Action } from 'typescript-fsa';

export function* createDistribution(action: Action<ICreateDistributionActionParams>) {
    const donorId = action.payload.donor.id;
    const distribution = action.payload.distribution;

    try {
        var data: API.Response = yield call(API.call, {
            endpoint: `/distributions/`,
            method: API.Method.POST,
            data: {
                donor: {id: donorId},
                distribution, 
                metaOwnerId: 3
            },
        });
        if (data.status !== 200) throw new Error(data.content);

        yield put(createDistributionAction.done({ params: action.payload, result: true }));
    } catch (ex) {
        yield put(createDistributionAction.failed({ params: action.payload, error: ex as Error }));
    }
}
