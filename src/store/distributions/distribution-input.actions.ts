import actionCreatorFactory from 'typescript-fsa';
import { IDistributionShare } from '../../models/types';

export const SET_DISTRIBUTION_INPUT = 'SET_DISTRIBUTION_INPUT';
export const setDistributionInput = (distribution: Array<IDistributionShare>) => {
  return {
    type: SET_DISTRIBUTION_INPUT,
    payload: distribution,
  };
};

const actionCreator = actionCreatorFactory();

export interface ICreateDistributionActionParams {
  donor: { id: number };
  distribution: Array<IDistributionShare>;
  token: string;
}
export const createDistributionAction = actionCreator.async<
  ICreateDistributionActionParams,
  string,
  Error
>('CREATE_DISTRIBUTION');
