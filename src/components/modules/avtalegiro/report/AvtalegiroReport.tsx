import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState, AvtaleGiroAgreementsState } from '../../../../models/state';
import { fetchAvtaleGiroReportAction } from '../../../../store/avtalegiro/avtalegiro.actions';
import { ReportContent, ReportHeader, ReportWrapper } from '../../shared/report/Report.style';

export const AvtaleGiroReport = () => {
  const agreements: AvtaleGiroAgreementsState = useSelector(
    (state: AppState) => state.avtaleGiroAgreements
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvtaleGiroReportAction.started(undefined));
  }, [dispatch]);

  const thousandize = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <ReportWrapper>
      <ReportHeader>AvtaleGiro</ReportHeader>
      <ReportContent>
        <h4>There are currently {agreements.activeAgreementCount} active agreements</h4>
        <table width="300px">
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
        <table width="300px">
          <tbody>
            <tr>
              <td>Agreements started</td>
              <td>{agreements.startedThisMonth}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <Link to="/avtalegiro">See all agreements</Link>
      </ReportContent>
    </ReportWrapper>
  );
};
