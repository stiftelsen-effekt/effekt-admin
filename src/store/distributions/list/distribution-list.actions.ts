import actionCreatorFactory from 'typescript-fsa';
import { IPagination, IDistributionSearchResultItem } from '../../../types';

export const SET_DISTRIBUTIONS_PAGINATION = 'SET_DISTRIBUTIONS_PAGINATION';

const actionCreator = actionCreatorFactory();

interface IFetchDistributionResult {
  rows: Array<IDistributionSearchResultItem>;
  pages: number;
}

export const fetchDistributionsAction = actionCreator.async<
  undefined,
  IFetchDistributionResult,
  Error
>('FETCH_DISTRIBUTIONS');
export const setDistributionPagination = (pagination: IPagination) => {
  return {
    type: SET_DISTRIBUTIONS_PAGINATION,
    payload: pagination,
  };
};

export const SET_DISTRIBUTIONS_FILTER_DONOR = 'SET_DISTRIBUTIONS_FILTER_DONOR';
export const SET_DISTRIBUTIONS_FILTER_KID = 'SET_DISTRIBUTIONS_FILTER_KID';

export const setDistributionFilterDonor = (donor: string) => {
  return {
    type: SET_DISTRIBUTIONS_FILTER_DONOR,
    payload: donor,
  };
};

export const setDistributionFilterKid = (KID: string) => {
  return {
    type: SET_DISTRIBUTIONS_FILTER_KID,
    payload: KID,
  };
};
