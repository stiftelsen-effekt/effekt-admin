
import React, { useState } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../models/state";

import { showDonorSelectionComponent } from "../donors/selection/donor-selection.actions";

//Styling
import { KIDWrapper, KIDUpperBracket, KIDLowerBracket, KIDInnerContent } from "./kid.component.style";

//Models
import { IOrganization, IDistributionShare } from "../../../../models/types";

import Decimal from "decimal.js";

//SubComponents
import { KIDDonorComponent } from "./donor/donor.component";
import { KIDControls } from "./controls/controls.component";
import { KIDDistribution } from "./distribution/distribution.component";

interface IProps {
    donationAmount?: number,
    organizations: Array<IOrganization>,
    KID?: number,
    onChange(distribution: Array<IDistributionShare> ): void
}

interface IState {
    distribution: Array<IDistributionShare>,
    distributionSum: Decimal,
    distributionMax: Decimal
}

export const KIDComponent:React.FunctionComponent<IProps> =  ({ donationAmount, organizations, KID, onChange }) =>  {
    const dispatch = useDispatch()

    /**
     * UTIL
     * TODO: Move to seperate file
     */

    const calculateDistributionSum = (distribution: Array<IDistributionShare>): Decimal => {
        let sum = new Decimal(0);
        distribution.forEach(dist => sum = sum.add(dist.share))
        return sum;
    }

    const mapOrgToDIst = (organizations: Array<IOrganization>): Array<IDistributionShare> => {
        return organizations.map(((org: IOrganization):IDistributionShare => ({
            abbriv: org.abbriv,
            organizationId: org.id,
            //TODO: Handle donation amount
            share: new Decimal(org.standardShare)
        })))
    }

    /**
     * END UTIL
     */

    const [distribution, setDistribution] = useState<Array<IDistributionShare>>(mapOrgToDIst(organizations))
    
    const [distributionSum, setDistributionSum] = useState<Decimal>(calculateDistributionSum(distribution))
    //TODO: Add support for absolute values
    const distributionMax = new Decimal(100)

    const donor = useSelector((state: AppState) => state.donorSelector.selectedDonor)

    const openDonorSelectionDialog = () => {
        dispatch(showDonorSelectionComponent());
    }

    const distributionChanged = (distribution: Array<IDistributionShare>) => {
        setDistribution(distribution)
        setDistributionSum(calculateDistributionSum(distribution))
        onChange(distribution)
    }

    return (
        <KIDWrapper>
            <KIDUpperBracket></KIDUpperBracket>
                <KIDInnerContent>
                    {/* Donor */}
                    <div>
                        <KIDDonorComponent 
                            selectedDonor={donor} 
                            openDonorSelectionDialog={openDonorSelectionDialog}></KIDDonorComponent>
                    </div>
                    {/* Split */}
                    <div>
                        <KIDDistribution 
                            distribution={distribution}
                            onChange={distributionChanged}></KIDDistribution>
                    </div>

                    {/* Controls */}
                    <div>
                        <KIDControls
                            distributionMax={distributionMax}
                            distributionSum={distributionSum} ></KIDControls>
                    </div>
                </KIDInnerContent>
            <KIDLowerBracket></KIDLowerBracket>
        </KIDWrapper>
    )
}