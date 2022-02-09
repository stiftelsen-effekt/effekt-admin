import { ChartData, ChartOptions } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { IDonorStats } from "../../../../models/types";
import { AggregateChartWrapper } from "./AggregateChart.style";

export const DonorAggregateChart: React.FunctionComponent<{ stats?: IDonorStats }> = ({ stats }) => {
  if (!stats || !stats.sumYearlyAggregates) return (
    <AggregateChartWrapper>
      <span>Loading...</span>
    </AggregateChartWrapper>
  )

  const COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
  ];
  
  const color = (index: number) => {
    return COLORS[index % COLORS.length];
  }

  let added: {[key: string]: number}  = {}

  let years = stats.sumYearlyAggregates.map(el => el.year)
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  const numYears = maxYear - minYear + 1
  
  if (numYears < 0) {
    return <div>No donations</div>
  }

  let data: ChartData<"bar"> = {
    labels: new Array(numYears).fill(0).map((_, idx) => minYear + idx),
    datasets: []
  }

  stats.sumYearlyAggregates.forEach((row) => {
    let index = -1
    if (row.abbriv) {
      if (!added.hasOwnProperty(row.abbriv)) {
        let length = data.datasets.push({
          label: row.abbriv,
          data: new Array(numYears).fill(0),
        })
        added[row.abbriv] = length-1
        data.datasets[added[row.abbriv]].backgroundColor = color(added[row.abbriv])
      }
      index = added[row.abbriv]
      data.datasets[index].data[row.year - minYear] = row.value ? row.value.toNumber() : 0
    }
  })

  const options: ChartOptions<"bar"> = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: "bottom",
        align: "start"
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
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          
          callback: (val) =>
            new Intl.NumberFormat('no-NB', {
              style: 'currency',
              currency: 'NOK',
              maximumSignificantDigits: 3,
            }).format(val as number),
        },
      }
    }
  }

  return (
    <AggregateChartWrapper>
      <Bar 
        options={options}
        data={data}
      />
    </AggregateChartWrapper>
  )
}