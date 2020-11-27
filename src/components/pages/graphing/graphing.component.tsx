import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import * as palette from 'google-palette';
import { Page } from '../../shared/elements/page.style';
import { MainHeader, SubHeader } from '../../shared/elements/headers.style';
import { EffektDateRange } from '../../shared/range/date-range.component';
import { AppState } from '../../../store/state';
import { fetchTotalByPeriodAction } from '../../../store/graphing/graphing.actions';

export const GraphingPageComponent: React.FunctionComponent = () => {
  console.log(palette);

  const dispatch = useDispatch();

  const [from, setFrom] = useState<Date | null>(new Date('2018-01-01'));
  const [to, setTo] = useState<Date | null>(new Date());

  const total = useSelector((state: AppState) => state.graphing.total);

  let data;
  if (!total && from !== null && to !== null)
    dispatch(fetchTotalByPeriodAction.started({ from, to }));
  else if (total !== undefined) {
    const colors = palette('tol-dv', total.length)
      .map((hex: string) => `#${hex}`)
      .reverse();

    data = {
      datasets: [
        {
          backgroundColor: colors,
          data: total.map((item) => item.sum.toNumber()),
        },
      ],
      labels: total.map((item) => item.orgName),
    };
  }

  const options = {
    legend: {
      display: false,
    },
  };

  return (
    <Page>
      <MainHeader>Graphing</MainHeader>

      <SubHeader>Total</SubHeader>
      <EffektDateRange
        from={from}
        to={to}
        onChangeFrom={(date: Date | null) => {
          setFrom(date);
          if (date !== null && to !== null)
            dispatch(fetchTotalByPeriodAction.started({ from: date, to }));
        }}
        onChangeTo={(date: Date | null) => {
          setTo(date);
          if (from !== null && date !== null)
            dispatch(fetchTotalByPeriodAction.started({ from, to: date }));
        }}
      />

      <div style={{ width: 1024, height: 550, marginTop: 30 }}>
        <Bar data={data} options={options} />
      </div>
    </Page>
  );
};
