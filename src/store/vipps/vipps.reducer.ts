import {
  VippsAgreementChargeState,
  VippsAgreementsState,
  VippsMatchingRulesState,
} from "../../models/state";
import { isType } from "typescript-fsa";
import { toastError } from "../../util/toasthelper";
import {
  fetchAgreementHistogramAction,
  fetchAgreementsReportAction,
  fetchChargeHistogramAction,
  fetchVippsAgreementAction,
  fetchVippsAgreementChargesAction,
  fetchVippsAgreementsAction,
  SET_VIPPS_AGREEMENTS_FILTER_AMOUNT,
  SET_VIPPS_AGREEMENTS_FILTER_CHARGE_DAY,
  SET_VIPPS_AGREEMENTS_FILTER_DRAFT_DATE,
  SET_VIPPS_AGREEMENTS_FILTER_DONOR,
  SET_VIPPS_AGREEMENTS_FILTER_KID,
  SET_VIPPS_AGREEMENTS_FILTER_STATUS,
  SET_VIPPS_AGREEMENTS_PAGINATION,
  SET_VIPPS_CHARGES_FILTER_AMOUNT,
  SET_VIPPS_CHARGES_FILTER_DONOR,
  SET_VIPPS_CHARGES_FILTER_KID,
  SET_VIPPS_CHARGES_FILTER_STATUS,
  SET_VIPPS_CHARGES_PAGINATION,
  SET_VIPPS_CHARGES_FILTER_DUE_DATE,
  fetchVippsMatchingRulesAction,
  createVippsMatchingRuleAction,
  deleteVippsMatchingRuleAction,
  updateVippsAmountAction,
  updateVippsStatusAction,
  updateVippsChargeDayAction,
  updateVippsDistributionAction,
} from "./vipps.actions";
import Decimal from "decimal.js";
import { DateTime } from "luxon";

const defaultAgreementState: VippsAgreementsState = {
  activeAgreementCount: 0,
  averageAgreementSum: 0,
  totalAgreementSum: 0,
  medianAgreementSum: 0,
  activatedThisMonth: 0,
  sumActivatedThisMonth: null,
  stoppedThisMonth: 0,
  sumStoppedThisMonth: null,
  pendingThisMonth: 0,
  sumPendingThisMonth: null,
  expiredThisMonth: 0,
  sumExpiredThisMonth: 0,
  agreements: [],
  loading: false,
  currentAgreementUpdating: false,
  pages: 1,
  pagination: {
    page: 0,
    limit: 25,
    sort: {
      id: "created",
      desc: true,
    },
  },
  filter: {
    amount: {
      from: 0,
      to: Number.MAX_SAFE_INTEGER,
    },
    created: undefined,
    chargeDay: undefined,
    KID: "",
    donor: "",
    statuses: undefined,
    statistics: {
      numAgreements: 0,
      sumAgreements: 0,
      avgAgreement: 0,
    },
  },
};

const defaultChargeState: VippsAgreementChargeState = {
  charges: [],
  loading: false,
  pages: 1,

  pagination: {
    page: 0,
    limit: 25,
    sort: {
      id: "dueDate",
      desc: true,
    },
  },
  filter: {
    amountNOK: {
      from: 0,
      to: Number.MAX_SAFE_INTEGER,
    },
    dueDate: {
      from: null,
      to: null,
    },
    KID: "",
    statuses: undefined,
    donor: "",
    statistics: {
      numCharges: 0,
      sumCharges: 0,
      avgCharge: 0,
    },
  },
};

const defaultVippsMatchingRulesState: VippsMatchingRulesState = {
  rules: [],
  loading: false,
};

export const vippsAgreementReducer = (
  state = defaultAgreementState,
  action: any,
): VippsAgreementsState => {
  // Fetch multiple agreements
  if (isType(action, fetchVippsAgreementsAction.done)) {
    return {
      ...state,
      loading: false,
      agreements: action.payload.result.rows,
      pages: action.payload.result.pages,
      filter: {
        ...state.filter,
        statistics: {
          numAgreements: action.payload.result.statistics.numAgreements,
          sumAgreements: new Decimal(action.payload.result.statistics.sumAgreements)
            .round()
            .toNumber(),
          avgAgreement: new Decimal(action.payload.result.statistics.avgAgreement)
            .round()
            .toNumber(),
        },
      },
    };
  } else if (isType(action, fetchVippsAgreementsAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchVippsAgreementsAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch single agreement
  if (isType(action, fetchVippsAgreementAction.done)) {
    return {
      ...state,
      currentAgreement: {
        ...action.payload.result,
        distribution: {
          ...action.payload.result.distribution,
          causeAreas: action.payload.result.distribution.causeAreas.map((c) => ({
            ...c,
            percentageShare: new Decimal(c.percentageShare),
            organizations: c.organizations.map((o) => ({
              ...o,
              percentageShare: new Decimal(o.percentageShare),
            })),
          })),
        },
      },
      loading: false,
    };
  } else if (isType(action, fetchVippsAgreementAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchVippsAgreementAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch agreement report
  if (isType(action, fetchAgreementsReportAction.done)) {
    return {
      ...state,
      loading: false,
      ...action.payload.result,
    };
  } else if (isType(action, fetchAgreementsReportAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAgreementsReportAction.failed)) {
    return { ...state, loading: false };
  }

  /**
   * PAGINATION ACTIONS
   */
  switch (action.type) {
    case SET_VIPPS_AGREEMENTS_PAGINATION:
      return { ...state, pagination: action.payload };
  }

  /**
   * FILTER ACTIONS
   */

  if (isType(action, fetchAgreementHistogramAction.done)) {
    return {
      ...state,
      histogram: action.payload.result,
    };
  } else if (isType(action, fetchAgreementHistogramAction.failed)) {
    toastError("Failed to fetch agreement histogram", action.payload.error.message);
  }

  if (isType(action, fetchChargeHistogramAction.done)) {
    return {
      ...state,
      histogram: action.payload.result,
    };
  } else if (isType(action, fetchChargeHistogramAction.failed)) {
    toastError("Failed to fetch charge histogram", action.payload.error.message);
  }

  switch (action.type) {
    case SET_VIPPS_AGREEMENTS_FILTER_AMOUNT:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, amount: action.payload },
      };
    case SET_VIPPS_AGREEMENTS_FILTER_CHARGE_DAY:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, chargeDay: action.payload },
      };
    case SET_VIPPS_AGREEMENTS_FILTER_DONOR:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, donor: action.payload },
      };
    case SET_VIPPS_AGREEMENTS_FILTER_DRAFT_DATE:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, created: action.payload },
      };
    case SET_VIPPS_AGREEMENTS_FILTER_STATUS:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, statuses: action.payload },
      };
    case SET_VIPPS_AGREEMENTS_FILTER_KID:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, KID: action.payload },
      };
  }

  // Update Vipps agreement actions
  if (
    isType(action, updateVippsAmountAction.started) ||
    isType(action, updateVippsStatusAction.started) ||
    isType(action, updateVippsChargeDayAction.started) ||
    isType(action, updateVippsDistributionAction.started)
  ) {
    return { ...state, currentAgreementUpdating: true };
  }

  if (
    isType(action, updateVippsAmountAction.done) ||
    isType(action, updateVippsStatusAction.done) ||
    isType(action, updateVippsChargeDayAction.done)
  ) {
    return { ...state, currentAgreementUpdating: false };
  }

  if (isType(action, updateVippsDistributionAction.done)) {
    const newKID = action.payload.result.KID;
    const updatedAgreement = state.currentAgreement
      ? {
          ...state.currentAgreement,
          KID: newKID,
          distribution: {
            ...state.currentAgreement.distribution,
            kid: newKID,
          },
        }
      : undefined;

    return {
      ...state,
      currentAgreementUpdating: false,
      currentAgreement: updatedAgreement,
    };
  }

  if (
    isType(action, updateVippsAmountAction.failed) ||
    isType(action, updateVippsStatusAction.failed) ||
    isType(action, updateVippsChargeDayAction.failed) ||
    isType(action, updateVippsDistributionAction.failed)
  ) {
    toastError("Failed to update Vipps agreement", action.payload.error.message);
    return { ...state, currentAgreementUpdating: false };
  }

  return state;
};

export const vippsAgreementChargeReducer = (
  state = defaultChargeState,
  action: any,
): VippsAgreementChargeState => {
  if (isType(action, fetchVippsAgreementChargesAction.done)) {
    return {
      ...state,
      loading: false,
      charges: action.payload.result.rows,
      pages: action.payload.result.pages,
      filter: {
        ...state.filter,
        statistics: {
          numCharges: action.payload.result.statistics.numCharges,
          sumCharges: new Decimal(action.payload.result.statistics.sumCharges).round().toNumber(),
          avgCharge: new Decimal(action.payload.result.statistics.avgCharge).round().toNumber(),
        },
      },
    };
  } else if (isType(action, fetchVippsAgreementChargesAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchVippsAgreementChargesAction.failed)) {
    return { ...state, loading: false };
  }

  /**
   * PAGINATION ACTIONS
   */
  switch (action.type) {
    case SET_VIPPS_CHARGES_PAGINATION:
      return { ...state, pagination: action.payload };
  }

  /**
   * FILTER ACTIONS
   */

  if (isType(action, fetchChargeHistogramAction.done)) {
    return {
      ...state,
      histogram: action.payload.result,
    };
  } else if (isType(action, fetchChargeHistogramAction.failed)) {
    toastError("Failed to fetch agreement histogram", action.payload.error.message);
  }

  if (isType(action, fetchChargeHistogramAction.done)) {
    return {
      ...state,
      histogram: action.payload.result,
    };
  } else if (isType(action, fetchChargeHistogramAction.failed)) {
    toastError("Failed to fetch charge histogram", action.payload.error.message);
  }

  switch (action.type) {
    case SET_VIPPS_CHARGES_FILTER_AMOUNT:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, amountNOK: action.payload },
      };
    case SET_VIPPS_CHARGES_FILTER_DUE_DATE:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, dueDate: action.payload },
      };
    case SET_VIPPS_CHARGES_FILTER_DONOR:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, donor: action.payload },
      };
    case SET_VIPPS_CHARGES_FILTER_STATUS:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, statuses: action.payload },
      };
    case SET_VIPPS_CHARGES_FILTER_KID:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, KID: action.payload },
      };
  }

  return state;
};

export const vippsMatchingRulesReducer = (
  state = defaultVippsMatchingRulesState,
  action: any,
): VippsMatchingRulesState => {
  if (isType(action, fetchVippsMatchingRulesAction.done)) {
    return {
      ...state,
      rules: action.payload.result.map((rule: any) => ({
        ...rule,
        periodFrom: rule.periodFrom ? DateTime.fromISO(rule.periodFrom) : null,
        periodTo: rule.periodTo ? DateTime.fromISO(rule.periodTo) : null,
      })),
      loading: false,
    };
  } else if (isType(action, fetchVippsMatchingRulesAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchVippsMatchingRulesAction.failed)) {
    return { ...state, loading: false };
  }

  if (isType(action, createVippsMatchingRuleAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, createVippsMatchingRuleAction.done)) {
    return { ...state, loading: false };
  } else if (isType(action, createVippsMatchingRuleAction.failed)) {
    toastError("Failed to create matching rule", action.payload.error.message);
    return { ...state, loading: false };
  }

  if (isType(action, deleteVippsMatchingRuleAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, deleteVippsMatchingRuleAction.done)) {
    return { ...state, loading: false };
  } else if (isType(action, deleteVippsMatchingRuleAction.failed)) {
    toastError("Failed to delete matching rule", action.payload.error.message);
    return { ...state, loading: false };
  }

  return state; // Placeholder for future implementation
};
