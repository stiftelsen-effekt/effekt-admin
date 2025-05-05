import React from "react";
import { FundraisersList } from "../../modules/fundraisers/list/FundraisersList";
import { FundraisersFilterComponent } from "../../modules/fundraisers/list/filters/FundraisersFilter";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { FundraisersListWrapper } from "../../modules/fundraisers/list/FundraisersList.style";

export const FundraisersPage: React.FunctionComponent = () => {
  const fundraisers = useSelector((state: AppState) => state.fundraisers.fundraisers);

  return (
    <Page>
      <MainHeader>Fundraisers</MainHeader>
      <FundraisersFilterComponent />
      <FundraisersListWrapper>
        <FundraisersList fundraisers={fundraisers} manual={true} />
      </FundraisersListWrapper>
    </Page>
  );
};
