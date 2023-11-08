import { isType } from "typescript-fsa";
import { TaxUnitsState } from "../../models/state";
import { CreateTaxUnitAction, DeleteTaxUnitAction, UpdateTaxUnitAction } from "./taxunits.actions";
import { toast } from "react-toastify";

const defaultState: TaxUnitsState = {
  units: [],
  loading: false,
  pages: 1,
  pagination: {
    page: 0,
    limit: 25,
    sort: {
      id: "timestamp",
      desc: true,
    },
  },
  filter: {},
};
export const taxUnitsReducer = (state = defaultState, action: any): TaxUnitsState => {
  if (isType(action, CreateTaxUnitAction.failed)) {
    toast.error(action.payload.error.message);
    return {
      ...state,
      loading: false,
    };
  }
  if (isType(action, UpdateTaxUnitAction.failed)) {
    toast.error(action.payload.error.message);
    return {
      ...state,
      loading: false,
    };
  }
  if (isType(action, DeleteTaxUnitAction.failed)) {
    toast.error(action.payload.error.message);
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
