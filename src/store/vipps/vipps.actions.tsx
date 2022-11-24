import actionCreatorFactory from 'typescript-fsa';
import {
  IHistogramBucket,
  IPagination,
  IVippsAgreement,
  IVippsAgreementCharge,
} from '../../models/types';

// Vipps agreement actions
export const SET_VIPPS_AGREEMENTS_PAGINATION = 'SET_VIPPS_AGREEMENTS_PAGINATION';
export const SET_VIPPS_AGREEMENTS_FILTER_AMOUNT = 'SET_VIPPS_AGREEMENTS_FILTER_AMOUNT';
export const SET_VIPPS_AGREEMENTS_FILTER_CHARGE_DAY = 'SET_VIPPS_AGREEMENTS_FILTER_CHARGE_DAY';
export const SET_VIPPS_AGREEMENTS_FILTER_DONOR = 'SET_VIPPS_AGREEMENTS_FILTER_DONOR';
export const SET_VIPPS_AGREEMENTS_FILTER_DRAFT_DATE = 'SET_VIPPS_AGREEMENTS_FILTER_DRAFT_DATE';
export const SET_VIPPS_AGREEMENTS_FILTER_KID = 'SET_VIPPS_AGREEMENTS_FILTER_KID';
export const SET_VIPPS_AGREEMENTS_FILTER_STATUS = 'SET_VIPPS_AGREEMENTS_FILTER_STATUS';

// Vipps charge actions
export const SET_VIPPS_CHARGES_PAGINATION = 'SET_VIPPS_CHARGES_PAGINATION';
export const SET_VIPPS_CHARGES_FILTER_AMOUNT = 'SET_VIPPS_CHARGES_FILTER_AMOUNT';
export const SET_VIPPS_CHARGES_FILTER_KID = 'SET_VIPPS_CHARGES_FILTER_KID';
export const SET_VIPPS_CHARGES_FILTER_DONOR = 'SET_VIPPS_CHARGES_FILTER_DONOR';
export const SET_VIPPS_CHARGES_FILTER_STATUS = 'SET_VIPPS_CHARGES_FILTER_STATUS';

const actionCreator = actionCreatorFactory();

interface IFetchVippsAgreementsResult {
  rows: Array<IVippsAgreement>;
  pages: number;
}

interface IFetchVippsAgreementChargesResult {
  rows: Array<IVippsAgreementCharge>;
  pages: number;
}

interface IFetchVippsAgreementReportResult {
  activeAgreementCount: number;
  averageAgreementSum: number;
  totalAgreementSum: number;
  medianAgreementSum: number;
}

export interface IFetchVippsAgreementsActionParams {
  token: string;
}

export interface IFetchAgreementActionParams {
  id: string;
  token: string;
}

export interface IFetchVippsAgreementChargesActionParams {
  token: string;
}

export interface IFetchAgreementChargeActionParams {
  agreementId: string;
  chargeId: string;
  token: string;
}

export interface IFetchVippsAgreementsReportActionParams {
  token: string;
}

export interface IFetchVippsChargeHistogramActionParams {
  token: string;
}

export interface IRefundVippsChargeActionParams {
  agreementId: string;
  chargeId: string;
  token: string;
}

export const fetchVippsAgreementsAction = actionCreator.async<
  IFetchVippsAgreementsActionParams,
  IFetchVippsAgreementsResult,
  Error
>('FETCH_VIPPS_AGREEMENTS');
export const fetchVippsAgreementAction = actionCreator.async<
  IFetchAgreementActionParams,
  IVippsAgreement,
  Error
>('FETCH_VIPPS_AGREEMENT');
export const fetchVippsAgreementChargesAction = actionCreator.async<
  IFetchVippsAgreementChargesActionParams,
  IFetchVippsAgreementChargesResult,
  Error
>('FETCH_VIPPS_AGREEMENT_CHARGES');
export const fetchVippsAgreementChargeAction = actionCreator.async<
  IFetchAgreementChargeActionParams,
  IVippsAgreementCharge,
  Error
>('FETCH_VIPPS_AGREEMENT_CHARGE');
export const fetchAgreementsReportAction = actionCreator.async<
  IFetchVippsAgreementsReportActionParams,
  IFetchVippsAgreementReportResult,
  Error
>('FETCH_VIPPS_AGREEMENTS_REPORT');
export const fetchAgreementHistogramAction = actionCreator.async<
  undefined,
  Array<IHistogramBucket>,
  Error
>('FETCH_VIPPS_AGREEMENT_HISTOGRAM');
export const fetchChargeHistogramAction = actionCreator.async<
  IFetchVippsChargeHistogramActionParams,
  Array<IHistogramBucket>,
  Error
>('FETCH_VIPPS_CHARGES_HISTOGRAM');
export const refundVippsAgreementChargeAction = actionCreator.async<
  IRefundVippsChargeActionParams,
  undefined,
  Error
>('REFUND_VIPPS_CHARGE');

export const setVippsAgreementsPagination = (pagination: IPagination) => {
  return {
    type: SET_VIPPS_AGREEMENTS_PAGINATION,
    payload: pagination,
  };
};

interface AmountRange {
  from: number;
  to: number;
}

export const setVippsAgreementsFilterAmount = (amountRange: AmountRange) => {
  return {
    type: SET_VIPPS_AGREEMENTS_FILTER_AMOUNT,
    payload: amountRange,
  };
};

export const setVippsAgreementsFilterChargeDay = (paymentDate: AmountRange) => {
  return {
    type: SET_VIPPS_AGREEMENTS_FILTER_CHARGE_DAY,
    payload: paymentDate,
  };
};

export const setVippsAgreementsFilterDonor = (donor: string) => {
  return {
    type: SET_VIPPS_AGREEMENTS_FILTER_DONOR,
    payload: donor,
  };
};

export const setVippsAgreementsFilterDraftDate = (from: Date | null, to: Date | null) => {
  return {
    type: SET_VIPPS_AGREEMENTS_FILTER_DRAFT_DATE,
    payload: {from: from, to: to},
  };
};

export const setVippsAgreementsFilterKID = (KID: string) => {
  return {
    type: SET_VIPPS_AGREEMENTS_FILTER_KID,
    payload: KID,
  };
};

export const setVippsAgreementsFilterStatus = (status: string[]) => {
  return {
    type: SET_VIPPS_AGREEMENTS_FILTER_STATUS,
    payload: status,
  };
};

export const setVippsChargesPagination = (pagination: IPagination) => {
  return {
    type: SET_VIPPS_CHARGES_PAGINATION,
    payload: pagination,
  };
};

export const setVippsChargesFilterAmount = (amountRange: AmountRange) => {
  return {
    type: SET_VIPPS_CHARGES_FILTER_AMOUNT,
    payload: amountRange,
  };
};

export const setVippsChargesFilterDonor = (donor: string) => {
  return {
    type: SET_VIPPS_CHARGES_FILTER_DONOR,
    payload: donor,
  };
};

export const setVippsChargesFilterKID = (KID: string) => {
  return {
    type: SET_VIPPS_CHARGES_FILTER_KID,
    payload: KID,
  };
};

export const setVippsChargesFilterStatus = (status: string[]) => {
  return {
    type: SET_VIPPS_CHARGES_FILTER_STATUS,
    payload: status,
  };
};
