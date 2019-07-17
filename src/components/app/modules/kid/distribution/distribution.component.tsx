import React from 'react'
import { EffektInput } from '../../../style/elements/input.style';
import { DistributionWrapper, DistributionItem, DistributionRow } from './distribution.component.style';
import { DistributionType, IDistribution } from '../kid.models';
import { IOrganization } from '../../../../../models/types';
import Decimal from 'decimal.js'

interface IProperties {
    onChange(distribution: Array<IDistribution> ): void,
    organizations: Array<IOrganization> | undefined
}

interface IState {
    distribution: Array<IDistribution>,
    type: DistributionType,
    sumValue: 100
}

export class KIDDistribution extends React.Component<IProperties, IState> {
    constructor(props: IProperties) {
        super(props)
        this.state = this.getDefaultState()
    }

    getDefaultState(): IState {
        return {
            distribution: [],
            type: DistributionType.PERCENT,
            sumValue: 100
        }
    }

    componentDidUpdate() {
        if (this.props.organizations && this.state.distribution.length === 0) {
            this.setState({ 
                distribution: this.props.organizations.map(org => { 
                    return {
                        organizationId: org.id,
                        value: new Decimal(org.standardShare).dividedBy(100).mul(this.state.sumValue),
                        abbriv: org.abbriv
                    } as IDistribution
                 }) 
            }, () => {
                this.props.onChange(this.state.distribution)
            })
        }
    }

    organizationValueChanged(orgId: number, value: string) {
        try {
            value = (value === "" ? "0" : value)
            let parsedValue = new Decimal(value)
            let updatedDistribution = this.state.distribution.map(dist => {
                if (dist.organizationId === orgId) return {
                    ...dist,
                    value: parsedValue
                }
                else return dist
            })

            this.setState({
                distribution: updatedDistribution
            }, () => {
                this.props.onChange(this.state.distribution)
            })
        } catch(ex) {
            console.log("Could not parse distribution input: ", value)
        }
    }

    render() {
        if (this.props.organizations) {
            return this.createDistribution()
        } else {
            return (<div>Loading...</div>)
        }
    }

    createDistribution() {
        let distributionItems = this.createItems();
        let distributionLines = this.createLines(distributionItems);
        return (
            <DistributionWrapper>
                {distributionLines}
            </DistributionWrapper>
        )
    }

    createLines(distributionItems: any) {
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

    createItems() {
        let distributionItems = this.state.distribution.map((dist, i) => (
            <DistributionItem key={i}>
                <span>{dist.abbriv}</span>
                <EffektInput 
                    type="number" 
                    placeholder="sum" 
                    defaultValue={dist.value.toString()} 
                    style={{width: '110px'}} 
                    onChange={(e) => { this.organizationValueChanged(dist.organizationId, e.target.value) }}></EffektInput>
            </DistributionItem>));

        return distributionItems;
    }
} 