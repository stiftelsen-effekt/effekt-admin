import React from "react";
import { EffektButton } from "../../../style/elements/button.style";
import { useSelector, useDispatch } from "react-redux";
import { IDistribution } from "../../../../models/types";
import { Plus } from "react-feather";
import { CreateDistributionWrapper } from "./CreateDistribution.style";
import { AppState } from "../../../../models/state";
import { DistributionInput } from "../../shared/distribution-input/DistributionInput";
import {
  createDistributionAction,
  setDistributionInputDistribution,
} from "../../../../store/distributions/distribution-input.actions";
import { useAuth0 } from "@auth0/auth0-react";

interface IProps {
  onSubmit(): void;
}

export const CreateDistribution: React.FunctionComponent<IProps> = ({ onSubmit }) => {
  const { getAccessTokenSilently } = useAuth0();
  const distributionInput = useSelector((state: AppState) => state.distributions.distributionInput);
  const valid = useSelector((state: AppState) => state.distributions.distributionInput.valid);
  const dispatch = useDispatch();

  const submit = () => {
    if (typeof distributionInput.distribution.donorId !== "undefined") {
      getAccessTokenSilently().then((token) =>
        dispatch(
          createDistributionAction.started({
            distribution: distributionInput.distribution as IDistribution,
            token,
          }),
        ),
      );
    }
    onSubmit();
  };

  return (
    <CreateDistributionWrapper>
      <h3>New distribution</h3>
      <DistributionInput
        distribution={distributionInput.distribution}
        onChange={(dist) => dispatch(setDistributionInputDistribution(dist))}
      />
      <EffektButton disabled={!valid} onClick={submit}>
        Create <Plus size={16} />
      </EffektButton>
    </CreateDistributionWrapper>
  );
};
