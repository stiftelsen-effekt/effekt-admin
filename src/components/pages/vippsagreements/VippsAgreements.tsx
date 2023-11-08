import React from "react";

import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { VippsAgreementList } from "../../modules/vipps/agreementlist/VippsAgreementList";
import { AgreementListWrapper } from "../../modules/vipps/agreementlist/VippsAgreementList.style";
import { VippsAgreementFilter } from "../../modules/vipps/agreementlist/VippsAgreementFilter";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../models/state";

export const VippsAgreementsPageComponent: React.FunctionComponent = () => {
  const agreements = useSelector((state: AppState) => state.vippsAgreements.agreements);

  return (
    <Page>
      <MainHeader>Vipps agreements</MainHeader>
      <AgreementListWrapper>
        <Link to="/vipps/agreements/charges">See all charges</Link>
        <VippsAgreementList agreements={agreements} manual />
      </AgreementListWrapper>
      <VippsAgreementFilter />
    </Page>
  );
};
