import actionCreatorFactory from 'typescript-fsa';
import { IAccessToken } from '../../auth';

const actionCreator = actionCreatorFactory();

export const fetchTokenAction = actionCreator.async<
  undefined,
  IAccessToken,
  Error
>('FETCH_TOKEN');
