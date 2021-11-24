import React from 'react';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { AvtaleGiroList } from '../../modules/avtalegiro/agreementlist/AvtaleGiroList';

export const AvtaleGiroPage: React.FunctionComponent = () => {
  return (
    <Page>
      <MainHeader>AvtaleGiro</MainHeader>
      <AvtaleGiroList />
    </Page>
  );
};
