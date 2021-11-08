import React from 'react';

import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { DonationsList } from '../../modules/donations/list/DonationsList';

export const DonationsPageComponent: React.FunctionComponent = () => {
  return (
    <Page>
      <MainHeader>Donations</MainHeader>
      <DonationsList />
    </Page>
  );
};
