/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Page } from "../../../style/elements/page.style";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { IAvtaleGiro } from "../../../../models/types";
import { DistributionGraphComponent } from "../../../modules/distribution/Graph";
import {
  ResourceHeader,
  ResourceSubHeader,
  SubHeader,
} from "../../../style/elements/headers.style";
import { fetchAvtaleGiroAction } from "../../../../store/avtalegiro/avtalegiro.actions";
import { HorizontalPanel } from "../../donations/Donation.style";
import { AvtaleGiroKeyInfo } from "./AvtaleGiroKeyInfo";
import { useAuth0 } from "@auth0/auth0-react";
import { DonationsList } from "../../../modules/donations/list/DonationsList";
import { EffektButton } from "../../../style/elements/button.style";
import { FileText, PieChart, User } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { EditAvtaleGiroAgreement } from "../../../modules/avtalegiro/editagreement/EditAvtalegiroAgreement";
import { EffektButtonsWrapper } from "../../../style/elements/buttons-wrapper/EffektButtonsWrapper.style";

export const AvtaleGiroAgreement: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams<"id">();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const avtaleGiro: IAvtaleGiro | undefined = useSelector(
    (state: AppState) => state.avtaleGiroAgreements.currentAgreement,
  );

  const [editMenuVisible, setEditMenuVisible] = useState<boolean>(false);
  const avtaleGiroID = id;

  useEffect(() => {
    if (!avtaleGiroID) return;
    getAccessTokenSilently().then((token) =>
      dispatch(fetchAvtaleGiroAction.started({ id: avtaleGiroID, token })),
    );
  }, [avtaleGiroID, dispatch, getAccessTokenSilently]);

  if (!avtaleGiroID) {
    return <Page>Loading...</Page>;
  }

  if (avtaleGiro) {
    return (
      <Page>
        <ResourceHeader hasSubHeader={true}>AvtaleGiro {avtaleGiroID}</ResourceHeader>
        <ResourceSubHeader>{avtaleGiro.full_name}</ResourceSubHeader>

        <EffektButtonsWrapper>
          <EffektButton
            onClick={() =>
              avtaleGiro.distribution.donorId &&
              navigate(`/donors/${avtaleGiro.distribution.donorId}`)
            }
          >
            <User size={16} />
            Donor
          </EffektButton>

          <EffektButton
            onClick={() => {
              navigate("/distributions/" + avtaleGiro.KID);
            }}
          >
            <PieChart size={16} />
            Distribution
          </EffektButton>
          <EffektButton onClick={() => navigate("/avtalegiro")}>
            <FileText size={16} /> All agreements
          </EffektButton>
        </EffektButtonsWrapper>

        <SubHeader>Keyinfo</SubHeader>
        <HorizontalPanel gap={120}>
          <AvtaleGiroKeyInfo agreement={avtaleGiro}></AvtaleGiroKeyInfo>

          <div style={{ width: "400px", height: "380px" }}>
            <DistributionGraphComponent
              distribution={avtaleGiro.distribution}
            ></DistributionGraphComponent>
          </div>
        </HorizontalPanel>

        <EffektButton onClick={() => setEditMenuVisible(!editMenuVisible)}>
          {editMenuVisible ? "Cancel editing" : "Edit agreement"}
        </EffektButton>
        {editMenuVisible && (
          <EditAvtaleGiroAgreement initial={avtaleGiro}></EditAvtaleGiroAgreement>
        )}

        <SubHeader>Payments</SubHeader>
        <DonationsList
          donations={avtaleGiro.affiliatedDonations}
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
