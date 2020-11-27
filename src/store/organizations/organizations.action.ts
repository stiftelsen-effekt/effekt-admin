import actionCreatorFactory from 'typescript-fsa';
import { IOrganization } from '../../types';

const actionCreator = actionCreatorFactory();

export const fetchActiveOrganizationsAction = actionCreator.async<
  undefined,
  Array<IOrganization>,
  Error
>('FETCH_ACTIVE_ORGANIZATIONS');
