import { DonorsState } from "../../models/state";
import { AnyAction } from "redux";
import { exportDonorsAction, fetchDonorsAction, setDonorsPagination } from "./donors-list.actions";
import { isType } from "typescript-fsa";
import { DateTime } from "luxon";
import {
  setDonorFilterDateRange,
  setDonorFilterDonationsCount,
  setDonorFilterDonationsDateRange,
  setDonorFilterDonationsSum,
  setDonorFilterEmail,
  setDonorFilterId,
  setDonorFilterLastDonationDate,
  setDonorFilterName,
  setDonorFilterNewsletter,
  setDonorFilterRecipientOrgIDs,
  setDonorFilterReferralTypeIDs,
} from "./donor-filters.actions";

const initialState: DonorsState = {
  donors: [],
  loading: false,
  pages: 0,
  pagination: {
    page: 0,
    limit: 25,
    sort: {
      id: "lastDonationDate",
      desc: true,
    },
  },
  filter: {
    name: "",
    email: "",
    donorId: null,
    registeredDate: {
      from: null,
      to: null,
    },
    donationsDateRange: {
      from: null,
      to: null,
    },
    lastDonationDate: {
      from: null,
      to: null,
    },
    donationsCount: {
      from: null,
      to: null,
    },
    donationsSum: {
      from: null,
      to: null,
    },
    referralTypeIDs: undefined,
    recipientOrgIDs: undefined,
  },
  statistics: {
    totalDonors: 0,
    totalDonationCount: 0,
    totalDonationSum: 0,
  },
  exportLoading: false,
};

export const donorsReducer = (
  state: DonorsState = initialState,
  action: AnyAction,
): DonorsState => {
  if (isType(action, fetchDonorsAction.started)) {
    return {
      ...state,
      loading: true,
    };
  } else if (isType(action, fetchDonorsAction.done)) {
    return {
      ...state,
      loading: false,
      donors: action.payload.result.rows.map((donor) => ({
        ...donor,
        registered: DateTime.fromISO(donor.registered.toString()),
        lastDonation: donor.lastDonation
          ? DateTime.fromISO(donor.lastDonation.toString())
          : undefined,
      })),
      pages: action.payload.result.pages,
      statistics: action.payload.result.statistics,
    };
  } else if (isType(action, fetchDonorsAction.failed)) {
    return {
      ...state,
      loading: false,
    };
  } else if (isType(action, setDonorsPagination)) {
    return {
      ...state,
      pagination: action.payload,
    };
  }

  if (isType(action, setDonorFilterName)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        name: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  } else if (isType(action, setDonorFilterEmail)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        email: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  } else if (isType(action, setDonorFilterId)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        donorId: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  } else if (isType(action, setDonorFilterNewsletter)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        newsletter: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  } else if (isType(action, setDonorFilterDateRange)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        registeredDate: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  } else if (isType(action, setDonorFilterDonationsDateRange)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        donationsDateRange: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  } else if (isType(action, setDonorFilterLastDonationDate)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        lastDonationDate: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  } else if (isType(action, setDonorFilterDonationsCount)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        donationsCount: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  } else if (isType(action, setDonorFilterDonationsSum)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        donationsSum: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  } else if (isType(action, setDonorFilterRecipientOrgIDs)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        recipientOrgIDs: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  } else if (isType(action, setDonorFilterReferralTypeIDs)) {
    return {
      ...state,
      filter: {
        ...state.filter,
        referralTypeIDs: action.payload,
      },
      pagination: {
        ...state.pagination,
        page: 0,
      },
    };
  }

  if (isType(action, exportDonorsAction.started)) {
    return {
      ...state,
      exportLoading: true,
    };
  } else if (isType(action, exportDonorsAction.done)) {
    return {
      ...state,
      exportLoading: false,
    };
  } else if (isType(action, exportDonorsAction.failed)) {
    return {
      ...state,
      exportLoading: false,
    };
  }

  return state;
};
