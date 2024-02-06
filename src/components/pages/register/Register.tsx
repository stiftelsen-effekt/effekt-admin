import { MainHeader, SubHeader } from "../../style/elements/headers.style";
import React, { useEffect } from "react";
import { Page } from "../../style/elements/page.style";
import { SingleDonation } from "../../modules/single-donation/SingleDonation";
import { ReportUpload } from "../../modules/report-upload/ReportUpload";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../models/state";
import { fetchActiveCauseareasAction } from "../../../store/causeareas/causeareas.action";
import { RegisterReceiptComponent } from "../../modules/donations/receipt/Receipt";
import { toast } from "react-toastify";
import { processDonationsAction } from "../../../store/facebook/facebook.actions";
import { useAuth0 } from "@auth0/auth0-react";
import { ReportDownload } from "../../modules/report-download/ReportDownload";

export const RegisterComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const causeAreas = useSelector((state: AppState) => state.causeareas.active);
  const fbCampaigns = useSelector((state: AppState) => state.reportProcessing.fbCampaigns);

  const currentSelectedOwner = useSelector((state: AppState) => state.dataOwner.current);

  useEffect(() => {
    if (!causeAreas) dispatch(fetchActiveCauseareasAction.started(undefined));
  }, [causeAreas, dispatch]);

  if (!causeAreas) {
    return <div>Loading organizations</div>;
  }

  if (fbCampaigns !== undefined && fbCampaigns.length === 0) {
    getAccessTokenSilently().then((token) => {
      if (!currentSelectedOwner) return toast.error("Missing meta owner");
      dispatch(
        processDonationsAction.started({
          token,
          metaOwnerID: currentSelectedOwner.id,
        }),
      );
    });
  }

  return (
    <Page>
      <MainHeader>Register donations</MainHeader>

      <SubHeader>Upload report</SubHeader>
      <ReportUpload></ReportUpload>

      {fbCampaigns !== undefined && fbCampaigns.length > 0 && (
        <>
          <SubHeader>Register Facebook campaign shares</SubHeader>
          <div>Support for multiple cause areas missing</div>
          {/**
           * TODO: Support multiple cause areas
           * <FBCampaignSharesRegistration
           * organizations={organizations}
           * campaigns={fbCampaigns}
           * ></FBCampaignSharesRegistration>
           */}
        </>
      )}

      <SubHeader>Download reports</SubHeader>
      <ReportDownload></ReportDownload>

      <SubHeader>Process single donation</SubHeader>
      <SingleDonation></SingleDonation>

      <SubHeader>Resend receipt</SubHeader>
      <RegisterReceiptComponent></RegisterReceiptComponent>
    </Page>
  );
};
