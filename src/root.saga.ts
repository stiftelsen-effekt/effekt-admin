import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { FETCH_TOKEN_REQUEST } from './authenticate/token.actions';
import { fetchToken } from './authenticate/token.saga';
import { LOGIN_BEGIN } from './authenticate/login.actions';
import { login } from './authenticate/login.saga';
import { FETCH_DONOR_REQUEST } from './components/app/home/home.actions';
import { fetchDonor } from './components/app/home/home.saga';

function *watchAll() {
    yield all([
        takeEvery(FETCH_TOKEN_REQUEST, fetchToken),
        takeLatest(LOGIN_BEGIN, login),
        takeLatest(FETCH_DONOR_REQUEST, fetchDonor)
    ]);
}

export default watchAll;