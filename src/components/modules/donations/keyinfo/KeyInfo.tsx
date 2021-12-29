import React from 'react';

import { IDonation } from '../../../../models/types';
import { DateTime } from 'luxon';
import {
  KeyInfoWrapper,
  KeyInfoGroup,
  KeyInfoHeader,
  KeyInfoSum,
  KeyInfoTransactionCost,
  KeyInfoTimestamp,
  KeyInfoValue,
} from '../../../style/elements/keyinfo/keyinfo.style';
import { thousandize } from '../../../../util/formatting';

interface IProps {
  donation: IDonation;
}
export const DonationKeyInfoComponent: React.FunctionComponent<IProps> = ({ donation }) => {
  let formatedTimestamp = DateTime.fromJSDate(donation.timestamp).toFormat('dd.MM yyyy | HH:mm');

  return (
    <KeyInfoWrapper>
      <KeyInfoGroup>
        <KeyInfoHeader>Gross sum</KeyInfoHeader>
        <KeyInfoSum>{thousandize(donation.sum)} kr</KeyInfoSum>
        <KeyInfoTransactionCost>
          {thousandize(donation.transactionCost)} kr transaction cost
        </KeyInfoTransactionCost>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>Timestamp</KeyInfoHeader>
        <KeyInfoTimestamp>{formatedTimestamp}</KeyInfoTimestamp>
      </KeyInfoGroup>

      <KeyInfoGroup>
        <KeyInfoHeader>Method</KeyInfoHeader>
        <KeyInfoValue>{donation.paymentMethod}</KeyInfoValue>
      </KeyInfoGroup>
    </KeyInfoWrapper>
  );
};
