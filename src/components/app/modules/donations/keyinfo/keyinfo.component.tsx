import React from 'react';

import { IDonation } from "../../../../../models/types";
import { DateTime } from "luxon";
import { KeyInfoGroup, KeyInfoHeader, KeyInfoSum, KeyInfoTimestamp, KeyInfoValue, KeyInfoTransactionCost, KeyInfoWrapper } from "./keyinfo.component.style";

interface IProps {
    donation: IDonation
}
export const DonationKeyInfoComponent: React.FunctionComponent<IProps> = ({ donation }) => {
    let formatedTimestamp = DateTime.fromJSDate(donation.timestamp).toFormat("dd.MM yyyy | HH:mm")

    return (
        <KeyInfoWrapper>
            <KeyInfoGroup>
                <KeyInfoHeader>Gross sum</KeyInfoHeader>
                <KeyInfoSum>{donation.sum} kr</KeyInfoSum>
                <KeyInfoTransactionCost>{donation.transactionCost} kr transaction cost</KeyInfoTransactionCost>
            </KeyInfoGroup>

            <KeyInfoGroup>
                <KeyInfoHeader>Timestamp</KeyInfoHeader>
                <KeyInfoTimestamp>{formatedTimestamp}</KeyInfoTimestamp>
            </KeyInfoGroup>

            <KeyInfoGroup>
                <KeyInfoHeader>Method</KeyInfoHeader>
                <KeyInfoValue>{donation.method}</KeyInfoValue>
            </KeyInfoGroup>
        </KeyInfoWrapper>
    )
}