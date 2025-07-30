import React from "react";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { AutoGiroList } from "../../modules/autogiro/agreementlist/AutoGiroList";
import { AutoGiroFilter } from "../../modules/autogiro/agreementlist/AutoGiroFilter";
import { AppState } from "../../../models/state";
import { useSelector } from "react-redux";
import { AutoGiroListWrapper } from "../../modules/autogiro/agreementlist/AutoGiroList.style";
import { EffektButton } from "../../style/elements/button.style";
import { useHistory } from "react-router";
import { ArrowRight } from "react-feather";

export const AutoGiroPage: React.FunctionComponent = () => {
  const allAgreements = useSelector((state: AppState) => state.autoGiroAgreements.agreements);
  const history = useHistory();

  return (
    <Page>
      <MainHeader>AutoGiro</MainHeader>
      <EffektButton onClick={() => history.push("/autogiro/mandates/")}>
        Mandates <ArrowRight size={18} style={{ marginLeft: "5px" }} />
      </EffektButton>
      <br />
      <br />
      <AutoGiroListWrapper>
        <AutoGiroList agreements={allAgreements} manual />
      </AutoGiroListWrapper>
      <AutoGiroFilter />
    </Page>
  );
};
