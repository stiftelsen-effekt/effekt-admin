import React, { useEffect, useState } from "react";
import { EffektButton } from "../../style/elements/button.style";
import { EffektFileInput } from "../../style/elements/fileinput.component";
import { ReportTable } from "./ReportUpload.style";
import { useDispatch, useSelector } from "react-redux";
import { ReportTypes, uploadReportAction } from "../../../store/report/report-upload.actions";
import { toast } from "react-toastify";
import { AppState } from "../../../models/state";
import { Navigate, useNavigate } from "react-router-dom";
import { OwnerSelect } from "../owner-select/OwnerSelect";
import { EffektLoadingSpinner } from "../../style/elements/loading-spinner";
import { useAuth0 } from "@auth0/auth0-react";
import { EffektInput } from "../../style/elements/input.style";
import { fetchOwnersAction, setCurrentOwnerAction } from "../../../store/owners/owners.actions";
import { List } from "react-feather";
import { callForBlob, Method } from "../../../util/api";

interface IState {
  vippsReport: File | null;
  paypalReport: File | null;
  ocrReport: File | null;
  bankReport: File | null;
  bankTotalInReport: File | null;
  facebookReport: File | null;
  autoGiroReport: File | null;
  adoveoFundraiserReport: File | null;
  adoveoGiftcardReport: File | null;
  ku65Report: File | null;
  ku65Year: string;
  ku65Generating: boolean;
  resourceId?: string;
}

export const ReportUpload: React.FunctionComponent = (props) => {
  const getDefaultState = (): IState => {
    return {
      vippsReport: null,
      paypalReport: null,
      ocrReport: null,
      bankReport: null,
      bankTotalInReport: null,
      facebookReport: null,
      autoGiroReport: null,
      adoveoFundraiserReport: null,
      adoveoGiftcardReport: null,
      ku65Report: null,
      ku65Year: String(new Date().getFullYear() - 1),
      ku65Generating: false,
    };
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<IState>(getDefaultState());

  const currentDataOwner = useSelector((state: AppState) => state.dataOwner.current);
  const dataOwners = useSelector((state: AppState) => state.dataOwner.owners);
  const loading = useSelector((state: AppState) => state.reportProcessing.loading);

  useEffect(() => {
    if (!dataOwners) {
      dispatch(fetchOwnersAction.started(undefined));
    }
  }, [dataOwners, dispatch, getAccessTokenSilently]);

  const uploadReport = (type: ReportTypes, file: File | null, resourceId?: string) => {
    if (loading) return toast.error("Already processing a report");
    if (!file) return toast.error("No file selected");
    if (!currentDataOwner) return toast.error("No data owner selected");
    if (!resourceId && type === ReportTypes.ADOVEO_FUNDRAISER)
      return toast.error("No fundraiser ID selected");
    getAccessTokenSilently().then((token) =>
      dispatch(
        uploadReportAction.started({
          type,
          resourceId: resourceId,
          report: file,
          metaOwnerID: currentDataOwner.id,
          token,
        }),
      ),
    );
  };

  const downloadKu65Xml = async () => {
    if (state.ku65Generating) return;
    if (!state.ku65Report) return toast.error("No file selected");
    const year = parseInt(state.ku65Year, 10);
    if (!Number.isFinite(year) || year < 2000 || year > 2100) {
      return toast.error("Invalid year");
    }

    setState({ ...state, ku65Generating: true });
    try {
      const token = await getAccessTokenSilently();
      const formData = new FormData();
      formData.append("report", state.ku65Report);
      formData.append("year", String(year));
      const { blob, filename } = await callForBlob({
        endpoint: "/tax/skatteverket/ku65",
        method: Method.POST,
        token,
        formData,
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename ?? `ku65_${year}.xml`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to generate KU65 XML");
    } finally {
      setState((prev) => ({ ...prev, ku65Generating: false }));
    }
  };

  const shouldProcess: boolean = useSelector(
    (state: AppState) => state.reportProcessing.invalidTransactions.length !== 0,
  );

  if (shouldProcess) return <Navigate to="/register/process" replace />;
  if (!dataOwners) {
    return <p>Loading data owners...</p>;
  }

  return (
    <ReportTable>
      <tbody>
        <tr>
          <td>
            <strong>Eier</strong>
          </td>
          <td>
            <OwnerSelect
              value={currentDataOwner}
              onChange={(owner) => dispatch(setCurrentOwnerAction(owner))}
            ></OwnerSelect>
          </td>
        </tr>
        <tr>
          <td>
            <strong>🇳🇴 Vipps</strong>
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
                navigate("/vipps/matchingrules");
              }}
            >
              <List size={14} /> Matching
            </EffektButton>
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
            <strong>🇳🇴 Paypal</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, paypalReport: file })}
              id="paypal-upload"
            />
          </td>
          <td></td>
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
            <strong>🇳🇴 Bank OCR</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, ocrReport: file })}
              id="ocr-upload"
            />
          </td>
          <td></td>
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
            <strong>🇳🇴 Bank custom</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, bankReport: file })}
              id="bank-upload"
            />
          </td>
          <td></td>
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
            <strong>🇳🇴 Facebook</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, facebookReport: file })}
              id="facebook-upload"
            />
          </td>
          <td></td>
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
        <tr>
          <td>
            <strong>🇸🇪 Bank total in</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, bankTotalInReport: file })}
              id="bank-totalin-upload"
            />
          </td>
          <td></td>
          <td>
            <EffektButton
              onClick={() => {
                uploadReport(ReportTypes.BANK_TOTAL_IN, state.bankTotalInReport);
              }}
            >
              Process
            </EffektButton>
          </td>
        </tr>
        <tr>
          <td>
            <strong>🇸🇪 AutoGiro</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) => !loading && setState({ ...state, autoGiroReport: file })}
              id="autogiro-upload"
            />
          </td>
          <td></td>
          <td>
            <EffektButton
              onClick={() => {
                uploadReport(ReportTypes.AUTOGIRO, state.autoGiroReport);
              }}
            >
              Process
            </EffektButton>
          </td>
          {state.autoGiroReport !== null && loading && <EffektLoadingSpinner />}
        </tr>
        <tr>
          <td>
            <strong>🇸🇪 KU65 Tax XML</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) =>
                !state.ku65Generating && setState({ ...state, ku65Report: file })
              }
              id="ku65-upload"
            />
          </td>
          <td>
            <EffektInput
              value={state.ku65Year}
              onChange={(e) => setState({ ...state, ku65Year: e.target.value })}
              placeholder="Year"
              style={{ width: "80px" }}
            />
          </td>
          <td>
            <EffektButton onClick={downloadKu65Xml}>Generate XML</EffektButton>
          </td>
          {state.ku65Generating && <EffektLoadingSpinner />}
        </tr>
        <tr>
          <td>
            <strong>🇳🇴🇸🇪 Adoveo giftcards</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) =>
                !loading && setState({ ...state, adoveoGiftcardReport: file })
              }
              id="adoveo-giftcards-upload"
            />
          </td>
          <td>
            <EffektInput
              onChange={(e) => setState({ ...state, resourceId: e.target.value })}
              placeholder="Giftcard ID"
              style={{
                width: "110px",
              }}
            />
          </td>
          <td>
            <EffektButton
              onClick={() => {
                uploadReport(
                  ReportTypes.ADOVEO_GIFTCARDS,
                  state.adoveoGiftcardReport,
                  state.resourceId,
                );
              }}
            >
              Process
            </EffektButton>
          </td>
          {state.adoveoGiftcardReport !== null && loading && <EffektLoadingSpinner />}
        </tr>

        <tr>
          <td>
            <strong>🇳🇴🇸🇪 Adoveo fundraiser</strong>
          </td>
          <td>
            <EffektFileInput
              onChange={(file: File) =>
                !loading &&
                setState({
                  ...state,
                  adoveoFundraiserReport: file,
                })
              }
              id="adoveo-fundraiser-upload"
            />
          </td>
          <td>
            <EffektInput
              onChange={(e) => setState({ ...state, resourceId: e.target.value })}
              placeholder="Fundraiser ID"
              style={{
                width: "110px",
              }}
            />
          </td>
          <td>
            <EffektButton
              onClick={() => {
                uploadReport(
                  ReportTypes.ADOVEO_FUNDRAISER,
                  state.adoveoFundraiserReport,
                  state.resourceId,
                );
              }}
            >
              Process
            </EffektButton>
          </td>
          {state.adoveoFundraiserReport !== null && loading && <EffektLoadingSpinner />}
        </tr>
      </tbody>
    </ReportTable>
  );
};
