import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { List } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { AppState, VippsAgreementsState } from '../../../../models/state';
import { fetchAgreementsReportAction } from '../../../../store/vipps/vipps.actions';
import { thousandize } from '../../../../util/formatting';
import { EffektButton } from '../../../style/elements/button.style';
import {
  ReportActions,
  ReportContent,
  ReportHeader,
  ReportWrapper,
} from '../../shared/report/Report.style';

export const VippsReport = () => {
  const agreements: VippsAgreementsState = useSelector((state: AppState) => state.vippsAgreements);
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  const handleAgreementListButtonClick = () => history.push('vipps/agreements');
  const handleChargesListButtonClick = () => history.push('vipps/agreements/charges');

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchAgreementsReportAction.started({ token }))
    );
  }, [dispatch, getAccessTokenSilently]);

  return (
    <ReportWrapper>
      <ReportHeader>Vipps</ReportHeader>
      <ReportContent>
        <h4>There are currently {agreements.activeAgreementCount} active agreements</h4>
        <table width="100%">
          <tbody>
            <tr>
              <td>Median agreement sum</td>
              <td>{thousandize(agreements.medianAgreementSum)} kr</td>
            </tr>
            <tr>
              <td>Average agreement sum</td>
              <td>{thousandize(agreements.averageAgreementSum)} kr</td>
            </tr>
            <tr>
              <td>Total agreement sum</td>
              <td>{thousandize(agreements.totalAgreementSum)} kr</td>
            </tr>
          </tbody>
        </table>
        <h4>Changes this month</h4>
        <table width="100%">
          <tbody>
            <tr>
              <td>Agreements activated</td>
              <td>{agreements.activatedThisMonth}</td>
              <td style={{ textAlign: 'right' }}>
                ({thousandize(agreements.sumActivatedThisMonth)} kr)
              </td>
            </tr>
            <tr>
              <td>Agreements stopped</td>
              <td>{agreements.stoppedThisMonth}</td>
              <td style={{ textAlign: 'right' }}>
                ({thousandize(agreements.sumStoppedThisMonth)} kr)
              </td>
            </tr>
            <tr>
              <td>Agreements pending</td>
              <td>{agreements.pendingThisMonth}</td>
              <td style={{ textAlign: 'right' }}>
                ({thousandize(agreements.sumPendingThisMonth)} kr)
              </td>
            </tr>
            <tr>
              <td>Agreements expired</td>
              <td>{agreements.expiredThisMonth}</td>
              <td style={{ textAlign: 'right' }}>
                ({thousandize(agreements.sumExpiredThisMonth)} kr)
              </td>
            </tr>
          </tbody>
        </table>
      </ReportContent>
      <ReportActions>
        <EffektButton onClick={handleChargesListButtonClick} style={{ marginRight: 12 }}>
          <List size={16} color={'white'}></List>
          <span>Charges</span>
        </EffektButton>
        <EffektButton onClick={handleAgreementListButtonClick}>
          <List size={16} color={'white'}></List>
          <span>Agreements</span>
        </EffektButton>
      </ReportActions>
    </ReportWrapper>
  );
};
