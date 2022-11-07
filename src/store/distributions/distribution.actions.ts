import actionCreatorFactory from 'typescript-fsa';
import {
  IPagination,
  IDistributionSearchResultItem,
  IDonor,
  IDistributionShare,
  IDonation,
  IDistribution,
} from '../../models/types';

export const SET_DISTRIBUTIONS_PAGINATION = 'SET_DISTRIBUTIONS_PAGINATION';

const actionCreator = actionCreatorFactory();

export interface IFetchDistributionActionParams {
  kid: string;
  token: string;
}
export interface IFetchDistributionsActionParams {
  token: string;
}

interface IFetchDistributionResult {
  distribution: IDistribution;
  affilliatedDonations: IDonation[];
}

interface IFetchDistributionsResult {
  rows: Array<IDistributionSearchResultItem>;
  pages: number;
}

export const fetchDistributionAction = actionCreator.async<
  IFetchDistributionActionParams,
  IFetchDistributionResult,
  Error
>('FETCH_DISTRIBUTION');

export const fetchDistributionsAction = actionCreator.async<
  IFetchDistributionsActionParams,
  IFetchDistributionsResult,
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
