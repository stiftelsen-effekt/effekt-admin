import React from 'react';
import { CurrentDistributionState } from '../../../models/state';
import { KeyInfoWrapper, KeyInfoGroup, KeyInfoHeader, KeyInfoTimestamp, KeyInfoValue, KeyInfoSum } from '../../style/elements/keyinfo/keyinfo.style';

interface IProps {
    distribution: CurrentDistributionState;
}

export const DistributionKeyInfo: React.FunctionComponent<IProps> = ({ distribution }) => {

    let sumDonations = 0

    if(distribution.affiliatedDonations) {
        distribution.affiliatedDonations.forEach(donation => {
            sumDonations += parseFloat(donation.sum)
        });
    }

    if (distribution.distribution) {
        return (
            <KeyInfoWrapper>
                <KeyInfoGroup>
                    <KeyInfoHeader>Sum donations</KeyInfoHeader>
                    <KeyInfoSum>{sumDonations} kr</KeyInfoSum>
                </KeyInfoGroup>
                <KeyInfoGroup>
                    <KeyInfoHeader>KID</KeyInfoHeader>
                    <KeyInfoValue>{distribution.distribution.KID}</KeyInfoValue>
                </KeyInfoGroup>
                
                <KeyInfoGroup>
                    <KeyInfoHeader>Donor name</KeyInfoHeader>
                    <KeyInfoTimestamp>{distribution.distribution.donor.name}</KeyInfoTimestamp>
                </KeyInfoGroup>

                <KeyInfoGroup>
                    <KeyInfoHeader>Donor email</KeyInfoHeader>
                    <KeyInfoTimestamp>{distribution.distribution.donor.email || "Not registered"}</KeyInfoTimestamp>
                </KeyInfoGroup>

                <KeyInfoGroup>
                    <KeyInfoHeader>Donor SSN</KeyInfoHeader>
                    <KeyInfoTimestamp>
                        {distribution.distribution.donor.ssn || "Not registered"}
                    </KeyInfoTimestamp>
                </KeyInfoGroup>
            </KeyInfoWrapper>
        )
    }
    else return <div>Error loading distribution</div>
}