import { DonationsState } from "../../models/state";
import { isType } from "typescript-fsa";
import { fetchDonationsAction, SET_DONATIONS_PAGINATION } from "./donations-list.actions";
import {
  fetchDonationAction,
  CLEAR_CURRENT_DONATION,
  fetchHistogramAction,
  fetchTransactionCostsReportAction,
} from "./donation.actions";
import { toastError } from "../../util/toasthelper";
import {
  SET_DONATION_FILTER_DATE_RANGE,
  SET_DONATION_FILTER_SUM_RANGE,
  SET_DONATION_FILTER_KID,
  SET_DONATION_FILTER_PAYMENT_METHOD_IDS,
  SET_DONATION_FILTER_DONOR,
  SET_DONATION_FILTER_DONATION_ID,
  SET_DONATION_FILTER_PAYMENT_ORGANIZATION_IDS,
} from "./donation-filters.actions";

const defaultState: DonationsState = {
  donations: [],
  transactionCostsReport: undefined,
  loading: false,
  pages: 1,
  pagination: {
    page: 0,
    limit: 25,
    sort: {
      id: "timestamp",
      desc: true,
    },
  },
  filter: {
    date: {
      from: null,
      to: null,
    },
    sum: {
      from: 0,
      to: Number.MAX_SAFE_INTEGER,
    },
    paymentMethodIDs: undefined,
    organizationIDs: undefined,
  },
};
export const donationsReducer = (state = defaultState, action: any): DonationsState => {
  /**
   * Donations search
   */
  if (isType(action, fetchDonationsAction.done)) {
    return {
      ...state,
      loading: false,
      donations: action.payload.result.rows,
      pages: action.payload.result.pages,
    };
  } else if (isType(action, fetchDonationsAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchDonationsAction.failed)) {
    return { ...state, loading: false };
  }

  /**
   * Transaction costs
   */
  if (isType(action, fetchTransactionCostsReportAction.done)) {
    return { ...state, transactionCostsReport: action.payload.result };
  } else if (isType(action, fetchTransactionCostsReportAction.failed)) {
    toastError("Failed to fetch transaction costs report", action.payload.error.message);
  }

  /**
   * Current donation
   */

  if (action.type === CLEAR_CURRENT_DONATION) {
    return {
      ...state,
      currentDonation: undefined,
    };
  }
  if (isType(action, fetchDonationAction.done)) {
    return {
      ...state,
      currentDonation: {
        ...action.payload.result,
        timestamp: new Date(action.payload.result.timestamp),
        distribution: action.payload.result.distribution,
      },
    };
  } else if (isType(action, fetchDonationAction.failed)) {
    toastError("Failed to fetch donation", action.payload.error.message);
  }

  /**
   * PAGINATION ACTIONS
   */
  switch (action.type) {
    case SET_DONATIONS_PAGINATION:
      return { ...state, pagination: action.payload };
  }

  /**
   * FILTER ACTIONS
   */
  if (isType(action, fetchHistogramAction.done)) {
    return {
      ...state,
      histogram: action.payload.result,
    };
  } else if (isType(action, fetchHistogramAction.failed)) {
    toastError("Failed to fetch histogram", action.payload.error.message);
  }

  switch (action.type) {
    case SET_DONATION_FILTER_DATE_RANGE:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, date: action.payload },
      };
    case SET_DONATION_FILTER_SUM_RANGE:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, sum: action.payload },
      };
    case SET_DONATION_FILTER_KID:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, KID: action.payload },
      };
    case SET_DONATION_FILTER_DONOR:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, donor: action.payload },
      };
    case SET_DONATION_FILTER_DONATION_ID:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, id: action.payload },
      };
    case SET_DONATION_FILTER_PAYMENT_METHOD_IDS:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, paymentMethodIDs: action.payload },
      };
    case SET_DONATION_FILTER_PAYMENT_ORGANIZATION_IDS:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, organizationIDs: action.payload },
      };
  }

  return state;
};
