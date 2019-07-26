import { call, put } from 'redux-saga/effects'
import * as API from '../../util/api'
import { fetchActiveOrganizationsAction } from './organizations.action';

export function* fetchActiveOrganizations(action: any) {
    try {
        var data = yield call(API.call, {
            endpoint: "/organizations/active/", 
            method: API.Method.GET
        })
        if (data.status !== 200) 
            throw new Error(data.content)
        yield put(fetchActiveOrganizationsAction.done({params: action.payload, result: data.content}))
    }
    catch(ex) {
        yield put(fetchActiveOrganizationsAction.failed(ex))
    }
}