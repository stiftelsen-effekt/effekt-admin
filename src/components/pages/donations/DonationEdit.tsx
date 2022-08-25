import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import { AppState } from '../../../models/state';
import { KIDComponent } from '../../modules/kid/KIDComponent';
import { mapOrgToDist } from '../../modules/kid/kid.util';
import { DonationInput } from '../../modules/single-donation/input/DonationInput';
import { EffektButton } from '../../style/elements/button.style';
import { fetchPaymentMethodsAction } from '../../../store/single-donation/single-donation.actions';
import { updateDonationAction } from '../../../store/donations/donation.actions';
import { InputWrapper } from './Donation.style';
import {
  IDonation,
  IPaymentMethod,
  IDistributionShare,
  IOrganization,
} from '../../../models/types';

interface IProps {
  donation: IDonation;
  organizations: Array<IOrganization>;
}

export const DonationEdit: React.FunctionComponent<IProps> = ({
  donation,
  organizations
}) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [donationInput, setDonationInput] = useState<Partial<IDonation>>({});

  const paymentMethods = useSelector<AppState, Array<IPaymentMethod>>(
    (state: AppState) => state.singleDonation.paymentMethods
  );

  if (paymentMethods.length === 0) dispatch(fetchPaymentMethodsAction.started(undefined));
  const [distribution, setDistribution] = useState<Array<IDistributionShare>>(
    mapOrgToDist(organizations)
  );

  const onDonationInputChange = useCallback(
    (donationInput: Partial<IDonation>) => setDonationInput(donationInput),
    [setDonationInput]
  );

  return (
    <div>
      <InputWrapper>
        <DonationInput
          paymentMethods={paymentMethods}
          onChange={onDonationInputChange}
          suggestedValues={donation}
          ></DonationInput>
      </InputWrapper>
      <EffektButton onClick={() => {
        getAccessTokenSilently().then((token) =>
          dispatch(updateDonationAction.started({ donationInput, token })));
      }}>Save changes</EffektButton>
    </div>
  );
}
