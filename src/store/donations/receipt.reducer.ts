import { AnyAction } from 'redux';
import { isType } from 'typescript-fsa';
import { toast } from 'react-toastify';
import { resendReceiptAction } from './receipt.actions';
import { toastError } from '../../util/toasthelper';

const initialState = {};

export const receiptReducer = (state = initialState, action: AnyAction) => {
  if (isType(action, resendReceiptAction.done)) {
    toast.success('Receipt resent');
  } else if (isType(action, resendReceiptAction.failed)) {
    toastError('Could not resend receipt', action.payload.error.message);
  }

  return state;
};
