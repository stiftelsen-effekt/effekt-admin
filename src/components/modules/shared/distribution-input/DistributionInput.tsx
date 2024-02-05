/* eslint-disable no-restricted-globals */
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Validator from "validator";
import { AppState } from "../../../../models/state";
import { IDistribution, ITaxUnit } from "../../../../models/types";
import {
  getDonorAction,
  getDonorTaxUnitsAction,
} from "../../../../store/donors/donor-page.actions";
import { showDonorSelectionComponent } from "../../../../store/donors/donor-selection.actions";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektInput } from "../../../style/elements/input.style";
import { EffektModal } from "../../../style/elements/effekt-modal/effekt-modal.component.style";
import { NewTaxUnitModal } from "../../taxunits/modal/NewTaxUnitModal";
import { DistributionCauseAreaInput } from "./DistributionCauseAreaInput";

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
  const causeAreas = useSelector((state: AppState) => state.causeareas.active);
  const selectedDonor = useSelector((state: AppState) => state.donorSelector.selectedDonor);
  const donorName = useSelector(
    (state: AppState) => state.distributions.distributionInput.distribution.donor?.name,
  );

  const [showAddTaxUnitModal, setShowAddTaxUnitModal] = useState<boolean>(false);

  const [donorInput, setDonorInput] = useState<string | undefined>(
    selectedDonor?.id.toString() ?? "",
  );

  const [taxUnitInput, setTaxUnitInput] = useState<{ label: string; value?: number }>(
    mapTaxUnitToSelectOption(distribution.taxUnit) ?? noTaxUnit,
  );

  const donorId = distribution.donor?.id;

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

  if (!causeAreas) return <div>Failed fetching organizations</div>;

  return (
    <div style={{ borderLeft: "1px solid black", paddingLeft: "10px" }}>
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
        <EffektButton onClick={() => setShowAddTaxUnitModal(true)}>Add tax unit</EffektButton>
      </div>
      {distribution.causeAreas?.map((causeArea) => (
        <div
          key={causeArea.id}
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "15px",
            margin: "15px 0",
            padding: "15px 0",
            borderLeft: "1px solid black",
          }}
        >
          <div>
            <strong>{causeArea.name}</strong>
          </div>
          <EffektInput
            type="text"
            value={causeArea.percentageShare.toString()}
            placeholder="Percentage share"
            onChange={(e: any) => {
              onChange({
                ...distribution,
                causeAreas: distribution.causeAreas?.map((ca) =>
                  ca.id === causeArea.id ? { ...ca, percentageShare: e.target.value } : ca,
                ),
              });
            }}
          ></EffektInput>
          <DistributionCauseAreaInput
            key={causeArea.id}
            distributionCauseArea={causeArea}
            onChange={(c) => {
              onChange({
                ...distribution,
                causeAreas: distribution.causeAreas?.map((ca) =>
                  ca.id === c.id ? { ...ca, ...c } : ca,
                ),
              });
            }}
          ></DistributionCauseAreaInput>
        </div>
      ))}
      <EffektModal
        visible={showAddTaxUnitModal}
        effect="fadeInUp"
        onClickAway={() => setShowAddTaxUnitModal(false)}
      >
        {showAddTaxUnitModal && donorId && (
          <NewTaxUnitModal
            donorId={donorId}
            onSubmit={() => setShowAddTaxUnitModal(false)}
          ></NewTaxUnitModal>
        )}
      </EffektModal>
    </div>
  );
};
