import React from 'react';
import { CurrentDistributionState } from '../../../models/state';
import { KeyInfoWrapper, KeyInfoGroup, KeyInfoHeader, KeyInfoTimestamp, KeyInfoValue } from '../../style/elements/keyinfo/keyinfo.style';

interface IProps {
    distribution: CurrentDistributionState;
}

export const DistributionKeyInfo: React.FunctionComponent<IProps> = ({ distribution }) => {

    if (distribution.distribution) {
        return (
            <KeyInfoWrapper>
                <KeyInfoGroup>
                    <KeyInfoHeader>KID</KeyInfoHeader>
                    <KeyInfoValue>{distribution.distribution.KID}</KeyInfoValue>
                </KeyInfoGroup>

                {/* <KeyInfoGroup>
                    <KeyInfoHeader>Sum donations</KeyInfoHeader>
                    <KeyInfoSum>{} kr</KeyInfoSum>
                </KeyInfoGroup> */}
                
                <KeyInfoGroup>
                    <KeyInfoHeader>Name</KeyInfoHeader>
                    <KeyInfoTimestamp>{distribution.distribution.donor.name}</KeyInfoTimestamp>
                </KeyInfoGroup>

                <KeyInfoGroup>
                    <KeyInfoHeader>Email</KeyInfoHeader>
                    <KeyInfoTimestamp>{distribution.distribution.donor.email}</KeyInfoTimestamp>
                </KeyInfoGroup>

                <KeyInfoGroup>
                    <KeyInfoHeader>SSN</KeyInfoHeader>
                    <KeyInfoTimestamp>
                        {distribution.distribution.donor.ssn || "Not registered"}
                    </KeyInfoTimestamp>
                </KeyInfoGroup>
            </KeyInfoWrapper>
        )
    }
    else return <div>Error loading distribution</div>
}