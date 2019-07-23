import { MainHeader, SubHeader } from "../../style/elements/headers.style";
import { AppState } from "../../../../models/state";
import React from "react";
import { connect } from "react-redux";
import { Page } from "../../style/elements/page.style";
import DonorSelectionComponent from "../../modules/donors/selection/donor-selection.component";
import { IDonor } from "../../../../models/types";
import { CreateDonor } from "../../modules/donors/create/create-donor.component";

class DonorsComponent extends React.Component<IStateProps & IDispatchProps> {
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
            <Page>
                <MainHeader>Donors</MainHeader>
                <SubHeader>Create</SubHeader>
                <CreateDonor></CreateDonor>
                <SubHeader>Search</SubHeader>
                {selection}
                <DonorSelectionComponent></DonorSelectionComponent>
            </Page>
        )
    }
}

interface IStateProps {
    selectedDonor: IDonor | undefined
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        selectedDonor: state.donorSelector.selectedDonor
    }
}

interface IDispatchProps {
}
const mapDispatchToProps: IDispatchProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorsComponent);