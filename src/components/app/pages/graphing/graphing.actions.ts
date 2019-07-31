import actionCreatorFactory from "typescript-fsa";
import { IAggregationItem } from "../../../../models/types";

const actionCreator = actionCreatorFactory();

export interface IFetchTotalByPeriodActionParams { 
    from: Date,
    to: Date 
}
export const fetchTotalByPeriodAction = actionCreator.async<IFetchTotalByPeriodActionParams, Array<IAggregationItem>, Error>('FETCH_TOTAL_BY_PERIOD');