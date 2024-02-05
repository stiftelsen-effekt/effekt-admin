import { CauseAreasState } from "../../models/state";
import { AnyAction } from "redux";
import { fetchActiveCauseareasAction, fetchAllCauseareasAction } from "./causeareas.action";
import { isType } from "typescript-fsa";
import { toastError } from "../../util/toasthelper";

const initialState: CauseAreasState = {
  active: undefined,
  all: undefined,
};

export const causeareasReducer = (
  state: CauseAreasState = initialState,
  action: AnyAction,
): CauseAreasState => {
  if (isType(action, fetchActiveCauseareasAction.done)) {
    return {
      ...state,
      active: action.payload.result,
    };
  } else if (isType(action, fetchActiveCauseareasAction.failed)) {
    toastError("Failed to fetch active organizations", action.payload.error.message);
  } else if (isType(action, fetchAllCauseareasAction.done)) {
    return {
      ...state,
      all: action.payload.result,
    };
  } else if (isType(action, fetchAllCauseareasAction.failed)) {
    toastError("Failed to fetch all organizations", action.payload.error.message);
  }

  return state;
};
