import React from 'react'
import { EffektInput } from '../../../shared/elements/input.style';
import { DistributionWrapper, DistributionItem, DistributionRow } from './distribution.component.style';


import Decimal from 'decimal.js'
import { IDistributionShare } from '../../../../types';

interface IProps {
    onChange(distribution: Array<IDistributionShare> ): void,
    distribution: Array<IDistributionShare>
}

export const KIDDistribution: React.FunctionComponent<IProps> = ({ distribution, onChange }) => {
    const organizationValueChanged = (orgId: number, value: string) => {
        try {
            value = (value === "" ? "0" : value)
            let parsedValue = new Decimal(value)
            let updatedDistribution = distribution.map((dist: IDistributionShare)  => {
                if (dist.organizationId === orgId) return {
                    ...dist,
                    share: parsedValue
                }
                else return dist
            })

            onChange(updatedDistribution)
        } catch(ex) {
            console.log("Could not parse distribution input: ", value)
        }
    }

    const createItems = () => {
        let distributionItems = distribution.map((dist: IDistributionShare, i: number) => (
            <DistributionItem key={i}>
                <span>{dist.abbriv}</span>
                <EffektInput 
                    type="number" 
                    placeholder="sum" 
                    defaultValue={dist.share.toString()} 
                    style={{width: '110px'}} 
                    onChange={(e) => { organizationValueChanged(dist.organizationId, e.target.value) }}></EffektInput>
            </DistributionItem>));

        return distributionItems;
    }

    const createLines = (distributionItems: any) => {
        let distributionLines = []
        for (let i = 0; i < distributionItems.length / 3; i++) {
            let startPickingAt = i*3;
            let endPickingAt = startPickingAt +3; 

            distributionLines.push((
                <DistributionRow key={i}>
                    { distributionItems.slice(startPickingAt, endPickingAt) }
                </DistributionRow>
            ))
        }
        return distributionLines;
    }

    const createDistribution = () => {
        let distributionItems = createItems();
        let distributionLines = createLines(distributionItems);
        return (
            <DistributionWrapper>
                {distributionLines}
            </DistributionWrapper>
        )
    }

    return createDistribution()
} 