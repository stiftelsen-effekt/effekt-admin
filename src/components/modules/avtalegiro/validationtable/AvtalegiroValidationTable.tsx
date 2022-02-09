import React, { useEffect } from 'react';
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { fetchAvtaleGiroValidationTableAction } from '../../../../store/avtalegiro/avtalegiro.actions';
import { ReportContent, ReportHeader, ReportWrapper } from '../../shared/report/Report.style';
import { useHistory } from 'react-router';
import { DateTime } from 'luxon';

export const AvtaleGiroValidationTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const avtaleGiroState = useSelector((state: AppState) => state.avtaleGiroAgreements);

  useEffect(() => {
    dispatch(fetchAvtaleGiroValidationTableAction.started(undefined));
  }, [dispatch]);

  const thousandize = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const columnDefinitions = [
    {
      Header: 'Date',
      accessor: 'date',
      id: 'date',
      width: 60
    },
    {
      Header: 'Expected',
      id: 'expected',
      accessor: (res: any) => thousandize(res.expected) + ' kr',
    },
    {
      Header: 'Actual',
      id: 'actual',
      accessor: (res: any) => res.actual !== null ? thousandize(res.actual) + ' kr' : '-',
    },
    {
      Header: 'Diff',
      id: 'diff',
      accessor: (res: any) => res.actual !== null ? thousandize(res.diff) + ' kr' : '-',
    },
  ];

  const defaultSorting = [{ id: 'date', desc: true }];
  const data = avtaleGiroState.validation.validationTable

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          let now = DateTime.fromJSDate(new Date())
          let date = now.day < rowInfo.original.date 
            ? now.set({ day: rowInfo.original.date }).minus({ months: 1 }).toISO()
            : now.set({ day: rowInfo.original.date }).toISO();
          history.push(`/avtalegiro/validation/${date}`);
        },
      };
    }
    return {};
  };

  return (
    <ReportWrapper>
      <ReportHeader>AvtaleGiro validation</ReportHeader>
      <ReportContent>
        <ReactTable 
          data={data}
          columns={columnDefinitions}
          defaultSorting={defaultSorting}
          pageSize={10}
          showPageSizeOptions={false}
          loading={avtaleGiroState.loading}
          getTrProps={trProps} />
      </ReportContent>
    </ReportWrapper>
  );
};
