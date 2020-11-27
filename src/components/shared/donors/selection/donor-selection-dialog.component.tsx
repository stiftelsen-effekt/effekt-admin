import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import { SelectorWrapper, DonorDialog, Controls } from "./donor-selection-dialog.component.style";

import { AppState } from '../../../../store/state';
import { EffektButton, EffektSecondaryButton } from '../../../shared/elements/button.style';
import { DonorSelectionComponent } from './donor-selection.component';
import { clearSelectedDonor, hideDonorSelectionComponent } from '../../../../store/donor/select/donor-selection.actions';


export const DonorSelectionDialog: React.FC = () => {
    const dispatch = useDispatch();
    const visible = useSelector((state: AppState) => state.donorSelector.visible)

    const abort = () => {
        dispatch(clearSelectedDonor())
        dispatch(hideDonorSelectionComponent())
    }

    const confirm = () => {
        //State is already set in component
        dispatch(hideDonorSelectionComponent())
    }

    
    return (
        <SelectorWrapper visible={visible}>
            <DonorDialog>
                <DonorSelectionComponent></DonorSelectionComponent>
                {/* Controls */}
                <Controls>
                    <EffektSecondaryButton onClick={abort}>Avbryt</EffektSecondaryButton>
                    <EffektButton onClick={confirm}>Confirm</EffektButton>
                </Controls>
            </DonorDialog>
        </SelectorWrapper>
    )
}