import actionCreatorFactory from 'typescript-fsa';
import { ITaxUnit } from '../../models/types';

const actionCreator = actionCreatorFactory();

export interface IUpdateTaxUnitActionParams {
  token: string;
  id: number;
  taxUnit: ITaxUnit | { name: string; ssn: string };
}

export interface IDeleteTaxUnitActionParams {
  token: string;
  id: number;
  donorId: number;
  transferId?: number;
}

export const UpdateTaxUnitAction = actionCreator.async<IUpdateTaxUnitActionParams, boolean, Error>(
  'UPDATE_TAX_UNIT'
);

export const DeleteTaxUnitAction = actionCreator.async<IDeleteTaxUnitActionParams, boolean, Error>(
  'DELETE_TAX_UNIT'
);
