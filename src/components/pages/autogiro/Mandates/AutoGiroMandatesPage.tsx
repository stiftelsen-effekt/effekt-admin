import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { AutoGiroMandateListWrapper } from "../../../modules/autogiro/medgivandelist/AutoGiroMandateList.style";
import { AutoGiroMandateList } from "../../../modules/autogiro/medgivandelist/AutoGiroMandateList";
import { MainHeader } from "../../../style/elements/headers.style";
import { Page } from "../../../style/elements/page.style";
import { AutoGiroMandateFilter } from "../../../modules/autogiro/medgivandelist/AutoGiroMandateFilter";
import { useHistory } from "react-router";
import { EffektButton } from "../../../style/elements/button.style";
import { ArrowLeft } from "react-feather";

export const AutoGiroMandatesPage: React.FunctionComponent = () => {
  const allMandates = useSelector((state: AppState) => state.autoGiroMandates.mandates);
  const history = useHistory();

  return (
    <Page>
      <MainHeader>AutoGiro Mandates</MainHeader>
      <EffektButton onClick={() => history.push("/autogiro/")}>
        <ArrowLeft size={18} style={{ marginRight: "5px" }} />
        Back to Agreements
      </EffektButton>
      <br />
      <br />
      <AutoGiroMandateListWrapper>
        <AutoGiroMandateList mandates={allMandates} manual />
      </AutoGiroMandateListWrapper>
      <AutoGiroMandateFilter />
    </Page>
  );
};
