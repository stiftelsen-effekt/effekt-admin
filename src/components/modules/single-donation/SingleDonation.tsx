import React, { useState, useCallback } from "react";
import {
  SingleDonationWrapper,
  InputWrapper,
  ControlsWrapper,
  DistributionWrapper,
} from "./SingleDonation.style";

import { IPaymentMethod, IDonation, IOrganization, IDistribution } from "../../../models/types";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../models/state";
import {
  createDistribitionAndInsertDonationAction,
  ICreateDistributionParams,
  fetchPaymentMethodsAction,
  insertDonationAction,
  ICreateDonationParams,
} from "../../../store/single-donation/single-donation.actions";
import { Decimal } from "decimal.js";

import { DonationControls } from "./controls/DonationControls";
import { DonationInput } from "./input/DonationInput";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { DistributionInput } from "../shared/distribution-input/DistributionInput";
import { setDistributionInputDistribution } from "../../../store/distributions/distribution-input.actions";

interface IProps {
  onIgnore?(): void;
  organizations: Array<IOrganization>;
  suggestedValues?: Partial<IDonation>;
}

export const SingleDonation: React.FunctionComponent<IProps> = ({
  organizations,
  onIgnore,
  suggestedValues,
}) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [donationInput, setDonationInput] = useState<Partial<IDonation>>({});

  const paymentMethods = useSelector<AppState, Array<IPaymentMethod>>(
    (state: AppState) => state.singleDonation.paymentMethods,
  );
  if (paymentMethods.length === 0) dispatch(fetchPaymentMethodsAction.started(undefined));

  const distribution = useSelector(
    (state: AppState) => state.distributions.distributionInput.distribution,
  );

  const currentSelectedOwner = useSelector((state: AppState) => state.dataOwner.current);

  const getFilteredDistribution = (
    distribution: Partial<IDistribution>,
  ): Partial<IDistribution> => {
    return {
      ...distribution,
      shares: distribution.shares
        ? distribution.shares.filter((dist) => !dist.share.equals(new Decimal(0)))
        : [],
    };
  };

  const getDonation = (input: Partial<IDonation>): IDonation | null => {
    if (
      input.sum !== undefined &&
      input.paymentId !== undefined &&
      input.paymentExternalRef !== undefined &&
      input.timestamp !== undefined
    )
      return input as IDonation;
    else return null;
  };

  const submit = (receipt: boolean) => {
    const donation = getDonation(donationInput);

    if (!donation) return toast.error("Missing fields");

    getAccessTokenSilently().then((token) => {
      let donationParams: ICreateDonationParams = { ...donation, receipt: receipt, token };

      if (donationInput.KID) {
        dispatch(insertDonationAction.started(donationParams));
      } else {
        if (!distribution.donor) return toast.error("No donor selected");
        if (!distribution || !donationInput)
          return toast.error("Error initializing distribution or input");
        if (!currentSelectedOwner) return toast.error("Missing meta owner");

        const filteredDistribution = getFilteredDistribution(distribution);

        const distributionParams: ICreateDistributionParams = {
          distribution: filteredDistribution,
        };

        dispatch(
          createDistribitionAndInsertDonationAction.started({
            donation: donationParams,
            distribution: distributionParams,
            token,
          }),
        );
      }
    });
  };

  const onDonationInputChange = useCallback(
    (donationInput: Partial<IDonation>) => setDonationInput(donationInput),
    [setDonationInput],
  );

  return (
    <SingleDonationWrapper>
      <InputWrapper>
        <DonationInput
          suggestedValues={suggestedValues}
          paymentMethods={paymentMethods}
          onChange={onDonationInputChange}
        ></DonationInput>
      </InputWrapper>
      <DistributionWrapper>
        {!donationInput.KID && (
          <DistributionInput
            distribution={distribution}
            onChange={(distribution) => dispatch(setDistributionInputDistribution(distribution))}
          ></DistributionInput>
        )}
        {donationInput.KID && <span>Using KID {donationInput.KID}</span>}
      </DistributionWrapper>
      <ControlsWrapper>
        <DonationControls onInsert={submit} onIgnore={onIgnore}></DonationControls>
      </ControlsWrapper>
    </SingleDonationWrapper>
  );
};
