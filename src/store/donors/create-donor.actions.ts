import actionCreatorFactory from 'typescript-fsa';
import { IDonor } from '../../models/types';

const actionCreator = actionCreatorFactory();

export interface ICreateDonorActionParams {
  token: string;
  donor: Partial<IDonor>;
}

export const createDonorAction = actionCreator.async<ICreateDonorActionParams, Boolean, Error>(
  'CREATE_USER'
);
