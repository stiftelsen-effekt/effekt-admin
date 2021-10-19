import React from 'react';

import { Page } from '../../style/elements/page.style';
import { MainHeader, GreenBox, RedBox } from '../../style/elements/headers.style';
import { IInvalidTransaction } from '../../../models/types';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, ReportProcessingState } from '../../../models/state';
import { Redirect } from 'react-router';
import { EffektDisplayTable } from '../../style/elements/display-table/display-table.component.style';
import { SingleDonation } from '../../modules/single-donation/SingleDonation';
import { popInvalidTransaction } from './process.actions';
import { fetchActiveOrganizationsAction } from '../../../store/organizations/organizations.action';

export const ProcessDonations: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();

  const organizations = useSelector((state: AppState) => state.organizations.active);
  const processingState: ReportProcessingState = useSelector(
    (state: AppState) => state.reportProcessing
  );
  const current: IInvalidTransaction =
    processingState.invalidTransactions[processingState.invalidTransactions.length - 1];

  if (!organizations) {
    dispatch(fetchActiveOrganizationsAction.started());
    return <div>Loading organizations</div>;
  }

  if (processingState.invalidTransactions.length === 0) {
    return <Redirect to="/register"></Redirect>;
  }

  const ignoreTransaction = () => {
    dispatch(popInvalidTransaction());
  };

  return (
    <Page>
      <MainHeader>Report upload - Manual review</MainHeader>

      <GreenBox>
        <strong>{processingState.valid}</strong> processed donations,
        <strong>{processingState.invalid}</strong> up for manual review
      </GreenBox>
      <RedBox>
        <div className="header">Reason for failure</div>
        <span>{current.reason}</span>
      </RedBox>

      <EffektDisplayTable style={{ marginBottom: '40px', marginTop: '30px' }}>
        <thead>
          <tr>
            {current.transaction.location !== undefined ? <th>Saleslocation</th> : ''}
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
            {current.transaction.name !== undefined ? <td>{current.transaction.name}</td> : ''}
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
      ></SingleDonation>
    </Page>
  );
};
