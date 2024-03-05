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
import Decimal from "decimal.js";

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
  const causeAreas = useSelector((state: AppState) => state.causeareas.all);
  const selectedDonor = useSelector((state: AppState) => state.donorSelector.selectedDonor);
  const distributionInputDonor = useSelector(
    (state: AppState) => state.distributions.distributionInput.donor,
  );

  const [showAddTaxUnitModal, setShowAddTaxUnitModal] = useState<boolean>(false);

  const [donorInput, setDonorInput] = useState<string | undefined>(
    selectedDonor?.id.toString() ?? "",
  );

  const [taxUnitInput, setTaxUnitInput] = useState<{ label: string; value?: number }>(
    mapTaxUnitToSelectOption(taxUnits.find((t) => t.id === distribution.taxUnitId)) ?? noTaxUnit,
  );

  const donorId = distribution.donorId;

  useEffect(() => {
    if (selectedDonor?.id !== distribution.donorId || donorInput === "") {
      setDonorInput(selectedDonor?.id.toString() ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDonor]);

  useEffect(() => {
    if (typeof distribution.donorId !== "undefined" && selectedDonor !== null)
      setDonorInput(distribution.donorId.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distribution]);

  useEffect(() => {
    if (typeof donorInput !== "undefined" && Validator.isInt(donorInput)) {
      if (typeof distribution.donorId !== "undefined") {
        getAccessTokenSilently().then((token) => {
          dispatch(getDonorAction.started({ id: parseInt(donorInput), token }));
          dispatch(
            getDonorTaxUnitsAction.started({
              id: parseInt(donorInput),
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
      taxUnitId: taxUnits.find((t) => {
        return t.id === taxUnitInput?.value;
      })?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxUnitInput, taxUnits]);

  if (!causeAreas) return <div>Failed fetching cause areas</div>;

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
          <EffektButton
            onClick={() => {
              setDonorInput(selectedDonor?.id.toString() ?? "");
              dispatch(showDonorSelectionComponent());
            }}
          >
            Find donor
          </EffektButton>
        </div>
        <EffektInput
          value={distributionInputDonor?.name ?? "Navn fylles ut automatisk"}
          disabled={true}
        ></EffektInput>
      </div>
      <div
        style={{
          zIndex: 10,
          position: "relative",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <div style={{ flexGrow: 1, marginRight: "15px" }}>
          <Select
            options={[...taxUnits.map((unit) => mapTaxUnitToSelectOption(unit)), noTaxUnit]}
            value={mapTaxUnitToSelectOption(
              taxUnits.find((unit) => unit.id === taxUnitInput.value),
            )}
            onChange={(option: any) => setTaxUnitInput(option)}
          />
        </div>
        <EffektButton
          onClick={() => {
            if (donorId) setShowAddTaxUnitModal(true);
            else alert("Please select a donor first");
          }}
          style={{ alignSelf: "end" }}
        >
          Add tax unit
        </EffektButton>
      </div>
      {distribution.causeAreas?.map((causeArea) => (
        <div
          key={causeArea.id}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "15px 0",
            padding: "15px 0",
            paddingLeft: "15px",
            borderLeft: "1px solid black",
          }}
        >
          <div>
            <strong>{causeArea.name}</strong>
          </div>
          <div
            style={{
              flexGrow: 1,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <EffektInput
              type="text"
              value={causeArea.percentageShare.toString()}
              placeholder="Percentage share"
              style={{ flexGrow: 1, marginRight: 15 }}
              onChange={(e: any) => {
                onChange({
                  ...distribution,
                  causeAreas: distribution.causeAreas?.map((ca) =>
                    ca.id === causeArea.id
                      ? { ...ca, percentageShare: new Decimal(e.target.value) }
                      : ca,
                  ),
                });
              }}
            ></EffektInput>
            %
          </div>
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
        visible={showAddTaxUnitModal && donorId}
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
