import React from "react";

import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { VippsAgreementList } from "../../modules/vipps/agreementlist/VippsAgreementList";
import { AgreementListWrapper } from "../../modules/vipps/agreementlist/VippsAgreementList.style";
import { VippsAgreementFilter } from "../../modules/vipps/agreementlist/VippsAgreementFilter";
import { useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { useHistory } from "react-router";
import { EffektButton } from "../../style/elements/button.style";

export const VippsAgreementsPageComponent: React.FunctionComponent = () => {
  const agreements = useSelector((state: AppState) => state.vippsAgreements.agreements);
  const history = useHistory();

  return (
    <Page>
      <MainHeader>Vipps agreements</MainHeader>
      <AgreementListWrapper>
        <EffektButton onClick={() => history.push("/vipps/agreements/charges")}>
          See all charges
        </EffektButton>
        <br />
        <br />
        <VippsAgreementList agreements={agreements} manual />
      </AgreementListWrapper>
      <VippsAgreementFilter />
    </Page>
  );
};
