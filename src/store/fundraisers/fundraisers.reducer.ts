import { isType } from "typescript-fsa";
import { FundraisersState } from "../../models/state";
import { fetchFundraisersAction, setFundraisersPagination } from "./fundraisers-list.actions";
import {
  setFundraiserFilterRegistrationDateRange,
  setFundraiserFilterDonor,
  setFundraiserFilterId,
  setFundraiserFilterDonationCountRange,
  setFundraiserFilterDonationSumRange,
  setFundraiserFilterOrganizationIDs,
} from "./fundraiser-filters.actions";
import { fetchFundraiserAction } from "./fundraiser.actions";
import { AnyAction } from "redux";

const defaultState: FundraisersState = {
  fundraisers: [],
  pages: 0,
  loading: false,
  pagination: {
    sort: {
      id: "registered",
      desc: true,
    },
    page: 0,
    limit: 10,
  },
  filter: {
    registrationDate: {
      from: null,
      to: null,
    },
    donationCount: {
      from: 0,
      to: Number.MAX_SAFE_INTEGER,
    },
    donationSum: {
      from: 0,
      to: Number.MAX_SAFE_INTEGER,
    },
    donor: "",
    fundraiserId: "",
    organizationIDs: undefined,
  },
  statistics: {
    numFundraisers: 0,
    sumDonations: 0,
    avgDonation: 0,
  },
};

export const fundraisersReducer = (state = defaultState, action: AnyAction): FundraisersState => {
  if (isType(action, fetchFundraisersAction.started)) {
    return { ...state, loading: true };
  }

  if (isType(action, fetchFundraisersAction.done)) {
    return {
      ...state,
      loading: false,
      fundraisers: action.payload.result.fundraisers,
      pages: action.payload.result.pages,
      filter: {
        ...state.filter,
      },
      statistics: {
        numFundraisers:
          action.payload.result.statistics?.totalCount || action.payload.result.fundraisers.length,
        sumDonations: action.payload.result.statistics?.totalSum || 0,
        avgDonation: action.payload.result.statistics?.avgDonation || 0,
      },
    };
  }

  if (isType(action, fetchFundraisersAction.failed)) {
    return { ...state, loading: false };
  }

  if (isType(action, setFundraisersPagination)) {
    return { ...state, pagination: action.payload };
  }

  if (isType(action, setFundraiserFilterRegistrationDateRange)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        registrationDate: action.payload,
      },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setFundraiserFilterDonor)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        donor: action.payload,
      },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setFundraiserFilterId)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        fundraiserId: action.payload,
      },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setFundraiserFilterDonationCountRange)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        donationCount: action.payload,
      },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setFundraiserFilterDonationSumRange)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        donationSum: action.payload,
      },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setFundraiserFilterOrganizationIDs)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        organizationIDs: action.payload,
      },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, fetchFundraiserAction.done)) {
    return {
      ...state,
      currentFundraiser: action.payload.result,
    };
  }

  return state;
};
