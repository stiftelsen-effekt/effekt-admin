import { ICauseArea } from "../../models/types";
import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const fetchActiveCauseareasAction = actionCreator.async<undefined, Array<ICauseArea>, Error>(
  "FETCH_ACTIVE_CAUSEAREAS",
);

export const fetchAllCauseareasAction = actionCreator.async<undefined, Array<ICauseArea>, Error>(
  "FETCH_ALL_CAUSEAREAS",
);

export const createCauseAreaAction = actionCreator.async<
  { token: string; causeArea: Partial<ICauseArea> },
  ICauseArea,
  Error
>("CREATE_CAUSE_AREA");

export const updateCauseAreaAction = actionCreator.async<
  { token: string; causeArea: ICauseArea },
  ICauseArea,
  Error
>("UPDATE_CAUSE_AREA");

export const toggleCauseAreaActiveAction = actionCreator.async<
  { token: string; causeAreaId: number },
  ICauseArea,
  Error
>("TOGGLE_CAUSE_AREA_ACTIVE");
