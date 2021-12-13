import React from 'react';

import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { DonationsList } from '../../modules/donations/list/DonationsList';
import { DonationsFilterComponent } from '../../modules/donations/list/filters/DonationsFilter';
import { useSelector } from 'react-redux';
import { AppState } from '../../../models/state';

export const DonationsPageComponent: React.FunctionComponent = () => {
  const donations = useSelector((state: AppState) => state.donations.donations)

  return (
    <Page>
      <MainHeader>Donations</MainHeader>
      <DonationsFilterComponent></DonationsFilterComponent>
      <DonationsList donations={donations} manual={true} />
    </Page>
  );
};
