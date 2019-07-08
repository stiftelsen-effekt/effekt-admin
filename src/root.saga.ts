import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { FETCH_TOKEN_REQUEST } from './authenticate/token.actions';
import { fetchToken } from './authenticate/token.saga';
import { LOGIN_BEGIN, LOGOUT_REQUEST, LOGIN_CACHE_CHECK, LOGIN_CALLBACK, LOGIN_SUCCESS } from './authenticate/loginout.actions';
import { login, logout, loginCacheCheck, callback, loginSuccess } from './authenticate/loginout.saga';
import { FETCH_DONOR_REQUEST } from './components/app/pages/home/home.actions';
import { fetchDonor } from './components/app/pages/home/home.saga';
import { SEARCH_DONORS_REQUEST } from './components/app/modules/donors/donor-selection.actions';
import { searchDonors } from './components/app/modules/donors/donor-selection.saga';
import { FETCH_ACTIVE_ORGANIZATIONS_REQUEST } from './store/organizations/organizations.action';
import { fetchActiveOrganizations } from './store/organizations/organizations.saga';

function *watchAll() {
    yield all([
        takeLatest(LOGIN_CACHE_CHECK, loginCacheCheck),
        takeLatest(LOGIN_BEGIN, login),

        takeLatest(LOGIN_SUCCESS, loginSuccess),

        takeLatest(LOGIN_CALLBACK, callback),
        takeEvery(FETCH_TOKEN_REQUEST, fetchToken),
        takeEvery(LOGOUT_REQUEST, logout),

        takeLatest(FETCH_DONOR_REQUEST, fetchDonor),

        takeLatest(SEARCH_DONORS_REQUEST, searchDonors),

        takeLatest(FETCH_ACTIVE_ORGANIZATIONS_REQUEST, fetchActiveOrganizations)
    ]);
}

export default watchAll;