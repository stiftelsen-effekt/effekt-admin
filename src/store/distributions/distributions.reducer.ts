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
import { fetchAllCauseareasAction } from "../causeareas/causeareas.action";

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
    valid: {
      valid: false,
      reason: "",
    },
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
      donorId: action.payload.result.id,
    };

    return {
      ...state,
      distributionInput: {
        ...state.distributionInput,
        distribution,
        donor: action.payload.result,
        valid: validDistribution(distribution),
      },
    };
  } else if (isType(action, getDonorAction.failed)) {
    const distribution = {
      ...state.distributionInput.distribution,
      donorId: undefined,
    };

    return {
      ...state,
      distributionInput: {
        ...state.distributionInput,
        distribution,
        donor: undefined,
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

  if (isType(action, fetchAllCauseareasAction.done)) {
    if (state.distributionInput.distribution.causeAreas?.length === 0) {
      return {
        ...state,
        distributionInput: {
          ...state.distributionInput,
          distribution: {
            ...state.distributionInput.distribution,
            causeAreas: action.payload.result.map((causeArea) => ({
              ...causeArea,
              standardSplit: true,
              percentageShare: new Decimal(0),
              organizations: causeArea.organizations.map((organization) => ({
                ...organization,
                percentageShare: new Decimal(organization.standardShare || 0),
              })),
            })),
          },
        },
      };
    }
  }

  return state;
};

const validDistribution = (
  distribution: Partial<IDistribution>,
): { valid: boolean; reason: string } => {
  if (!distribution.donorId) {
    return {
      valid: false,
      reason: "No donor selected",
    };
  }

  if (!distribution.causeAreas) {
    return {
      valid: false,
      reason: "No cause areas selected",
    };
  }

  if (distribution.causeAreas.length === 0) {
    return {
      valid: false,
      reason: "No cause areas selected",
    };
  }

  if (distribution.causeAreas.some((causeArea) => causeArea.percentageShare.isNaN())) {
    return {
      valid: false,
      reason: "Percentage share is not a number",
    };
  }

  if (
    distribution.causeAreas.some((causeArea) =>
      causeArea.organizations.some((organization) => organization.percentageShare.isNaN()),
    )
  ) {
    return {
      valid: false,
      reason: "Percentage share is not a number",
    };
  }

  if (
    distribution.causeAreas.some((causeArea) =>
      causeArea.organizations.some((organization) => organization.percentageShare.isNegative()),
    )
  ) {
    return {
      valid: false,
      reason: "Percentage share is negative",
    };
  }

  if (
    distribution.causeAreas.some((causeArea) =>
      causeArea.organizations.some((organization) => organization.percentageShare.greaterThan(100)),
    )
  ) {
    return {
      valid: false,
      reason: "Percentage share is greater than 100",
    };
  }

  if (distribution.causeAreas.some((causeArea) => causeArea.percentageShare.isNegative())) {
    return {
      valid: false,
      reason: "Percentage share is negative",
    };
  }

  if (distribution.causeAreas.some((causeArea) => causeArea.percentageShare.greaterThan(100))) {
    return {
      valid: false,
      reason: "Percentage share is greater than 100",
    };
  }

  /** If not summing to 100 */
  if (
    distribution.causeAreas
      .reduce((acc, causeArea) => acc.plus(causeArea.percentageShare), new Decimal(0))
      .toNumber() !== 100
  ) {
    return {
      valid: false,
      reason: "Cause areas do not sum to 100",
    };
  }

  if (
    distribution.causeAreas.some(
      (causeArea) =>
        causeArea.organizations
          .reduce((acc, organization) => acc.plus(organization.percentageShare), new Decimal(0))
          .toNumber() !== 100,
    )
  ) {
    return {
      valid: false,
      reason: "Organizations do not sum to 100",
    };
  }

  return {
    valid: true,
    reason: "",
  };
};
