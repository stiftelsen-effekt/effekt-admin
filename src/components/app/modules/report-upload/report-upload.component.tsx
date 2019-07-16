import React, { useState } from 'react'
import { EffektButton } from '../../style/elements/button.style';
import { EffektFileInput } from '../../style/elements/fileinput.component';
import { ReportTable } from './report-upload.component.style';
import { useDispatch } from 'react-redux';
import { ReportTypes, uploadReportAction } from './report-upload.actions';
import { toast } from 'react-toastify';

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

    const uploadReport = (type: ReportTypes, file: File | null) => {
        if (!file) return toast("No file selected")
        dispatch(uploadReportAction.started({type, report: file}));
    }

    return (<ReportTable>
        <tbody>
            <tr>
                <td><strong>Vipps</strong></td>
                <td><EffektFileInput onChange={(file: File) => setState({...state, vippsReport: file}) } id="vipps-upload"/></td>
                <td><EffektButton onClick={() => { uploadReport(ReportTypes.VIPPS, state.vippsReport) }}>Process</EffektButton></td>
            </tr>

            <tr>
                <td><strong>Paypal</strong></td>
                <td><EffektFileInput onChange={(file: File) => setState({...state, paypalReport: file}) } id="paypal-upload"/></td>
                <td><EffektButton onClick={() => { uploadReport(ReportTypes.PAYPAL, state.paypalReport) }}>Process</EffektButton></td>
            </tr>

            <tr>
                <td><strong>Bank OCR</strong></td>
                <td><EffektFileInput onChange={(file: File) => setState({...state, bankReport: file}) } id="bank-upload"/></td>
                <td><EffektButton onClick={() => { uploadReport(ReportTypes.BANK, state.bankReport) }}>Process</EffektButton></td>
            </tr>
        </tbody>
    </ReportTable>)
}