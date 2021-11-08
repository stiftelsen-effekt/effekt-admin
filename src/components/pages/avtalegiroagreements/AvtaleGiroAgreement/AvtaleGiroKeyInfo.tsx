import React from 'react';

import { DateTime } from "luxon";
import { KeyInfoWrapper, KeyInfoGroup, KeyInfoHeader, KeyInfoSum, KeyInfoTimestamp, KeyInfoValue } from '../../../style/elements/keyinfo/keyinfo.style';
import { shortDate } from '../../../../util/formatting';

interface AgreementInfo {
    amount: number;
    created: string;
    cancelled: string;
    payment_date: number;
    active: number;
    KID: string;
}
interface IProps {
    agreement: AgreementInfo;
}

export const AvtaleGiroKeyInfo: React.FunctionComponent<IProps> = ({ agreement }) => {
    const formattedTimestamp = shortDate(DateTime.fromISO(agreement.created))
    const chargeDay = agreement.payment_date === 0 ? "End of month" : agreement.payment_date
    let formattedStatus = agreement.active ? "Active" : "Inactive"
    if (agreement.cancelled) formattedStatus = "Cancelled"

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
        </KeyInfoWrapper>
    )
}