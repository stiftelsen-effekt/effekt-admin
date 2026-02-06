import React from "react";

import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { VippsAgreementList } from "../../modules/vipps/agreementlist/VippsAgreementList";
import { AgreementListWrapper } from "../../modules/vipps/agreementlist/VippsAgreementList.style";
import { VippsAgreementFilter } from "../../modules/vipps/agreementlist/VippsAgreementFilter";
import { useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { useNavigate } from "react-router-dom";
import { EffektButton } from "../../style/elements/button.style";
import { ArrowRight } from "react-feather";

export const VippsAgreementsPageComponent: React.FunctionComponent = () => {
  const agreements = useSelector((state: AppState) => state.vippsAgreements.agreements);
  const navigate = useNavigate();

  return (
    <Page>
      <MainHeader>Vipps agreements</MainHeader>
      <AgreementListWrapper>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <EffektButton onClick={() => navigate("/vipps/agreements/charges")}>
            Agreement charges <ArrowRight size={18} style={{ marginLeft: "5px" }} />
          </EffektButton>
          <EffektButton onClick={() => navigate("/vipps/matchingrules")}>
            Matching rules <ArrowRight size={18} style={{ marginLeft: "5px" }} />
          </EffektButton>
        </div>
        <br />
        <br />
        <VippsAgreementList agreements={agreements} manual />
      </AgreementListWrapper>
      <VippsAgreementFilter />
    </Page>
  );
};
