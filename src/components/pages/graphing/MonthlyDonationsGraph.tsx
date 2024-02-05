import { ChartData, ChartOptions } from "chart.js";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { fetchSumByMonthAction } from "../../../store/graphing/graphing.actions";
import ChartDataLabels from "chartjs-plugin-datalabels";

export const MonthlyDonationsGraph: React.FC = () => {
  const dispatch = useDispatch();
  const monthly = useSelector((state: AppState) => state.graphing.monthly);

  useEffect(() => {
    dispatch(fetchSumByMonthAction.started(undefined));
  }, [dispatch]);

  if (!monthly || monthly.length === 0) return <div>Loading...</div>;

  const data: ChartData<"bar"> = {
    datasets: [
      {
        data: monthly.map((record) => record.sum),
        backgroundColor: "black",
      },
    ],
    labels: monthly.map((record) => record.year.toString() + " - " + record.month.toString()),
  };

  const options: ChartOptions<"bar"> = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (val) =>
            new Intl.NumberFormat("no-NB", {
              style: "currency",
              currency: "NOK",
              maximumSignificantDigits: 3,
            }).format(val.raw as number),
        },
      },
      datalabels: {
        color: "black",
        anchor: "end",
        align: "end",
        formatter(value, context) {
          return value > 0
            ? new Intl.NumberFormat("no-NB", {
                style: "currency",
                currency: "NOK",
                maximumSignificantDigits: 3,
              }).format(value as number)
            : "";
        },
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: (val) =>
            new Intl.NumberFormat("no-NB", {
              style: "currency",
              currency: "NOK",
              maximumSignificantDigits: 3,
            }).format(val as number),
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={data} options={options} plugins={[ChartDataLabels]} />;
};
