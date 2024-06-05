import React, { useState, useCallback, useEffect } from "react";
import {
  SingleDonationWrapper,
  InputWrapper,
  ControlsWrapper,
  DistributionWrapper,
} from "./SingleDonation.style";

import { IPaymentMethod, IDonation, IDistribution, ITaxUnit } from "../../../models/types";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../models/state";
import {
  createDistribitionAndInsertDonationAction,
  ICreateDistributionParams,
  fetchPaymentMethodsAction,
  insertDonationAction,
  IInsertDonationParams,
} from "../../../store/single-donation/single-donation.actions";

import { DonationControls } from "./controls/DonationControls";
import { DonationInput } from "./input/DonationInput";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { DistributionInput } from "../shared/distribution-input/DistributionInput";
import { setDistributionInputDistribution } from "../../../store/distributions/distribution-input.actions";
import { fetchAllCauseareasAction } from "../../../store/causeareas/causeareas.action";
import { getDonorTaxUnitsAction } from "../../../store/donors/donor-page.actions";

interface IProps {
  onIgnore?(): void;
  suggestedValues?: Partial<IDonation>;
}

export const SingleDonation: React.FunctionComponent<IProps> = ({ onIgnore, suggestedValues }) => {
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

  const selectedDonor = useSelector((state: AppState) => state.donorSelector.selectedDonor);
  const currentSelectedOwner = useSelector((state: AppState) => state.dataOwner.current);
  const taxUnits = useSelector((state: AppState) => state.distributions.distributionInput.taxUnits);
  const allCauseAreas = useSelector((state: AppState) => state.causeareas.all);

  useEffect(() => {
    if (!taxUnits) {
      const donorId = distribution.donorId || selectedDonor?.id;
      if (typeof donorId !== "undefined") {
        getAccessTokenSilently().then((token) => {
          dispatch(getDonorTaxUnitsAction.started({ token, id: donorId }));
        });
      }
    }
  }, [distribution.donorId, selectedDonor, taxUnits, getAccessTokenSilently, dispatch]);

  console.log(distribution);

  useEffect(() => {
    if (!allCauseAreas) {
      dispatch(fetchAllCauseareasAction.started(undefined));
    }
  }, [dispatch, allCauseAreas]);

  const getFilteredDistribution = (
    distribution: Partial<IDistribution>,
  ): Partial<IDistribution> => {
    return {
      ...distribution,
      causeAreas: distribution.causeAreas
        ? distribution.causeAreas
            .filter((c) => !c.percentageShare.eq(0))
            .map((causeArea) => {
              return {
                ...causeArea,
                organizations: causeArea.organizations
                  ? causeArea.organizations.filter((org) => !org.percentageShare.eq(0))
                  : [],
              };
            })
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
      let createDonationParams = { ...donation, receipt: receipt };
      let donationParams: IInsertDonationParams = { donation: createDonationParams, token };

      if (donationInput.KID) {
        dispatch(insertDonationAction.started(donationParams));
      } else {
        if (!distribution.donorId) return toast.error("No donor selected");
        if (!distribution || !donationInput)
          return toast.error("Error initializing distribution or input");
        if (!currentSelectedOwner) return toast.error("Missing meta owner");

        const filteredDistribution = getFilteredDistribution(distribution);

        const distributionParams: ICreateDistributionParams = {
          distribution: filteredDistribution,
        };

        dispatch(
          createDistribitionAndInsertDonationAction.started({
            donation: createDonationParams,
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

  if (selectedDonor && !taxUnits) {
    return <span>Loading...</span>;
  }

  if (!allCauseAreas) {
    return <span>Loading...</span>;
  }

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
            causeAreas={allCauseAreas}
            taxUnits={selectedDonor ? (taxUnits as ITaxUnit[]) : []}
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
