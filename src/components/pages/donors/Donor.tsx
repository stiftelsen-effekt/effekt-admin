import { MainHeader, SubHeader } from '../../style/elements/headers.style';
import React from 'react';
import { Page } from '../../style/elements/page.style';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../models/state';
import { DonorKeyInfo } from './donor/KeyInfo';
import { DonationsList } from '../../modules/donations/list/DonationsList';
import { AvtaleGiroList } from '../../modules/avtalegiro/agreementlist/AvtaleGiroList';

interface IParams {
  id: string;
}

export const DonorPage: React.FunctionComponent<RouteComponentProps<IParams>> = ({
  match,
}: RouteComponentProps<IParams>) => {
  const donorId = parseInt(match.params.id);

  const data = useSelector((state: AppState) => state.donorPage)

  return (
    <Page>
      <MainHeader>Donor {donorId}</MainHeader>
      
      <DonorKeyInfo donor={data.donor} />

      <SubHeader>Donations</SubHeader>
      <DonationsList donations={data.donations} defaultPageSize={10} />

      <SubHeader>Avtalegiro</SubHeader>
      <AvtaleGiroList agreements={data.avtalegiroAgreements} defaultPageSize={5} />

      <SubHeader>Distributions</SubHeader>
    </Page>
  );
};
