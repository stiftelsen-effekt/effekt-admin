import React from 'react'
import { connect } from "react-redux";

import { SelectorWrapper, DonorDialog, Controls } from "./donor-selection-dialog.component.style";

import { hideDonorSelectionComponent, clearSelectedDonor } from './donor-selection.actions'
import { AppState } from '../../../../models/state';
import { EffektButton, EffektButtonTypes } from '../../style/elements/button.style';
import DonorSelector from './donor-selection.component';


class DonorSelectionDialogComponent extends React.Component<IStateProps & IDispatchProps> {
    abort = () => {
        this.props.clearSelectedDonor()
        this.props.hideDonorSelectionComponent() 
    }

    confirm = () => {
        //State is already set in component
        this.props.hideDonorSelectionComponent() 
    }

    
    render() {
        return (
            <SelectorWrapper visible={this.props.visible}>
                <DonorDialog>
                    <DonorSelector></DonorSelector>
                    {/* Controls */}
                    <Controls>
                        <EffektButton onClick={this.abort} buttonStyle={EffektButtonTypes.SECONDARY}>Avbryt</EffektButton>
                        <EffektButton onClick={this.confirm}>Confirm</EffektButton>
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
    hideDonorSelectionComponent: Function,
    clearSelectedDonor: Function
}
const mapDispatchToProps: IDispatchProps = {
    hideDonorSelectionComponent,
    clearSelectedDonor
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorSelectionDialogComponent);