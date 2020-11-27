import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Page } from '../../shared/elements/page.style';
import {
  MainHeader,
  GreenBox,
  RedBox,
} from '../../shared/elements/headers.style';
import { IInvalidTransaction } from '../../../types';
import { AppState, ReportProcessingState } from '../../../store/state';
import { EffektDisplayTable } from '../../shared/elements/display-table/display-table.component.style';
import { SingleDonation } from '../../shared/single-donation/single-donation.component';
import { fetchActiveOrganizationsAction } from '../../../store/organizations/organizations.action';
import { popInvalidTransaction } from '../../../store/donations/process/process.actions';

export const ProcessDonations: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();

  const organizations = useSelector(
    (state: AppState) => state.organizations.active,
  );
  const processingState: ReportProcessingState = useSelector(
    (state: AppState) => state.reportProcessing,
  );
  const current: IInvalidTransaction =
    processingState.invalidTransactions[
      processingState.invalidTransactions.length - 1
    ];

  if (!organizations) {
    dispatch(fetchActiveOrganizationsAction.started(undefined));
    return <div>Loading organizations</div>;
  }

  if (processingState.invalidTransactions.length === 0) {
    return <Redirect to="/register" />;
  }

  const ignoreTransaction = () => {
    dispatch(popInvalidTransaction());
  };

  return (
    <Page>
      <MainHeader>Report upload - Manual review</MainHeader>

      <GreenBox>
        <strong>{processingState.valid}</strong> processed donations,
        <strong>{processingState.invalid}</strong>
{' '}
up for manual review
</GreenBox>
      <RedBox>
        <div className="header">Reason for failure</div>
        <span>{current.reason}</span>
      </RedBox>

      <EffektDisplayTable style={{ marginBottom: '40px', marginTop: '30px' }}>
        <thead>
          <tr>
            {current.transaction.location !== undefined ? (
              <th>Saleslocation</th>
            ) : (
              ''
            )}
            {current.transaction.name !== undefined ? <th>Name</th> : ''}
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {current.transaction.location !== undefined ? (
              <td>{current.transaction.location}</td>
            ) : (
              ''
            )}
            {current.transaction.name !== undefined ? (
              <td>{current.transaction.name}</td>
            ) : (
              ''
            )}
            <td>{current.transaction.message}</td>
          </tr>
        </tbody>
      </EffektDisplayTable>

      <SingleDonation
        suggestedValues={{
          sum: current.transaction.amount,
          paymentExternalRef: current.transaction.transactionID,
          paymentId: current.transaction.paymentID,
          timestamp: current.transaction.date,
        }}
        organizations={organizations}
        onIgnore={ignoreTransaction}
      />
    </Page>
  );
};
