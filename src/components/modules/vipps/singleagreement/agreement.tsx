import React from "react";

import { IVippsAgreement } from "../../../../models/types";
import {
  KeyInfoWrapper,
  KeyInfoGroup,
  KeyInfoHeader,
  KeyInfoSum,
  KeyInfoTimestamp,
} from "../../../style/elements/keyinfo/keyinfo.style";

interface IProps {
  agreement: IVippsAgreement;
}
export const SingleAgreementComponent: React.FunctionComponent<IProps> = ({ agreement }) => {
  return (
    <KeyInfoWrapper>
      <KeyInfoGroup>
        <KeyInfoHeader>Sum</KeyInfoHeader>
        <KeyInfoSum>{agreement.amount} kr</KeyInfoSum>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>Start timestamp</KeyInfoHeader>
        <KeyInfoTimestamp>{agreement.start}</KeyInfoTimestamp>
      </KeyInfoGroup>
    </KeyInfoWrapper>
  );
};
