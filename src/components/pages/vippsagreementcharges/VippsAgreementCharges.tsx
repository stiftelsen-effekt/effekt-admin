import React from 'react';

import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { VippsAgreementChargeList } from '../../modules/vipps/chargelist/VippsAgreementChargeList';

export const VippsAgreementChargesPageComponent: React.FunctionComponent = () => {
  return (
    <Page>
      <MainHeader>Vipps agreement charges</MainHeader>
      <VippsAgreementChargeList />
    </Page>
  );
};
