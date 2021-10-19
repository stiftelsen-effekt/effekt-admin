import actionCreatorFactory from 'typescript-fsa';

export const RESEND_RECIEPT = 'RESEND_RECIEPT';

const actionCreator = actionCreatorFactory();

export interface IResendRecieptPayload {
  donationID: number;
  email: string | undefined;
}

export const resendRecieptAction = actionCreator.async<IResendRecieptPayload, boolean, Error>(
  RESEND_RECIEPT
);
