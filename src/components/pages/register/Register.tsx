import { MainHeader, SubHeader } from '../../style/elements/headers.style';
import React from 'react';
import { Page } from '../../style/elements/page.style';
import { SingleDonation } from '../../modules/single-donation/SingleDonation';
import { ReportUpload } from '../../modules/report-upload/ReportUpload';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../models/state';
import { fetchActiveOrganizationsAction } from '../../../store/organizations/organizations.action';
import { RegisterReceiptComponent } from '../../modules/donations/receipt/Receipt';
import { FBCampaignSharesRegistration } from '../../modules/facebook/FBCampaignSharesRegistration';
import { toast } from 'react-toastify';
import { processDonationsAction } from '../../../store/facebook/facebook.actions';
import { useAuth0 } from '@auth0/auth0-react';

export const RegisterComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const organizations = useSelector((state: AppState) => state.organizations.active);
  const fbCampaigns = useSelector((state: AppState) => state.reportProcessing.fbCampaigns);

  const dataOwners = useSelector((state: AppState) => state.dataOwner.owners);

  if (!organizations) {
    dispatch(fetchActiveOrganizationsAction.started(undefined));
    return <div>Loading organizations</div>;
  }

  if (fbCampaigns !== undefined && fbCampaigns.length === 0) {
    getAccessTokenSilently().then((token) => {
      const defaultOwner = dataOwners ? dataOwners.find((owner) => owner.default === true) : undefined
      if (!defaultOwner) return toast.error('Missing meta owner');
      dispatch(
        processDonationsAction.started({
          token,
          metaOwnerID: defaultOwner.id,
        })
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
          <FBCampaignSharesRegistration
            organizations={organizations}
            campaigns={fbCampaigns}
          ></FBCampaignSharesRegistration>
        </>
      )}

      <SubHeader>Process single donation</SubHeader>
      <SingleDonation organizations={organizations}></SingleDonation>

      <SubHeader>Resend receipt</SubHeader>
      <RegisterReceiptComponent></RegisterReceiptComponent>
    </Page>
  );
};
