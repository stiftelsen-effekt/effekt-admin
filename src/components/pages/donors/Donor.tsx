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
} from '../../../store/donors/donor-page.actions';
import { DonorAggregateChart } from './donor/AggregateChart';
import { OverviewLine } from './Donor.style';
import { EffektTabs } from '../../modules/shared/tabs/EffektTabs';
import { EffektTabHeader } from '../../modules/shared/tabs/EffektTabHeader';
import { EffektTab } from '../../modules/shared/tabs/EffektTab';
import { VippsAgreementList } from '../../modules/vipps/agreementlist/VippsAgreementList';
import { DistributionsList } from '../../modules/distribution/list/DistributionsList';
import { useAuth0 } from '@auth0/auth0-react';
import { longDateTime } from '../../../util/formatting';
import ReactTable from 'react-table';

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
    });
  }, [dispatch, donorId, getAccessTokenSilently]);

  let totalDonations = 0;
  let operationsDonations = 0;
  if (data.stats && data.stats.sumYearlyAggregates) {
    data.stats.sumYearlyAggregates.forEach((row) => {
      let amount = row.value ? row.value.toNumber() : 0;
      totalDonations += amount;
      if (row.abbriv === "Drift")
        operationsDonations += amount;
    })
  }

  return (
    <Page>
      <MainHeader>Donor {donorId}</MainHeader>

      <OverviewLine>
        {data.donor && <DonorKeyInfo donor={data.donor} />}
        <DonorAggregateChart stats={data.stats} />
        <TotalDonationAmount totalDonationAmount={totalDonations} operationsDonationAmount={operationsDonations} />
      </OverviewLine>

      <EffektTabs>
        <div>
          <EffektTabHeader label="Donations" counter={data.donations ? data.donations.length : 0} />
          <EffektTabHeader
            label="Distributions"
            counter={data.distributions ? data.distributions.length : 0}
          />
          <EffektTabHeader
            label="AvtaleGiro"
            counter={data.avtalegiroAgreements ? data.avtalegiroAgreements.length : 0}
          />
          <EffektTabHeader
            label="Vipps"
            counter={data.vippsAgreements ? data.vippsAgreements.length : 0}
          />
          <EffektTabHeader
            label="Referrals"
            counter={data.referralAnswers ? data.referralAnswers.length : 0}
          />
        </div>
        <div>
          <EffektTab>
            <DonationsList donations={data.donations} defaultPageSize={10} />
          </EffektTab>
          <EffektTab>
            <DistributionsList distributions={data.distributions} defaultPageSize={10} hideEmail={true} hideName={true} />
          </EffektTab>
          <EffektTab>
            <AvtaleGiroList agreements={data.avtalegiroAgreements} defaultPageSize={10} />
          </EffektTab>
          <EffektTab>
            <VippsAgreementList agreements={data.vippsAgreements} defaultPageSize={10} />
          </EffektTab>
          <EffektTab>
            <ReactTable
              data={data.referralAnswers ? data.referralAnswers : []}
              defaultPageSize={10}
              columns={[
                {Header: 'ID', width: 60, accessor: 'id'},
                {Header: 'Answer', id: 'answer', accessor: a => (a.answer && a.answer.length) ? a.answer : "–"},
                {Header: 'Timestamp', width: 150, id: 'timestamp', accessor: a => longDateTime(a.timestamp)},
                {Header: 'Web Session', width: 150, accessor: 'session'},
                {Header: 'Active Type', width: 110, id: 'active', accessor: a => a.active ? 'Yes' : 'No'},
              ]}
              defaultSorted={[{ id: 'id', desc: true }]}
            />
          </EffektTab>
        </div>
      </EffektTabs>
    </Page>
  );
};
