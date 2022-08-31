import actionCreatorFactory from 'typescript-fsa';
import { ITaxUnit } from '../../models/types';

const actionCreator = actionCreatorFactory();

export interface IUpdateTaxUnitActionParams {
  token: string;
  id: number;
  taxUnit: ITaxUnit | { name: string; ssn: string };
}
export const UpdateTaxUnitAction = actionCreator.async<IUpdateTaxUnitActionParams, boolean, Error>(
  'UPDATE_TAX_UNIT'
);
