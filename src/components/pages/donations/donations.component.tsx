import React from 'react';

import { Page } from '../../shared/elements/page.style';
import { MainHeader } from '../../shared/elements/headers.style';
import { DonationsList } from '../../shared/donations/list/donations-list.component';

export const DonationsPageComponent: React.FunctionComponent = () => {
  return (
    <Page>
      <MainHeader>Donations</MainHeader>
      <DonationsList />
    </Page>
  );
};
