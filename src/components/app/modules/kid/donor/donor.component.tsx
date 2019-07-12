import React, { useState } from 'react'
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
    const [donorId, setDonorId] = useState<number>()

    let selectedDonor = null
    if (props.selectedDonor !== undefined) {
        const donor = props.selectedDonor

        if (donor.id !== donorId) setDonorId(donor.id)

        selectedDonor = (<SelectionWrapper>
            <DonorProperty>{donor.name}</DonorProperty>
            <DonorProperty>{donor.email}</DonorProperty>
            <DonorProperty>{shortDate(donor.registered)}</DonorProperty>
        </SelectionWrapper>)
    }

    return (
        <DonorSelectionWrapper>
            <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                <DonorSelectionInput>
                    <strong>Donor</strong>
                    <EffektText value={donorId} style={{ width: '70px' }} placeholder="DonorID"></EffektText>
                </DonorSelectionInput>
                {selectedDonor}
            </div>
            <EffektButton onClick={props.openDonorSelectionDialog}>Find</EffektButton>
        </DonorSelectionWrapper>
    )
}