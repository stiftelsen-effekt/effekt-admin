import actionCreatorFactory from "typescript-fsa";
import { ILogEntry, IPagination } from "../../models/types";

export const SET_LOGS_PAGINATION = "SET_LOGS_PAGINATION";

const actionCreator = actionCreatorFactory();

interface IFetchLogssResult {
  rows: Array<ILogEntry>;
  pages: number;
}

export interface IFetchLogsActionParams {
  token: string;
}

export const fetchLogsAction = actionCreator.async<
  IFetchLogsActionParams,
  IFetchLogssResult,
  Error
>("FETCH_LOGS");
export const setLogsPaginationAction = (pagination: IPagination) => {
  return {
    type: SET_LOGS_PAGINATION,
    payload: pagination,
  };
};
