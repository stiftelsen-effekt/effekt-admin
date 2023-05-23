/* eslint-disable no-restricted-globals */
import { useAuth0 } from "@auth0/auth0-react";
import Decimal from "decimal.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Validator from "validator";
import { AppState } from "../../../../models/state";
import {
  IDistribution,
  IDistributionShare,
  IOrganization,
  ITaxUnit,
} from "../../../../models/types";
import {
  getDonorAction,
  getDonorTaxUnitsAction,
} from "../../../../store/donors/donor-page.actions";
import { showDonorSelectionComponent } from "../../../../store/donors/donor-selection.actions";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektCheck } from "../../../style/elements/effekt-check/effekt-check.component";
import { EffektInput } from "../../../style/elements/input.style";
import { DistributionSharesInput } from "./DistributionSharesInput";

const noTaxUnit = { label: "No tax unit", value: undefined };
const mapTaxUnitToSelectOption = (taxUnit?: ITaxUnit) =>
  taxUnit
    ? {
        label: `${taxUnit.name} (${taxUnit.ssn})`,
        value: taxUnit.id,
      }
    : noTaxUnit;

export const DistributionInput: React.FC<{
  distribution: Partial<IDistribution>;
  onChange: (distribution: Partial<IDistribution>) => void;
}> = ({ distribution, onChange }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const taxUnits = useSelector((state: AppState) => state.distributions.distributionInput.taxUnits);
  const organizations = useSelector((state: AppState) => state.organizations.active);
  const selectedDonor = useSelector((state: AppState) => state.donorSelector.selectedDonor);
  const donorName = useSelector(
    (state: AppState) => state.distributions.distributionInput.distribution.donor?.name,
  );

  const [donorInput, setDonorInput] = useState<string | undefined>(
    selectedDonor?.id.toString() ?? "",
  );

  const [taxUnitInput, setTaxUnitInput] = useState<{ label: string; value?: number }>(
    mapTaxUnitToSelectOption(distribution.taxUnit) ?? noTaxUnit,
  );

  useEffect(() => {
    let newShares: IDistributionShare[] = [];
    organizations &&
      organizations.forEach((org) => {
        newShares.push({ id: org.id, abbriv: org.abbriv, share: new Decimal(0) });
      });
  }, [organizations]);

  useEffect(() => {
    if (selectedDonor?.id !== distribution.donor?.id) {
      setDonorInput(selectedDonor?.id.toString() ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDonor]);

  useEffect(() => {
    if (distribution.donor) {
      setDonorInput(distribution.donor?.id?.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof donorInput !== "undefined" && Validator.isInt(donorInput)) {
      if (
        typeof distribution.donor !== "undefined" &&
        typeof distribution.donor.id !== "undefined"
      ) {
        getAccessTokenSilently().then((token) => {
          dispatch(
            getDonorAction.started({ id: parseInt(donorInput) ?? distribution.donor?.name, token }),
          );
          dispatch(
            getDonorTaxUnitsAction.started({
              id: parseInt(donorInput) ?? distribution.donor?.id,
              token,
            }),
          );
        });
      } else {
        getAccessTokenSilently().then((token) => {
          dispatch(getDonorAction.started({ id: parseInt(donorInput), token }));
          dispatch(
            getDonorTaxUnitsAction.started({
              id: parseInt(donorInput),
              token,
            }),
          );
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorInput]);

  useEffect(() => {
    onChange({
      ...distribution,
      taxUnit: taxUnits.find((t) => {
        return t.id === taxUnitInput?.value;
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxUnitInput, taxUnits]);

  if (!organizations) return <div>Failed fetching organizations</div>;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr max-content", gap: "10px" }}>
          <EffektInput
            type="text"
            inputMode="numeric"
            value={donorInput}
            placeholder="Donor ID"
            onChange={(e: any) => setDonorInput(e.target.value)}
          ></EffektInput>
          <EffektButton onClick={() => dispatch(showDonorSelectionComponent())}>
            Find donor
          </EffektButton>
        </div>
        <EffektInput
          value={donorName ?? distribution.donor?.name ?? "Navn fylles ut automatisk"}
          disabled={true}
        ></EffektInput>
      </div>
      <div style={{ zIndex: 10, position: "relative", marginBottom: "20px" }}>
        <Select
          options={[...taxUnits.map((unit) => mapTaxUnitToSelectOption(unit)), noTaxUnit]}
          value={mapTaxUnitToSelectOption(taxUnits.find((unit) => unit.id === taxUnitInput.value))}
          onChange={(option: any) => setTaxUnitInput(option)}
        />
      </div>
      <EffektCheck
        label="Standard distribution"
        checked={distribution.standardDistribution ?? false}
        onChange={(checked) => {
          if (checked) {
            onChange({
              ...distribution,
              shares: getStandardShares(organizations),
              standardDistribution: checked,
            });
          } else {
            onChange({
              ...distribution,
              standardDistribution: checked,
            });
          }
        }}
        inverted={false}
      />
      <div
        style={{ height: distribution.standardDistribution ? "0px" : "auto", overflow: "hidden" }}
      >
        <DistributionSharesInput
          shares={distribution.shares ?? []}
          onChange={(shares: Array<IDistributionShare>) => {
            onChange({ ...distribution, shares });
          }}
        />
      </div>
    </div>
  );
};

const getStandardShares = (organizations: Array<IOrganization>): Array<IDistributionShare> => {
  const standardShares: Array<IDistributionShare> = [];
  organizations.forEach((org) => {
    if (org.standardShare > 0) {
      standardShares.push({
        id: org.id,
        abbriv: org.abbriv,
        share: new Decimal(org.standardShare),
      });
    }
  });
  return standardShares;
};
