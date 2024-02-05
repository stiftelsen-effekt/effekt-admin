import React from "react";
import {
  ReportContent,
  ReportHeader,
  ReportWrapper,
} from "../../modules/shared/report/Report.style";
import { MonthlyDonationsGraph } from "./MonthlyDonationsGraph";

export const MonthlyDonationsReport: React.FC = () => {
  return (
    <ReportWrapper wide={true}>
      <ReportHeader>Donations</ReportHeader>
      <ReportContent>
        <MonthlyDonationsGraph />
      </ReportContent>
    </ReportWrapper>
  );
};
