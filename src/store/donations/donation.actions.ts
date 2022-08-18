import actionCreatorFactory from 'typescript-fsa';
import { IDonation, IHistogramBucket } from '../../models/types';

const actionCreator = actionCreatorFactory();

export interface IFetchDonationActionParams {
  id: number;
  token: string;
}
export interface IFetchDonationsHistogramActionParams {
  token: string;
}

export interface IDeleteDonationActionParams {
  id: number;
  token: string;
}

export interface IUpdateDonationAmountActionParams {
  id: number;
  amount: number;
  token: string;
}

interface IFetchDonationsResult {
  rows: Array<IDonation>;
  pages: number;
}

export const fetchDonationAction = actionCreator.async<
  IFetchDonationActionParams,
  IDonation,
  Error
>('FETCH_DONATION');
export const fetchHistogramAction = actionCreator.async<
  IFetchDonationsHistogramActionParams,
  Array<IHistogramBucket>,
  Error
>('FETCH_HISTOGRAM');
export const deleteDonationAction = actionCreator.async<
  IDeleteDonationActionParams,
  IFetchDonationsResult,
  Error
>('DELETE_DONATION');
export const updateDonationAmountAction = actionCreator.async<
  IUpdateDonationAmountActionParams,
  IDonation,
  Error
>('UPDATE_DONATION_AMOUNT');


export const CLEAR_CURRENT_DONATION = 'CLEAR_CURRENT_DONATION';
export const clearCurrentDonation = () => ({ type: CLEAR_CURRENT_DONATION });
