import React from 'react';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { Page } from '../../style/elements/page.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../models/state';
import { IDonation } from '../../../models/types';
import {
  fetchDonationAction,
  clearCurrentDonation,
} from '../../../store/donations/donation.actions';
import { DistributionGraphComponent } from '../../modules/distribution/Graph';
import { ResourceHeader, ResourceSubHeader, SubHeader } from '../../style/elements/headers.style';
import { HorizontalPanel } from './Donation.style';
import { DonationKeyInfoComponent } from '../../modules/donations/keyinfo/KeyInfo';
import { EffektButton } from '../../style/elements/button.style';
import { EffektButtonsWrapper } from '../../style/elements/buttons-wrapper/EffektButtonsWrapper.style';
import { PieChart, User } from 'react-feather';
import { useHistory } from 'react-router';

interface IParams {
  id: string;
}

export const DonationPageComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({
  match,
}: RouteComponentProps<IParams>) => {
  const donationID = parseInt(match.params.id);
  const dispatch = useDispatch();
  const history = useHistory()

  const donation: IDonation | undefined = useSelector(
    (state: AppState) => state.donations.currentDonation
  );

  if (donation && donation.id !== donationID) {
    dispatch(clearCurrentDonation());
    dispatch(fetchDonationAction.started({ id: donationID }));
  } else if (!donation) {
    dispatch(fetchDonationAction.started({ id: donationID }));
  }

  if (donation) {
    return (
      <Page>
        <ResourceHeader hasSubHeader={true}>Donation {donation.id}</ResourceHeader>
        <ResourceSubHeader>KID {donation.KID}</ResourceSubHeader>

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
          <EffektButton onClick={() => {
            history.push('/donors/' + donation.donorId)
          }}>
            <User size={16} />Donor
          </EffektButton>
          <EffektButton onClick={() => {
            history.push('/distributions/' + donation.KID)
          }}>
            <PieChart size={16} />Distribution
          </EffektButton>
        </EffektButtonsWrapper>
      </Page>
    );
  } else {
    return <Page>Loading...</Page>;
  }
};
