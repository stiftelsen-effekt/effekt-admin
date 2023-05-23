import actionCreatorFactory from "typescript-fsa";
import { ITaxUnit } from "../../models/types";

const actionCreator = actionCreatorFactory();

export interface IUpdateTaxUnitActionParams {
  token: string;
  id: number;
  taxUnit: ITaxUnit | { name: string; ssn: string };
}
export const UpdateTaxUnitAction = actionCreator.async<IUpdateTaxUnitActionParams, boolean, Error>(
  "UPDATE_TAX_UNIT",
);
export interface ICreateTaxUnitActionParams {
  token: string;
  donorID: number;
  taxUnit: { name: string; ssn: string };
}

export const CreateTaxUnitAction = actionCreator.async<ICreateTaxUnitActionParams, Boolean, Error>(
  "CREATE_TAX_UNIT",
);
