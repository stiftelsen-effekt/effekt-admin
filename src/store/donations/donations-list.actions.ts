import actionCreatorFactory from 'typescript-fsa';
import { IDonation, IPagination } from '../../models/types';

export const SET_DONATIONS_PAGINATION = 'SET_DONATIONS_PAGINATION';

const actionCreator = actionCreatorFactory();

export interface IFetchDonationsActionParams {
  token: string;
}

interface IFetchDonationsResult {
  rows: Array<IDonation>;
  pages: number;
}

export const fetchDonationsAction = actionCreator.async<
  IFetchDonationsActionParams,
  IFetchDonationsResult,
  Error
>('FETCH_DONATIONS');
export const setDonationsPagination = (pagination: IPagination) => {
  return {
    type: SET_DONATIONS_PAGINATION,
    payload: pagination,
  };
};
