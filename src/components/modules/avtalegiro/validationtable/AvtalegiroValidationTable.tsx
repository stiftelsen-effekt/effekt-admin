import React, { useEffect } from 'react';
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { fetchAvtaleGiroValidationTableAction } from '../../../../store/avtalegiro/avtalegiro.actions';
import { ReportContent, ReportHeader, ReportWrapper } from '../../shared/report/Report.style';

export const AvtaleGiroValidationTable = () => {
  const avtaleGiroState = useSelector((state: AppState) => state.avtaleGiroAgreements);
  const dispatch = useDispatch();

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
      accessor: (res: any) => thousandize(res.actual) + ' kr',
    },
    {
      Header: 'Diff',
      id: 'diff',
      accessor: (res: any) => thousandize(res.diff) + ' kr' + (res.diff !== 0 ? ' ⚠️' : ''),
    },
  ];

  const defaultSorting = [{ id: 'date', desc: true }];
  const data = avtaleGiroState.validationTable

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
          loading={avtaleGiroState.loading} />
      </ReportContent>
    </ReportWrapper>
  );
};
