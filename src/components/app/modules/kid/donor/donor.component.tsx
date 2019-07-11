import React from 'react'
import { DonorSelectionWrapper, SelectionWrapper, DonorSelectionInput, DonorProperty } from "./donor.component.style";
import { EffektButton } from "../../../style/elements/button.style";
import { IDonor } from "../../../../../models/dbtypes";
import { EffektText } from '../../../style/elements/text.style';
import { shortDate } from '../../../../../util/formatting';

interface IProps {
    selectedDonor: IDonor | undefined,
    openDonorSelectionDialog: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}

export const KIDDonorComponent: React.FunctionComponent<IProps> = (props) => {
    let selectedDonor = null
    if (props.selectedDonor !== undefined) {
        const donor = props.selectedDonor

        selectedDonor = (<SelectionWrapper>
            <DonorProperty>{donor.name}</DonorProperty>
            <DonorProperty>{donor.email}</DonorProperty>
            <DonorProperty>{shortDate(donor.registered)}</DonorProperty>
        </SelectionWrapper>)
    }

    let donorID = (props.selectedDonor ? props.selectedDonor.id : undefined)

    return (
        <DonorSelectionWrapper>
            <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                <DonorSelectionInput>
                    <strong>Donor</strong>
                    <EffektText value={donorID} style={{ width: '70px' }} placeholder="DonorID"></EffektText>
                </DonorSelectionInput>
                {selectedDonor}
            </div>
            <EffektButton onClick={props.openDonorSelectionDialog}>Find</EffektButton>
        </DonorSelectionWrapper>
    )
}