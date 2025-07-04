import { ReferralsState } from "../../models/state";
import { AnyAction } from "redux";
import { isType } from "typescript-fsa";
import { toastError } from "../../util/toasthelper";
import {
  fetchActiveRefferalsAction,
  fetchAllRefferalsAction,
  createReferralTypeAction,
  updateReferralTypeAction,
  toggleReferralTypeActiveAction,
} from "./referrals.action";

const initialState: ReferralsState = {
  active: undefined,
  all: undefined,
  loading: false,
};

export const refferalsReducer = (
  state: ReferralsState = initialState,
  action: AnyAction,
): ReferralsState => {
  // Fetch actions
  if (isType(action, fetchActiveRefferalsAction.done)) {
    return {
      ...state,
      active: action.payload.result,
    };
  } else if (isType(action, fetchActiveRefferalsAction.failed)) {
    toastError("Failed to fetch active referral types", action.payload.error.message);
  } else if (isType(action, fetchAllRefferalsAction.started)) {
    return {
      ...state,
      loading: true,
    };
  } else if (isType(action, fetchAllRefferalsAction.done)) {
    return {
      ...state,
      all: action.payload.result,
      loading: false,
    };
  } else if (isType(action, fetchAllRefferalsAction.failed)) {
    toastError("Failed to fetch all referral types", action.payload.error.message);
    return {
      ...state,
      loading: false,
    };
  }

  // Create action
  else if (isType(action, createReferralTypeAction.started)) {
    return {
      ...state,
      loading: true,
    };
  } else if (isType(action, createReferralTypeAction.done)) {
    return {
      ...state,
      loading: false,
    };
  } else if (isType(action, createReferralTypeAction.failed)) {
    toastError("Failed to create referral type", action.payload.error.message);
    return {
      ...state,
      loading: false,
    };
  }

  // Update action
  else if (isType(action, updateReferralTypeAction.started)) {
    return {
      ...state,
      loading: true,
    };
  } else if (isType(action, updateReferralTypeAction.done)) {
    return {
      ...state,
      loading: false,
    };
  } else if (isType(action, updateReferralTypeAction.failed)) {
    toastError("Failed to update referral type", action.payload.error.message);
    return {
      ...state,
      loading: false,
    };
  }

  // Toggle active action
  else if (isType(action, toggleReferralTypeActiveAction.started)) {
    return {
      ...state,
      loading: true,
    };
  } else if (isType(action, toggleReferralTypeActiveAction.done)) {
    return {
      ...state,
      loading: false,
    };
  } else if (isType(action, toggleReferralTypeActiveAction.failed)) {
    toastError("Failed to toggle referral type status", action.payload.error.message);
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
