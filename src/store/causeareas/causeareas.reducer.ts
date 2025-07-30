import { CauseAreasState } from "../../models/state";
import { AnyAction } from "redux";
import {
  fetchActiveCauseareasAction,
  fetchAllCauseareasAction,
  createCauseAreaAction,
  updateCauseAreaAction,
  toggleCauseAreaActiveAction,
} from "./causeareas.action";
import { isType } from "typescript-fsa";
import Decimal from "decimal.js";

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
  } else if (isType(action, fetchAllCauseareasAction.done)) {
    return {
      ...state,
      all: action.payload.result.map((ca) => ({
        ...ca,
        standardPercentageShare: new Decimal(ca.standardPercentageShare),
        organizations: ca.organizations.map((org) => ({
          ...org,
          standardShare: new Decimal(org.standardShare),
        })),
      })),
    };
  } else if (isType(action, createCauseAreaAction.done)) {
    // The saga will refetch all cause areas, so we don't need to update state here
    return state;
  } else if (isType(action, updateCauseAreaAction.done)) {
    // The saga will refetch all cause areas, so we don't need to update state here
    return state;
  } else if (isType(action, toggleCauseAreaActiveAction.done)) {
    // The saga will refetch all cause areas, so we don't need to update state here
    return state;
  }

  return state;
};
