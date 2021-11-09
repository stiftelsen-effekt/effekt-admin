import actionCreatorFactory from 'typescript-fsa';
import { IDonation, IHistogramBucket } from '../../models/types';

const actionCreator = actionCreatorFactory();

export interface IFetchDonationActionParams {
  id: number;
}
export const fetchDonationAction = actionCreator.async<
  IFetchDonationActionParams,
  IDonation,
  Error
>('FETCH_DONATION');
export const fetchHistogramAction = actionCreator.async<undefined, Array<IHistogramBucket>, Error>(
  'FETCH_HISTOGRAM'
);

export const CLEAR_CURRENT_DONATION = 'CLEAR_CURRENT_DONATION';
export const clearCurrentDonation = () => ({ type: CLEAR_CURRENT_DONATION });
