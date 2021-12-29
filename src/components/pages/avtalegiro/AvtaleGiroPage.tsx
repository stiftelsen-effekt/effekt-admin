import React from 'react';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { AvtaleGiroList } from '../../modules/avtalegiro/agreementlist/AvtaleGiroList';
import { AvtaleGiroFilter } from '../../modules/avtalegiro/agreementlist/AvtaleGiroFilter';
import { AppState } from '../../../models/state';
import { useSelector } from 'react-redux';
import { AvtaleGiroListWrapper } from '../../modules/avtalegiro/agreementlist/AvtaleGiroList.style';

export const AvtaleGiroPage: React.FunctionComponent = () => {
  const allAgreements = useSelector((state: AppState) => state.avtaleGiroAgreements.agreements)

  return (
    <Page>
      <MainHeader>AvtaleGiro</MainHeader>
      <AvtaleGiroListWrapper>
        <AvtaleGiroList agreements={allAgreements} manual/>
      </AvtaleGiroListWrapper>
      <AvtaleGiroFilter />
    </Page>
  );
};
