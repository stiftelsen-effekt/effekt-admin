import React, { useState } from "react";
import { EffektButton, EffektSecondaryButton } from "../../../style/elements/button.style";
import { EffektCheck } from "../../../style/elements/effekt-check/effekt-check.component";

interface IProps {
  onInsert(receipt: boolean): void;
  onIgnore?(): void;
}

export const DonationControls: React.FunctionComponent<IProps> = (props: IProps) => {
  let ignoreButton;
  if (props.onIgnore !== undefined) {
    ignoreButton = (
      <EffektSecondaryButton onClick={props.onIgnore} style={{ marginRight: "20px" }}>
        Ignore
      </EffektSecondaryButton>
    );
  }

  const [receipt, setReceipt] = useState<boolean>(false);

  return (
    <React.Fragment>
      {ignoreButton}
      <EffektCheck
        label={"Kvittering"}
        checked={receipt}
        onChange={(checked) => {
          setReceipt(checked);
        }}
        inverted={false}
      ></EffektCheck>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <EffektButton onClick={() => props.onInsert(receipt)}>Insert</EffektButton>
    </React.Fragment>
  );
};
