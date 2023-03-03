import { Chart, ChartData, ChartOptions } from 'chart.js';
import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { IDonorStats } from '../../../../models/types';
import { AggregateChartWrapper } from './AggregateChart.style';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const DonorAggregateChart: React.FunctionComponent<{ stats?: IDonorStats }> = ({
  stats,
}) => {
  useEffect(() => {
    Chart.register(ChartDataLabels);
  }, []);

  if (!stats || !stats.sumYearlyAggregates)
    return (
      <AggregateChartWrapper>
        <span>Loading...</span>
      </AggregateChartWrapper>
    );

  let added: { [key: string]: number } = {};

  let years = stats.sumYearlyAggregates.map((el) => el.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const numYears = maxYear - minYear + 1;

  if (numYears < 0) {
    return <div>No donations</div>;
  }

  let data: ChartData<'bar'> & ChartData<'line'> = {
    labels: new Array(numYears).fill(0).map((_, idx) => minYear + idx),
    datasets: [],
  };

  stats.sumYearlyAggregates.forEach((row) => {
    let index = -1;
    if (row.abbriv) {
      if (!added.hasOwnProperty(row.abbriv)) {
        let length = data.datasets.push({
          label: row.abbriv,
          data: new Array(numYears).fill(0),
          order: 10,
          datalabels: {
            anchor: 'start',
            align: 'start',
          },
        });
        added[row.abbriv] = length - 1;
        data.datasets[added[row.abbriv]].backgroundColor = 'black';
      }
      index = added[row.abbriv];
      data.datasets[index].data[row.year - minYear] = row.value ? row.value.toNumber() : 0;
    }
  });

  const yearlyAggregates: { year: string; sum: number }[] = [];
  stats.sumYearlyAggregates
    .sort((a, b) => a.year - b.year)
    .forEach((row) => {
      if (
        yearlyAggregates.length > 0 &&
        row.year.toString() === yearlyAggregates[yearlyAggregates.length - 1].year
      ) {
        yearlyAggregates[yearlyAggregates.length - 1].sum += row.value?.toNumber() || 0;
      } else if (row.value) {
        yearlyAggregates.push({
          year: row.year.toString(),
          sum: row.value?.toNumber(),
        });
      }
    });

  const yearDiff = +yearlyAggregates[yearlyAggregates.length - 1].year - +yearlyAggregates[0].year + 1
  if (yearDiff !== yearlyAggregates.length) {
    const minYear = yearlyAggregates[0].year
    for (let i = 0; i < yearDiff; i++) {
      const year = (i + minYear).toString()
      const allYears: string[] = yearlyAggregates.map(ag => ag.year)
      if ((allYears.indexOf(year) === -1)) {
        yearlyAggregates.push({ "year": year, "sum": 0 })
      }
      yearlyAggregates.sort((a, b) => parseInt(a.year) - parseInt(b.year))
    }
  }

  data.datasets.push({
    label: 'Yearly sum',
    data: yearlyAggregates.map((row) => row.sum),
    datalabels: {
      display: false,
    },
    borderColor: 'black',
    type: 'line',
    borderDash: [5, 5],
    borderWidth: 2,
    pointRadius: 0,
    tension: 0.1,
    yAxisID: 'y2',
    order: 0,
  });

  const options: ChartOptions<'bar'> = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (val) =>
            new Intl.NumberFormat('no-NB', {
              style: 'currency',
              currency: 'NOK',
              maximumSignificantDigits: 3,
            }).format(val.raw as number),
        },
      },
      datalabels: {
        color: 'black',
        rotation: 90,
        display: true,
        formatter: function (value, context) {
          return context.dataset.label;
        },
      },
    },
    layout: {
      padding: {
        bottom: 50,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
        ticks: {
          font: {
            weight: 'bold',
            family: 'ES Klarheit Grotesk',
            size: 14,
          },
          textStrokeColor: 'black',
          color: 'black',
        },
        position: 'top',
      },
      y: {
        stacked: false,
        ticks: {
          callback: (val) =>
            new Intl.NumberFormat('no-NB', {
              style: 'currency',
              currency: 'NOK',
              maximumSignificantDigits: 3,
            }).format(val as number),
        },
      },
      y2: {
        stacked: false,
        position: 'right',
        ticks: {
          callback: (val) =>
            new Intl.NumberFormat('no-NB', {
              style: 'currency',
              currency: 'NOK',
              maximumSignificantDigits: 3,
            }).format(val as number),
        },
      },
    },
  };

  return (
    <AggregateChartWrapper>
      <Bar options={options} data={data as ChartData<'bar'>} />
    </AggregateChartWrapper>
  );
};
