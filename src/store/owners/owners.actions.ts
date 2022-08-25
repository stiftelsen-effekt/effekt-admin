import { IDataOwner } from '../../models/types';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const fetchOwnersAction = actionCreator.async<undefined, Array<IDataOwner>, Error>(
  'FETCH_OWNERS'
);
