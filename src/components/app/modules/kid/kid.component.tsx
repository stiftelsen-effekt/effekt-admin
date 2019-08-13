
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
import { calculateDistributionSum } from "./kid.util";

interface IProps {
    donationAmount?: number,
    organizations: Array<IOrganization>,
    KID?: number,
    distribution: Array<IDistributionShare>,
    onChange(distribution: Array<IDistributionShare> ): void
}

export const KIDComponent:React.FunctionComponent<IProps> =  ({ donationAmount, organizations, KID, onChange, distribution }) =>  {
    const dispatch = useDispatch()
    
    const [distributionSum, setDistributionSum] = useState<Decimal>(calculateDistributionSum(distribution))
    //TODO: Add support for absolute values
    const distributionMax = new Decimal(100)

    const donor = useSelector((state: AppState) => state.donorSelector.selectedDonor)

    const openDonorSelectionDialog = () => {
        dispatch(showDonorSelectionComponent());
    }

    const distributionChanged = (distribution: Array<IDistributionShare>) => {
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