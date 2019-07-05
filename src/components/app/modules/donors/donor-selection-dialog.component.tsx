import React from 'react'
import { connect } from "react-redux";

import { SelectorWrapper, DonorDialog, Controls } from "./donor-selection-dialog.component.style";

import { hideDonorSelectionComponent } from './donor-selection.actions'
import { AppState } from '../../../../models/state';
import { EffektButton, EffektButtonTypes } from '../../style/elements/button.style';
import DonorSelector from './donor-selection.component';


class DonorSelectionDialogComponent extends React.Component<IStateProps & IDispatchProps> {
    hideComponent = () => { this.props.hideDonorSelectionComponent() }
    
    render() {
        return (
            <SelectorWrapper visible={this.props.visible}>
                <DonorDialog>
                    <DonorSelector></DonorSelector>
                    {/* Controls */}
                    <Controls>
                        <EffektButton buttonStyle={EffektButtonTypes.SECONDARY} onClick={this.hideComponent}>Avbryt</EffektButton>
                        <EffektButton >Select</EffektButton>
                    </Controls>
                </DonorDialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(DonorSelectionDialogComponent);