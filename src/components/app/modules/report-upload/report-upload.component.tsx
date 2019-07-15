import React, { useState } from 'react'
import { EffektButton } from '../../style/elements/button.style';
import { EffektFileInput } from '../../style/elements/fileinput.component';
import { ReportTable } from './report-upload.component.style';
import { useDispatch } from 'react-redux';
import { ReportType } from 'istanbul-reports';

interface IState {
    vippsReport: File | null,
    paypalReport: File | null,
    bankReport: File | null
}

export const ReportUpload: React.FunctionComponent = (props) => {
    const getDefaultState = (): IState => {
        return {
            vippsReport: null,
            paypalReport: null,
            bankReport: null
        }
    }
    
    const dispatch = useDispatch()
    const [state, setState] = useState<IState>(getDefaultState())

    const uploadReport = (type: ReportType) => {
        switch(type) {

        }
    }

    return (<ReportTable>
        <tr>
            <td><strong>Vipps</strong></td>
            <td><EffektFileInput onChange={(file: File) => setState({...state, vippsReport: file}) } id="vipps-upload"/></td>
            <td><EffektButton onClick={() => }>Upload</EffektButton></td>
        </tr>

        <tr>
            <td><strong>Paypal</strong></td>
            <td><EffektFileInput id="paypal-upload"/></td>
            <td><EffektButton>Upload</EffektButton></td>
        </tr>

        <tr>
            <td><strong>Bank OCR</strong></td>
            <td><EffektFileInput id="bank-upload"/></td>
            <td><EffektButton>Upload</EffektButton></td>
        </tr>
    </ReportTable>)
}