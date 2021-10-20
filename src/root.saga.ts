import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { fetchTokenAction } from './store/authentication/token.actions';
import { fetchToken } from './store/authentication/token.saga';
import {
  LOGIN_BEGIN,
  LOGOUT_REQUEST,
  LOGIN_CACHE_CHECK,
  LOGIN_CALLBACK,
  LOGIN_SUCCESS,
} from './store/authentication/loginout.actions';
import {
  login,
  logout,
  loginCacheCheck,
  callback,
  loginSuccess,
} from './store/authentication/loginout.saga';
import { searchDonorAction } from './store/donors/donor-selection.actions';
import { searchDonors } from './store/donors/donor-selection.saga';
import { fetchActiveOrganizationsAction } from './store/organizations/organizations.action';
import { fetchActiveOrganizations } from './store/organizations/organizations.saga';
import {
  fetchPaymentMethodsAction,
  createDistribitionAndInsertDonationAction,
  insertDonationAction,
} from './store/single-donation/single-donation.actions';
import {
  fetchPaymentMethods,
  createDistributionAndInsertDonation,
  insertDonation,
} from './store/single-donation/single-donation.saga';
import { uploadReportAction } from './store/report/report-upload.actions';
import { uploadReport } from './store/report/report-upload.saga';
import { createDonorAction } from './store/donors/create-donor.actions';
import { createDonor } from './store/donors/create-donor.saga';
import { deleteDonation, fetchDonations } from './store/donations/donations-list.saga';
import {
  deleteDonationAction,
  fetchDonationsAction,
} from './store/donations/donations-list.actions';
import { fetchDonationAction, fetchHistogramAction } from './store/donations/donation.actions';
import { fetchDonation, fetchHistogram } from './store/donations/donation.saga';
import { fetchSumByMonth, fetchTotalByPeriod } from './store/graphing/graphing.saga';
import { fetchSumByMonthAction, fetchTotalByPeriodAction } from './store/graphing/graphing.actions';
import { fetchDistributions } from './store/distributions/distribution-list.saga';
import { fetchDistributionsAction } from './store/distributions/distribution-list.actions';
import { fetchOwnersAction } from './store/owners/owners.actions';
import { fetchOwners } from './store/owners/owners.saga';
import { resendReceiptAction } from './store/donations/receipt.actions';
import { resendReceipt } from './store/donations/receipt.saga';
import { fetchLogsAction } from './store/logs/logs-list.actions';
import { fetchLogs } from './store/logs/logs-list.saga';
import { fetchLogEntryAction } from './store/logs/logs.actions';
import { fetchLogEntry } from './store/logs/logs.saga';
import {
  fetchAgreementHistogram,
  fetchAgreementsReport,
  fetchChargeHistogram,
  fetchVippsAgreement,
  fetchVippsAgreementCharges,
  fetchVippsAgreements,
  refundVippsAgreementCharge,
} from './store/vipps/vipps.saga';
import {
  fetchAgreementHistogramAction,
  fetchAgreementsReportAction,
  fetchChargeHistogramAction,
  fetchVippsAgreementAction,
  fetchVippsAgreementChargesAction,
  fetchVippsAgreementsAction,
  refundVippsAgreementChargeAction,
} from './store/vipps/vipps.actions';
import {
  fetchAvtaleGiro,
  fetchAvtaleGiroAgreements,
  fetchAvtaleGiroHistogram,
  fetchAvtaleGiroReport,
} from './store/avtalegiro/avtalegiro.saga';
import {
  fetchAvtaleGiroAction,
  fetchAvtaleGiroAgreementsAction,
  fetchAvtaleGiroHistogramAction,
  fetchAvtaleGiroReportAction,
} from './store/avtalegiro/avtalegiro.actions';

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

    takeLatest(
      createDistribitionAndInsertDonationAction.started.type,
      createDistributionAndInsertDonation
    ),
    takeLatest(insertDonationAction.started.type, insertDonation),
    takeLatest(uploadReportAction.started.type, uploadReport),

    takeLatest(createDonorAction.started.type, createDonor),

    takeLatest(fetchDonationsAction.started.type, fetchDonations),
    takeLatest(fetchDonationAction.started.type, fetchDonation),
    takeLatest(deleteDonationAction.started.type, deleteDonation),

    takeLatest(fetchTotalByPeriodAction.started.type, fetchTotalByPeriod),
    takeLatest(fetchSumByMonthAction.started.type, fetchSumByMonth),
    takeLatest(fetchHistogramAction.started.type, fetchHistogram),

    takeLatest(fetchDistributionsAction.started.type, fetchDistributions),
    takeLatest(fetchOwnersAction.started.type, fetchOwners),

    takeLatest(resendReceiptAction.started.type, resendReceipt),

    takeLatest(fetchLogsAction.started.type, fetchLogs),
    takeLatest(fetchLogEntryAction.started.type, fetchLogEntry),

    takeLatest(fetchVippsAgreementsAction.started.type, fetchVippsAgreements),
    takeLatest(fetchVippsAgreementAction.started.type, fetchVippsAgreement),
    takeLatest(fetchVippsAgreementChargesAction.started.type, fetchVippsAgreementCharges),
    takeLatest(fetchAgreementHistogramAction.started.type, fetchAgreementHistogram),
    takeLatest(fetchChargeHistogramAction.started.type, fetchChargeHistogram),
    takeLatest(fetchAgreementsReportAction.started.type, fetchAgreementsReport),
    takeLatest(refundVippsAgreementChargeAction.started.type, refundVippsAgreementCharge),

    takeLatest(fetchAvtaleGiroAgreementsAction.started.type, fetchAvtaleGiroAgreements),
    takeLatest(fetchAvtaleGiroAction.started.type, fetchAvtaleGiro),
    takeLatest(fetchAvtaleGiroHistogramAction.started.type, fetchAvtaleGiroHistogram),
    takeLatest(fetchAvtaleGiroReportAction.started.type, fetchAvtaleGiroReport),
  ]);
}

export default watchAll;
