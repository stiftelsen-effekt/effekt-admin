import actionCreatorFactory from 'typescript-fsa';
import { IDataOwner } from '../../types';

const actionCreator = actionCreatorFactory();

export const fetchOwnersAction = actionCreator.async<
  undefined,
  Array<IDataOwner>,
  Error
>('FETCH_OWNERS');

export const SET_CURRENT_OWNER = 'SET_CURRENT_OWNER';
export const setCurrentOwnerAction = (owner: IDataOwner) => ({
  type: SET_CURRENT_OWNER,
  payload: owner,
});
