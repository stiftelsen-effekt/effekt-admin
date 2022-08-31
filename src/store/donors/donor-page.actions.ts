import actionCreatorFactory from 'typescript-fsa';
import {
  IAvtaleGiro,
  IDistributionSearchResultItem,
  IDistributionShare,
  IDonation,
  IDonor,
  IVippsAgreement,
  IReferralAnswer,
  ITaxUnit,
} from '../../models/types';

const actionCreator = actionCreatorFactory();

export interface IFetchDonorActionParams {
  id: number;
  token: string;
}
export interface IFetchDonorDonationsActionParams {
  id: number;
  token: string;
}
export interface IFetchDonorDistributionsActionParams {
  id: number;
  token: string;
}
export interface IFetchDonorAvtalegiroAgreementsActionParams {
  id: number;
  token: string;
}
export interface IFetchDonorVippsAgreementsActionParams {
  id: number;
  token: string;
}
export interface IFetchDonorYearlyAggregatesActionParams {
  id: number;
  token: string;
}
export interface IfetchDonorTaxUnitsParams {
  id: number;
  token: string;
}
export interface IUpdateDonorDataParams {
  token: string;
  donor: IDonor;
}

export const getDonorAction = actionCreator.async<IFetchDonorActionParams, IDonor, Error>(
  'FETCH_DONOR'
);
export const getDonorDonationsAction = actionCreator.async<
  IFetchDonorDonationsActionParams,
  Array<IDonation>,
  Error
>('FETCH_DONOR_DONATIONS');
export const getDonorDistributionsAction = actionCreator.async<
  IFetchDonorDistributionsActionParams,
  Array<IDistributionSearchResultItem>,
  Error
>('FETCH_DONOR_DISTRIBUTIONS');
export const getDonorAvtalegiroAgreementsAction = actionCreator.async<
  IFetchDonorAvtalegiroAgreementsActionParams,
  Array<IAvtaleGiro>,
  Error
>('FETCH_DONOR_AVTALEGIRO_AGREEMENTS');
export const getDonorVippsAgreementsAction = actionCreator.async<
  IFetchDonorVippsAgreementsActionParams,
  Array<IVippsAgreement>,
  Error
>('FETCH_DONOR_VIPPS_AGREEMENTS');
export const getDonorYearlyAggregatesAction = actionCreator.async<
  IFetchDonorYearlyAggregatesActionParams,
  Array<IDistributionShare & { year: number }>,
  Error
>('FETCH_DONOR_YEARLY_AGGREGATES');
export const getDonorReferralAnswersAction = actionCreator.async<
  IfetchDonorTaxUnitsParams,
  Array<IReferralAnswer>,
  Error
>('FETCH_DONOR_REFERRAL_ANSWERS');
export const getDonorTaxUnitsAction = actionCreator.async<
  IFetchDonorActionParams,
  Array<ITaxUnit>,
  Error
>('FETCH_DONOR_TAX_UNITS');
export const updateDonorDataAction = actionCreator.async<IUpdateDonorDataParams, boolean, Error>(
  'UPDATE_DONOR_DATA'
);
