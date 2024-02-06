import actionCreatorFactory from "typescript-fsa";
import { IAutoGiroMandate, IPagination } from "../../models/types";

// AutoGiroMandate agreements actions
export const SET_AUTOGIRO_MANDATE_PAGINATION = "SET_AUTOGIRO_MANDATE_PAGINATION";
export const SET_AUTOGIRO_MANDATE_FILTER_KID = "SET_AUTOGIRO_MANDATE_FILTER_KID";
export const SET_AUTOGIRO_MANDATE_FILTER_DONOR = "SET_AUTOGIRO_MANDATE_FILTER_DONOR";
export const SET_AUTOGIRO_MANDATE_FILTER_STATUS = "SET_AUTOGIRO_MANDATE_FILTER_STATUS";
export const SET_AUTOGIRO_MANDATE_FILTER_PAYMENT_DATE = "SET_AUTOGIRO_MANDATE_FILTER_PAYMENT_DATE";
export const SET_AUTOGIRO_MANDATE_FILTER_DRAFT_DATE = "SET_AUTOGIRO_MANDATE_FILTER_CREATED_DATE";
export const CLEAR_CURRENT_AUTOGIRO_MANDATE = "CLEAR_CURRENT_AUTOGIRO_MANDATE";

const actionCreator = actionCreatorFactory();

interface IFetchAutoGiroMandatesResults {
  rows: Array<IAutoGiroMandate>;
  pages: number;
}

export interface IFetchAutoGiroMandatesActionParams {
  token: string;
}
export interface IFetchAutoGiroMandateActionParams {
  id: string;
  token: string;
}

export const fetchAutoGiroMandatesAction = actionCreator.async<
  IFetchAutoGiroMandatesActionParams,
  IFetchAutoGiroMandatesResults,
  Error
>("FETCH_AUTOGIRO_MANDATES");
export const fetchAutoGiroMandateAction = actionCreator.async<
  IFetchAutoGiroMandateActionParams,
  IAutoGiroMandate,
  Error
>("FETCH_AUTOGIRO_MANDATE");

export const setAutoGiroMandatePagination = (pagination: IPagination) => {
  return {
    type: SET_AUTOGIRO_MANDATE_PAGINATION,
    payload: pagination,
  };
};

interface AmountRange {
  from: number;
  to: number;
}

export const setAutoGiroMandateFilterDonor = (donor: string) => {
  return {
    type: SET_AUTOGIRO_MANDATE_FILTER_DONOR,
    payload: donor,
  };
};

export const setAutoGiroMandateFilterKID = (KID: string) => {
  return {
    type: SET_AUTOGIRO_MANDATE_FILTER_KID,
    payload: KID,
  };
};

export const setAutoGiroMandateFilterPaymentDate = (paymentDate: AmountRange) => {
  return {
    type: SET_AUTOGIRO_MANDATE_FILTER_PAYMENT_DATE,
    payload: paymentDate,
  };
};

export const setAutoGiroMandateFilterDraftDate = (from: Date | null, to: Date | null) => {
  return {
    type: SET_AUTOGIRO_MANDATE_FILTER_DRAFT_DATE,
    payload: { from: from, to: to },
  };
};

export const setAutoGiroMandateFilterStatus = (active: Array<number>) => {
  return {
    type: SET_AUTOGIRO_MANDATE_FILTER_STATUS,
    payload: active,
  };
};
