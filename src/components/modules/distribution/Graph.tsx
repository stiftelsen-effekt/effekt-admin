import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { GraphWrapper } from "./Graph.style";
import { ChartOptions } from "chart.js";
import { IDistribution } from "../../../models/types";
import Decimal from "decimal.js";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { fetchAllCauseareasAction } from "../../../store/causeareas/causeareas.action";
import ChartDataLabels from "chartjs-plugin-datalabels";

export const DistributionGraphComponent: React.FunctionComponent<{
  distribution: IDistribution;
  sum?: number;
}> = ({ distribution, sum }) => {
  const allCauseAreas = useSelector((state: AppState) => state.causeareas.all);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allCauseAreas) {
      dispatch(fetchAllCauseareasAction.started(undefined));
    }
  }, []);

  if (!distribution) return <div>No distribution</div>;

  if (!allCauseAreas) return <div>Loading...</div>;

  // First, create a unique list of all organizations across all cause areas
  const allOrganizations = [
    ...new Set(distribution.causeAreas.flatMap((c) => c.organizations.map((o) => o.id))),
  ];

  // Create labels based on cause area names
  const labels = distribution.causeAreas.map((causeArea) => causeArea.name);

  // Create datasets, one per organization, with data aligned to cause areas
  const datasets = allOrganizations.map((orgId) => {
    const orgAbbreviation = allCauseAreas
      ?.find((c) => c.organizations.find((o) => o.id === orgId))
      ?.organizations.find((o) => o.id === orgId)?.abbreviation;
    return {
      label: orgAbbreviation ?? "Unknown",
      backgroundColor: "black", // You might want to assign unique colors or a color function
      data: distribution.causeAreas.map((causeArea) => {
        // Find the organization within the cause area, if it exists
        const org = causeArea.organizations.find((o) => o.id === orgId);

        if (org) {
          const scaledShare = scalePercentageShareByCauseArea(
            causeArea.percentageShare,
            org.percentageShare,
          );

          if (sum) {
            return scaledShare.div(100).times(sum).toNumber();
          }
          return scaledShare.toNumber();
        }

        return null;
      }),
    };
  });

  const data = { labels, datasets };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    skipNull: true,
    indexAxis: "y",
    layout: {
      padding: {
        right: 60,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "black",
        anchor: "end",
        align: "end",
        formatter(value, context) {
          return value > 0 ? context.dataset.label : "";
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (sum) {
              return new Intl.NumberFormat("no-NB", {
                style: "currency",
                currency: "NOK",
                maximumSignificantDigits: 3,
              }).format(context.raw as number);
            } else {
              return context.raw + " %";
            }
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            if (sum) {
              return new Intl.NumberFormat("no-NB", {
                style: "currency",
                currency: "NOK",
                maximumSignificantDigits: 3,
              }).format(value as number);
            } else {
              return value + " %";
            }
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <GraphWrapper>
      <Bar data={data} options={options} plugins={[ChartDataLabels]}></Bar>
    </GraphWrapper>
  );
};

const scalePercentageShareByCauseArea = (
  causeAreaPercentageShare: Decimal,
  orgPercentageShare: Decimal,
) => {
  return causeAreaPercentageShare.div(100).times(orgPercentageShare);
};
