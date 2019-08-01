import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { fetchTokenAction } from './authenticate/token.actions';
import { fetchToken } from './authenticate/token.saga';
import { LOGIN_BEGIN, LOGOUT_REQUEST, LOGIN_CACHE_CHECK, LOGIN_CALLBACK, LOGIN_SUCCESS } from './authenticate/loginout.actions';
import { login, logout, loginCacheCheck, callback, loginSuccess } from './authenticate/loginout.saga';
import { searchDonorAction } from './components/app/modules/donors/selection/donor-selection.actions';
import { searchDonors } from './components/app/modules/donors/selection/donor-selection.saga';
import { fetchActiveOrganizationsAction } from './store/organizations/organizations.action';
import { fetchActiveOrganizations } from './store/organizations/organizations.saga';
import { fetchPaymentMethodsAction, createDistribitionAndInsertDonationAction } from './components/app/modules/single-donation/single-donation.actions';
import { fetchPaymentMethods, createDistributionAndInsertDonation } from './components/app/modules/single-donation/single-donation.saga';
import { uploadReportAction } from './components/app/modules/report-upload/report-upload.actions';
import { uploadReport } from './components/app/modules/report-upload/report-upload.saga';
import { createDonorAction } from './components/app/modules/donors/create/create-donor.actions';
import { createDonor } from './components/app/modules/donors/create/create-donor.saga';
import { fetchDonations } from './components/app/modules/donations/list/donations-list.saga';
import { fetchDonationsAction } from './components/app/modules/donations/list/donations-list.actions';
import { fetchDonationAction, fetchHistogramAction } from './store/donations/donation.actions';
import { fetchDonation, fetchHistogram } from './store/donations/donation.saga';
import { fetchTotalByPeriod } from './components/app/pages/graphing/graphing.saga';
import { fetchTotalByPeriodAction } from './components/app/pages/graphing/graphing.actions';

function* watchAll() {
    yield all([
        takeLatest(LOGIN_CACHE_CHECK, loginCacheCheck),
        takeLatest(LOGIN_BEGIN, login),

        takeLatest(LOGIN_SUCCESS, loginSuccess),

        takeLatest(LOGIN_CALLBACK, callback),
        takeEvery(LOGOUT_REQUEST, logout),
        takeEvery(fetchTokenAction.started.type, fetchToken),

        takeLatest(searchDonorAction.started.type, searchDonors),

        takeLatest(fetchActiveOrganizationsAction.started.type, fetchActiveOrganizations),

        takeLatest(fetchPaymentMethodsAction.started.type, fetchPaymentMethods),

        takeLatest(createDistribitionAndInsertDonationAction.started.type, createDistributionAndInsertDonation),
        takeLatest(uploadReportAction.started.type, uploadReport),

        takeLatest(createDonorAction.started.type, createDonor),

        takeLatest(fetchDonationsAction.started.type, fetchDonations),
        takeLatest(fetchDonationAction.started.type, fetchDonation),

        takeLatest(fetchTotalByPeriodAction.started.type, fetchTotalByPeriod),
        takeLatest(fetchHistogramAction.started.type, fetchHistogram)
    ]);
}

export default watchAll;