import Decimal from "decimal.js";
import { toast } from "react-toastify";
import { isType } from "typescript-fsa";
import { AvtaleGiroAgreementsState } from "../../models/state";
import { toastError } from "../../util/toasthelper";
import {
  CLEAR_CURRENT_AVTALEGIRO,
  fetchAvtaleGiroAction,
  fetchAvtaleGiroAgreementsAction,
  fetchAvtaleGiroExpectedByDateAction,
  fetchAvtaleGiroHistogramAction,
  fetchAvtaleGiroMissingByDateAction,
  fetchAvtaleGiroRecievedByDateAction,
  fetchAvtaleGiroReportAction,
  fetchAvtaleGiroValidationTableAction,
  SET_AVTALEGIRO_FILTER_ACTIVE,
  SET_AVTALEGIRO_FILTER_AMOUNT,
  SET_AVTALEGIRO_FILTER_DONOR,
  SET_AVTALEGIRO_FILTER_KID,
  SET_AVTALEGIRO_FILTER_PAYMENT_DATE,
  SET_AVTALEGIRO_FILTER_DRAFT_DATE,
  SET_AVTALEGIRO_PAGINATION,
  updateAvtaleGiroAmountAction,
  updateAvtaleGiroDistributionAction,
  updateAvtaleGiroPaymentDateAction,
  updateAvtaleGiroStatusAction,
} from "./avtalegiro.actions";

const defaultAvtaleGiroAgreementState: AvtaleGiroAgreementsState = {
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
      to: 1000000,
    },
    KID: "",
    paymentDate: undefined,
    created: undefined,
    donor: "",
    statuses: [],
  },
  report: {
    activeAgreementCount: 0,
    averageAgreementSum: 0,
    totalAgreementSum: 0,
    medianAgreementSum: 0,
    draftedThisMonth: 0,
    sumDraftedThisMonth: null,
    activatedThisMonth: 0,
    sumActivatedThisMonth: null,
    stoppedThisMonth: 0,
    sumStoppedThisMonth: null,
  },
  validation: {
    validationTable: [],
    missing: [],
    recieved: [],
    expected: [],
  },
};

export const avtaleGiroReducer = (
  state = defaultAvtaleGiroAgreementState,
  action: any,
): AvtaleGiroAgreementsState => {
  // Fetch multiple agreements
  if (isType(action, fetchAvtaleGiroAgreementsAction.done)) {
    return {
      ...state,
      loading: false,
      agreements: action.payload.result.rows,
      pages: action.payload.result.pages,
    };
  } else if (isType(action, fetchAvtaleGiroAgreementsAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAvtaleGiroAgreementsAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch multiple agreements
  if (isType(action, fetchAvtaleGiroAgreementsAction.done)) {
    return {
      ...state,
      loading: false,
      agreements: action.payload.result.rows,
      pages: action.payload.result.pages,
    };
  } else if (isType(action, fetchAvtaleGiroAgreementsAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAvtaleGiroAgreementsAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch single agreement
  if (isType(action, fetchAvtaleGiroAction.done)) {
    return {
      ...state,
      currentAgreement: {
        ...action.payload.result,
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
      },
      loading: false,
    };
  } else if (isType(action, fetchAvtaleGiroAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAvtaleGiroAction.failed)) {
    toastError("Kunne ikke laste inn avtale", action.payload.error.message);
    return { ...state, loading: false };
  }

  // Clear current AvtaleGiro
  if (action.type === CLEAR_CURRENT_AVTALEGIRO) {
    return {
      ...state,
      currentAgreement: undefined,
    };
  }

  /* Agreement update actions */
  if (isType(action, updateAvtaleGiroAmountAction.started)) {
    return {
      ...state,
      currentAgreementUpdating: true,
    };
  }
  if (isType(action, updateAvtaleGiroAmountAction.done)) {
    toast.success("Avtalegiro sum er oppdatert.");
    return {
      ...state,
      currentAgreement: {
        ...state.currentAgreement!,
        amount: action.payload.params.amount / 100,
      },
      currentAgreementUpdating: false,
    };
  }
  if (isType(action, updateAvtaleGiroAmountAction.failed)) {
    toastError("Kunne ikke endre avtalegiromengde.", "Oppdatering mislyktes.");
    return {
      ...state,
      currentAgreementUpdating: false,
    };
  }

  if (isType(action, updateAvtaleGiroStatusAction.started)) {
    return {
      ...state,
      currentAgreementUpdating: true,
    };
  }
  if (isType(action, updateAvtaleGiroStatusAction.done)) {
    toast.success("Avtalegirostatus oppdatert.");
    return {
      ...state,
      currentAgreement: {
        ...state.currentAgreement!,
        active: action.payload.params.status,
      },
      currentAgreementUpdating: false,
    };
  }
  if (isType(action, updateAvtaleGiroStatusAction.failed)) {
    toastError("Kunne ikke endre avtalegirostatus.", "Oppdatering mislyktes.");
    return {
      ...state,
      currentAgreementUpdating: false,
    };
  }

  if (isType(action, updateAvtaleGiroPaymentDateAction.started)) {
    return {
      ...state,
      currentAgreementUpdating: true,
    };
  }
  if (isType(action, updateAvtaleGiroPaymentDateAction.done)) {
    toast.success("Avtalegiro betalingsdato er oppdatert.");
    return {
      ...state,
      currentAgreement: {
        ...state.currentAgreement!,
        payment_date: action.payload.params.paymentDate,
      },
      currentAgreementUpdating: false,
    };
  }
  if (isType(action, updateAvtaleGiroPaymentDateAction.failed)) {
    toastError("Kunne ikke endre avtalegiro betalingsdato.", "Oppdatering mislyktes.");
    return {
      ...state,
      currentAgreementUpdating: false,
    };
  }

  if (isType(action, updateAvtaleGiroDistributionAction.started)) {
    return {
      ...state,
      currentAgreementUpdating: true,
    };
  }
  if (isType(action, updateAvtaleGiroDistributionAction.done)) {
    toast.success("Avtalegiro distribusjon oppdatert.");
    return {
      ...state,
      currentAgreement: {
        ...state.currentAgreement!,
        distribution: action.payload.params.distribution,
      },
      currentAgreementUpdating: false,
    };
  }
  if (isType(action, updateAvtaleGiroDistributionAction.failed)) {
    toastError("Kunne ikke endre distribusjon.", "Oppdatering mislyktes.");
    return {
      ...state,
      currentAgreementUpdating: false,
    };
  }

  if (isType(action, updateAvtaleGiroDistributionAction.started)) {
    return {
      ...state,
      currentAgreementUpdating: true,
    };
  }
  if (isType(action, updateAvtaleGiroDistributionAction.done)) {
    toast.success("Avtalegiro distribusjon oppdatert.");
    return {
      ...state,
      currentAgreement: {
        ...state.currentAgreement!,
        distribution: action.payload.params.distribution,
      },
      currentAgreementUpdating: false,
    };
  }
  if (isType(action, updateAvtaleGiroDistributionAction.failed)) {
    toastError("Kunne ikke endre distribusjon.", "Oppdatering mislyktes.");
    return {
      ...state,
      currentAgreementUpdating: false,
    };
  }

  // Fetch agreement report
  if (isType(action, fetchAvtaleGiroReportAction.done)) {
    return {
      ...state,
      loading: false,
      report: {
        ...action.payload.result,
      },
    };
  } else if (isType(action, fetchAvtaleGiroReportAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAvtaleGiroReportAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch validation table
  if (isType(action, fetchAvtaleGiroValidationTableAction.done)) {
    return {
      ...state,
      loading: false,
      validation: {
        ...state.validation,
        validationTable: action.payload.result,
      },
    };
  } else if (isType(action, fetchAvtaleGiroValidationTableAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAvtaleGiroValidationTableAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch validation missing
  if (isType(action, fetchAvtaleGiroMissingByDateAction.done)) {
    return {
      ...state,
      loading: false,
      validation: {
        ...state.validation,
        missing: action.payload.result,
      },
    };
  } else if (isType(action, fetchAvtaleGiroMissingByDateAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAvtaleGiroMissingByDateAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch validation recieved
  if (isType(action, fetchAvtaleGiroRecievedByDateAction.done)) {
    return {
      ...state,
      loading: false,
      validation: {
        ...state.validation,
        recieved: action.payload.result,
      },
    };
  } else if (isType(action, fetchAvtaleGiroRecievedByDateAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAvtaleGiroRecievedByDateAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch validation expected
  if (isType(action, fetchAvtaleGiroExpectedByDateAction.done)) {
    return {
      ...state,
      loading: false,
      validation: {
        ...state.validation,
        missing: action.payload.result,
      },
    };
  } else if (isType(action, fetchAvtaleGiroExpectedByDateAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAvtaleGiroExpectedByDateAction.failed)) {
    return { ...state, loading: false };
  }

  /**
   * PAGINATION ACTIONS
   */
  switch (action.type) {
    case SET_AVTALEGIRO_PAGINATION:
      return { ...state, pagination: action.payload };
  }

  /**
   * FILTER ACTIONS
   */

  if (isType(action, fetchAvtaleGiroHistogramAction.done)) {
    return {
      ...state,
      histogram: action.payload.result,
    };
  } else if (isType(action, fetchAvtaleGiroHistogramAction.failed)) {
    toastError("Failed to fetch AvtaleGiro histogram", action.payload.error.message);
  }

  switch (action.type) {
    case SET_AVTALEGIRO_FILTER_AMOUNT:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, amount: action.payload },
      };
    case SET_AVTALEGIRO_FILTER_DONOR:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, donor: action.payload },
      };
    case SET_AVTALEGIRO_FILTER_ACTIVE:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, statuses: action.payload },
      };
    case SET_AVTALEGIRO_FILTER_KID:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, KID: action.payload },
      };
    case SET_AVTALEGIRO_FILTER_PAYMENT_DATE:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, paymentDate: action.payload },
      };
    case SET_AVTALEGIRO_FILTER_DRAFT_DATE:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, created: action.payload },
      };
  }

  return state;
};
