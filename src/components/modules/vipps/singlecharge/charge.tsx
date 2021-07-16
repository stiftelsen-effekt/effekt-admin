import React from 'react';

import { IVippsAgreement } from "../../../../models/types";
import { KeyInfoWrapper, KeyInfoGroup, KeyInfoHeader, KeyInfoSum, KeyInfoTimestamp } from '../../donations/keyinfo/keyinfo.component.style';

interface IProps {
    agreement: IVippsAgreement
}
export const SingleChargeComponent: React.FunctionComponent<IProps> = ({ agreement }) => {

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
    )
}