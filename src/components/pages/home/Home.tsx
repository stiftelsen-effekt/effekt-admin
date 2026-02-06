import React from "react";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { AvtaleGiroReport } from "../../modules/avtalegiro/report/AvtalegiroReport";
import { HomeGrid } from "./Home.style";
import { VippsReport } from "../../modules/vipps/report/VippsReport";
import { LogsReport } from "../../modules/logs/report/LogsReport";
import { MonthlyDonationsReport } from "../graphing/MonthlyDonationsReport";
import { AvtaleGiroValidationTable } from "../../modules/avtalegiro/validationtable/AvtalegiroValidationTable";
import { TransactionCostsReport } from "../../modules/donations/reports/TransactionCostsReport";
import { APP_LOCALE } from "../../../config/config";

const localePanels = {
  NO: [<AvtaleGiroReport />, <AvtaleGiroValidationTable />, <VippsReport />],
  SV: [],
};

export const HomeComponent: React.FC = () => {
  const locale = APP_LOCALE;

  return (
    <Page>
      <MainHeader>Home</MainHeader>
      <HomeGrid>
        <MonthlyDonationsReport />
        {localePanels[locale].map((panel, index) => (
          <React.Fragment key={index}>{panel}</React.Fragment>
        ))}
        <LogsReport />
        <TransactionCostsReport />
      </HomeGrid>
    </Page>
  );
};
