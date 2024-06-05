import { SingleDonationState } from "../../models/state";
import { AnyAction } from "redux";
import { IPaymentMethod } from "../../models/types";
import { DateTime } from "luxon";
import {
  createDistribitionAndInsertDonationAction,
  fetchPaymentMethodsAction,
} from "./single-donation.actions";
import { isType } from "typescript-fsa";
import { toast } from "react-toastify";
import { toastError } from "../../util/toasthelper";
import { updateDonationAction } from "../donations/donation.actions";

const initialState: SingleDonationState = {
  editSaving: false,
  paymentMethods: [],
};

export const singleDonationReducer = (
  state: SingleDonationState = initialState,
  action: AnyAction,
): SingleDonationState => {
  if (isType(action, createDistribitionAndInsertDonationAction.done)) {
    toast.success("Donation inserted");
  } else if (isType(action, createDistribitionAndInsertDonationAction.failed)) {
    console.log("IN single donation reducer", action);
    toastError("Could not insert donation", action.payload.error.message);
  }

  if (isType(action, updateDonationAction.started)) {
    return {
      ...state,
      editSaving: true,
    };
  } else if (isType(action, updateDonationAction.done)) {
    toast.success("Donation updated");
    return {
      ...state,
      editSaving: false,
    };
  } else if (isType(action, updateDonationAction.failed)) {
    toastError("Could not update donation", action.payload.error.message);
    return {
      ...state,
      editSaving: false,
    };
  }

  //TODO: Move to another place in state
  if (isType(action, fetchPaymentMethodsAction.done)) {
    return {
      ...state,
      paymentMethods: action.payload.result.map((method: IPaymentMethod) => {
        return {
          ...method,
          lastUpdated: DateTime.fromISO(method.lastUpdated.toString()),
        };
      }),
    };
  } else if (isType(action, fetchPaymentMethodsAction.failed)) {
    toastError("Failed to fetch payment methods", action.payload.error.message);
  }

  return state;
};
