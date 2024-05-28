/* eslint-disable no-restricted-globals */
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { AppState } from "../../../../models/state";
import { ICauseArea, IDistribution, ITaxUnit } from "../../../../models/types";
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

type TaxUnitInput = { label: string; value: number | undefined };

const mapTaxUnitToSelectOption = (taxUnit?: ITaxUnit): TaxUnitInput =>
  taxUnit
    ? {
        label: `${taxUnit.name} (${taxUnit.ssn})`,
        value: taxUnit.id,
      }
    : noTaxUnit;

export const DistributionInput: React.FC<{
  distribution: Partial<IDistribution>;
  taxUnits: ITaxUnit[];
  causeAreas: ICauseArea[];
  onChange: (distribution: Partial<IDistribution>) => void;
}> = ({ distribution, taxUnits, causeAreas, onChange }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const selectedDonor = useSelector((state: AppState) => state.donorSelector.selectedDonor);
  const distributionInputDonor = useSelector(
    (state: AppState) => state.distributions.distributionInput.donor,
  );

  const [showAddTaxUnitModal, setShowAddTaxUnitModal] = useState<boolean>(false);

  const donorId = distribution.donorId;

  useEffect(() => {
    if (typeof distribution.donorId !== "undefined") {
      getAccessTokenSilently().then((token) => {
        if (typeof distribution.donorId !== "undefined") {
          dispatch(getDonorAction.started({ id: distribution.donorId, token }));
          dispatch(
            getDonorTaxUnitsAction.started({
              id: distribution.donorId,
              token,
            }),
          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distribution.donorId]);

  useEffect(() => {
    console.log(selectedDonor);
    if (selectedDonor) {
      onChange({
        ...distribution,
        donorId: selectedDonor.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDonor]);

  if (!causeAreas) return <div>Failed fetching cause areas</div>;

  const filledInDistribution: Partial<IDistribution> = {
    ...distribution,
    causeAreas: causeAreas.map((ca) => {
      const existing = distribution.causeAreas?.find((dca) => dca.id === ca.id);
      if (!existing)
        return {
          id: ca.id,
          name: ca.name,
          percentageShare: new Decimal(0),
          standardSplit: true,
          organizations: ca.organizations.map((org) => ({
            id: org.id,
            percentageShare: new Decimal(org.standardShare),
          })),
        };
      return {
        ...existing,
        organizations: ca.organizations.map((org) => {
          const existingOrg = existing.organizations.find((o) => o.id === org.id);
          if (!existingOrg) return { id: org.id, percentageShare: new Decimal(0) };
          else return existingOrg;
        }),
      };
    }),
  };

  return (
    <div style={{ borderLeft: "1px solid black", paddingLeft: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr max-content", gap: "10px" }}>
          <EffektInput
            type="text"
            inputMode="numeric"
            value={distribution.donorId?.toString() ?? ""}
            placeholder="Donor ID"
          ></EffektInput>
          <EffektButton
            onClick={() => {
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
            options={
              taxUnits
                ? [...taxUnits.map((unit) => mapTaxUnitToSelectOption(unit)), noTaxUnit]
                : [noTaxUnit]
            }
            value={
              taxUnits
                ? mapTaxUnitToSelectOption(
                    taxUnits.find((unit) => unit.id === distribution.taxUnitId),
                  )
                : noTaxUnit
            }
            onChange={(value: TaxUnitInput | undefined | null) =>
              onChange({
                ...filledInDistribution,
                taxUnitId: value?.value,
              })
            }
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
      {filledInDistribution.causeAreas?.map((causeArea) => (
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
                  ...filledInDistribution,
                  causeAreas: filledInDistribution.causeAreas?.map((ca) =>
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
                ...filledInDistribution,
                causeAreas: filledInDistribution.causeAreas?.map((ca) =>
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
