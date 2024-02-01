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

export const ReportDownload: React.FC = () => {
  const shipments = useSelector((state: AppState) => state.reportProcessing.autoGiroShipments);
  const [selectedShipment, setSelectedShipment] = React.useState<number | undefined>(
    shipments?.sort((a, b) => (b.ID > a.ID ? -1 : 1))[0]?.ID,
  );

  useEffect(() => {
    setSelectedShipment(shipments?.sort((a, b) => (b.ID > a.ID ? -1 : 1))[0]?.ID);
  }, [shipments]);

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(fetchAutogiroShipmentsAction.started({ token }));
    });
  }, []);

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
                alert(o.currentTarget.value);
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
                getAccessTokenSilently().then((token) => {
                  viewFile(`${API_URL}/autogiro/shipment/${selectedShipment}/report`, token);
                });
              }}
            >
              Download stored (BFEP.IAGAG)
            </EffektButton>
          </td>
          <td>
            <EffektButton
              onClick={() => {
                getAccessTokenSilently().then((token) => {
                  viewFile(`${API_URL}/scheduled/autogiro`, token, "POST");
                });
              }}
            >
              New (BFEP.IAGAG)
            </EffektButton>
          </td>
        </tr>
      </ReportTable>
    </>
  );
};

const viewFile = async (url, token, method: "GET" | "POST" = "GET") => {
  fetch(url, { headers: { authorization: `Bearer ${token}` }, method })
    .then((response) => response.blob())
    .then((blob) => {
      var _url = window.URL.createObjectURL(blob);
      window.open(_url, "_blank")?.focus();
    })
    .catch((err) => {
      console.log(err);
    });
};
