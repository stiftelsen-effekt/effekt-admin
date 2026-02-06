/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, CurrentDistributionState } from "../../../models/state";
import { DistributionGraphComponent } from "../../modules/distribution/Graph";
import { ResourceHeader, ResourceSubHeader, SubHeader } from "../../style/elements/headers.style";
import { Page } from "../../style/elements/page.style";
import { HorizontalPanel } from "../donations/Donation.style";
import { fetchDistributionAction } from "../../../store/distributions/distribution.actions";
import { DistributionKeyInfo } from "./DistributionKeyInfo";
import { DonationsList } from "../../modules/donations/list/DonationsList";
import { EffektButton } from "../../style/elements/button.style";
import { PieChart, User } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { EffektButtonsWrapper } from "../../style/elements/buttons-wrapper/EffektButtonsWrapper.style";
import { useAuth0 } from "@auth0/auth0-react";

export const DistributionComponent: React.FunctionComponent = () => {
  const { id } = useParams<"id">();
  const current: CurrentDistributionState | undefined = useSelector(
    (state: AppState) => state.distributions.current,
  );
  const KID = id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!KID) return;
    getAccessTokenSilently().then((token) =>
      dispatch(fetchDistributionAction.started({ kid: KID, token })),
    );
  }, [KID, dispatch, getAccessTokenSilently]);

  if (!KID) {
    return <Page>Loading...</Page>;
  }

  if (current && current.distribution && current.distribution.causeAreas) {
    return (
      <Page>
        <ResourceHeader hasSubHeader={true}>Distribution {KID}</ResourceHeader>
        <ResourceSubHeader>{current.distribution.donorId}</ResourceSubHeader>

        <EffektButtonsWrapper>
          <EffektButton
            onClick={() => {
              navigate("/donors/" + current.distribution?.donorId);
            }}
          >
            <User size={16} />
            Donor
          </EffektButton>
          <EffektButton
            onClick={() => {
              navigate("/distributions");
            }}
          >
            <PieChart size={16} />
            All Distributions
          </EffektButton>
        </EffektButtonsWrapper>

        <SubHeader>Key info</SubHeader>
        <HorizontalPanel gap={120}>
          <DistributionKeyInfo distribution={current}></DistributionKeyInfo>

          <div style={{ width: "400px", height: "380px" }}>
            <DistributionGraphComponent
              distribution={current.distribution}
            ></DistributionGraphComponent>
          </div>
        </HorizontalPanel>
        <SubHeader>Donations</SubHeader>
        <DonationsList
          donations={current.affiliatedDonations}
          hideDonorName={true}
          hideKID={true}
          defaultPageSize={10}
        />
      </Page>
    );
  } else {
    return <Page>Loading...</Page>;
  }
};
