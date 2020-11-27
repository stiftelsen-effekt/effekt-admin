import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router';
import { EffektButton } from '../elements/button.style';
import { EffektFileInput } from '../elements/fileinput.component';
import { ReportTable } from './report-upload.component.style';
import { AppState } from '../../../store/state';
import { OwnerSelect } from '../owner-select/owner-select.component';
import {
  ReportTypes,
  uploadReportAction,
} from '../../../store/report/report-upload.actions';

interface IState {
  vippsReport: File | null;
  paypalReport: File | null;
  ocrReport: File | null;
  bankReport: File | null;
}

export const ReportUpload: React.FunctionComponent = () => {
  const getDefaultState = (): IState => {
    return {
      vippsReport: null,
      paypalReport: null,
      ocrReport: null,
      bankReport: null,
    };
  };

  const dispatch = useDispatch();
  const [state, setState] = useState<IState>(getDefaultState());

  const currentDataOwner = useSelector(
    (appState: AppState) => appState.dataOwner.current,
  );

  const uploadReport = (type: ReportTypes, file: File | null) => {
    if (!file || file === null) {
      toast.error('No file selected');
    } else if (!currentDataOwner || currentDataOwner === null) {
      toast.error('No data owner selected');
    } else {
      dispatch(
        uploadReportAction.started({
          type,
          report: file,
          metaOwnerID: currentDataOwner.id,
        }),
      );
    }
  };

  const shouldProcess: boolean = useSelector(
    (appState: AppState) =>
      appState.reportProcessing.invalidTransactions.length !== 0,
  );

  if (shouldProcess) return <Redirect to="/register/process" />;

  return (
    <ReportTable>
      <tbody>
        <tr>
          <td>
            <strong>Eier</strong>
          </td>
          <td>
            <OwnerSelect />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Vipps</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => {
                setState({ ...state, vippsReport: file });
              }}
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
        </tr>

        <tr>
          <td>
            <strong>Paypal</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => {
                setState({ ...state, paypalReport: file });
              }}
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
        </tr>

        <tr>
          <td>
            <strong>Bank OCR</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => setState({ ...state, ocrReport: file })}
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
        </tr>

        <tr>
          <td>
            <strong>Bank custom</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => {
                setState({ ...state, bankReport: file });
              }}
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
        </tr>
      </tbody>
    </ReportTable>
  );
};
