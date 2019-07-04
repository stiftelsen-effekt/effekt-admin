import { AppState } from "../../../models/state";
import React from "react";
import { connect } from "react-redux";
import { SelectorWrapper, DonorSelectorDialog } from "./donorselector.component.style";
import { hideDonorSelectionComponent } from './donorselector.actions'

class DonorSelectorComponent extends React.Component<IStateProps & IDispatchProps> {
    hideComponent = () => { this.props.hideDonorSelectionComponent() }

    render() {
        return (
            <SelectorWrapper visible={this.props.visible}>
                <DonorSelectorDialog>
                    <span>Select donor</span>
                    <button onClick={this.hideComponent}>Hide</button>
                </DonorSelectorDialog>
            </SelectorWrapper>
        )
    }
}

interface IStateProps {
    visible: boolean
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        visible: state.donorSelector.visible
    }
}

interface IDispatchProps {
    hideDonorSelectionComponent: Function
}
const mapDispatchToProps: IDispatchProps = {
    hideDonorSelectionComponent
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorSelectorComponent);