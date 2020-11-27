import React from 'react';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Page } from '../../shared/elements/page.style';
import { AppState } from '../../../store/state';
import { IDonation } from '../../../types';
import {
  fetchDonationAction,
  clearCurrentDonation,
} from '../../../store/donations/donation/donation.actions';
import { DistributionGraphComponent } from '../../shared/distribution/graph.component';
import {
  ResourceHeader,
  ResourceSubHeader,
  SubHeader,
} from '../../shared/elements/headers.style';
import { HorizontalPanel } from './donation.component.style';
import { DonationKeyInfoComponent } from '../../shared/donations/keyinfo/keyinfo.component';

interface IParams {
  id: string;
}

export const DonationPageComponent: React.FunctionComponent<
  RouteComponentProps<IParams>
> = ({ match }: RouteComponentProps<IParams>) => {
  const donationID = parseInt(match.params.id);
  const dispatch = useDispatch();

  const donation: IDonation | undefined = useSelector(
    (state: AppState) => state.donations.currentDonation,
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
        <ResourceHeader hasSubHeader>
          Donation
          {donation.id}
        </ResourceHeader>
        <ResourceSubHeader>
          KID
          {donation.KID}
        </ResourceSubHeader>

        <SubHeader>Keyinfo</SubHeader>
        <HorizontalPanel>
          <div style={{ width: '400px', height: '380px' }}>
            <DistributionGraphComponent distribution={donation.distribution} />
          </div>

          <DonationKeyInfoComponent donation={donation} />
        </HorizontalPanel>

        <SubHeader>Meta</SubHeader>

        <NavLink to={`/donors/${donation.donorId}`}>Go to donor</NavLink>
        <br />
        <NavLink to={`/distributions/${donation.KID}`}>
          Go to distribution
        </NavLink>
      </Page>
    );
  }

  return <Page>Loading...</Page>;
};
