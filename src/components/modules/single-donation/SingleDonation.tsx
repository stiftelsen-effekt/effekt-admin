import React, { useState, useCallback } from 'react';
import { SingleDonationWrapper, InputWrapper, ControlsWrapper } from './SingleDonation.style';

import {
  IPaymentMethod,
  IDonor,
  IDonation,
  IDistributionShare,
  IOrganization,
  IDistributionStandardSplit,
} from '../../../models/types';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../models/state';
import {
  createDistribitionAndInsertDonationAction,
  ICreateDistributionParams,
  fetchPaymentMethodsAction,
  insertDonationAction,
  ICreateDonationParams,
} from '../../../store/single-donation/single-donation.actions';
import { Decimal } from 'decimal.js';

import { DonationControls } from './controls/DonationControls';
import { KIDComponent } from '../kid/KIDComponent';
import { DonationInput } from './input/DonationInput';
import { toast } from 'react-toastify';
import { mapOrgToDist } from '../kid/kid.util';
import { useAuth0 } from '@auth0/auth0-react';

interface IProps {
  onIgnore?(): void;
  organizations: Array<IOrganization>;
  suggestedValues?: Partial<IDonation>;
}

export const SingleDonation: React.FunctionComponent<IProps> = ({
  organizations,
  onIgnore,
  suggestedValues,
}) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [donationInput, setDonationInput] = useState<Partial<IDonation>>({});

  const paymentMethods = useSelector<AppState, Array<IPaymentMethod>>(
    (state: AppState) => state.singleDonation.paymentMethods
  );
  if (paymentMethods.length === 0) dispatch(fetchPaymentMethodsAction.started(undefined));

  const [distribution, setDistribution] = useState<IDistributionStandardSplit>({
    shares: mapOrgToDist(organizations),
    standardSplit: false,
  });

  const selectedDonor = useSelector<AppState, IDonor | undefined>(
    (state: AppState) => state.donorSelector.selectedDonor
  );
  const currentSelectedOwner = useSelector((state: AppState) => state.dataOwner.current);

  const getFilteredDistribution = (distribution: Array<IDistributionShare>) => {
    return distribution.filter((dist) => !dist.share.equals(new Decimal(0)));
  };

  const getDonation = (input: Partial<IDonation>): IDonation | null => {
    if (
      input.sum !== undefined &&
      input.paymentId !== undefined &&
      input.paymentExternalRef !== undefined &&
      input.timestamp !== undefined
    )
      return input as IDonation;
    else return null;
  };

  const submit = (receipt: boolean) => {
    const donation = getDonation(donationInput);

    if (!donation) return toast.error('Missing fields');

    getAccessTokenSilently().then((token) => {
      let donationParams: ICreateDonationParams = { ...donation, receipt: receipt, token };

      if (donationInput.KID) {
        dispatch(insertDonationAction.started(donationParams));
      } else {
        if (!selectedDonor) return toast.error('No donor selected');
        if (!distribution || !donationInput)
          return toast.error('Error initializing distribution or input');
        if (!currentSelectedOwner) return toast.error('Missing meta owner');

        let filteredDistribution;
        if (distribution.standardSplit) {
          filteredDistribution = [];
        } else filteredDistribution = getFilteredDistribution(distribution.shares);

        const distributionParams: ICreateDistributionParams = {
          distribution: filteredDistribution,
          donor: selectedDonor,
          metaOwnerID: currentSelectedOwner.id,
        };

        dispatch(
          createDistribitionAndInsertDonationAction.started({
            donation: donationParams,
            distribution: distributionParams,
            token,
          })
        );
      }
    });
  };

  const onDonationInputChange = useCallback(
    (donationInput: Partial<IDonation>) => setDonationInput(donationInput),
    [setDonationInput]
  );

  return (
    <SingleDonationWrapper>
      <InputWrapper>
        <DonationInput
          suggestedValues={suggestedValues}
          paymentMethods={paymentMethods}
          onChange={onDonationInputChange}
        ></DonationInput>
      </InputWrapper>

      <KIDComponent
        organizations={organizations}
        donationAmount={donationInput && donationInput.sum}
        KID={donationInput.KID}
        distribution={distribution}
        onChange={(distribution: IDistributionStandardSplit) => setDistribution(distribution)}
      ></KIDComponent>
      <ControlsWrapper>
        <DonationControls onInsert={submit} onIgnore={onIgnore}></DonationControls>
      </ControlsWrapper>
    </SingleDonationWrapper>
  );
};
