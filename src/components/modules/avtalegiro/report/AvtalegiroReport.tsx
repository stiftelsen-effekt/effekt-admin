import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { List } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../../../models/state";
import { IAvtalegiroReport } from "../../../../models/types";
import { fetchAvtaleGiroReportAction } from "../../../../store/avtalegiro/avtalegiro.actions";
import { thousandize } from "../../../../util/formatting";
import { EffektButton } from "../../../style/elements/button.style";
import {
  ReportActions,
  ReportContent,
  ReportHeader,
  ReportWrapper,
} from "../../shared/report/Report.style";

export const AvtaleGiroReport = () => {
  const report: IAvtalegiroReport = useSelector(
    (state: AppState) => state.avtaleGiroAgreements.report,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const handleAgreementListButtonClick = () => navigate("/avtalegiro");

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchAvtaleGiroReportAction.started({ token })),
    );
  }, [dispatch, getAccessTokenSilently]);

  return (
    <ReportWrapper>
      <ReportHeader>AvtaleGiro</ReportHeader>
      <ReportContent>
        <h4>There are currently {report.activeAgreementCount} active agreements</h4>
        <table width="100%">
          <tbody>
            <tr>
              <td>Median agreement sum</td>
              <td>{thousandize(report.medianAgreementSum)} kr</td>
            </tr>
            <tr>
              <td>Average agreement sum</td>
              <td>{thousandize(report.averageAgreementSum)} kr</td>
            </tr>
            <tr>
              <td>Total agreement sum</td>
              <td>{thousandize(report.totalAgreementSum)} kr</td>
            </tr>
          </tbody>
        </table>
        <h4>Changes this month</h4>
        <table width="100%">
          <tbody>
            <tr>
              <td>Agreements drafted</td>
              <td>{report.draftedThisMonth}</td>
              <td style={{ textAlign: "right" }}>({thousandize(report.sumDraftedThisMonth)} kr)</td>
            </tr>
            <tr>
              <td>Agreements activated</td>
              <td>{report.activatedThisMonth}</td>
              <td style={{ textAlign: "right" }}>
                ({thousandize(report.sumActivatedThisMonth)} kr)
              </td>
            </tr>
            <tr>
              <td>Agreements stopped</td>
              <td>{report.stoppedThisMonth}</td>
              <td style={{ textAlign: "right" }}>({thousandize(report.sumStoppedThisMonth)} kr)</td>
            </tr>
          </tbody>
        </table>
      </ReportContent>
      <ReportActions>
        <EffektButton onClick={handleAgreementListButtonClick}>
          <List size={16} color={"white"}></List>
          <span>Agreements</span>
        </EffektButton>
      </ReportActions>
    </ReportWrapper>
  );
};
