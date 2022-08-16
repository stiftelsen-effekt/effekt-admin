import React from "react";
import Skeleton from "react-loading-skeleton";
import { IDonor } from "../../../../models/types";
import { longDateTime } from "../../../../util/formatting";
import { DonorKeyInfoWrapper } from "./KeyInfo.style";

export const DonorKeyInfo: React.FunctionComponent<{ donor?: IDonor }> = ({ donor }) => {
  return (
    <DonorKeyInfoWrapper>
      <table width="100%" cellSpacing={0}>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{donor ? donor.name : <Skeleton />}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{donor ? donor.email : <Skeleton />}</td>
          </tr>
          <tr>
            <td>SSN / OrgNr.</td>
            <td>{donor ? donor.ssn : <Skeleton />}</td>
          </tr>
          <tr>
            <td>Newsletter</td>
            <td>{donor ? (donor.newsletter ? 'Yes' : 'No') : <Skeleton />}</td>
          </tr>
          <tr>
            <td>Registered</td>
            <td>{donor ? longDateTime(donor.registered) : <Skeleton />}</td>
          </tr>
          <tr>
            <td>Trash</td>
            <td>{donor ? (donor.trash ? 'Yes' : 'No') : <Skeleton />}</td>
          </tr>
        </tbody>
      </table>
    </DonorKeyInfoWrapper>
  )
}
