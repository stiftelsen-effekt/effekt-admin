import React from 'react'
import { IDistribution } from '../../../../models/types';
import { HorizontalBar, defaults } from 'react-chartjs-2'
import { GraphWrapper } from './graph.component.style';

(defaults as any).global.defaultFontFamily = 'Roboto';

interface IProps {
    distribution: Array<IDistribution>
}
export const DistributionGraphComponent: React.FunctionComponent<IProps> = ({distribution}) => {
    const data = {
      labels: distribution.map(dist => dist.abbriv),
      datasets: [
        {
          label: 'Organizations',
          backgroundColor: ['#4d342f', '#73402e', '#954f2e', '#b26231', '#cb7835', '#df913d', '#efad47', '#f9cb55', '#feeb65'],
          borderWidth: 0,
          barHeight: '20px',
          data: distribution.map(dist => dist.share)
        }
      ]
    };

    const options = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          beginAtZero: true,
          barPercentage: 0.5,
          barThickness: 40,
          maxBarThickness: 40,
          scaleLabel: {
            fontFamily: 'Roboto',
            fontSize: 24
          }
        }],
        xAxes: [{
          ticks: { beginAtZero: true },
          gridLines: {
            display: false
          },
          
        }]
      }
    }

    return (
        <GraphWrapper>
            <HorizontalBar 
              data={data}
              options={options}></HorizontalBar>
        </GraphWrapper>
    )
}