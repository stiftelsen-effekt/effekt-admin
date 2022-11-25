import { useAuth0 } from '@auth0/auth0-react';
import React, { CSSProperties, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { fetchTransactionCostsReportAction } from '../../../../store/donations/donation.actions';
import { thousandize } from '../../../../util/formatting';
import {
  ReportContent,
  ReportHeader,
  ReportWrapper
} from '../../shared/report/Report.style';

const cellStyle: CSSProperties = { textAlign: 'right' };

export const TransactionCostsReport = () => {
  const report = useSelector(
    (state: AppState) => state.donations?.transactionCostsReport
  );
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchTransactionCostsReportAction.started({ token }))
    );
  }, [dispatch, getAccessTokenSilently]);

  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <ReportWrapper>
      <ReportHeader>Transaction Costs</ReportHeader>
      <ReportContent>
        <table width="100%">
          <thead style={cellStyle}>
            <tr>
              <th></th>
              <th>{currentYear - 1}</th>
              <th>{currentYear}</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            <DataRow
              label={`${getMonthName(now)} (to date)`}
              currentVal={report?.costCurrentMonthToDate}
              prevVal={report?.costCurrentMonthToDatePrevYear}
            />
            <DataRow
              label={`${getMonthName(new Date(currentYear, now.getMonth() - 1))} (total)`}
              currentVal={report?.costPrevMonth}
              prevVal={report?.costPrevMonthPrevYear}
            />
            <DataRow
              label={"Year to date"}
              currentVal={report?.costYTD}
              prevVal={report?.costYTDPrevYear}
            />
          </tbody>
        </table>
      </ReportContent>
    </ReportWrapper>
  );
};

const DataRow = ({ label, currentVal, prevVal }) => {
  return <tr>
    <td>{label}</td>
    <td style={cellStyle}>{thousandize(prevVal)} kr</td>
    <td style={cellStyle}>{thousandize(currentVal)} kr</td>
    <td style={cellStyle}>{getPercentageChange(currentVal, prevVal)}</td>
  </tr>
}

function getPercentageChange(newVal: string, oldVal: string): string {
  const oldValParsed = parseFloat(oldVal);
  const newValParsed = parseFloat(newVal);

  if (isNaN(oldValParsed) || isNaN(newValParsed) || oldValParsed === 0) {
    return "–";
  }

  const precentChange = Math.round(((newValParsed - oldValParsed) / oldValParsed) * 100);

  return `${precentChange} %`;
}

function getMonthName(date: Date, lang = 'en') {
  return date.toLocaleString(lang, { month: 'long' });
}