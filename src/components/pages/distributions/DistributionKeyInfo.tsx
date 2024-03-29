import React from "react";
import { CurrentDistributionState } from "../../../models/state";
import { ITaxUnit } from "../../../models/types";
import { thousandize } from "../../../util/formatting";
import {
  KeyInfoWrapper,
  KeyInfoGroup,
  KeyInfoHeader,
  KeyInfoTimestamp,
  KeyInfoValue,
  KeyInfoSum,
} from "../../style/elements/keyinfo/keyinfo.style";
import { DateTime } from "luxon";

interface IProps {
  distribution: CurrentDistributionState;
}

export const DistributionKeyInfo: React.FunctionComponent<IProps> = ({ distribution }) => {
  let sumDonations = 0;

  if (distribution.affiliatedDonations) {
    distribution.affiliatedDonations.forEach((donation) => {
      sumDonations += parseFloat(donation.sum.toString());
    });
  }

  const formattedTaxUnitOutput = (taxUnit: ITaxUnit | null | undefined) => {
    if (!taxUnit) return <span>None</span>;
    else
      return (
        <table>
          <tbody>
            <tr>
              <td>Id:</td>
              <td>{taxUnit.id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{taxUnit.name}</td>
            </tr>
            <tr>
              <td>Ssn:</td>
              <td>{taxUnit.ssn}</td>
            </tr>
          </tbody>
        </table>
      );
  };

  if (distribution.distribution) {
    return (
      <KeyInfoWrapper>
        <KeyInfoGroup>
          <KeyInfoHeader>Sum donations</KeyInfoHeader>
          <KeyInfoSum>{thousandize(sumDonations)} kr</KeyInfoSum>
        </KeyInfoGroup>
        <KeyInfoGroup>
          <KeyInfoHeader>KID</KeyInfoHeader>
          <KeyInfoValue>{distribution.distribution.kid}</KeyInfoValue>
        </KeyInfoGroup>

        <KeyInfoGroup>
          <KeyInfoHeader>Donor name</KeyInfoHeader>
          <KeyInfoTimestamp>
            Unknown
            {/*distribution.distribution.donor.name*/}
          </KeyInfoTimestamp>
        </KeyInfoGroup>

        <KeyInfoGroup>
          <KeyInfoHeader>Donor email</KeyInfoHeader>
          <KeyInfoTimestamp>
            Unknown
            {/*distribution.distribution.donor.email || "Not registered"*/}
          </KeyInfoTimestamp>
        </KeyInfoGroup>

        <KeyInfoGroup>
          <KeyInfoHeader>Tax unit</KeyInfoHeader>
          <KeyInfoTimestamp>
            {formattedTaxUnitOutput({
              id: distribution.distribution.taxUnitId,
              name: "Uknown",
              ssn: "Uknown",
              sumDonations: -1,
              numDonations: -1,
              registered: DateTime.local(),
              archived: null,
            })}
          </KeyInfoTimestamp>
        </KeyInfoGroup>
      </KeyInfoWrapper>
    );
  } else return <div>Error loading distribution</div>;
};
