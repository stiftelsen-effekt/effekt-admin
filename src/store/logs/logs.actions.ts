import actionCreatorFactory from 'typescript-fsa';
import { ILogEntry } from '../../models/types';

const actionCreator = actionCreatorFactory();

export interface IFetchLogEntryActionParams {
  id: number;
}
export const fetchLogEntryAction = actionCreator.async<
  IFetchLogEntryActionParams,
  ILogEntry,
  Error
>('FETCH_LOG_ENTRY');

export const CLEAR_CURRENT_LOG_ENTRY = 'CLEAR_CURRENT_LOG_ENTRY';
export const clearCurrentLogEntry = () => ({ type: CLEAR_CURRENT_LOG_ENTRY });
