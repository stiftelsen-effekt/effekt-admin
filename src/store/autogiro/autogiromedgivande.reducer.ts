import { isType } from "typescript-fsa";
import { AutoGiroMandatesState } from "../../models/state";
import { toastError } from "../../util/toasthelper";
import {
  CLEAR_CURRENT_AUTOGIRO_MANDATE,
  SET_AUTOGIRO_MANDATE_FILTER_DONOR,
  SET_AUTOGIRO_MANDATE_FILTER_KID,
  SET_AUTOGIRO_MANDATE_FILTER_STATUS,
  SET_AUTOGIRO_MANDATE_PAGINATION,
  fetchAutoGiroMandateAction,
  fetchAutoGiroMandatesAction,
} from "./autogiromedgivande.actions";

const defaultAutoGiroMandatesState: AutoGiroMandatesState = {
  mandates: [],
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
  filter: {},
};

export const autoGiroMandateReducer = (
  state = defaultAutoGiroMandatesState,
  action: any,
): AutoGiroMandatesState => {
  // Fetch multiple agreements
  if (isType(action, fetchAutoGiroMandatesAction.done)) {
    return {
      ...state,
      loading: false,
      mandates: action.payload.result.rows,
      pages: action.payload.result.pages,
    };
  } else if (isType(action, fetchAutoGiroMandatesAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAutoGiroMandatesAction.failed)) {
    return { ...state, loading: false };
  }

  // Fetch single agreement
  if (isType(action, fetchAutoGiroMandateAction.done)) {
    return {
      ...state,
      currentMandate: {
        ...action.payload.result,
      },
      loading: false,
    };
  } else if (isType(action, fetchAutoGiroMandateAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchAutoGiroMandateAction.failed)) {
    toastError("Could not load mandate ", action.payload.error.message);
    return { ...state, loading: false };
  }

  // Clear current AutoGiro
  if (action.type === CLEAR_CURRENT_AUTOGIRO_MANDATE) {
    return {
      ...state,
      currentMandate: undefined,
    };
  }

  /**
   * PAGINATION ACTIONS
   */
  switch (action.type) {
    case SET_AUTOGIRO_MANDATE_PAGINATION:
      return { ...state, pagination: action.payload };
  }

  /**
   * FILTER ACTIONS
   */

  switch (action.type) {
    case SET_AUTOGIRO_MANDATE_FILTER_DONOR:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, donor: action.payload },
      };
    case SET_AUTOGIRO_MANDATE_FILTER_STATUS:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, statuses: action.payload },
      };
    case SET_AUTOGIRO_MANDATE_FILTER_KID:
      return {
        ...state,
        pagination: { ...state.pagination, page: 0 },
        filter: { ...state.filter, KID: action.payload },
      };
  }

  return state;
};
