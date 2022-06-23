import React, { useState } from 'react';
import { EffektButton } from '../../../style/elements/button.style';
import { EffektInput } from '../../../style/elements/input.style';
import { ResendReceiptWrapper } from './Receipt.style';
import { useDispatch } from 'react-redux';
import { resendReceiptAction } from '../../../../store/donations/receipt.actions';
import { toastError } from '../../../../util/toasthelper';
import { useAuth0 } from '@auth0/auth0-react';

export const RegisterReceiptComponent: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [donationID, setDonationID] = useState<number | undefined>();

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  function resendReceipt() {
    if (!donationID) {
      toastError('Failed to send', 'Missing donationID');
    } else {
      getAccessTokenSilently().then((token) =>
        dispatch(resendReceiptAction.started({ donationID, email, token }))
      );
    }
  }

  return (
    <ResendReceiptWrapper>
      <div>
        <div>Donation ID</div>
        <EffektInput
          placeholder="donationID"
          value={donationID || ''}
          onChange={(e) => setDonationID(parseInt(e.target.value))}
        ></EffektInput>
      </div>
      <div>
        <div>Optional email</div>
        <EffektInput
          placeholder="recipient"
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        ></EffektInput>
      </div>
      <EffektButton onClick={(e) => resendReceipt()}>Send</EffektButton>
    </ResendReceiptWrapper>
  );
};
