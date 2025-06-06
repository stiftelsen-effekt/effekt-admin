import React, { useEffect, useState } from "react";
import { RouteComponentProps, NavLink, useHistory } from "react-router-dom";
import { Page } from "../../style/elements/page.style";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { IVippsAgreement } from "../../../models/types";
import { ResourceHeader, ResourceSubHeader, SubHeader } from "../../style/elements/headers.style";
import { HorizontalPanel } from "../donations/Donation.style";
import { fetchVippsAgreementAction } from "../../../store/vipps/vipps.actions";
import { AgreementKeyInfoComponent } from "../../modules/vipps/singleagreement/AgreementKeyInfo";
import { DistributionGraphComponent } from "../../modules/distribution/Graph";
import { useAuth0 } from "@auth0/auth0-react";
import { EffektButtonsWrapper } from "../../style/elements/buttons-wrapper/EffektButtonsWrapper.style";
import { EffektButton } from "../../style/elements/button.style";
import { FileText, PieChart, User } from "react-feather";
import { EditVippsAgreement } from "../../modules/vipps/editagreement/EditVippsAgreement";

interface IParams {
  id: string;
}

export const VippsAgreementPageComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({
  match,
}: RouteComponentProps<IParams>) => {
  const agreementID = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  const agreement: IVippsAgreement | undefined = useSelector(
    (state: AppState) => state.vippsAgreements.currentAgreement,
  );

  const [editMenuVisible, setEditMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchVippsAgreementAction.started({ id: agreementID, token })),
    );
  }, [agreementID, dispatch, getAccessTokenSilently]);

  if (agreement && !agreement.id) {
    return (
      <Page>
        <ResourceHeader hasSubHeader={true}>Agreement {agreementID} not found</ResourceHeader>

        <NavLink to={`/vipps/agreements`}>See all agreements</NavLink>
        <br></br>
      </Page>
    );
  }
  if (agreement && agreement.id) {
    return (
      <Page>
        <ResourceHeader hasSubHeader={true}>Agreement {agreementID}</ResourceHeader>
        <ResourceSubHeader>Donor ID {agreement.donorID}</ResourceSubHeader>

        <EffektButtonsWrapper>
          <EffektButton
            onClick={() =>
              agreement.distribution.donorId &&
              history.push(`/donors/${agreement.distribution.donorId}`)
            }
          >
            <User size={16} />
            Donor
          </EffektButton>

          <EffektButton
            onClick={() => {
              history.push("/distributions/" + agreement.KID);
            }}
          >
            <PieChart size={16} />
            Distribution
          </EffektButton>
          <EffektButton onClick={() => history.push("/vipps/agreements")}>
            <FileText size={16} /> All agreements
          </EffektButton>
        </EffektButtonsWrapper>

        <SubHeader>Keyinfo</SubHeader>
        <HorizontalPanel>
          <AgreementKeyInfoComponent agreement={agreement} />
          <div style={{ width: "400px", height: "380px" }}>
            <DistributionGraphComponent
              distribution={agreement.distribution}
            ></DistributionGraphComponent>
          </div>
        </HorizontalPanel>

        <EffektButton onClick={() => setEditMenuVisible(!editMenuVisible)}>
          {editMenuVisible ? "Cancel editing" : "Edit agreement"}
        </EffektButton>
        {editMenuVisible && <EditVippsAgreement initial={agreement}></EditVippsAgreement>}
      </Page>
    );
  } else {
    return <Page>Loading agreement {agreementID}</Page>;
  }
};
