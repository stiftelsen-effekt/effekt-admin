import React, { useState, useEffect } from "react";
import { FundraisersList } from "../../modules/fundraisers/list/FundraisersList";
import { FundraisersFilterComponent } from "../../modules/fundraisers/list/filters/FundraisersFilter";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../models/state";
import { FundraisersListWrapper } from "../../modules/fundraisers/list/FundraisersList.style";
import { EffektButton } from "../../style/elements/button.style";
import DonorSearchDialog from "../../modules/donors/selection/DonorSelectionDialog";
import { createFundraiserAction } from "../../../store/fundraisers/fundraisers-list.actions";
import { useAuth0 } from "@auth0/auth0-react";
import { showDonorSelectionComponent } from "../../../store/donors/donor-selection.actions";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const FundraisersPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const fundraisers = useSelector((state: AppState) => state.fundraisers.fundraisers);
  const selectedDonor = useSelector((state: AppState) => state.donorSelector.selectedDonor);
  const donorSelectorVisible = useSelector((state: AppState) => state.donorSelector.visible);
  const [waitingForDonor, setWaitingForDonor] = useState(false);

  useEffect(() => {
    if (waitingForDonor && selectedDonor && !donorSelectorVisible) {
      // Create fundraiser with selected donor
      getAccessTokenSilently().then((token) => {
        dispatch(createFundraiserAction.started({ token, donorId: selectedDonor.id }));
      });
      setWaitingForDonor(false);
    }
  }, [selectedDonor, donorSelectorVisible, waitingForDonor, dispatch, getAccessTokenSilently]);

  const handleAddFundraiser = () => {
    setWaitingForDonor(true);
    dispatch(showDonorSelectionComponent());
  };

  return (
    <Page>
      <HeaderContainer>
        <MainHeader>Fundraisers</MainHeader>
      </HeaderContainer>
      <EffektButton onClick={handleAddFundraiser}>Add fundraiser</EffektButton>
      <FundraisersFilterComponent />
      <FundraisersListWrapper>
        <FundraisersList fundraisers={fundraisers} manual={true} />
      </FundraisersListWrapper>
      <DonorSearchDialog />
    </Page>
  );
};
