import { AppState } from "../../../../models/state";
import React from "react";
import { connect } from "react-redux";
import { KIDWrapper, KIDUpperBracket, KIDLowerBracket } from "./kid.component.style";
import { IDonor } from "../../../../models/dbtypes";
import { showDonorSelectionComponent } from "../donors/donor-selection.actions";
import { EffektButton } from "../../style/elements/button.style";

class KIDComponent extends React.Component<IStateProps & IDispatchProps> {
    openDonorSelectionDialog = () => {
        this.props.showDonorSelectionComponent();
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
                {/* Donor */}
                <div>
                    {selection}
                    <EffektButton onClick={this.openDonorSelectionDialog}>Find</EffektButton>
                </div>
                {/* Split */}
                <div>

                </div>

                {/* Controls */}
                <div>
                    <EffektButton>Save KID</EffektButton>
                </div>
                
                <KIDLowerBracket></KIDLowerBracket>
            </KIDWrapper>
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
    showDonorSelectionComponent: Function
}
const mapDispatchToProps: IDispatchProps = {
    showDonorSelectionComponent
}

export default connect(mapStateToProps, mapDispatchToProps)(KIDComponent);