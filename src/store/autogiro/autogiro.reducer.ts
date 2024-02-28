import Decimal from "decimal.js";
import { toast } from "react-toastify";
import { isType } from "typescript-fsa";
import { AutoGiroAgreementsState } from "../../models/state";
import { toastError } from "../../util/toasthelper";
import {
  CLEAR_CURRENT_AUTOGIRO,
  fetchAutoGiroAction,
  fetchAutoGiroAgreementsAction,
  fetchAutoGiroExpectedByDateAction,
  fetchAutoGiroHistogramAction,
  fetchAutoGiroMissingByDateAction,
  fetchAutoGiroRecievedByDateAction,
  fetchAutoGiroValidationTableAction,
  SET_AUTOGIRO_FILTER_ACTIVE,
  SET_AUTOGIRO_FILTER_AMOUNT,
  SET_AUTOGIRO_FILTER_DONOR,
  SET_AUTOGIRO_FILTER_KID,
  SET_AUTOGIRO_FILTER_PAYMENT_DATE,
  SET_AUTOGIRO_FILTER_DRAFT_DATE,
  SET_AUTOGIRO_PAGINATION,
  updateAutoGiroAmountAction,
  updateAutoGiroDistributionAction,
  updateAutoGiroPaymentDateAction,
  updateAutoGiroStatusAction,
} from "./autogiro.actions";

const defaultAutoGiroAgreementState: AutoGiroAgreementsState = {
  agreements: [],
  loading: false,
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
    KID: "",
    payment_date: undefined,
    created: undefined,
    donor: "",
    statuses: undefined,
    statistics: {
      numAgreements: 0,
      sumAgreements: 0,
      avgAgreement: 0,
    },
  },
  validation: {
    validationTable: [],
    missing: [],
    recieved: [],
    expected: [],
  },
};

export const autoGiroReducer = (
  state = defaultAutoGiroAgreementState,
  action: any,
): AutoGiroAgreementsState => {
  // Fetch multiple agreements
  if (isType(action, fetchAutoGiroAgreementsAction.done)) {
    return {
      ...state,
      loading: false,
      agreements: action.payload.result.rows,
      pages: action.payload.result.pages,
      filter: {
        ...state.filter,
        statistics: {
          ...action.payload.result.statistics,
          sumAgreements: new Decimal(action.payload.result.statistics.sumAgreements)
            .round()
            .toNumber(),
          avgAgreement: new Decimal(action.payload.result.statistics.avgAgreement)
            .round()
            .toNumber(),
        },
      },
    };
  } else if (isType(action, fetchAutoGiroAgreementsAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAutoGiroAgreementsAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch single agreement
  if (isType(action, fetchAutoGiroAction.done)) {
    return {
      ...state,
      currentAgreement: {
        ...action.payload.result,
        distribution: {
          ...action.payload.result.distribution,
          causeAreas: action.payload.result.distribution.causeAreas.map((ca) => ({
            ...ca,
            percentageShare: new Decimal(ca.percentageShare as unknown as string),
            organizations: ca.organizations.map((org) => ({
              ...org,
              percentageShare: new Decimal(org.percentageShare as unknown as string),
            })),
          })),
        },
      },
      loading: false,
    };
  } else if (isType(action, fetchAutoGiroAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAutoGiroAction.failed)) {
    toastError("Kunne ikke laste inn avtale", action.payload.error.message);
    return { ...state, loading: false };
  }

  // Clear current AutoGiro
  if (action.type === CLEAR_CURRENT_AUTOGIRO) {
    return {
      ...state,
      currentAgreement: undefined,
    };
  }

  /* Agreement update actions */
  if (isType(action, updateAutoGiroAmountAction.started)) {
    return {
      ...state,
      currentAgreementUpdating: true,
    };
  }
  if (isType(action, updateAutoGiroAmountAction.done)) {
    toast.success("AutoGiro sum er oppdatert.");
    return {
      ...state,
      currentAgreement: {
        ...state.currentAgreement!,
        amount: action.payload.params.amount / 100,
      },
      currentAgreementUpdating: false,
    };
  }
  if (isType(action, updateAutoGiroAmountAction.failed)) {
    toastError("Kunne ikke endre AutoGiromengde.", "Oppdatering mislyktes.");
    return {
      ...state,
      currentAgreementUpdating: false,
    };
  }

  if (isType(action, updateAutoGiroStatusAction.started)) {
    return {
      ...state,
      currentAgreementUpdating: true,
    };
  }
  if (isType(action, updateAutoGiroStatusAction.done)) {
    toast.success("AutoGirostatus oppdatert.");
    return {
      ...state,
      currentAgreement: {
        ...state.currentAgreement!,
        active: action.payload.params.status,
      },
      currentAgreementUpdating: false,
    };
  }
  if (isType(action, updateAutoGiroStatusAction.failed)) {
    toastError("Kunne ikke endre AutoGirostatus.", "Oppdatering mislyktes.");
    return {
      ...state,
      currentAgreementUpdating: false,
    };
  }

  if (isType(action, updateAutoGiroPaymentDateAction.started)) {
    return {
      ...state,
      currentAgreementUpdating: true,
    };
  }
  if (isType(action, updateAutoGiroPaymentDateAction.done)) {
    toast.success("AutoGiro betalingsdato er oppdatert.");
    return {
      ...state,
      currentAgreement: {
        ...state.currentAgreement!,
        payment_date: action.payload.params.paymentDate,
      },
      currentAgreementUpdating: false,
    };
  }
  if (isType(action, updateAutoGiroPaymentDateAction.failed)) {
    toastError("Kunne ikke endre AutoGiro betalingsdato.", "Oppdatering mislyktes.");
    return {
      ...state,
      currentAgreementUpdating: false,
    };
  }

  if (isType(action, updateAutoGiroDistributionAction.started)) {
    return {
      ...state,
      currentAgreementUpdating: true,
    };
  }
  if (isType(action, updateAutoGiroDistributionAction.done)) {
    toast.success("AutoGiro distribusjon oppdatert.");
    return {
      ...state,
      currentAgreement: {
        ...state.currentAgreement!,
        distribution: action.payload.params.distribution,
      },
      currentAgreementUpdating: false,
    };
  }
  if (isType(action, updateAutoGiroDistributionAction.failed)) {
    toastError("Kunne ikke endre distribusjon.", "Oppdatering mislyktes.");
    return {
      ...state,
      currentAgreementUpdating: false,
    };
  }

  if (isType(action, updateAutoGiroDistributionAction.started)) {
    return {
      ...state,
      currentAgreementUpdating: true,
    };
  }
  if (isType(action, updateAutoGiroDistributionAction.done)) {
    toast.success("AutoGiro distribusjon oppdatert.");
    return {
      ...state,
      currentAgreement: {
        ...state.currentAgreement!,
        distribution: action.payload.params.distribution,
      },
      currentAgreementUpdating: false,
    };
  }
  if (isType(action, updateAutoGiroDistributionAction.failed)) {
    toastError("Kunne ikke endre distribusjon.", "Oppdatering mislyktes.");
    return {
      ...state,
      currentAgreementUpdating: false,
    };
  }

  // Fetch validation table
  if (isType(action, fetchAutoGiroValidationTableAction.done)) {
    return {
      ...state,
      loading: false,
      validation: {
        ...state.validation,
        validationTable: action.payload.result,
      },
    };
  } else if (isType(action, fetchAutoGiroValidationTableAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAutoGiroValidationTableAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch validation missing
  if (isType(action, fetchAutoGiroMissingByDateAction.done)) {
    return {
      ...state,
      loading: false,
      validation: {
        ...state.validation,
        missing: action.payload.result,
      },
    };
  } else if (isType(action, fetchAutoGiroMissingByDateAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAutoGiroMissingByDateAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch validation recieved
  if (isType(action, fetchAutoGiroRecievedByDateAction.done)) {
    return {
      ...state,
      loading: false,
      validation: {
        ...state.validation,
        recieved: action.payload.result,
      },
    };
  } else if (isType(action, fetchAutoGiroRecievedByDateAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAutoGiroRecievedByDateAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch validation expected
  if (isType(action, fetchAutoGiroExpectedByDateAction.done)) {
    return {
      ...state,
      loading: false,
      validation: {
        ...state.validation,
        missing: action.payload.result,
      },
    };
  } else if (isType(action, fetchAutoGiroExpectedByDateAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAutoGiroExpectedByDateAction.failed)) {
    return { ...state, loading: false };
  }

  /**
   * PAGINATION ACTIONS
   */
  switch (action.type) {
    case SET_AUTOGIRO_PAGINATION:
      return { ...state, pagination: action.payload };
  }

  /**
   * FILTER ACTIONS
   */

  if (isType(action, fetchAutoGiroHistogramAction.done)) {
    return {
      ...state,
      histogram: action.payload.result,
    };
  } else if (isType(action, fetchAutoGiroHistogramAction.failed)) {
    toastError("Failed to fetch AutoGiro histogram", action.payload.error.message);
  }

  switch (action.type) {
    case SET_AUTOGIRO_FILTER_AMOUNT:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, amount: action.payload },
      };
    case SET_AUTOGIRO_FILTER_DONOR:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, donor: action.payload },
      };
    case SET_AUTOGIRO_FILTER_ACTIVE:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, statuses: action.payload },
      };
    case SET_AUTOGIRO_FILTER_KID:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, KID: action.payload },
      };
    case SET_AUTOGIRO_FILTER_PAYMENT_DATE:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, payment_date: action.payload },
      };
    case SET_AUTOGIRO_FILTER_DRAFT_DATE:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, created: action.payload },
      };
  }

  return state;
};
