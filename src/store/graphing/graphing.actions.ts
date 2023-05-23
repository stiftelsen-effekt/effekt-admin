import actionCreatorFactory from "typescript-fsa";
import { IAggregationItem, IAggregationMonthlyItem } from "../../models/types";

const actionCreator = actionCreatorFactory();

export interface IFetchTotalByPeriodActionParams {
  from: Date;
  to: Date;
}
export const fetchTotalByPeriodAction = actionCreator.async<
  IFetchTotalByPeriodActionParams,
  Array<IAggregationItem>,
  Error
>("FETCH_TOTAL_BY_PERIOD");
export const fetchSumByMonthAction = actionCreator.async<
  undefined,
  Array<IAggregationMonthlyItem>,
  Error
>("FETCH_SUM_MONTHLY");
