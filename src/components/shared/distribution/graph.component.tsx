import React from 'react';
import { HorizontalBar, defaults } from 'react-chartjs-2';
import { IDistributionShare } from '../../../types';
import { GraphWrapper } from './graph.component.style';

(defaults as any).global.defaultFontFamily = 'Roboto';

interface IProps {
  distribution: Array<IDistributionShare> | undefined;
}
export const DistributionGraphComponent: React.FunctionComponent<IProps> = ({
  distribution,
}) => {
  if (!distribution) return <div>No distribution</div>;

  const data = {
    labels: distribution.map((dist) => dist.abbriv),
    datasets: [
      {
        label: 'Organizations',
        backgroundColor: [
          '#4d342f',
          '#73402e',
          '#954f2e',
          '#b26231',
          '#cb7835',
          '#df913d',
          '#efad47',
          '#f9cb55',
          '#feeb65',
        ],
        borderWidth: 0,
        data: distribution.map((dist) => dist.share),
      },
    ],
  };

  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          beginAtZero: true,
          barThickness: 36,
          scaleLabel: {
            fontFamily: 'Roboto',
            fontSize: 24,
          },
        },
      ],
      xAxes: [
        {
          ticks: { beginAtZero: true },
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  return (
    <GraphWrapper>
      <HorizontalBar data={data} options={options} height={280} />
    </GraphWrapper>
  );
};
