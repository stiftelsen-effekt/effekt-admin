import { ReportProcessingState } from '../../models/state';
import { AnyAction } from 'redux';
import { isType } from 'typescript-fsa';
import { uploadReportAction } from '../report/report-upload.actions';
import { toast } from 'react-toastify';
import { POP_INVALID_TRANSACTION } from './process.actions';
import { createDistribitionAndInsertDonationAction } from '../single-donation/single-donation.actions';
import { toastError } from '../../util/toasthelper';
import { processDonationsAction, registerCampaignAction } from '../facebook/facebook.actions';

const defaultState: ReportProcessingState = {
  valid: 0,
  invalid: 0,
  invalidTransactions: [],
  loading: false,
  fbCampaigns: undefined,
};

const toastIfDone = (transactionsLeft: number) =>
  transactionsLeft === 0 && toast.success('🎉 Good job, you did them all!');

export const reportProcessingReducer = (
  state: ReportProcessingState = defaultState,
  action: AnyAction
): ReportProcessingState => {
  if (
    isType(action, uploadReportAction.started) ||
    isType(action, processDonationsAction.started)
  ) {
    return { ...state, fbCampaigns: undefined, loading: true };
  }
  if (isType(action, registerCampaignAction.started)) {
    return { ...state, loading: true };
  }
  if (isType(action, uploadReportAction.failed)) {
    toastError('Failed to process report', action.payload.error.message);
    return { ...state, loading: false };
  } else if (
    isType(action, uploadReportAction.done) &&
    action.payload.result.fbCampaigns !== undefined
  ) {
    if (action.payload.result.fbCampaigns.length > 0) {
      toast.success(`🔥 Uploaded FB report! Please register the FB campaign shares`);
    }
    return { ...state, fbCampaigns: action.payload.result.fbCampaigns, loading: false };
  } else if (
    isType(action, uploadReportAction.done) ||
    isType(action, processDonationsAction.done)
  ) {
    if (action.payload.result.invalid > 0) {
      toast.success(
        `🔥 inserted ${action.payload.result.valid}, ignored ${action.payload.result.invalid}`
      );
      return {
        ...action.payload.result,
        invalidTransactions: action.payload.result.invalidTransactions.map((invalid) => {
          return {
            reason: invalid.reason,
            transaction: {
              ...invalid.transaction,
              date: new Date(invalid.transaction.date),
            },
          };
        }),
        loading: false,
      };
    } else {
      toast.success(`🔥 inserted ${action.payload.result.valid} donations`);
      return { ...state, fbCampaigns: undefined, loading: false };
    }
  } else if (action.type === POP_INVALID_TRANSACTION) {
    let transactions = state.invalidTransactions;
    transactions.pop();

    toastIfDone(transactions.length);
    return {
      valid: ++state.valid,
      invalid: --state.invalid,
      invalidTransactions: transactions,
      loading: false,
    };
  } else if (isType(action, createDistribitionAndInsertDonationAction.done)) {
    if (state.invalidTransactions.length === 0) return { ...state, loading: false };
    let externalRef = action.payload.params.donation.paymentExternalRef;

    let transactions = state.invalidTransactions.filter(
      (invalid) => invalid.transaction.transactionID !== externalRef
    );

    if (transactions.length === state.invalidTransactions.length)
      return { ...state, loading: false };

    toastIfDone(transactions.length);
    return {
      valid: ++state.valid,
      invalid: --state.invalid,
      invalidTransactions: transactions,
      loading: false,
    };
  } else if (isType(action, registerCampaignAction.done)) {
    if (state.fbCampaigns !== undefined) {
      return {
        ...state,
        fbCampaigns: state.fbCampaigns.filter(
          (campaign) => campaign.ID !== action.payload.params.campaign.id
        ),
        loading: false,
      };
    }
  }

  return state;
};
