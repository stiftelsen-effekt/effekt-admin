import React, { useState } from 'react';
import { Page } from '../../style/elements/page.style';
import { MainHeader, SubHeader } from '../../style/elements/headers.style';
import { useDispatch, useSelector } from 'react-redux';
import { EffektDateRange } from '../../modules/range/DateRange';
import { AppState } from '../../../models/state';
import { fetchTotalByPeriodAction } from '../../../store/graphing/graphing.actions';
import { Bar } from 'react-chartjs-2';
import * as palette from 'google-palette';
import { ChartOptions } from 'chart.js';

export const GraphingPageComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const [from, setFrom] = useState<Date | null>(new Date('2018-01-01'));
  const [to, setTo] = useState<Date | null>(new Date());

  const total = useSelector((state: AppState) => state.graphing.total);

  let data;
  if (!total && from !== null && to !== null)
    dispatch(fetchTotalByPeriodAction.started({ from, to }));
  else if (total !== undefined) {
    const colors = palette('tol-dv', total.length)
      .map((hex: string) => '#' + hex)
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

  const options: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: false,
      },
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
        onChangeRange={(newFrom: Date | null, newTo: Date | null) => {
          setFrom(newFrom);
          setTo(newTo);
          if (newFrom !== null && newTo !== null)
            dispatch(fetchTotalByPeriodAction.started({ from: newFrom, to: newTo }));
        }}
      ></EffektDateRange>

      <div style={{ width: 1024, height: 550, marginTop: 30 }}>
        <Bar data={data} options={options}></Bar>
      </div>
    </Page>
  );
};
