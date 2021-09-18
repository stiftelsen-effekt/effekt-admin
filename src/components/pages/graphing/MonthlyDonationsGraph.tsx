import { ChartData, ChartOptions } from "chart.js";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { fetchSumByMonthAction } from "./graphing.actions";

export const MonthlyDonationsGraph: React.FC = () => {
  const dispatch = useDispatch()
  const monthly = useSelector((state: AppState) => state.graphing.monthly)

  useEffect(() => { dispatch(fetchSumByMonthAction.started()) }, [dispatch])

  if (!monthly || monthly.length === 0) return <div>Loading...</div>

  const data: ChartData = {
    datasets: [{
      data: monthly.map(record => record.sum),
      backgroundColor: '#f5b555'
    }],
    labels: monthly.map(record => record.year.toString() + ' - ' + record.month.toString())
  }

  const options: ChartOptions = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (val) => new Intl.NumberFormat('no-NB', { 
            style: 'currency', 
            currency: 'NOK',
            maximumSignificantDigits: 3
          }).format(val.raw)
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (val) => new Intl.NumberFormat('no-NB', { 
            style: 'currency', 
            currency: 'NOK',
            maximumSignificantDigits: 3
          }).format(val)
        }
      }
    }
  }

  return <Bar data={data} options={options} height={220} />
}