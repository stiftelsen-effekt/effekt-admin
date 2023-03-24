import { TaxUnitsState, CreateTaxUnitState } from '../../models/state';
import { CreateTaxUnitAction } from './taxunits.actions';
import { isType, AnyAction } from 'typescript-fsa';
import { toast } from 'react-toastify';
import { toastError } from '../../util/toasthelper';

const defaultState: TaxUnitsState = {
  units: [],
  loading: false,
  pages: 1,
  pagination: {
    page: 0,
    limit: 25,
    sort: {
      id: 'timestamp',
      desc: true,
    },
  },
  filter: {},
};
export const taxUnitsReducer = (state = defaultState, action: any): TaxUnitsState => {
  return state;
};

export const createTaxUnitReducer = (
  state: CreateTaxUnitState = {},
  action: AnyAction
): CreateTaxUnitState => {
  if (isType(action, CreateTaxUnitAction.done)) {
    toast.success('Created tax unit!');
  } else if (isType(action, CreateTaxUnitAction.failed)) {
    toastError('Failed to create tax unit!', action.payload.error.message);
  }

  return {};
};
