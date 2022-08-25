import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from '../../style/elements/page.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../models/state';
import { IDonation } from '../../../models/types';
import { DistributionGraphComponent } from '../../modules/distribution/Graph';
import { ResourceHeader, ResourceSubHeader, SubHeader } from '../../style/elements/headers.style';
import { HorizontalPanel } from './Donation.style';
import { DonationKeyInfoComponent } from '../../modules/donations/keyinfo/KeyInfo';
import { EffektButton } from '../../style/elements/button.style';
import { EffektButtonsWrapper } from '../../style/elements/buttons-wrapper/EffektButtonsWrapper.style';
import { PieChart, User } from 'react-feather';
import { useHistory } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import {
  fetchDonationAction,
  clearCurrentDonation,
  deleteDonationAction,
} from '../../../store/donations/donation.actions';
import { RegisterReceiptComponent } from '../../modules/donations/receipt/Receipt';

interface IParams {
  id: string;
}

export const DonationPageComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({
  match,
}: RouteComponentProps<IParams>) => {
  const donationID = parseInt(match.params.id);
  const dispatch = useDispatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  const donation: IDonation | undefined = useSelector(
    (state: AppState) => state.donations.currentDonation
  );

  if (donation && donation.id !== donationID) {
    dispatch(clearCurrentDonation());
    getAccessTokenSilently().then((token) =>
      dispatch(fetchDonationAction.started({ id: donationID, token }))
    );
  } else if (!donation) {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchDonationAction.started({ id: donationID, token }))
    );
  }

  const deletedDonation: boolean | undefined = useSelector(
    (state: AppState) => state.donations.deletedDonation
  );

  useEffect(() => {
    if (deletedDonation)
      history.goBack();
  }, [deletedDonation, history]);

  if (donation) {
    return (
      <Page>
        <ResourceHeader hasSubHeader={true}>Donation {donation.id}</ResourceHeader>
        <ResourceSubHeader>KID {donation.KID}</ResourceSubHeader>
        {donation.id && <DeleteButton id={donation.id} sum={donation.sum} />}

        <SubHeader>Keyinfo</SubHeader>
        <HorizontalPanel>
          <div style={{ width: '400px', height: '380px' }}>
            <DistributionGraphComponent
              distribution={donation.distribution}
            ></DistributionGraphComponent>
          </div>

          <DonationKeyInfoComponent donation={donation}></DonationKeyInfoComponent>
        </HorizontalPanel>

        <SubHeader>Meta</SubHeader>

        <EffektButtonsWrapper>
          <EffektButton
            onClick={() => {
              history.push('/donors/' + donation.donorId);
            }}
          >
            <User size={16} />
            Donor
          </EffektButton>
          <EffektButton
            onClick={() => {
              history.push('/distributions/' + donation.KID);
            }}
          >
            <PieChart size={16} />
            Distribution
          </EffektButton>
        </EffektButtonsWrapper>

        <SubHeader>Resend receipt</SubHeader>
        <RegisterReceiptComponent
          defaultDonationID={donation.id}
          hideDonationIDField={true}
        ></RegisterReceiptComponent>
      </Page>
    );
  } else {
    return <Page>Loading...</Page>;
  }
};

const DeleteButton: React.FC<{ id: number; sum?: number }> = ({ id, sum }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  return (
    <EffektButton
      onClick={() => {
        let sure = window.confirm(
          `Do you really want to delete the donation with id ${id} and sum ${sum}`
        );
        if (sure)
          getAccessTokenSilently().then((token) =>
            dispatch(deleteDonationAction.started({ id, token }))
          );
      }}
    >
      Delete
    </EffektButton>
  );
};
