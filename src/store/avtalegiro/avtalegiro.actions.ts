import actionCreatorFactory from 'typescript-fsa';
import { Share } from '../../components/pages/avtalegiro/AvtaleGiroAgreement/ShareSelection/ShareSelection';
import { IAvtaleGiro, IAvtaleGiroValidationTableRow, IHistogramBucket, IPagination } from '../../models/types';

// AvtaleGiro agreements actions
export const SET_AVTALEGIRO_PAGINATION = "SET_AVTALEGIRO_PAGINATION"
export const SET_AVTALEGIRO_FILTER_AMOUNT = "SET_AVTALEGIRO_FILTER_AMOUNT"
export const SET_AVTALEGIRO_FILTER_KID = "SET_AVTALEGIRO_FILTER_KID"
export const SET_AVTALEGIRO_FILTER_DONOR = "SET_AVTALEGIRO_FILTER_DONOR"
export const SET_AVTALEGIRO_FILTER_ACTIVE = "SET_AVTALEGIRO_FILTER_ACTIVE"
export const CLEAR_CURRENT_AVTALEGIRO = "CLEAR_CURRENT_DONATION"

const actionCreator = actionCreatorFactory();

interface IFetchAvtaleGirosResults {
  rows: Array<IAvtaleGiro>;
  pages: number;
}

interface IFetchAvtaleGiroReportResult {
  activeAgreementCount: number;
  averageAgreementSum: number;
  totalAgreementSum: number;
  medianAgreementSum: number;
}

export interface IFetchAgreementActionParams { id: string }
export interface IUpdateAvtaleGiroAmountActionParams { KID: string, amount: number }
export interface IUpdateAvtaleGiroStatusActionParams { KID: string, status: number }
export interface IUpdateAvtaleGiroPaymentDateActionParams { KID: string, paymentDate: number }
export interface IUpdateAvtaleGiroDistributionActionParams { KID: string, distribution: Array<Share>}

export const fetchAvtaleGiroAgreementsAction = actionCreator.async<undefined, IFetchAvtaleGirosResults, Error>('FETCH_AVTALEGIRO_AGREEMENTS');
export const fetchAvtaleGiroAction = actionCreator.async<IFetchAgreementActionParams, IAvtaleGiro, Error>('FETCH_AVTALEGIRO');
export const updateAvtaleGiroAmountAction = actionCreator.async<IUpdateAvtaleGiroAmountActionParams, number, Error>('UPDATE_AVTALEGIRO_AMOUNT');
export const updateAvtaleGiroStatusAction = actionCreator.async<IUpdateAvtaleGiroStatusActionParams, number, Error>('UPDATE_AVTALEGIRO_STATUS');
export const updateAvtaleGiroPaymentDateAction = actionCreator.async<IUpdateAvtaleGiroPaymentDateActionParams, number, Error>('UPDATE_AVTALEGIRO_PAYMENTDATE');
export const updateAvtaleGiroDistributionAction = actionCreator.async<IUpdateAvtaleGiroDistributionActionParams, boolean, Error>('UPDATE_AVTALEGIRO_DISTRIBUTION');
export const fetchAvtaleGiroReportAction = actionCreator.async<undefined, IFetchAvtaleGiroReportResult, Error>('FETCH_AVTALEGIRO_REPORT');
export const fetchAvtaleGiroValidationTableAction = actionCreator.async<undefined, Array<IAvtaleGiroValidationTableRow>, Error>('FETCH_AVTALEGIRO_VALIDATIONTABLE');
export const fetchAvtaleGiroHistogramAction = actionCreator.async<undefined, Array<IHistogramBucket>, Error>('FETCH_AVTALEGIRO_HISTOGRAM');

export const setAvtaleGiroPagination = (pagination: IPagination) => {
  return {
    type: SET_AVTALEGIRO_PAGINATION,
    payload: pagination,
  };
};

interface AmountRange {
  from: number;
  to: number;
}

export const setAvtalegiroFilterAmount = (amountRange: AmountRange) => {
  return {
    type: SET_AVTALEGIRO_FILTER_AMOUNT,
    payload: amountRange,
  };
};

export const setAvtaleGiroFilterDonor = (donor: string) => {
  return {
    type: SET_AVTALEGIRO_FILTER_DONOR,
    payload: donor,
  };
};

export const setAvtaleGiroFilterKID = (KID: string) => {
  return {
    type: SET_AVTALEGIRO_FILTER_KID,
    payload: KID,
  };
};

export const setAvtaleGiroFilterActive = (active: Array<number>) => {
    return {
        type: SET_AVTALEGIRO_FILTER_ACTIVE,
        payload: active
    }
}

export const clearCurrentAvtaleGiro = () => ({ type: CLEAR_CURRENT_AVTALEGIRO })
