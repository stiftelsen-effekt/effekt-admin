import React from 'react';
import ReactTable from 'react-table';

import { IReferralAnswer } from '../../../../models/types';
import { longDateTime } from '../../../../util/formatting';

export const ReferralAnswerList: React.FunctionComponent<{
  data?: Array<IReferralAnswer>;
  defaultPageSize?: number;
}> = ({ data, defaultPageSize }) => {
  return (
      <ReactTable
      data={data ? data : []}
      defaultPageSize={defaultPageSize ? defaultPageSize : 10}
      columns={[
        {Header: 'ID', width: 60, accessor: 'id'},
        {Header: 'Answer', id: 'answer', accessor: a => (a.answer && a.answer.length) ? a.answer : "–"},
        {Header: 'Timestamp', width: 150, id: 'timestamp', accessor: a => longDateTime(a.timestamp)},
        {Header: 'Web Session', width: 150, accessor: 'session'},
        {Header: 'Active Type', width: 110, id: 'active', accessor: a => a.active ? 'Yes' : 'No'},
      ]}
      defaultSorted={[{ id: 'id', desc: true }]}
      />
  );
};
