import actionCreatorFactory from 'typescript-fsa';
import { IAvtaleGiro, IHistogramBucket, IPagination } from '../../models/types';

// AvtaleGiro agreements actions
export const SET_AVTALEGIRO_PAGINATION = 'SET_AVTALEGIRO_PAGINATION';
export const SET_AVTALEGIRO_FILTER_AMOUNT = 'SET_AVTALEGIRO_FILTER_AMOUNT';
export const SET_AVTALEGIRO_FILTER_KID = 'SET_AVTALEGIRO_FILTER_KID';
export const SET_AVTALEGIRO_FILTER_DONOR = 'SET_AVTALEGIRO_FILTER_DONOR';
export const SET_AVTALEGIRO_FILTER_ACTIVE = 'SET_AVTALEGIRO_FILTER_ACTIVE';

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

export interface IFetchAgreementActionParams {
  id: string;
}

export const fetchAvtaleGiroAgreementsAction = actionCreator.async<
  undefined,
  IFetchAvtaleGirosResults,
  Error
>('FETCH_AVTALEGIRO_AGREEMENTS');
export const fetchAvtaleGiroAction = actionCreator.async<
  IFetchAgreementActionParams,
  IAvtaleGiro,
  Error
>('FETCH_AVTALEGIRO');
export const fetchAvtaleGiroReportAction = actionCreator.async<
  undefined,
  IFetchAvtaleGiroReportResult,
  Error
>('FETCH_AVTALEGIRO_REPORT');
export const fetchAvtaleGiroHistogramAction = actionCreator.async<
  undefined,
  Array<IHistogramBucket>,
  Error
>('FETCH_AVTALEGIRO_HISTOGRAM');

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
    payload: active,
  };
};
