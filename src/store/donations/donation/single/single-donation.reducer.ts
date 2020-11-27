import { AnyAction } from 'redux';
import { DateTime } from 'luxon';
import { isType } from 'typescript-fsa';
import { toast } from 'react-toastify';
import {
  createDistribitionAndInsertDonationAction,
  fetchPaymentMethodsAction,
} from './single-donation.actions';
import { IPaymentMethod } from '../../../../types';
import { SingleDonationState } from '../../../state';
import { toastError } from '../../../../util/toasthelper';

const initialState: SingleDonationState = {
  paymentMethods: [],
};

export const singleDonationReducer = (
  state: SingleDonationState = initialState,
  action: AnyAction,
): SingleDonationState => {
  if (isType(action, createDistribitionAndInsertDonationAction.done)) {
    toast.success('Donation inserted');
  } else if (isType(action, createDistribitionAndInsertDonationAction.failed)) {
    toastError('Could not insert donation', action.payload.error.message);
  }

  // TODO: Move to another place in state
  if (isType(action, fetchPaymentMethodsAction.done)) {
    return {
      ...state,
      paymentMethods: action.payload.result.map((method: IPaymentMethod) => {
        return {
          ...method,
          lastUpdated: DateTime.fromISO(method.lastUpdated.toString()),
        };
      }),
    };
  }
  if (isType(action, fetchPaymentMethodsAction.failed)) {
    toastError('Failed to fetch payment methods', action.payload.error.message);
  }

  return state;
};
