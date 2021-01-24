import React, { useState } from 'react'
import { EffektButton } from '../../style/elements/button.style';
import { EffektFileInput } from '../../style/elements/fileinput.component';
import { ReportTable } from '../report-upload/report-upload.component.style';
import { useDispatch, useSelector } from 'react-redux';
import { registerHistoricDonationsAction } from '../../../store/historic/historic.actions';
import { toast } from 'react-toastify';
import { AppState } from '../../../models/state';
import { Redirect } from 'react-router';
import { OwnerSelect } from '../owner-select/owner-select.component';

interface IState {
    csvFile: File | null
}

export const HistoricUpload: React.FunctionComponent = (props) => {
    const dispatch = useDispatch()
    const [state, setState] = useState<IState>({ csvFile: null })

    const currentDataOwner = useSelector((state: AppState) => state.dataOwner.current)

    const registerHistoricDonations = (file: File | null) => {
        if (!file) return toast.error("No file selected")
        if (file && file.type != "text/csv") {console.log(file.type); return toast.error("Only CSV files are supported")}
        if (!currentDataOwner) return toast.error("No data owner selected")
        dispatch(registerHistoricDonationsAction.started({csvFile: file, metaOwnerID: currentDataOwner.id}));
    }

    const registrationStarted: boolean = useSelector((state: AppState) => {return state.historic.inProgress})

    if (registrationStarted) return <Redirect to="/historic"></Redirect>

    return (<ReportTable>
        <tbody>
            <tr>
                <td><strong>Eier</strong></td>
                <td><OwnerSelect></OwnerSelect></td>
            </tr>
            <tr>
                <td><strong>Historic Donations (CSV)</strong></td>
                <td><EffektFileInput onChange={(file: File) => setState({...state, csvFile: file}) } id="historic-upload"/></td>
                <td><EffektButton onClick={() => { registerHistoricDonations(state.csvFile) }}>Process</EffektButton></td>
            </tr>
        </tbody>
    </ReportTable>)
}