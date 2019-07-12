
import React from "react";

//Redux
import { connect } from "react-redux";
import { AppState } from "../../../../models/state";

import { showDonorSelectionComponent } from "../donors/donor-selection.actions";
import { fetchActiveOrganizationsRequest } from "../../../../store/organizations/organizations.action";

//Styling
import { KIDWrapper, KIDUpperBracket, KIDLowerBracket, KIDInnerContent } from "./kid.component.style";

//Models
import { IDistribution } from "./kid.models";
import { IDonor, IOrganization } from "../../../../models/dbtypes";

import Decimal from "decimal.js";

//SubComponents
import { KIDDonorComponent } from "./donor/donor.component";
import { KIDControls } from "./controls/controls.component";
import { KIDDistribution } from "./distribution/distribution.component";

interface IProps {
    donationAmount?: number,
    KID?: number,
    onChange(distribution: Array<IDistribution> ): void
}

interface IState {
    distribution: Array<IDistribution>,
    distributionSum: Decimal,
    distributionMax: Decimal
}

class KIDComponent extends React.Component<IStateProps & IDispatchProps & IProps, IState> {
    componentDidMount() {
        this.props.fetchActiveOrganizationsRequest()

        this.setState(this.getDefaultState())
    }

    getDefaultState(): IState {
        return {
            distribution: [],
            distributionSum: new Decimal(0),
            distributionMax: new Decimal(100)
        }
    }

    openDonorSelectionDialog = () => {
        this.props.showDonorSelectionComponent();
    }

    distributionChanged = (distribution: Array<IDistribution>) => {
        this.setState({
            distribution: distribution
        }, () => {
            this.calculateDistributionSum();
            this.props.onChange(this.state.distribution);
        })
    }

    calculateDistributionSum() {
        let sum = new Decimal(0);
        this.state.distribution.forEach(dist => sum = sum.add(dist.value))
        this.setState({
            distributionSum: sum
        })
    }

    render() {
        if (this.state) {
            return (
                <KIDWrapper>
                    <KIDUpperBracket></KIDUpperBracket>
                        <KIDInnerContent>
                            {/* Donor */}
                            <div>
                                <KIDDonorComponent 
                                    selectedDonor={this.props.selectedDonor} 
                                    openDonorSelectionDialog={this.openDonorSelectionDialog}></KIDDonorComponent>
                            </div>
                            {/* Split */}
                            <div>
                                <KIDDistribution 
                                    organizations={this.props.activeOrganizations} 
                                    onChange={this.distributionChanged}></KIDDistribution>
                            </div>

                            {/* Controls */}
                            <div>
                                <KIDControls
                                   distributionMax={this.state.distributionMax}
                                   distributionSum={this.state.distributionSum} ></KIDControls>
                            </div>
                        </KIDInnerContent>
                    <KIDLowerBracket></KIDLowerBracket>
                </KIDWrapper>
            )
        } else return <div></div>
    }
}

interface IStateProps {
    selectedDonor: IDonor | undefined,
    activeOrganizations: Array<IOrganization> | undefined
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        selectedDonor: state.donorSelector.selectedDonor,
        activeOrganizations: state.organizations.active
    }
}

interface IDispatchProps {
    showDonorSelectionComponent: Function,
    fetchActiveOrganizationsRequest: Function
}
const mapDispatchToProps: IDispatchProps = {
    showDonorSelectionComponent,
    fetchActiveOrganizationsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(KIDComponent);