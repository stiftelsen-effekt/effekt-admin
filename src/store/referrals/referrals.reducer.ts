import { ReferralsState } from "../../models/state";
import { AnyAction } from "redux";
import { isType } from "typescript-fsa";
import { toastError } from "../../util/toasthelper";
import { fetchActiveRefferalsAction, fetchAllRefferalsAction } from "./referrals.action";

const initialState: ReferralsState = {
  active: undefined,
  all: undefined,
};

export const refferalsReducer = (
  state: ReferralsState = initialState,
  action: AnyAction,
): ReferralsState => {
  if (isType(action, fetchActiveRefferalsAction.done)) {
    return {
      ...state,
      active: action.payload.result,
    };
  } else if (isType(action, fetchActiveRefferalsAction.failed)) {
    toastError("Failed to fetch active organizations", action.payload.error.message);
  } else if (isType(action, fetchAllRefferalsAction.done)) {
    return {
      ...state,
      all: action.payload.result,
    };
  } else if (isType(action, fetchAllRefferalsAction.failed)) {
    toastError("Failed to fetch all organizations", action.payload.error.message);
  }

  return state;
};
