import React from 'react';

import { IVippsAgreement } from '../../../../models/types';
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

interface IProps {
  agreement: IVippsAgreement;
}

export const AgreementKeyInfoComponent: React.FunctionComponent<IProps> = ({ agreement }) => {
  let formatedTimestamp = shortDate(DateTime.fromISO(agreement.start, { setZone: true }));

  return (
    <KeyInfoWrapper>
      <KeyInfoGroup>
        <KeyInfoHeader>Monthly sum</KeyInfoHeader>
        <KeyInfoSum>{agreement.amount} kr</KeyInfoSum>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>Status</KeyInfoHeader>
        <KeyInfoTimestamp>{agreement.status}</KeyInfoTimestamp>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>Start time</KeyInfoHeader>
        <KeyInfoTimestamp>{formatedTimestamp}</KeyInfoTimestamp>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>KID</KeyInfoHeader>
        <KeyInfoValue>{agreement.KID}</KeyInfoValue>
      </KeyInfoGroup>
    </KeyInfoWrapper>
  );
};
