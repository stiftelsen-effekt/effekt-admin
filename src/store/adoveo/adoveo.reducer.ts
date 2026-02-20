import { isType } from "typescript-fsa";
import { AdoveoState } from "../../models/state";
import { fetchAdoveoAction, setAdoveoPagination } from "./adoveo-list.actions";
import {
  setAdoveoFilterName,
  setAdoveoFilterFundraiserId,
  setAdoveoFilterAdoveoId,
  setAdoveoFilterDonorName,
  setAdoveoFilterCreatedDateRange,
  setAdoveoFilterDonationCountRange,
  setAdoveoFilterDonationSumRange,
  setAdoveoFilterOrganizationIDs,
} from "./adoveo-filters.actions";
import { AnyAction } from "redux";

const defaultState: AdoveoState = {
  fundraisers: [],
  pages: 0,
  loading: false,
  pagination: {
    sort: {
      id: "created",
      desc: true,
    },
    page: 0,
    limit: 25,
  },
  filter: {
    name: "",
    fundraiserId: "",
    adoveoId: "",
    donorName: "",
    createdDate: { from: null, to: null },
    donationCount: { from: 0, to: Number.MAX_SAFE_INTEGER },
    donationSum: { from: 0, to: Number.MAX_SAFE_INTEGER },
    organizationIDs: undefined,
  },
  statistics: {
    numFundraisers: 0,
    sumDonations: 0,
    avgDonation: 0,
  },
};

export const adoveoReducer = (state = defaultState, action: AnyAction): AdoveoState => {
  if (isType(action, fetchAdoveoAction.started)) {
    return { ...state, loading: true };
  }

  if (isType(action, fetchAdoveoAction.done)) {
    return {
      ...state,
      loading: false,
      fundraisers: action.payload.result.fundraisers,
      pages: action.payload.result.pages,
      statistics: {
        numFundraisers:
          action.payload.result.statistics?.totalCount || action.payload.result.fundraisers.length,
        sumDonations: action.payload.result.statistics?.totalSum || 0,
        avgDonation: action.payload.result.statistics?.avgDonation || 0,
      },
    };
  }

  if (isType(action, fetchAdoveoAction.failed)) {
    return { ...state, loading: false };
  }

  if (isType(action, setAdoveoPagination)) {
    return { ...state, pagination: action.payload };
  }

  if (isType(action, setAdoveoFilterName)) {
    return {
      ...state,
      filter: { ...state.filter, name: action.payload },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setAdoveoFilterFundraiserId)) {
    return {
      ...state,
      filter: { ...state.filter, fundraiserId: action.payload },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setAdoveoFilterAdoveoId)) {
    return {
      ...state,
      filter: { ...state.filter, adoveoId: action.payload },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setAdoveoFilterDonorName)) {
    return {
      ...state,
      filter: { ...state.filter, donorName: action.payload },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setAdoveoFilterCreatedDateRange)) {
    return {
      ...state,
      filter: { ...state.filter, createdDate: action.payload },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setAdoveoFilterDonationCountRange)) {
    return {
      ...state,
      filter: { ...state.filter, donationCount: action.payload },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setAdoveoFilterDonationSumRange)) {
    return {
      ...state,
      filter: { ...state.filter, donationSum: action.payload },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  if (isType(action, setAdoveoFilterOrganizationIDs)) {
    return {
      ...state,
      filter: { ...state.filter, organizationIDs: action.payload },
      pagination: { ...state.pagination, page: 0 },
    };
  }

  return state;
};
