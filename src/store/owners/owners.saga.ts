import { call, put } from 'redux-saga/effects'
import * as API from '../../util/api'
import { fetchOwnersAction } from './owners.actions';

export function* fetchOwners(action: any) {
    try {
        var data = yield call(API.call, {
            endpoint: "/meta/owners/", 
            method: API.Method.GET
        })
        if (data.status !== 200) 
            throw new Error(data.content)
        yield put(fetchOwnersAction.done({params: action.payload, result: data.content}))
    }
    catch(ex) {
        yield put(fetchOwnersAction.failed(ex))
    }
}