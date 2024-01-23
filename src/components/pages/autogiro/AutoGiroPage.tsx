import React from "react";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { AutoGiroList } from "../../modules/autogiro/agreementlist/AutoGiroList";
import { AutoGiroFilter } from "../../modules/autogiro/agreementlist/AutoGiroFilter";
import { AppState } from "../../../models/state";
import { useSelector } from "react-redux";
import { AutoGiroListWrapper } from "../../modules/autogiro/agreementlist/AutoGiroList.style";

export const AutoGiroPage: React.FunctionComponent = () => {
  const allAgreements = useSelector((state: AppState) => state.autoGiroAgreements.agreements);

  return (
    <Page>
      <MainHeader>AutoGiro</MainHeader>
      <AutoGiroListWrapper>
        <AutoGiroList agreements={allAgreements} manual />
      </AutoGiroListWrapper>
      <AutoGiroFilter />
    </Page>
  );
};
