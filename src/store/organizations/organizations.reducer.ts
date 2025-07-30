import { OrganizationsState } from "../../models/state";
import { AnyAction } from "redux";
import {
  fetchAllOrganizationsAction,
  createOrganizationAction,
  updateOrganizationAction,
  toggleOrganizationActiveAction,
} from "./organizations.action";
import { isType } from "typescript-fsa";
import Decimal from "decimal.js";

const initialState: OrganizationsState = {
  all: undefined,
};

export const organizationsReducer = (
  state: OrganizationsState = initialState,
  action: AnyAction,
): OrganizationsState => {
  if (isType(action, fetchAllOrganizationsAction.done)) {
    return {
      ...state,
      all: action.payload.result.map((org) => ({
        ...org,
        standardShare: new Decimal(org.standardShare),
      })),
    };
  } else if (isType(action, createOrganizationAction.done)) {
    // The saga will refetch all organizations, so we don't need to update state here
    return state;
  } else if (isType(action, updateOrganizationAction.done)) {
    // The saga will refetch all organizations, so we don't need to update state here
    return state;
  } else if (isType(action, toggleOrganizationActiveAction.done)) {
    // The saga will refetch all organizations, so we don't need to update state here
    return state;
  }

  return state;
};
