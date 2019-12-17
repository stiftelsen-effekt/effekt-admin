import React, { useState } from 'react'
import { EffektButton } from '../../../style/elements/button.style'
import { EffektInput } from '../../../style/elements/input.style'
import { ResendRecieptWrapper } from './reciept.component.style'
import { useDispatch } from 'react-redux'
import { resendRecieptAction } from './reciept.actions'
import { toastError } from '../../../../../util/toasthelper'

export const RegisterRecieptComponent: React.FunctionComponent = () => {
    const [email, setEmail] = useState<string | undefined>()
    const [donationID, setDonationID] = useState<number | undefined>()

    const dispatch = useDispatch()

    function resendReciept() {
        if (!donationID) {
            toastError("Failed to send","Missing donationID")
        }
        else {
            dispatch(resendRecieptAction.started({donationID, email}))
        }
    }

    return <ResendRecieptWrapper>
        <div>
            <div>Donation ID</div>
            <EffektInput placeholder="donationID" value={donationID || ""} onChange={(e) => setDonationID(parseInt(e.target.value))}></EffektInput>
        </div>
        <div>
            <div>Optional email</div>
            <EffektInput placeholder="recipient" value={email || ""} onChange={(e) => setEmail(e.target.value)}></EffektInput>
        </div>
        <EffektButton onClick={(e) => resendReciept()}>Send</EffektButton>
    </ResendRecieptWrapper>
}