import { DateTime } from "luxon";
import actionCreatorFactory from "typescript-fsa";
import {
  IAutoGiro,
  IAutoGiroValidationTableRow,
  IDistribution,
  IDonation,
  IHistogramBucket,
  IPagination,
} from "../../models/types";

// AutoGiro agreements actions
export const SET_AUTOGIRO_PAGINATION = "SET_AUTOGIRO_PAGINATION";
export const SET_AUTOGIRO_FILTER_AMOUNT = "SET_AUTOGIRO_FILTER_AMOUNT";
export const SET_AUTOGIRO_FILTER_KID = "SET_AUTOGIRO_FILTER_KID";
export const SET_AUTOGIRO_FILTER_DONOR = "SET_AUTOGIRO_FILTER_DONOR";
export const SET_AUTOGIRO_FILTER_ACTIVE = "SET_AUTOGIRO_FILTER_ACTIVE";
export const SET_AUTOGIRO_FILTER_PAYMENT_DATE = "SET_AUTOGIRO_FILTER_PAYMENT_DATE";
export const SET_AUTOGIRO_FILTER_DRAFT_DATE = "SET_AUTOGIRO_FILTER_DRAFT_DATE";
export const CLEAR_CURRENT_AUTOGIRO = "CLEAR_CURRENT_DONATION";

const actionCreator = actionCreatorFactory();

interface IFetchAutoGirosResults {
  rows: Array<IAutoGiro>;
  pages: number;
}

interface IFetchAutoGiroReportResult {
  activeAgreementCount: number;
  averageAgreementSum: number;
  totalAgreementSum: number;
  medianAgreementSum: number;
  draftedThisMonth: number;
  sumDraftedThisMonth: number | null;
  activatedThisMonth: number;
  sumActivatedThisMonth: number | null;
  stoppedThisMonth: number;
  sumStoppedThisMonth: number | null;
}

export interface IFetchAutoGiroAgreementsActionParams {
  token: string;
}
export interface IFetchAgreementActionParams {
  id: string;
  token: string;
}
export interface IUpdateAutoGiroAmountActionParams {
  KID: string;
  amount: number;
  token: string;
}
export interface IUpdateAutoGiroStatusActionParams {
  KID: string;
  status: number;
  token: string;
}
export interface IUpdateAutoGiroPaymentDateActionParams {
  KID: string;
  paymentDate: number;
  token: string;
}
export interface IUpdateAutoGiroDistributionActionParams {
  KID: string;
  distribution: IDistribution;
  token: string;
}
export interface IFetchAutoGiroDateValidationParams {
  date: DateTime;
  token: string;
}
export interface IFetchAutoGiroReportActionParams {
  token: string;
}
export interface IFetchAutoGiroValidationTableActionParams {
  token: string;
}
export interface IFetchAutoGiroHistogramActionParams {
  token: string;
}

export const fetchAutoGiroAgreementsAction = actionCreator.async<
  IFetchAutoGiroAgreementsActionParams,
  IFetchAutoGirosResults,
  Error
>("FETCH_AUTOGIRO_AGREEMENTS");
export const fetchAutoGiroAction = actionCreator.async<
  IFetchAgreementActionParams,
  IAutoGiro,
  Error
>("FETCH_AUTOGIRO");
export const updateAutoGiroAmountAction = actionCreator.async<
  IUpdateAutoGiroAmountActionParams,
  number,
  Error
>("UPDATE_AUTOGIRO_AMOUNT");
export const updateAutoGiroStatusAction = actionCreator.async<
  IUpdateAutoGiroStatusActionParams,
  number,
  Error
>("UPDATE_AUTOGIRO_STATUS");
export const updateAutoGiroPaymentDateAction = actionCreator.async<
  IUpdateAutoGiroPaymentDateActionParams,
  number,
  Error
>("UPDATE_AUTOGIRO_PAYMENTDATE");
export const updateAutoGiroDistributionAction = actionCreator.async<
  IUpdateAutoGiroDistributionActionParams,
  boolean,
  Error
>("UPDATE_AUTOGIRO_DISTRIBUTION");
export const fetchAutoGiroReportAction = actionCreator.async<
  IFetchAutoGiroReportActionParams,
  IFetchAutoGiroReportResult,
  Error
>("FETCH_AUTOGIRO_REPORT");
export const fetchAutoGiroValidationTableAction = actionCreator.async<
  IFetchAutoGiroValidationTableActionParams,
  Array<IAutoGiroValidationTableRow>,
  Error
>("FETCH_AUTOGIRO_VALIDATIONTABLE");
export const fetchAutoGiroMissingByDateAction = actionCreator.async<
  IFetchAutoGiroDateValidationParams,
  Array<IAutoGiro>,
  Error
>("FETCH_AUTOGIRO_MISSING_BY_DATE");
export const fetchAutoGiroRecievedByDateAction = actionCreator.async<
  IFetchAutoGiroDateValidationParams,
  Array<IDonation>,
  Error
>("FETCH_AUTOGIRO_RECIEVED_BY_DATE");
export const fetchAutoGiroExpectedByDateAction = actionCreator.async<
  IFetchAutoGiroDateValidationParams,
  Array<IAutoGiro>,
  Error
>("FETCH_AUTOGIRO_EXPECTED_BY_DATE");
export const fetchAutoGiroHistogramAction = actionCreator.async<
  IFetchAutoGiroHistogramActionParams,
  Array<IHistogramBucket>,
  Error
>("FETCH_AUTOGIRO_HISTOGRAM");

export const setAutoGiroPagination = (pagination: IPagination) => {
  return {
    type: SET_AUTOGIRO_PAGINATION,
    payload: pagination,
  };
};

interface AmountRange {
  from: number;
  to: number;
}

export const setAutoGiroFilterAmount = (amountRange: AmountRange) => {
  return {
    type: SET_AUTOGIRO_FILTER_AMOUNT,
    payload: amountRange,
  };
};

export const setAutoGiroFilterDonor = (donor: string) => {
  return {
    type: SET_AUTOGIRO_FILTER_DONOR,
    payload: donor,
  };
};

export const setAutoGiroFilterKID = (KID: string) => {
  return {
    type: SET_AUTOGIRO_FILTER_KID,
    payload: KID,
  };
};

export const setAutoGiroFilterPaymentDate = (paymentDate: AmountRange) => {
  return {
    type: SET_AUTOGIRO_FILTER_PAYMENT_DATE,
    payload: paymentDate,
  };
};

export const setAutoGiroFilterDraftDate = (from: Date | null, to: Date | null) => {
  return {
    type: SET_AUTOGIRO_FILTER_DRAFT_DATE,
    payload: { from: from, to: to },
  };
};

export const setAutoGiroFilterActive = (active: Array<number>) => {
  return {
    type: SET_AUTOGIRO_FILTER_ACTIVE,
    payload: active,
  };
};

export const clearCurrentAutoGiro = () => ({ type: CLEAR_CURRENT_AUTOGIRO });
