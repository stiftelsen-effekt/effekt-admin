import actionCreatorFactory from 'typescript-fsa';
import { IDonor } from '../../../types';

const actionCreator = actionCreatorFactory();

export const createDonorAction = actionCreator.async<
  Partial<IDonor>,
  boolean,
  Error
>('CREATE_USER');
