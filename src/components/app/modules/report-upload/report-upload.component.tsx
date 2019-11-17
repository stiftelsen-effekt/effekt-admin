import React, { useState } from 'react'
import { EffektButton } from '../../style/elements/button.style';
import { EffektFileInput } from '../../style/elements/fileinput.component';
import { ReportTable } from './report-upload.component.style';
import { useDispatch, useSelector } from 'react-redux';
import { ReportTypes, uploadReportAction } from './report-upload.actions';
import { toast } from 'react-toastify';
import { AppState } from '../../../../models/state';
import { Redirect } from 'react-router';
import { OwnerSelect } from '../owner-select/owner-select.component';

interface IState {
    vippsReport: File | null,
    paypalReport: File | null,
    ocrReport: File | null,
    bankReport: File | null,
}

export const ReportUpload: React.FunctionComponent = (props) => {
    const getDefaultState = (): IState => {
        return {
            vippsReport: null,
            paypalReport: null,
            ocrReport: null,
            bankReport: null
        }
    }
    
    const dispatch = useDispatch()
    const [state, setState] = useState<IState>(getDefaultState())

    const currentDataOwner = useSelector((state: AppState) => state.dataOwner.current)

    const uploadReport = (type: ReportTypes, file: File | null) => {
        if (!file) return toast.error("No file selected")
        if (!currentDataOwner) return toast.error("No data owner selected")
        dispatch(uploadReportAction.started({type, report: file, metaOwnerID: currentDataOwner.id}));
    }

    const shouldProcess: boolean = useSelector((state: AppState) => state.reportProcessing.invalidTransactions.length !== 0)

    if (shouldProcess) return <Redirect to="/register/process"></Redirect>

    return (<ReportTable>
        <tbody>
            <tr>
                <td><strong>Eier</strong></td>
                <td><OwnerSelect></OwnerSelect></td>
            </tr>
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
                <td><EffektFileInput onChange={(file: File) => setState({...state, ocrReport: file}) } id="ocr-upload"/></td>
                <td><EffektButton onClick={() => { uploadReport(ReportTypes.OCR, state.ocrReport) }}>Process</EffektButton></td>
            </tr>

            <tr>
                <td><strong>Bank custom</strong></td>
                <td><EffektFileInput onChange={(file: File) => setState({...state, bankReport: file}) } id="bank-upload"/></td>
                <td><EffektButton onClick={() => { uploadReport(ReportTypes.BANK, state.bankReport) }}>Process</EffektButton></td>
            </tr>
        </tbody>
    </ReportTable>)
}