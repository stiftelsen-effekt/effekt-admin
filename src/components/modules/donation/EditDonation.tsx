import React, { useCallback, useEffect, useState } from "react";
import { IDonation } from "../../../models/types";
import { EffektInput } from "../../style/elements/input.style";
import {
  EditDonationKeyInfo,
  EditDonationKeyInfoInputWrapper,
  EditDonationWrapper,
} from "./EditDonation.style";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { EffektButton } from "../../style/elements/button.style";
import { useAuth0 } from "@auth0/auth0-react";
import { updateDonationAction } from "../../../store/donations/donation.actions";
import { EffektDatePicker } from "../../style/elements/datepicker/datepicker.style";
import { EffektSelect } from "../../style/elements/select.style";
import Select from "react-select";
import { fetchOwnersAction } from "../../../store/owners/owners.actions";
import { DistributionInput } from "../shared/distribution-input/DistributionInput";
import { getDonorTaxUnitsAction } from "../../../store/donors/donor-page.actions";
import { fetchAllCauseareasAction } from "../../../store/causeareas/causeareas.action";

export const EditDonation: React.FC<{ inputDonation: IDonation }> = ({ inputDonation }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const editSaving = useSelector((state: AppState) => state.singleDonation.editSaving);
  const dataOwners = useSelector((state: AppState) => state.dataOwner.owners);

  const taxUnits = useSelector((state: AppState) => state.distributions.distributionInput.taxUnits);
  const allCauseAreas = useSelector((state: AppState) => state.causeareas.all);

  const [donation, setDonation] = useState<IDonation & { id: number }>(
    JSON.parse(JSON.stringify(inputDonation)),
  );
  useEffect(() => {
    setDonation(JSON.parse(JSON.stringify(inputDonation)));
  }, [inputDonation]);

  const paymentMethods = useSelector((state: AppState) => state.singleDonation.paymentMethods);

  const updateDonation = useCallback(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        updateDonationAction.started({
          donation: donation,
          token: token,
        }),
      );
    });
  }, [dispatch, getAccessTokenSilently, donation]);

  useEffect(() => {
    if (!taxUnits) {
      const donorId = donation.donorId;
      if (typeof donorId !== "undefined") {
        getAccessTokenSilently().then((token) => {
          dispatch(getDonorTaxUnitsAction.started({ token, id: donorId }));
        });
      }
    }
  }, [donation.donorId, taxUnits, getAccessTokenSilently, dispatch]);

  useEffect(() => {
    if (!dataOwners) {
      dispatch(fetchOwnersAction.started(undefined));
    }
  }, [dispatch, dataOwners]);

  useEffect(() => {
    if (!allCauseAreas) {
      dispatch(fetchAllCauseareasAction.started(undefined));
    }
  }, [dispatch, allCauseAreas]);

  if (!dataOwners) {
    return <span>Loading...</span>;
  }

  if (!taxUnits) {
    return <span>Loading...</span>;
  }

  if (!allCauseAreas) {
    return <span>Loading...</span>;
  }

  const dataOwnerOptions = dataOwners.map((owner) => ({
    label: owner.name,
    value: owner.id,
  }));

  const mapOwnerToOption = (ownerId: number) => {
    return dataOwnerOptions.find((owner) => owner.value === ownerId);
  };

  return (
    <EditDonationWrapper>
      <EditDonationKeyInfo>
        <EditDonationKeyInfoInputWrapper>
          <strong>Sum:</strong>
          <EffektInput
            value={donation.sum}
            onChange={(e) => {
              if (Number.isNaN(e.currentTarget.value)) {
                return;
              }
              if (parseFloat(e.currentTarget.value) < 0) {
                return;
              }
              setDonation({ ...donation, sum: parseFloat(e.target.value) });
            }}
          ></EffektInput>
        </EditDonationKeyInfoInputWrapper>
        <EditDonationKeyInfoInputWrapper>
          <strong>Timestamp:</strong>
          <EffektDatePicker
            selected={new Date(donation.timestamp)}
            dateFormat="dd.MM.yyyy"
            onChange={(date) => setDonation({ ...donation, timestamp: date ?? new Date() })}
          ></EffektDatePicker>
        </EditDonationKeyInfoInputWrapper>
        <EditDonationKeyInfoInputWrapper>
          <strong>External Reference:</strong>
          <EffektInput
            value={donation.paymentExternalRef}
            onChange={(e) => setDonation({ ...donation, paymentExternalRef: e.target.value })}
          ></EffektInput>
        </EditDonationKeyInfoInputWrapper>
        <EditDonationKeyInfoInputWrapper>
          <strong>Data owner:</strong>
          <Select
            options={dataOwnerOptions}
            value={mapOwnerToOption(donation.metaOwnerId ?? 1)}
            onChange={(selected: any) => {
              let selectedOwner = dataOwners.find((owner) => selected.value === owner.id);
              if (selectedOwner) setDonation({ ...donation, metaOwnerId: selectedOwner.id });
            }}
          ></Select>
        </EditDonationKeyInfoInputWrapper>
        <EditDonationKeyInfoInputWrapper>
          <strong>Payment method:</strong>
          <EffektSelect
            value={donation.paymentId}
            onChange={(e) => setDonation({ ...donation, paymentId: parseInt(e.target.value) })}
          >
            {paymentMethods.map((pm) => (
              <option key={pm.id} value={pm.id}>
                {pm.name}
              </option>
            ))}
          </EffektSelect>
        </EditDonationKeyInfoInputWrapper>

        <EffektButton onClick={updateDonation}>{editSaving ? "Saving..." : "Save"}</EffektButton>
      </EditDonationKeyInfo>
      {donation.distribution && (
        <DistributionInput
          taxUnits={taxUnits}
          causeAreas={allCauseAreas}
          distribution={donation.distribution}
          onChange={(distribution) => {
            if (donation.distribution) {
              console.log("Setting distribution", distribution);
              setDonation({
                ...donation,
                distribution: {
                  ...donation.distribution,
                  ...distribution,
                },
              });
            }
          }}
        ></DistributionInput>
      )}
    </EditDonationWrapper>
  );
};
