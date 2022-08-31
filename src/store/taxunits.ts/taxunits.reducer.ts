import { isType } from 'typescript-fsa';
import { TaxUnitsState } from '../../models/state';

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
