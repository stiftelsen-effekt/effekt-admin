import React from 'react'
import { IOrganization } from '../../../../../models/dbtypes';
import { EffektText } from '../../../style/elements/text.style';
import { DistributionWrapper, DistributionItem, DistributionRow } from './distribution.component.style';

export enum DistributionType {
    percent,
    absolute
}

interface IProperties {
    organizations: Array<IOrganization> | undefined,
    type: DistributionType,
    onChange(orgId: number, value: number): void
}

export const KIDDistribution: React.FunctionComponent<IProperties> = (props: IProperties) => {
    if (props.organizations) {
        let items = props.organizations.map((organization, i) => (<DistributionItem key={i}>
            <span>{organization.abbriv}</span>
            <EffektText type="number" placeholder="sum" style={{width: '110px'}} onChange={(e) => { props.onChange(organization.id, parseInt(e.target.value)) }}></EffektText>
        </DistributionItem>));

        let distributionLines = []
        for (let i = 0; i < props.organizations.length / 3; i++) {
            distributionLines.push((
                <DistributionRow key={i}>
                    { items.slice(i*3, i*3 + 3) }
                </DistributionRow>
            ))
        }

        return (
            <DistributionWrapper>
                {distributionLines}
            </DistributionWrapper>
        )
    } else {
        return (<div>Loading...</div>)
    }
}