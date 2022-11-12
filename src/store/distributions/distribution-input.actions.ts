import actionCreatorFactory from 'typescript-fsa';
import { IDistribution } from '../../models/types';

export const SET_DISTRIBUTION_INPUT_DISTRIBUTION = 'SET_DISTRIBUTION_INPUT_DISTRIBUTION';
export const setDistributionInputDistribution = (distribution: Partial<IDistribution>) => {
  return {
    type: SET_DISTRIBUTION_INPUT_DISTRIBUTION,
    payload: distribution,
  };
};

const actionCreator = actionCreatorFactory();

export interface ICreateDistributionActionParams {
  distribution: Omit<IDistribution, 'KID'>;
  token: string;
}
export const createDistributionAction = actionCreator.async<
  ICreateDistributionActionParams,
  string,
  Error
>('CREATE_DISTRIBUTION');
