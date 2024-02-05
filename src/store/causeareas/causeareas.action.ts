import { ICauseArea } from "../../models/types";
import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const fetchActiveCauseareasAction = actionCreator.async<undefined, Array<ICauseArea>, Error>(
  "FETCH_ACTIVE_CAUSEAREAS",
);

export const fetchAllCauseareasAction = actionCreator.async<undefined, Array<ICauseArea>, Error>(
  "FETCH_ALL_CAUSEAREAS",
);
