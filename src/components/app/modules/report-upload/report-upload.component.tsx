import React from 'react'
import { EffektButton } from '../../style/elements/button.style';
import { EffektFileInput } from '../../style/elements/fileinput.component';
import { ReportTable } from './report-upload.component.style';

export const ReportUpload: React.FunctionComponent = (props) => {
    return (<ReportTable>
        <tr>
            <td><strong>Vipps</strong></td>
            <td><EffektFileInput id="vipps-upload"/></td>
            <td><EffektButton>Upload</EffektButton></td>
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