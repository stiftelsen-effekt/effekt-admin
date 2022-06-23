import { DateTime } from 'luxon';
import actionCreatorFactory from 'typescript-fsa';
import { Share } from '../../components/pages/avtalegiro/AvtaleGiroAgreement/ShareSelection/ShareSelection';
import { IAvtaleGiro, IAvtaleGiroValidationTableRow, IDonation, IHistogramBucket, IPagination } from '../../models/types';

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
  draftedThisMonth: number,
  sumDraftedThisMonth: number | null,
  activatedThisMonth: number,
  sumActivatedThisMonth: number | null,
  stoppedThisMonth: number,
  sumStoppedThisMonth: number | null
}

export interface IFetchAvtaleGiroAgreementsActionParams { token: string }
export interface IFetchAgreementActionParams { id: string, token: string }
export interface IUpdateAvtaleGiroAmountActionParams { KID: string, amount: number, token: string }
export interface IUpdateAvtaleGiroStatusActionParams { KID: string, status: number, token: string }
export interface IUpdateAvtaleGiroPaymentDateActionParams { KID: string, paymentDate: number, token: string }
export interface IUpdateAvtaleGiroDistributionActionParams { KID: string, distribution: Array<Share>, token: string }
export interface IFetchAvtaleGiroDateValidationParams { date: DateTime, token: string }
export interface IFetchAvtaleGiroReportActionParams { token: string }
export interface IFetchAvtaleGiroValidationTableActionParams { token: string }
export interface IFetchAvtaleGiroHistogramActionParams { token: string }

export const fetchAvtaleGiroAgreementsAction = actionCreator.async<IFetchAvtaleGiroAgreementsActionParams, IFetchAvtaleGirosResults, Error>('FETCH_AVTALEGIRO_AGREEMENTS');
export const fetchAvtaleGiroAction = actionCreator.async<IFetchAgreementActionParams, IAvtaleGiro, Error>('FETCH_AVTALEGIRO');
export const updateAvtaleGiroAmountAction = actionCreator.async<IUpdateAvtaleGiroAmountActionParams, number, Error>('UPDATE_AVTALEGIRO_AMOUNT');
export const updateAvtaleGiroStatusAction = actionCreator.async<IUpdateAvtaleGiroStatusActionParams, number, Error>('UPDATE_AVTALEGIRO_STATUS');
export const updateAvtaleGiroPaymentDateAction = actionCreator.async<IUpdateAvtaleGiroPaymentDateActionParams, number, Error>('UPDATE_AVTALEGIRO_PAYMENTDATE');
export const updateAvtaleGiroDistributionAction = actionCreator.async<IUpdateAvtaleGiroDistributionActionParams, boolean, Error>('UPDATE_AVTALEGIRO_DISTRIBUTION');
export const fetchAvtaleGiroReportAction = actionCreator.async<IFetchAvtaleGiroReportActionParams, IFetchAvtaleGiroReportResult, Error>('FETCH_AVTALEGIRO_REPORT');
export const fetchAvtaleGiroValidationTableAction = actionCreator.async<IFetchAvtaleGiroValidationTableActionParams, Array<IAvtaleGiroValidationTableRow>, Error>('FETCH_AVTALEGIRO_VALIDATIONTABLE');
export const fetchAvtaleGiroMissingByDateAction = actionCreator.async<IFetchAvtaleGiroDateValidationParams, Array<IAvtaleGiro>, Error>('FETCH_AVTALEGIRO_MISSING_BY_DATE');
export const fetchAvtaleGiroRecievedByDateAction = actionCreator.async<IFetchAvtaleGiroDateValidationParams, Array<IDonation>, Error>('FETCH_AVTALEGIRO_RECIEVED_BY_DATE');
export const fetchAvtaleGiroExpectedByDateAction = actionCreator.async<IFetchAvtaleGiroDateValidationParams, Array<IAvtaleGiro>, Error>('FETCH_AVTALEGIRO_EXPECTED_BY_DATE');
export const fetchAvtaleGiroHistogramAction = actionCreator.async<IFetchAvtaleGiroHistogramActionParams, Array<IHistogramBucket>, Error>('FETCH_AVTALEGIRO_HISTOGRAM');

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
