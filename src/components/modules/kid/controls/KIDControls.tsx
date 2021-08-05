import React from 'react'
import { ControlsWrapper } from "./KIDControls.style";
import { SummationComponent } from "../distribution/DistributionSummation";
import Decimal from "decimal.js";

interface IProps {
    distributionMax: Decimal,
    distributionSum: Decimal
}

export const KIDControls: React.FunctionComponent<IProps> = (props) => {
    return (
        <ControlsWrapper>
            <SummationComponent max={props.distributionMax} current={props.distributionSum}></SummationComponent>
        </ControlsWrapper>
    )
}