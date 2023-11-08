import { all, takeLatest } from 'redux-saga/effects';
import { searchDonorAction } from './store/donors/donor-selection.actions';
import { searchDonors } from './store/donors/donor-selection.saga';
import { fetchActiveOrganizationsAction, fetchAllOrganizationsAction } from './store/organizations/organizations.action';
import { fetchActiveOrganizations, fetchAllOrganizations } from './store/organizations/organizations.saga';
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
import { fetchDonationAction, fetchHistogramAction, fetchTransactionCostsReportAction } from './store/donations/donation.actions';
import { fetchDonation, fetchHistogram, fetchTransactionCostsReport } from './store/donations/donation.saga';
import { fetchSumByMonth, fetchTotalByPeriod } from './store/graphing/graphing.saga';
import { fetchSumByMonthAction, fetchTotalByPeriodAction } from './store/graphing/graphing.actions';
import { fetchDistribution, fetchDistributions } from './store/distributions/distributions.saga';
import {
  fetchDistributionAction,
  fetchDistributionsAction,
} from './store/distributions/distribution.actions';
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
  fetchAvtaleGiroExpectedByDate,
  fetchAvtaleGiroHistogram,
  fetchAvtaleGiroMissingByDate,
  fetchAvtaleGiroRecievedByDate,
  fetchAvtaleGiroReport,
  fetchAvtaleGiroValidationTable,
  updateAvtaleGiroAmount,
  updateAvtaleGiroDistribution,
  updateAvtaleGiroPaymentDate,
  updateAvtaleGiroStatus,
} from './store/avtalegiro/avtalegiro.saga';
import {
  fetchAvtaleGiroAction,
  fetchAvtaleGiroAgreementsAction,
  fetchAvtaleGiroExpectedByDateAction,
  fetchAvtaleGiroHistogramAction,
  fetchAvtaleGiroMissingByDateAction,
  fetchAvtaleGiroRecievedByDateAction,
  fetchAvtaleGiroReportAction,
  fetchAvtaleGiroValidationTableAction,
  updateAvtaleGiroAmountAction,
  updateAvtaleGiroDistributionAction,
  updateAvtaleGiroPaymentDateAction,
  updateAvtaleGiroStatusAction,
} from './store/avtalegiro/avtalegiro.actions';
import {
  getDonorAction,
  getDonorAvtalegiroAgreementsAction,
  getDonorDistributionsAction,
  getDonorDonationsAction,
  getDonorVippsAgreementsAction,
  getDonorYearlyAggregatesAction,
  getDonorReferralAnswersAction,
  updateDonorDataAction,
  getDonorTaxUnitsAction,
} from './store/donors/donor-page.actions';
import {
  getDonor,
  getDonorAvtalegiroAgreements,
  getDonorDistributions,
  getDonorDonations,
  getDonorVippsAgreements,
  getDonorYearlyAggregates,
  getDonorReferralAnswers,
  updateDonorData,
  getDonorTaxUnits,
} from './store/donors/donor-page.saga';
import { createDistribution } from './store/distributions/distribution-input.saga';
import { createDistributionAction } from './store/distributions/distribution-input.actions';
import { processDonationsAction, registerCampaignAction } from './store/facebook/facebook.actions';
import { processFBDonations, registerFBCampaign } from './store/facebook/facebook.saga';
import { createTaxUnit, deleteTaxUnit, updateTaxUnit } from './store/taxunits.ts/taxunits.saga';
import { CreateTaxUnitAction, DeleteTaxUnitAction, UpdateTaxUnitAction } from './store/taxunits.ts/taxunits.actions';

function* watchAll() {
  yield all([
    takeLatest(searchDonorAction.started.type, searchDonors),

    takeLatest(fetchActiveOrganizationsAction.started.type, fetchActiveOrganizations),

    takeLatest(fetchAllOrganizationsAction.started.type, fetchAllOrganizations),

    takeLatest(fetchPaymentMethodsAction.started.type, fetchPaymentMethods),

    takeLatest(
      createDistribitionAndInsertDonationAction.started.type,
      createDistributionAndInsertDonation
    ),
    takeLatest(createDistributionAction.started.type, createDistribution),
    takeLatest(insertDonationAction.started.type, insertDonation),
    takeLatest(uploadReportAction.started.type, uploadReport),

    takeLatest(registerCampaignAction.started.type, registerFBCampaign),
    takeLatest(processDonationsAction.started.type, processFBDonations),

    takeLatest(createDonorAction.started.type, createDonor),
    takeLatest(getDonorAction.started.type, getDonor),
    takeLatest(getDonorDonationsAction.started.type, getDonorDonations),
    takeLatest(getDonorDistributionsAction.started.type, getDonorDistributions),
    takeLatest(getDonorAvtalegiroAgreementsAction.started.type, getDonorAvtalegiroAgreements),
    takeLatest(getDonorVippsAgreementsAction.started.type, getDonorVippsAgreements),
    takeLatest(getDonorYearlyAggregatesAction.started.type, getDonorYearlyAggregates),
    takeLatest(getDonorReferralAnswersAction.started.type, getDonorReferralAnswers),
    takeLatest(getDonorTaxUnitsAction.started.type, getDonorTaxUnits),
    takeLatest(updateDonorDataAction.started.type, updateDonorData),

    takeLatest(CreateTaxUnitAction.started.type, createTaxUnit),
    takeLatest(UpdateTaxUnitAction.started.type, updateTaxUnit),
    takeLatest(DeleteTaxUnitAction.started.type, deleteTaxUnit),

    takeLatest(fetchDonationsAction.started.type, fetchDonations),
    takeLatest(fetchDonationAction.started.type, fetchDonation),
    takeLatest(deleteDonationAction.started.type, deleteDonation),
    takeLatest(fetchTransactionCostsReportAction.started.type, fetchTransactionCostsReport),

    takeLatest(fetchTotalByPeriodAction.started.type, fetchTotalByPeriod),
    takeLatest(fetchSumByMonthAction.started.type, fetchSumByMonth),
    takeLatest(fetchHistogramAction.started.type, fetchHistogram),

    takeLatest(fetchDistributionAction.started.type, fetchDistribution),
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
    takeLatest(fetchAvtaleGiroValidationTableAction.started.type, fetchAvtaleGiroValidationTable),
    takeLatest(fetchAvtaleGiroMissingByDateAction.started.type, fetchAvtaleGiroMissingByDate),
    takeLatest(fetchAvtaleGiroRecievedByDateAction.started.type, fetchAvtaleGiroRecievedByDate),
    takeLatest(fetchAvtaleGiroExpectedByDateAction.started.type, fetchAvtaleGiroExpectedByDate),
    takeLatest(updateAvtaleGiroAmountAction.started.type, updateAvtaleGiroAmount),
    takeLatest(updateAvtaleGiroStatusAction.started.type, updateAvtaleGiroStatus),
    takeLatest(updateAvtaleGiroPaymentDateAction.started.type, updateAvtaleGiroPaymentDate),
    takeLatest(updateAvtaleGiroDistributionAction.started.type, updateAvtaleGiroDistribution),
  ]);
}

export default watchAll;
