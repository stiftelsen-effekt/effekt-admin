import React, { useEffect } from "react";
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
import { fetchAllCauseareasAction } from "../../../../store/causeareas/causeareas.action";
import { getDonorTaxUnitsAction } from "../../../../store/donors/donor-page.actions";

interface IProps {
  onSubmit(): void;
}

export const CreateDistribution: React.FunctionComponent<IProps> = ({ onSubmit }) => {
  const { getAccessTokenSilently } = useAuth0();
  const distributionInput = useSelector((state: AppState) => state.distributions.distributionInput);
  const valid = useSelector((state: AppState) => state.distributions.distributionInput.valid);
  const taxUnits = useSelector((state: AppState) => state.distributions.distributionInput.taxUnits);
  const allCauseAreas = useSelector((state: AppState) => state.causeareas.all);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!taxUnits) {
      const donorId = distributionInput.donor?.id;
      if (typeof donorId !== "undefined") {
        getAccessTokenSilently().then((token) => {
          dispatch(getDonorTaxUnitsAction.started({ token, id: donorId }));
        });
      }
    }
  }, [distributionInput.donor?.id, taxUnits, getAccessTokenSilently, dispatch]);

  useEffect(() => {
    if (!allCauseAreas) {
      dispatch(fetchAllCauseareasAction.started(undefined));
    }
  }, [dispatch, allCauseAreas]);

  if (!taxUnits) {
    if (distributionInput.donor && distributionInput.donor.id) {
      const donorId = distributionInput.donor.id;
      getAccessTokenSilently().then((token) =>
        dispatch(getDonorTaxUnitsAction.started({ token, id: donorId })),
      );
    }
  }

  if (!allCauseAreas) {
    return <span>Loading...</span>;
  }

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
        causeAreas={allCauseAreas}
        taxUnits={taxUnits ? taxUnits : []}
        distribution={distributionInput.distribution}
        onChange={(dist) => dispatch(setDistributionInputDistribution(dist))}
      />
      <EffektButton disabled={!valid.valid} onClick={submit}>
        Create <Plus size={16} />
      </EffektButton>
      {distributionInput.valid.reason}
    </CreateDistributionWrapper>
  );
};
