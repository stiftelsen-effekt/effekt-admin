import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { FETCH_TOKEN_REQUEST } from './authenticate/token.actions';
import { fetchToken } from './authenticate/token.saga';
import { LOGIN_BEGIN, LOGOUT_REQUEST, LOGIN_CACHE_CHECK, LOGIN_CALLBACK, LOGIN_SUCCESS } from './authenticate/loginout.actions';
import { login, logout, loginCacheCheck, callback, loginSuccess } from './authenticate/loginout.saga';
import { SEARCH_DONORS_REQUEST } from './components/app/modules/donors/selection/donor-selection.actions';
import { searchDonors } from './components/app/modules/donors/selection/donor-selection.saga';
import { FETCH_ACTIVE_ORGANIZATIONS_REQUEST } from './store/organizations/organizations.action';
import { fetchActiveOrganizations } from './store/organizations/organizations.saga';
import { FETCH_PAYMENT_METHODS_REQUEST, createDistribitionAndInsertDonationAction } from './components/app/modules/single-donation/single-donation.actions';
import { fetchPaymentMethods, createDistributionAndInsertDonation } from './components/app/modules/single-donation/single-donation.saga';
import { uploadReportAction } from './components/app/modules/report-upload/report-upload.actions';
import { uploadReport } from './components/app/modules/report-upload/report-upload.saga';
import { createDonorAction } from './components/app/modules/donors/create/create-donor.actions';
import { createDonor } from './components/app/modules/donors/create/create-donor.saga';

function *watchAll() {
    yield all([
        takeLatest(LOGIN_CACHE_CHECK, loginCacheCheck),
        takeLatest(LOGIN_BEGIN, login),

        takeLatest(LOGIN_SUCCESS, loginSuccess),

        takeLatest(LOGIN_CALLBACK, callback),
        takeEvery(FETCH_TOKEN_REQUEST, fetchToken),
        takeEvery(LOGOUT_REQUEST, logout),

        takeLatest(SEARCH_DONORS_REQUEST, searchDonors),

        takeLatest(FETCH_ACTIVE_ORGANIZATIONS_REQUEST, fetchActiveOrganizations),

        takeLatest(FETCH_PAYMENT_METHODS_REQUEST, fetchPaymentMethods),

        takeLatest(createDistribitionAndInsertDonationAction.started.type, createDistributionAndInsertDonation),
        takeLatest(uploadReportAction.started.type, uploadReport),

        takeLatest(createDonorAction.started.type, createDonor)
    ]);
}

export default watchAll;