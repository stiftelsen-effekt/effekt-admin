import actionCreatorFactory from "typescript-fsa";
import { IFundraiser } from "../../models/types";

const actionCreator = actionCreatorFactory("FUNDRAISER");

export const fetchFundraiserAction = actionCreator.async<
  { token: string; id: number },
  IFundraiser,
  Error
>("FETCH");
