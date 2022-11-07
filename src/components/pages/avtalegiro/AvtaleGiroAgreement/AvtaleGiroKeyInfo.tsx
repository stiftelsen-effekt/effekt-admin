import React from 'react';

import { DateTime } from 'luxon';
import {
  KeyInfoWrapper,
  KeyInfoGroup,
  KeyInfoHeader,
  KeyInfoSum,
  KeyInfoTimestamp,
  KeyInfoValue,
} from '../../../style/elements/keyinfo/keyinfo.style';
import { shortDate } from '../../../../util/formatting';
import { IAvtaleGiro, ITaxUnit } from '../../../../models/types';

export const AvtaleGiroKeyInfo: React.FunctionComponent<{
  agreement: IAvtaleGiro;
}> = ({ agreement }) => {
  const formattedTimestamp = shortDate(DateTime.fromISO(agreement.created));
  const chargeDay = agreement.payment_date === 0 ? 'End of month' : agreement.payment_date;
  let formattedStatus = agreement.active ? 'Active' : 'Inactive';
  if (agreement.cancelled) formattedStatus = 'Cancelled';

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

  return (
    <KeyInfoWrapper>
      <KeyInfoGroup>
        <KeyInfoHeader>Monthly amount</KeyInfoHeader>
        <KeyInfoSum>{agreement.amount} kr</KeyInfoSum>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>Status</KeyInfoHeader>
        <KeyInfoTimestamp>{formattedStatus}</KeyInfoTimestamp>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>Charge day</KeyInfoHeader>
        <KeyInfoValue>{chargeDay}</KeyInfoValue>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>KID</KeyInfoHeader>
        <KeyInfoValue>{agreement.KID}</KeyInfoValue>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>Start time</KeyInfoHeader>
        <KeyInfoTimestamp>{formattedTimestamp}</KeyInfoTimestamp>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>Tax unit</KeyInfoHeader>
        <KeyInfoTimestamp>
          {formattedTaxUnitOutput(agreement.distribution.taxUnit)}
        </KeyInfoTimestamp>
      </KeyInfoGroup>
    </KeyInfoWrapper>
  );
};
