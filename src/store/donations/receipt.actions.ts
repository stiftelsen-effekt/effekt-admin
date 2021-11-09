import actionCreatorFactory from 'typescript-fsa';

export const RESEND_RECEIPT = 'RESEND_RECEIPT';

const actionCreator = actionCreatorFactory();

export interface IResendReceiptPayload {
  donationID: number;
  email: string | undefined;
}

export const resendReceiptAction = actionCreator.async<IResendReceiptPayload, boolean, Error>(
  RESEND_RECEIPT
);
