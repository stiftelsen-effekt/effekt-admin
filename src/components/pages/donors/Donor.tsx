import { MainHeader, SubHeader } from '../../style/elements/headers.style';
import React, { useEffect } from 'react';
import { Page } from '../../style/elements/page.style';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../models/state';
import { DonorKeyInfo } from './donor/KeyInfo';
import { DonationsList } from '../../modules/donations/list/DonationsList';
import { AvtaleGiroList } from '../../modules/avtalegiro/agreementlist/AvtaleGiroList';
import { getDonorAction, getDonorAvtalegiroAgreementsAction, getDonorDistributionsAction, getDonorDonationsAction, getDonorVippsAgreementsAction, getDonorYearlyAggregatesAction } from '../../../store/donors/donor-page.actions';
import { DonorAggregateChart } from './donor/AggregateChart';
import { OverviewLine } from './Donor.style';
import { EffektTabs } from '../../modules/shared/tabs/EffektTabs';
import { EffektTabHeader } from '../../modules/shared/tabs/EffektTabHeader';
import { EffektTab } from '../../modules/shared/tabs/EffektTab';
import { VippsAgreementList } from '../../modules/vipps/agreementlist/VippsAgreementList';
import { DistributionsList } from '../../modules/distribution/list/DistributionsList';

interface IParams {
  id: string;
}

export const DonorPage: React.FunctionComponent<RouteComponentProps<IParams>> = ({
  match,
}: RouteComponentProps<IParams>) => {
  const dispatch = useDispatch()
  const donorId = parseInt(match.params.id)

  const data = useSelector((state: AppState) => state.donorPage)

  useEffect(() => {
    dispatch(getDonorAction.started(donorId))
    dispatch(getDonorDonationsAction.started(donorId))
    dispatch(getDonorDistributionsAction.started(donorId))
    dispatch(getDonorAvtalegiroAgreementsAction.started(donorId))
    dispatch(getDonorVippsAgreementsAction.started(donorId))
    dispatch(getDonorYearlyAggregatesAction.started(donorId))
  }, [dispatch, donorId])

  return (
    <Page>
      <MainHeader>Donor {donorId}</MainHeader>
      
      <OverviewLine>
        <DonorKeyInfo donor={data.donor} />
        <DonorAggregateChart stats={data.stats} />
      </OverviewLine>

      <EffektTabs>
        <EffektTabHeader 
          label='Donations' 
          counter={data.donations ? data.donations.length : 0} 
          />
        <EffektTab>
          <DonationsList donations={data.donations} defaultPageSize={10} />
        </EffektTab>

        <EffektTabHeader 
          label='Distributions' 
          counter={data.distributions ? data.distributions.length : 0} 
          />
        <EffektTab>
          <DistributionsList distributions={data.distributions} defaultPageSize={10} />
        </EffektTab>

        <EffektTabHeader 
          label='AvtaleGiro' 
          counter={data.avtalegiroAgreements ? data.avtalegiroAgreements.length : 0} 
          />
        <EffektTab>
          <AvtaleGiroList agreements={data.avtalegiroAgreements} defaultPageSize={10} />
        </EffektTab>

        <EffektTabHeader 
          label='Vipps' 
          counter={data.vippsAgreements ? data.vippsAgreements.length : 0} 
          />
        <EffektTab>
          <VippsAgreementList agreements={data.vippsAgreements} defaultPageSize={10} />
        </EffektTab>
      </EffektTabs>
    </Page>
  );
};
