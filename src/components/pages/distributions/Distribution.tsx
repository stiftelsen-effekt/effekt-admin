/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
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
import { useHistory } from "react-router";
import { EffektButtonsWrapper } from "../../style/elements/buttons-wrapper/EffektButtonsWrapper.style";
import { useAuth0 } from "@auth0/auth0-react";

interface IParams {
  id: string;
}

export const DistributionComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({
  match,
}: RouteComponentProps<IParams>) => {
  const current: CurrentDistributionState | undefined = useSelector(
    (state: AppState) => state.distributions.current,
  );
  const KID = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchDistributionAction.started({ kid: KID, token })),
    );
  }, [KID, dispatch, getAccessTokenSilently]);

  if (current && current.distribution && current.distribution.causeAreas) {
    return (
      <Page>
        <ResourceHeader hasSubHeader={true}>Distribution {KID}</ResourceHeader>
        <ResourceSubHeader>{current.distribution.donor.name}</ResourceSubHeader>

        <EffektButtonsWrapper>
          <EffektButton
            onClick={() => {
              history.push("/donors/" + current.distribution?.donor.id);
            }}
          >
            <User size={16} />
            Donor
          </EffektButton>
          <EffektButton
            onClick={() => {
              history.push("/distributions");
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
              distribution={current.distribution.causeAreas.flatMap(
                (causeArea) => causeArea.organizations,
              )}
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
