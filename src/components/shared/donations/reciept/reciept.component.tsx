import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EffektButton } from '../../elements/button.style';
import { EffektInput } from '../../elements/input.style';
import { ResendRecieptWrapper } from './reciept.component.style';
import { toastError } from '../../../../util/toasthelper';
import { resendRecieptAction } from '../../../../store/reciept/reciept.actions';

export const RegisterRecieptComponent: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [donationID, setDonationID] = useState<number | undefined>();

  const dispatch = useDispatch();

  function resendReciept() {
    if (!donationID) {
      toastError('Failed to send', 'Missing donationID');
    } else {
      dispatch(resendRecieptAction.started({ donationID, email }));
    }
  }

  return (
    <ResendRecieptWrapper>
      <div>
        <div>Donation ID</div>
        <EffektInput
          placeholder="donationID"
          value={donationID || ''}
          onChange={(e) => setDonationID(parseInt(e.target.value))}
        />
      </div>
      <div>
        <div>Optional email</div>
        <EffektInput
          placeholder="recipient"
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <EffektButton onClick={(e) => resendReciept()}>Send</EffektButton>
    </ResendRecieptWrapper>
  );
};
