import React, { useState } from 'react'
import { EffektButton } from '../../../style/elements/button.style'
import { EffektInput } from '../../../style/elements/input.style'
import { ResendRecieptWrapper } from './reciept.component.style'
import { useDispatch } from 'react-redux'
import { resendRecieptAction } from './reciept.actions'
import { toastError } from '../../../../../util/toasthelper'

export const RegisterRecieptComponent: React.FunctionComponent = () => {
    const [donorID, setDonorID] = useState<number | undefined>()
    const [donationID, setDonationID] = useState<number | undefined>()

    const dispatch = useDispatch()

    function resendReciept() {
        if (!donationID) {
            toastError("Failed to send","Missing donationID")
        }
        else {
            dispatch(resendRecieptAction.started({donationID, donorID}))
        }
    }

    return <ResendRecieptWrapper>
        <div>
            <div>Donation ID</div>
            <EffektInput placeholder="donationID" value={donationID || ""} onChange={(e) => setDonationID(parseInt(e.target.value))}></EffektInput>
        </div>
        <div>
            <div>Optional donor ID</div>
            <EffektInput placeholder="donorID" value={donorID || ""} onChange={(e) => setDonorID(parseInt(e.target.value))}></EffektInput>
        </div>
        <EffektButton onClick={(e) => resendReciept()}>Send</EffektButton>
    </ResendRecieptWrapper>
}