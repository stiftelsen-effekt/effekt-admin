import { DistributionsState } from "../../models/state";
import { isType } from "typescript-fsa";
import {
  fetchDistributionsAction,
  SET_DISTRIBUTIONS_PAGINATION,
  SET_DISTRIBUTIONS_FILTER_DONOR,
  SET_DISTRIBUTIONS_FILTER_KID,
  fetchDistributionAction,
} from "./distribution.actions";
import {
  createDistributionAction,
  SET_DISTRIBUTION_INPUT_DISTRIBUTION,
} from "./distribution-input.actions";
import { toast } from "react-toastify";
import Decimal from "decimal.js";
import { getDonorAction, getDonorTaxUnitsAction } from "../donors/donor-page.actions";
import { toastError } from "../../util/toasthelper";
import { IDistribution } from "../../models/types";

const defaultState: DistributionsState = {
  searchResult: [],
  pages: -1,
  loading: false,
  pagination: {
    page: 1,
    limit: 25,
    sort: {
      id: "KID",
      desc: true,
    },
  },
  filter: {
    donor: "",
    KID: "",
  },
  distributionInput: {
    distribution: {
      causeAreas: [],
    },
    taxUnits: [],
    valid: false,
  },
};

export const distributionsReducer = (state = defaultState, action: any): DistributionsState => {
  if (isType(action, fetchDistributionAction.done)) {
    return {
      ...state,
      current: {
        ...state.current,
        distribution: {
          ...action.payload.result.distribution,
          causeAreas: action.payload.result.distribution.causeAreas.map((causeArea) => ({
            ...causeArea,
            percentageShare: new Decimal(causeArea.percentageShare as unknown as string),
            organizations: causeArea.organizations.map((organization) => ({
              ...organization,
              percentageShare: new Decimal(organization.percentageShare as unknown as string),
            })),
          })),
        },
        affiliatedDonations: action.payload.result.affilliatedDonations,
      },
    };
  } else if (isType(action, fetchDistributionAction.started)) {
    return { ...state, current: undefined, loading: true };
  } else if (isType(action, fetchDistributionAction.failed)) {
    return { ...state, loading: false };
  }

  if (isType(action, fetchDistributionsAction.done)) {
    return {
      ...state,
      searchResult: action.payload.result.rows,
      pages: action.payload.result.pages,
      loading: false,
    };
  } else if (isType(action, fetchDistributionsAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchDistributionsAction.failed)) {
    return { ...state, loading: false };
  }

  /**
   * FILTER
   */

  switch (action.type) {
    case SET_DISTRIBUTIONS_FILTER_DONOR:
      return { ...state, filter: { ...state.filter, donor: action.payload } };
    case SET_DISTRIBUTIONS_FILTER_KID:
      return { ...state, filter: { ...state.filter, KID: action.payload } };
  }

  /**
   * PAGINATION ACTIONS
   */
  switch (action.type) {
    case SET_DISTRIBUTIONS_PAGINATION:
      return { ...state, pagination: action.payload };
  }

  /**
   * DISTRIBUTION INPUT ACTIONS
   */

  if (isType(action, createDistributionAction.done)) {
    toast.success(
      `${
        action.payload.result.newDistribution
          ? "Created new distribution"
          : "Found existing distribution"
      } with KID ${action.payload.result.KID}`,
    );
    return {
      ...state,
      filter: { ...state.filter, KID: action.payload.result.KID },
    };
  } else if (isType(action, createDistributionAction.failed)) {
    toastError("Couldn't create distribution", action.payload.error.message);
  }

  if (isType(action, getDonorTaxUnitsAction.done)) {
    return {
      ...state,
      distributionInput: {
        ...state.distributionInput,
        taxUnits: action.payload.result,
      },
    };
  } else if (isType(action, getDonorTaxUnitsAction.failed)) {
    // toastError('Failed to fetch tax units for donor', action.payload.error.message);
    return {
      ...state,
      distributionInput: {
        ...state.distributionInput,
        taxUnits: [],
      },
    };
  }

  if (isType(action, getDonorAction.done)) {
    const distribution = {
      ...state.distributionInput.distribution,
      donor: action.payload.result,
    };

    return {
      ...state,
      distributionInput: {
        ...state.distributionInput,
        distribution,
        valid: validDistribution(distribution),
      },
    };
  } else if (isType(action, getDonorAction.failed)) {
    const distribution = {
      ...state.distributionInput.distribution,
      donor: undefined,
    };

    return {
      ...state,
      distributionInput: {
        ...state.distributionInput,
        distribution,
        valid: validDistribution(distribution),
      },
    };
  }

  switch (action.type) {
    case SET_DISTRIBUTION_INPUT_DISTRIBUTION:
      const distribution = action.payload;
      return {
        ...state,
        distributionInput: {
          ...state.distributionInput,
          distribution,
          valid: validDistribution(distribution),
        },
      };
  }

  return state;
};

const validDistribution = (distribution: Partial<IDistribution>): boolean => {
  if (!distribution.donorId) {
    return false;
  }

  /*
  if (!distribution.standardDistribution) {
    if (!distribution.shares || distribution.shares.length === 0) {
      console.error("No shares");
      return false;
    }
    if (distribution.shares.some((share) => share.percentageShare.lessThan(0))) {
      console.error("Share less than 0");
      return false;
    }
    if (distribution.shares.some((share) => share.percentageShare.greaterThan(100))) {
      console.error("Share greater than 100");
      return false;
    }
    if (distribution.shares.some((share) => share.percentageShare.isNaN())) {
      console.error("Share is NaN");
      return false;
    }

    const sum = distribution.shares.reduce(
      (acc, share) => acc.add(share.percentageShare),
      new Decimal(0),
    );
    console.log(sum.toNumber());
    if (sum.lessThan(100)) {
      return false;
    }
    if (sum.greaterThan(100)) {
      return false;
    }
  }
  */

  return true;
};
