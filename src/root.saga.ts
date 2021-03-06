import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { fetchTokenAction } from './authenticate/token.actions';
import { fetchToken } from './authenticate/token.saga';
import { LOGIN_BEGIN, LOGOUT_REQUEST, LOGIN_CACHE_CHECK, LOGIN_CALLBACK, LOGIN_SUCCESS } from './authenticate/loginout.actions';
import { login, logout, loginCacheCheck, callback, loginSuccess } from './authenticate/loginout.saga';
import { searchDonorAction } from './components/modules/donors/selection/donor-selection.actions';
import { searchDonors } from './components/modules/donors/selection/donor-selection.saga';
import { fetchActiveOrganizationsAction } from './store/organizations/organizations.action';
import { fetchActiveOrganizations } from './store/organizations/organizations.saga';
import { fetchPaymentMethodsAction, createDistribitionAndInsertDonationAction, insertDonationAction } from './components/modules/single-donation/single-donation.actions';
import { fetchPaymentMethods, createDistributionAndInsertDonation, insertDonation } from './components/modules/single-donation/single-donation.saga';
import { uploadReportAction } from './components/modules/report-upload/report-upload.actions';
import { uploadReport } from './components/modules/report-upload/report-upload.saga';
import { createDonorAction } from './components/modules/donors/create/create-donor.actions';
import { createDonor } from './components/modules/donors/create/create-donor.saga';
import { deleteDonation, fetchDonations } from './components/modules/donations/list/donations-list.saga';
import { deleteDonationAction, fetchDonationsAction } from './components/modules/donations/list/donations-list.actions';
import { fetchDonationAction, fetchHistogramAction } from './store/donations/donation.actions';
import { fetchDonation, fetchHistogram } from './store/donations/donation.saga';
import { fetchTotalByPeriod } from './components/pages/graphing/graphing.saga';
import { fetchTotalByPeriodAction } from './components/pages/graphing/graphing.actions';
import { fetchDistributions } from './components/modules/distribution/list/distribution-list.saga';
import { fetchDistributionsAction } from './components/modules/distribution/list/distribution-list.actions';
import { fetchOwnersAction } from './store/owners/owners.actions';
import { fetchOwners } from './store/owners/owners.saga';
import { resendRecieptAction } from './components/modules/donations/reciept/reciept.actions';
import { resendReciept } from './components/modules/donations/reciept/reciept.saga';
import { fetchLogsAction } from './components/modules/logs/list/logs-list.actions';
import { fetchLogs } from './components/modules/logs/list/logs-list.saga';
import { fetchLogEntryAction } from './store/logs/logs.actions';
import { fetchLogEntry } from './store/logs/logs.saga';
import { fetchAgreementHistogram, fetchAgreementsReport, fetchChargeHistogram, fetchVippsAgreementCharges, fetchVippsAgreements } from './store/vipps/vipps.saga';
import { fetchAgreementHistogramAction, fetchAgreementsReportAction, fetchChargeHistogramAction, fetchVippsAgreementChargesAction, fetchVippsAgreementsAction } from './store/vipps/vipps.actions';

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
        takeLatest(insertDonationAction.started.type, insertDonation),
        takeLatest(uploadReportAction.started.type, uploadReport),

        takeLatest(createDonorAction.started.type, createDonor),

        takeLatest(fetchDonationsAction.started.type, fetchDonations),
        takeLatest(fetchDonationAction.started.type, fetchDonation),
        takeLatest(deleteDonationAction.started.type, deleteDonation),

        takeLatest(fetchTotalByPeriodAction.started.type, fetchTotalByPeriod),
        takeLatest(fetchHistogramAction.started.type, fetchHistogram),

        takeLatest(fetchDistributionsAction.started.type, fetchDistributions),
        takeLatest(fetchOwnersAction.started.type, fetchOwners),

        takeLatest(resendRecieptAction.started.type, resendReciept),

        takeLatest(fetchLogsAction.started.type, fetchLogs),
        takeLatest(fetchLogEntryAction.started.type, fetchLogEntry),

        takeLatest(fetchVippsAgreementsAction.started.type, fetchVippsAgreements),
        takeLatest(fetchVippsAgreementChargesAction.started.type, fetchVippsAgreementCharges),
        takeLatest(fetchAgreementHistogramAction.started.type, fetchAgreementHistogram),
        takeLatest(fetchChargeHistogramAction.started.type, fetchChargeHistogram),
        takeLatest(fetchAgreementsReportAction.started.type, fetchAgreementsReport)
    ]);
}

export default watchAll;