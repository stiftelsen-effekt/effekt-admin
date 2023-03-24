import { MainHeader } from '../../style/elements/headers.style';
import React, { useEffect } from 'react';
import { Page } from '../../style/elements/page.style';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../models/state';
import { DonorKeyInfo } from './donor/KeyInfo';
import { TotalDonationAmount } from './donor/TotalDonationAmount';
import { DonationsList } from '../../modules/donations/list/DonationsList';
import { AvtaleGiroList } from '../../modules/avtalegiro/agreementlist/AvtaleGiroList';
import {
  getDonorAction,
  getDonorAvtalegiroAgreementsAction,
  getDonorDistributionsAction,
  getDonorDonationsAction,
  getDonorVippsAgreementsAction,
  getDonorYearlyAggregatesAction,
  getDonorReferralAnswersAction,
  getDonorTaxUnitsAction,
} from '../../../store/donors/donor-page.actions';
import { DonorAggregateChart } from './donor/AggregateChart';
import { ChartWrapper, OverviewLine } from './Donor.style';
import { EffektTabs } from '../../modules/shared/tabs/EffektTabs';
import { EffektTabHeader } from '../../modules/shared/tabs/EffektTabHeader';
import { EffektTab } from '../../modules/shared/tabs/EffektTab';
import { VippsAgreementList } from '../../modules/vipps/agreementlist/VippsAgreementList';
import { DistributionsList } from '../../modules/distribution/list/DistributionsList';
import { useAuth0 } from '@auth0/auth0-react';
import { ReferralAnswerList } from '../../modules/donors/referral_answers/ReferralAnswerList';
import { TaxUnitList } from '../../modules/taxunits/list/TaxUnitsList';

interface IParams {
  id: string;
}

export const DonorPage: React.FunctionComponent<RouteComponentProps<IParams>> = ({
  match,
}: RouteComponentProps<IParams>) => {
  const dispatch = useDispatch();
  const donorId = parseInt(match.params.id);
  const { getAccessTokenSilently } = useAuth0();

  const data = useSelector((state: AppState) => state.donorPage);

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(getDonorAction.started({ id: donorId, token }));
      dispatch(getDonorDonationsAction.started({ id: donorId, token }));
      dispatch(getDonorDistributionsAction.started({ id: donorId, token }));
      dispatch(getDonorAvtalegiroAgreementsAction.started({ id: donorId, token }));
      dispatch(getDonorVippsAgreementsAction.started({ id: donorId, token }));
      dispatch(getDonorYearlyAggregatesAction.started({ id: donorId, token }));
      dispatch(getDonorReferralAnswersAction.started({ id: donorId, token }));
      dispatch(getDonorTaxUnitsAction.started({ id: donorId, token }));
    });
  }, [dispatch, donorId, getAccessTokenSilently]);

  let totalDonations = 0;
  let operationsDonations = 0;
  if (data.stats && data.stats.sumYearlyAggregates) {
    data.stats.sumYearlyAggregates.forEach((row) => {
      let amount = row.value ? row.value.toNumber() : 0;
      totalDonations += amount;
      if (row.abbriv === 'Drift') operationsDonations += amount;
    });
  }

  return (
    <Page>
      <MainHeader>Donor {donorId}</MainHeader>

      <OverviewLine>
        {data.donor && <DonorKeyInfo donor={data.donor} />}
        <TotalDonationAmount
          totalDonationAmount={totalDonations}
          operationsDonationAmount={operationsDonations}
        />
      </OverviewLine>

      <ChartWrapper>
        <DonorAggregateChart stats={data.stats} />
      </ChartWrapper>

      <EffektTabs>
        <div>
          <EffektTabHeader
            label="Donations"
            counter={data.donations ? data.donations.length : '...'}
          />
          <EffektTabHeader
            label="Distributions"
            counter={data.distributions ? data.distributions.length : '...'}
          />
          <EffektTabHeader
            label="AvtaleGiro"
            counter={data.avtalegiroAgreements ? data.avtalegiroAgreements.length : '...'}
          />
          <EffektTabHeader
            label="Vipps recurring"
            counter={data.vippsAgreements ? data.vippsAgreements.length : '...'}
          />
          <EffektTabHeader
            label="Tax units"
            counter={data.taxUnits ? data.taxUnits.length : '...'}
          />
          <EffektTabHeader
            label="Referrals"
            counter={data.referralAnswers ? data.referralAnswers.length : '...'}
          />
        </div>
        <div>
          <EffektTab>
            <DonationsList donations={data.donations} defaultPageSize={10} />
          </EffektTab>
          <EffektTab>
            <DistributionsList
              distributions={data.distributions}
              defaultPageSize={10}
              hideEmail={true}
              hideName={true}
            />
          </EffektTab>
          <EffektTab>
            <AvtaleGiroList agreements={data.avtalegiroAgreements} defaultPageSize={10} />
          </EffektTab>
          <EffektTab>
            <VippsAgreementList agreements={data.vippsAgreements} defaultPageSize={10} />
          </EffektTab>
          <EffektTab>
            <TaxUnitList taxUnits={data.taxUnits} donorId={donorId} />
          </EffektTab>
          <EffektTab>
            <ReferralAnswerList data={data.referralAnswers} />
          </EffektTab>
        </div>
      </EffektTabs>
    </Page>
  );
};
