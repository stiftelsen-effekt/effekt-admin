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

  const currentDataOwner = useSelector((state: AppState) => state.dataOwner.current);
  const loading = useSelector((state: AppState) => state.reportProcessing.loading);

  const uploadReport = (type: ReportTypes, file: File | null) => {
    if (!file)
      if (loading) return toast.error('Already processing a report');
      else if (type !== ReportTypes.FACEBOOK) return toast.error('No file selected');
    if (!currentDataOwner) return toast.error('No data owner selected');
    getAccessTokenSilently().then((token) =>
      dispatch(
        uploadReportAction.started({ type, report: file, metaOwnerID: currentDataOwner.id, token })
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
            <OwnerSelect></OwnerSelect>
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
                uploadReport(ReportTypes.VIPPS, state.vippsReport);
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
                uploadReport(ReportTypes.PAYPAL, state.paypalReport);
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
                uploadReport(ReportTypes.OCR, state.ocrReport);
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
                uploadReport(ReportTypes.BANK, state.bankReport);
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
                uploadReport(ReportTypes.FACEBOOK, state.facebookReport);
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
