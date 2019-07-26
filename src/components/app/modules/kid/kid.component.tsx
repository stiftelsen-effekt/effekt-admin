
import React, { useState } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../models/state";

import { showDonorSelectionComponent } from "../donors/selection/donor-selection.actions";

//Styling
import { KIDWrapper, KIDUpperBracket, KIDLowerBracket, KIDInnerContent } from "./kid.component.style";

//Models
import { IDistribution } from "./kid.models";
import { IOrganization } from "../../../../models/types";

import Decimal from "decimal.js";

//SubComponents
import { KIDDonorComponent } from "./donor/donor.component";
import { KIDControls } from "./controls/controls.component";
import { KIDDistribution } from "./distribution/distribution.component";

interface IProps {
    donationAmount?: number,
    organizations: Array<IOrganization>,
    KID?: number,
    onChange(distribution: Array<IDistribution> ): void
}

interface IState {
    distribution: Array<IDistribution>,
    distributionSum: Decimal,
    distributionMax: Decimal
}

export const KIDComponent:React.FunctionComponent<IProps> =  ({ donationAmount, organizations, KID, onChange }) =>  {
    const dispatch = useDispatch()

    /**
     * UTIL
     * TODO: Move to seperate file
     */

    const calculateDistributionSum = (distribution: Array<IDistribution>): Decimal => {
        let sum = new Decimal(0);
        distribution.forEach(dist => sum = sum.add(dist.value))
        return sum;
    }

    const mapOrgToDIst = (organizations: Array<IOrganization>): Array<IDistribution> => {
        return organizations.map(((org: IOrganization):IDistribution => ({
            abbriv: org.abbriv,
            organizationId: org.id,
            //TODO: Handle donation amount
            value: new Decimal(org.standardShare)
        })))
    }

    /**
     * END UTIL
     */

    const [distribution, setDistribution] = useState<Array<IDistribution>>(mapOrgToDIst(organizations))
    
    console.log(distribution)
    const [distributionSum, setDistributionSum] = useState<Decimal>(calculateDistributionSum(distribution))
    //TODO: Add support for absolute values
    const distributionMax = new Decimal(100)

    const donor = useSelector((state: AppState) => state.donorSelector.selectedDonor)

    const openDonorSelectionDialog = () => {
        dispatch(showDonorSelectionComponent());
    }

    const distributionChanged = (distribution: Array<IDistribution>) => {
        setDistribution(distribution)
        onChange(distribution)
        setDistributionSum(calculateDistributionSum(distribution))
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