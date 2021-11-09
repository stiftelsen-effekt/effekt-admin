import React from 'react';

import { DateTime } from "luxon";
import { KeyInfoWrapper, KeyInfoGroup, KeyInfoHeader, KeyInfoSum, KeyInfoTimestamp, KeyInfoValue } from '../../../style/elements/keyinfo/keyinfo.style';
import { shortDate } from '../../../../util/formatting';

interface AgreementInfo {
    amount: number;
    status: string;
    timestamp_created: string;
    monthly_charge_day: number;
    KID: string;
}
interface IProps {
    agreement: AgreementInfo;
}

export const AgreementKeyInfoComponent: React.FunctionComponent<IProps> = ({ agreement }) => {
    const formattedTimestamp = shortDate(DateTime.fromISO(agreement.timestamp_created))
    const status = agreement.status
    const chargeDay = agreement.monthly_charge_day

  return (
    <KeyInfoWrapper>
      <KeyInfoGroup>
        <KeyInfoHeader>Monthly sum</KeyInfoHeader>
        <KeyInfoSum>{agreement.amount} kr</KeyInfoSum>
      </KeyInfoGroup>

            <KeyInfoGroup>
                <KeyInfoHeader>Status</KeyInfoHeader>
                <KeyInfoTimestamp>{status}</KeyInfoTimestamp>
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
        </KeyInfoWrapper>
    )
}
