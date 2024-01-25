/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Page } from "../../../style/elements/page.style";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { IAutoGiro } from "../../../../models/types";
import { DistributionGraphComponent } from "../../../modules/distribution/Graph";
import {
  ResourceHeader,
  ResourceSubHeader,
  SubHeader,
} from "../../../style/elements/headers.style";
import { fetchAutoGiroAction } from "../../../../store/autogiro/autogiro.actions";
import { HorizontalPanel } from "../../donations/Donation.style";
import { AutoGiroKeyInfo } from "./AutoGiroAgreementKeyInfo";
import { useAuth0 } from "@auth0/auth0-react";
import { DonationsList } from "../../../modules/donations/list/DonationsList";
import { EffektButton } from "../../../style/elements/button.style";
import { FileText, PieChart, User } from "react-feather";
import { useHistory } from "react-router";
import { EditAutoGiroAgreement } from "../../../modules/autogiro/editagreement/EditAutoGiroAgreement";
import { EffektButtonsWrapper } from "../../../style/elements/buttons-wrapper/EffektButtonsWrapper.style";

interface IParams {
  id: string;
}

export const AutoGiroAgreement: React.FunctionComponent<RouteComponentProps<IParams>> = ({
  match,
}: RouteComponentProps<IParams>) => {
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const autoGiro: IAutoGiro | undefined = useSelector(
    (state: AppState) => state.autoGiroAgreements.currentAgreement,
  );

  const [editMenuVisible, setEditMenuVisible] = useState<boolean>(false);
  const autoGiroID = match.params.id;

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchAutoGiroAction.started({ id: autoGiroID, token })),
    );
  }, [autoGiroID, dispatch, getAccessTokenSilently]);

  if (autoGiro) {
    return (
      <Page>
        <ResourceHeader hasSubHeader={true}>AutoGiro {autoGiroID}</ResourceHeader>
        <ResourceSubHeader>{autoGiro.full_name}</ResourceSubHeader>

        <EffektButtonsWrapper>
          <EffektButton
            onClick={() =>
              autoGiro.distribution.donor &&
              history.push(`/donors/${autoGiro.distribution.donor.id}`)
            }
          >
            <User size={16} />
            Donor
          </EffektButton>

          <EffektButton
            onClick={() => {
              history.push("/distributions/" + autoGiro.KID);
            }}
          >
            <PieChart size={16} />
            Distribution
          </EffektButton>
          <EffektButton onClick={() => history.push("/autogiro")}>
            <FileText size={16} /> All agreements
          </EffektButton>
        </EffektButtonsWrapper>

        <SubHeader>Keyinfo</SubHeader>
        <HorizontalPanel gap={120}>
          <AutoGiroKeyInfo agreement={autoGiro}></AutoGiroKeyInfo>

          <div style={{ width: "400px", height: "380px" }}>
            <DistributionGraphComponent
              distribution={autoGiro.distribution.causeAreas.flatMap(
                (causeArea) => causeArea.organizations,
              )}
            ></DistributionGraphComponent>
          </div>
        </HorizontalPanel>

        <EffektButton onClick={() => setEditMenuVisible(!editMenuVisible)}>
          {editMenuVisible ? "Cancel editing" : "Edit agreement"}
        </EffektButton>
        {editMenuVisible && <EditAutoGiroAgreement initial={autoGiro}></EditAutoGiroAgreement>}

        <SubHeader>Payments</SubHeader>
        <DonationsList
          donations={autoGiro.affiliatedDonations}
          manual={false}
          defaultPageSize={10}
          hideDonorName={true}
          hideKID={true}
        />
      </Page>
    );
  } else {
    return <Page>Loading...</Page>;
  }
};
