import React, { useEffect } from "react";
import { EffektButton } from "../../style/elements/button.style";
import { ResourceSubHeader } from "../../style/elements/headers.style";
import { ReportTable } from "./ReportDownload.style";
import { EffektSelect } from "../../style/elements/select.style";
import { AppState } from "../../../models/state";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchAutogiroShipmentsAction } from "../../../store/report/report-download.action";
import { DateTime } from "luxon";
import { API_URL } from "../../../config/config";
import { infoToast } from "../../../util/toasthelper";
import { EffektLoadingSpinner } from "../../style/elements/loading-spinner";

export const ReportDownload: React.FC = () => {
  const shipments = useSelector((state: AppState) => state.reportProcessing.autoGiroShipments);
  const [selectedShipment, setSelectedShipment] = React.useState<number | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    setSelectedShipment(shipments?.sort((a, b) => (b.ID > a.ID ? -1 : 1))[0]?.ID);
  }, [shipments]);

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(fetchAutogiroShipmentsAction.started({ token }));
    });
  }, [dispatch, getAccessTokenSilently]);

  return (
    <>
      <ResourceSubHeader>AutoGiro</ResourceSubHeader>
      <ReportTable>
        <tr>
          <th>Previous shipment</th>
          <th>New shipment</th>
        </tr>
        <tr>
          <td>
            <EffektSelect
              onChange={(o) => {
                setSelectedShipment(parseInt(o.currentTarget.value));
              }}
            >
              {shipments
                ?.sort((a, b) => (a.ID > b.ID ? -1 : 1))
                .map((shipment) => (
                  <option key={shipment.ID} value={shipment.ID}>
                    {shipment.ID} - {DateTime.fromISO(shipment.sent_date).toFormat("dd.MM yyyy")}
                  </option>
                ))}
            </EffektSelect>
            <EffektButton
              onClick={(e) => {
                e.preventDefault();
                setIsLoading(true);
                getAccessTokenSilently().then((token) => {
                  viewFile(`${API_URL}/autogiro/shipment/${selectedShipment}/report`, token).then(
                    (res) => {
                      setIsLoading(false);
                    },
                  );
                });
              }}
            >
              Download stored (BFEP.IAGAG)
            </EffektButton>
          </td>
          <td>
            <EffektButton
              onClick={() => {
                setIsLoading(true);
                getAccessTokenSilently().then((token) => {
                  viewFile(`${API_URL}/scheduled/autogiro`, token, "POST").then((res) => {
                    if (res === true) {
                      dispatch(fetchAutogiroShipmentsAction.started({ token }));
                    } else {
                      infoToast("No new file", res);
                    }
                    setIsLoading(false);
                  });
                });
              }}
            >
              New (BFEP.IAGAG)
            </EffektButton>
          </td>
          <td>{isLoading && <EffektLoadingSpinner />}</td>
        </tr>
      </ReportTable>
    </>
  );
};

const viewFile = (url, token, method: "GET" | "POST" = "GET") => {
  return fetch(url, { headers: { authorization: `Bearer ${token}` }, method })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.status == 200 && response.content.file) {
        var _url = window.URL.createObjectURL(
          new Blob([response.content.file], { type: "plain/text" }),
        );
        var a = document.createElement("a");
        a.href = _url;
        a.download = response.content.filename ?? "report.txt";
        document.body.appendChild(a);
        a.click();
        a.remove();
        return true;
      } else if (
        response.status == 200 &&
        response.content.numCharges == 0 &&
        response.content.mandatesToBeConfirmed == 0
      ) {
        return "No new charges or mandates to be confirmed";
      } else {
        return "Something went wrong.";
      }
    })
    .catch((err) => {
      console.log(err);
      return "Error";
    });
};
