import React from "react";
import { IDistributionCauseArea, IDistributionShare } from "../../../../models/types";
import { EffektCheck } from "../../../style/elements/effekt-check/effekt-check.component";
import { DistributionSharesInput } from "./DistributionSharesInput";

export const DistributionCauseAreaInput: React.FunctionComponent<{
  distributionCauseArea: IDistributionCauseArea;
  onChange: (distributionCauseArea: IDistributionCauseArea) => void;
}> = ({ distributionCauseArea, onChange }) => {
  return (
    <>
      <EffektCheck
        label="Standard distribution"
        checked={distributionCauseArea.standardSplit ?? false}
        onChange={(checked) => {
          onChange({
            ...distributionCauseArea,
            standardSplit: checked,
          });
        }}
        inverted={false}
      />
      <div
        style={{ height: distributionCauseArea.standardSplit ? "0px" : "auto", overflow: "hidden" }}
      >
        <DistributionSharesInput
          causeAreaId={distributionCauseArea.id}
          shares={distributionCauseArea.organizations ?? []}
          onChange={(organizations: Array<IDistributionShare>) => {
            onChange({ ...distributionCauseArea, organizations });
          }}
        />
      </div>
    </>
  );
};
