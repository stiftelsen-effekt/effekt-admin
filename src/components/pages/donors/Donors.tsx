import React from "react";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { DonorsList } from "../../modules/donors/list/DonorsList";
import { DonorsFilterComponent } from "../../modules/donors/list/filters/DonorsFilter";
import { useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { DonationListWrapper } from "../../modules/donations/list/DonationsList.style";

export const DonorsPageComponent: React.FunctionComponent = () => {
  const donors = useSelector((state: AppState) => state.donors.donors);

  console.log(donors);

  return (
    <Page>
      <MainHeader>Donors</MainHeader>
      <DonorsFilterComponent></DonorsFilterComponent>
      <DonationListWrapper>
        <DonorsList donors={donors} manual={true} />
      </DonationListWrapper>
    </Page>
  );
};
