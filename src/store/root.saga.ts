/* eslint-disable import/no-cycle */
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_BEGIN,
  LOGOUT_REQUEST,
  LOGIN_CACHE_CHECK,
  LOGIN_CALLBACK,
  LOGIN_SUCCESS,
} from './auth/loginout.actions';
import { searchDonors } from './donor/select/donor-selection.saga';
import { fetchActiveOrganizationsAction } from './organizations/organizations.action';
import { fetchActiveOrganizations } from './organizations/organizations.saga';
import { uploadReport } from './report/report-upload.saga';
import { createDonorAction } from './donor/create/create-donor.actions';
import {
  deleteDonationAction,
  fetchDonationsAction,
} from './donations/list/donations-list.actions';
import {
  fetchDonationAction,
  fetchHistogramAction,
} from './donations/donation/donation.actions';
import { fetchTotalByPeriod } from './graphing/graphing.saga';
import { fetchDistributions } from './distributions/list/distribution-list.saga';
import { fetchOwnersAction } from './owners/owners.actions';
import { fetchOwners } from './owners/owners.saga';
import { resendReciept } from './reciept/reciept.saga';
import {
  callback,
  login,
  loginCacheCheck,
  loginSuccess,
  logout,
} from './auth/loginout.saga';
import { fetchToken } from './auth/token.saga';
import { fetchTokenAction } from './auth/token.actions';
import { searchDonorAction } from './donor/select/donor-selection.actions';
import {
  createDistribitionAndInsertDonationAction,
  fetchPaymentMethodsAction,
  insertDonationAction,
} from './donations/donation/single/single-donation.actions';
import {
  createDistributionAndInsertDonation,
  fetchPaymentMethods,
  insertDonation,
} from './donations/donation/single/single-donation.saga';
import { uploadReportAction } from './report/report-upload.actions';
import { createDonor } from './donor/create/create-donor.saga';
import {
  fetchDonation,
  fetchHistogram,
} from './donations/donation/donation.saga';
import {
  fetchDonations,
  deleteDonation,
} from './donations/list/donations-list.saga';
import { fetchTotalByPeriodAction } from './graphing/graphing.actions';
import { resendRecieptAction } from './reciept/reciept.actions';
import { fetchDistributionsAction } from './distributions/list/distribution-list.actions';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* watchAll() {
  yield all([
    takeLatest(LOGIN_CACHE_CHECK, loginCacheCheck),
    takeLatest(LOGIN_BEGIN, login),

    takeLatest(LOGIN_SUCCESS, loginSuccess),

    takeLatest(LOGIN_CALLBACK, callback),
    takeEvery(LOGOUT_REQUEST, logout),
    takeEvery(fetchTokenAction.started.type, fetchToken),

    takeLatest(searchDonorAction.started.type, searchDonors),

    takeLatest(
      fetchActiveOrganizationsAction.started.type,
      fetchActiveOrganizations,
    ),

    takeLatest(fetchPaymentMethodsAction.started.type, fetchPaymentMethods),

    takeLatest(
      createDistribitionAndInsertDonationAction.started.type,
      createDistributionAndInsertDonation,
    ),
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
  ]);
}

export default watchAll;
