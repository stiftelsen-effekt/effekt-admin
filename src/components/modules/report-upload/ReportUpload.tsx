import React, { useState } from 'react';
import { EffektButton } from '../../style/elements/button.style';
import { EffektFileInput } from '../../style/elements/fileinput.component';
import { ReportTable } from './ReportUpload.style';
import { useDispatch, useSelector } from 'react-redux';
import { ReportTypes, uploadReportAction } from '../../../store/report/report-upload.actions';
import { toast } from 'react-toastify';
import { AppState } from '../../../models/state';
import { Redirect } from 'react-router';
import { OwnerSelect } from '../owner-select/OwnerSelect';
import { EffektLoadingSpinner } from '../../style/elements/loading-spinner';
import { useAuth0 } from '@auth0/auth0-react';

interface IState {
  vippsReport: File | null;
  paypalReport: File | null;
  ocrReport: File | null;
  bankReport: File | null;
  facebookReport: File | null;
  currentDataOwner?: number;
}

export const ReportUpload: React.FunctionComponent = (props) => {
  const getDefaultState = (): IState => {
    return {
      vippsReport: null,
      paypalReport: null,
      ocrReport: null,
      bankReport: null,
      facebookReport: null,
    };
  };

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<IState>(getDefaultState());

  const loading = useSelector((state: AppState) => state.reportProcessing.loading);

  const uploadReport = (type: ReportTypes, file: File | null, metaOwnerID?: number) => {
    if (!file)
      if (loading) return toast.error('Already processing a report');
      else return toast.error('No file selected');
    if (!metaOwnerID) return toast.error('No data owner selected');
    getAccessTokenSilently().then((token) =>
      dispatch(
        uploadReportAction.started({ type, report: file, metaOwnerID: metaOwnerID, token })
      )
    );
  };

  const shouldProcess: boolean = useSelector(
    (state: AppState) => state.reportProcessing.invalidTransactions.length !== 0
  );

  if (shouldProcess) return <Redirect to="/register/process"></Redirect>;

  return (
    <ReportTable>
      <tbody>
        <tr>
          <td>
            <strong>Eier</strong>
          </td>
          <td>
            <OwnerSelect
              onChanged={ (metaOwnerId: number) => setState( { ...state,
                                                  currentDataOwner: metaOwnerId })}
              ></OwnerSelect>
          </td>
        </tr>
        <tr>
          <td>
            <strong>Vipps</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, vippsReport: file })}
              id="vipps-upload"
            />
          </td>
          <td>
            <EffektButton
              onClick={() => {
                uploadReport(ReportTypes.VIPPS, state.vippsReport, state.currentDataOwner);
              }}
            >
              Process
            </EffektButton>
          </td>
          {state.vippsReport !== null && loading && <EffektLoadingSpinner />}
        </tr>

        <tr>
          <td>
            <strong>Paypal</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, paypalReport: file })}
              id="paypal-upload"
            />
          </td>
          <td>
            <EffektButton
              onClick={() => {
                uploadReport(ReportTypes.PAYPAL, state.paypalReport, state.currentDataOwner);
              }}
            >
              Process
            </EffektButton>
          </td>
          {state.paypalReport !== null && loading && <EffektLoadingSpinner />}
        </tr>

        <tr>
          <td>
            <strong>Bank OCR</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, ocrReport: file })}
              id="ocr-upload"
            />
          </td>
          <td>
            <EffektButton
              onClick={() => {
                uploadReport(ReportTypes.OCR, state.ocrReport, state.currentDataOwner);
              }}
            >
              Process
            </EffektButton>
          </td>
          {state.ocrReport !== null && loading && <EffektLoadingSpinner />}
        </tr>

        <tr>
          <td>
            <strong>Bank custom</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, bankReport: file })}
              id="bank-upload"
            />
          </td>
          <td>
            <EffektButton
              onClick={() => {
                uploadReport(ReportTypes.BANK, state.bankReport, state.currentDataOwner);
              }}
            >
              Process
            </EffektButton>
          </td>
          {state.bankReport !== null && loading && <EffektLoadingSpinner />}
        </tr>

        <tr>
          <td>
            <strong>Facebook</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, facebookReport: file })}
              id="facebook-upload"
            />
          </td>
          <td>
            <EffektButton
              onClick={() => {
                uploadReport(ReportTypes.FACEBOOK, state.facebookReport, state.currentDataOwner);
              }}
            >
              Process
            </EffektButton>
          </td>
          {state.facebookReport !== null && loading && <EffektLoadingSpinner />}
        </tr>
      </tbody>
    </ReportTable>
  );
};
