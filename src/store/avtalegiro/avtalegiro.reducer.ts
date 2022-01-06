import Decimal from "decimal.js";
import { isType } from "typescript-fsa";
import { AvtaleGiroAgreementsState } from "../../models/state";
import { toastError } from "../../util/toasthelper";
import { CLEAR_CURRENT_AVTALEGIRO, fetchAvtaleGiroAction, fetchAvtaleGiroAgreementsAction, fetchAvtaleGiroExpectedByDateAction, fetchAvtaleGiroHistogramAction, fetchAvtaleGiroMissingByDateAction, fetchAvtaleGiroRecievedByDateAction, fetchAvtaleGiroReportAction, fetchAvtaleGiroValidationTableAction, SET_AVTALEGIRO_FILTER_ACTIVE, SET_AVTALEGIRO_FILTER_AMOUNT, SET_AVTALEGIRO_FILTER_DONOR, SET_AVTALEGIRO_FILTER_KID, SET_AVTALEGIRO_PAGINATION } from "./avtalegiro.actions";

const defaultAvtaleGiroAgreementState: AvtaleGiroAgreementsState = {
  agreements: [],
  loading: false,
  pages: 1,
  pagination: {
    page: 0,
    limit: 20,
    sort: {
      id: 'created',
      desc: true,
    },
  },
  filter: {
    amount: {
      from: 0,
      to: 1000000,
    },
    KID: '',
    donor: '',
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
    expected: []
  }
};

export const avtaleGiroReducer = (
  state = defaultAvtaleGiroAgreementState,
  action: any
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
    if(isType(action, fetchAvtaleGiroAgreementsAction.done)) {
        return {
            ...state,
            loading: false,
            agreements: action.payload.result.rows,
            pages: action.payload.result.pages
        }
    }
    else if (isType(action, fetchAvtaleGiroAgreementsAction.started)) {
        return { ...state, loading: true }
    }
    else if (isType(action, fetchAvtaleGiroAgreementsAction.failed)) {
        return { ...state, loading: false }
    }

    // Fetch single agreement
    if(isType(action, fetchAvtaleGiroAction.done)) {
        return {
            ...state,
            currentAgreement: {
                ...action.payload.result,
                distribution: action.payload.result.distribution.map(dist => (
                  {
                    ...dist,
                    share: new Decimal(dist.share)
                  }
                ))
            },
            loading: false
        }
    }
    else if (isType(action, fetchAvtaleGiroAction.started)) {
        return { ...state, loading: true }
    }
    else if (isType(action, fetchAvtaleGiroAction.failed)) {
        return { ...state, loading: false }
    }

    // Clear current AvtaleGiro
    if (action.type === CLEAR_CURRENT_AVTALEGIRO) {
        return {
            ...state,
            currentAgreement: undefined
        }
    }

  // Fetch agreement report
  if (isType(action, fetchAvtaleGiroReportAction.done)) {
    return {
      ...state,
      loading: false,
      report: {
        ...action.payload.result
      }
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
        validationTable: action.payload.result
      }
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
        missing: action.payload.result
      }
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
        recieved: action.payload.result
      }
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
        missing: action.payload.result
      }
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
    toastError('Failed to fetch AvtaleGiro histogram', action.payload.error.message);
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
  }

  return state;
};
