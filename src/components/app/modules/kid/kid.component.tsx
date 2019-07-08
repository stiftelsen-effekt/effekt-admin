import { AppState } from "../../../../models/state";
import React from "react";
import { connect } from "react-redux";
import { KIDWrapper, KIDUpperBracket, KIDLowerBracket, KIDInnerContent } from "./kid.component.style";
import { IDonor, IOrganization } from "../../../../models/dbtypes";
import { showDonorSelectionComponent } from "../donors/donor-selection.actions";
import { EffektButton } from "../../style/elements/button.style";
import { fetchActiveOrganizationsRequest } from "../../../../store/organizations/organizations.action";
import { KIDDistribution, DistributionType } from "./distribution/distribution.component";
import { SummationComponent } from "./distribution/distribution-summation.component";

class KIDComponent extends React.Component<IStateProps & IDispatchProps> {
    componentDidMount() {
        this.props.fetchActiveOrganizationsRequest();
    }

    openDonorSelectionDialog = () => {
        this.props.showDonorSelectionComponent();
    }

    distributionChanged = (orgId: number, value: number) => {
        console.log(orgId, value);
    }

    render() {
        let selection = null
        if (this.props.selectedDonor) {
            selection = (<div>
                <span><strong>Selection</strong></span>
                <span>{this.props.selectedDonor.id}</span>
                <span>{this.props.selectedDonor.name}</span>
                <span>{this.props.selectedDonor.email}</span>
            </div>)
        }

        return (
            <KIDWrapper>
                <KIDUpperBracket></KIDUpperBracket>
                    <KIDInnerContent>
                        {/* Donor */}
                        <div>
                            {selection}
                            <EffektButton onClick={this.openDonorSelectionDialog}>Find</EffektButton>
                        </div>
                        {/* Split */}
                        <div>
                            <KIDDistribution 
                                organizations={this.props.activeOrganizations} 
                                type={DistributionType.percent}
                                onChange={this.distributionChanged}></KIDDistribution>
                        </div>

                        {/* Controls */}
                        <div>
                            <SummationComponent max={100} current={100}></SummationComponent>
                            <EffektButton>Save KID</EffektButton>
                        </div>
                    </KIDInnerContent>
                <KIDLowerBracket></KIDLowerBracket>
            </KIDWrapper>
        )
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