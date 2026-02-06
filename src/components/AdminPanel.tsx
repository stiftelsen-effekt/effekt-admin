import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomeComponent } from "./pages/home/Home";
import { MainNavigation } from "./Navigation";
import { AdminPanelWrapper } from "./AdminPanel.style";
import { RegisterComponent } from "./pages/register/Register";
import DonorSelectionDialog from "./modules/donors/selection/DonorSelectionDialog";
import { DonorsPageComponent } from "./pages/donors/Donors";
import { EffektToastContainer } from "./style/elements/toast/toast.style";
import { ProcessDonations } from "./pages/process/ProcessDonations";
import { ReportsComponent } from "./pages/reports/Reports";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActiveCauseareasAction,
  fetchAllCauseareasAction,
} from "../store/causeareas/causeareas.action";
import { AppState } from "../models/state";
import { DonationsPageComponent } from "./pages/donations/Donations";
import { DonationPageComponent } from "./pages/donations/Donation";
import { GraphingPageComponent } from "./pages/graphing/Graphing";
import { DistributionsPageComponent } from "./pages/distributions/Distributions";
import { LogsPageComponent } from "./pages/logs/Logs";
import { LogEntryComponent } from "./pages/logs/LogEntry";
import { VippsAgreementsPageComponent } from "./pages/vippsagreements/VippsAgreements";
import { VippsAgreementChargesPageComponent } from "./pages/vippsagreementcharges/VippsAgreementCharges";
import { VippsAgreementPageComponent } from "./pages/vippsagreements/vippsagreement";
import { AvtaleGiroPage } from "./pages/avtalegiro/AvtaleGiroPage";
import { AvtaleGiroAgreement } from "./pages/avtalegiro/AvtaleGiroAgreement/AvtaleGiroAgreement";
import { AvtaleGiroValidationPage } from "./pages/avtalegiro/validation/AvtaleGiroValidationPage";
import { DonorPage } from "./pages/donors/Donor";
import { DistributionComponent } from "./pages/distributions/Distribution";
import { AutoGiroPage } from "./pages/autogiro/AutoGiroPage";
import { AutoGiroAgreement } from "./pages/autogiro/AutoGiroAgreement/AutoGiroAgreement";
import { AutoGiroMandatesPage } from "./pages/autogiro/Mandates/AutoGiroMandatesPage";
import { FundraisersPage } from "./pages/fundraisers/Fundraisers";
import { VippsMatchingRulesPage } from "./pages/vippsmatchingrules/VippsMatchingRules";
import ReferralTypesPage from "./pages/referraltypes/ReferralTypes";
import CauseAreasPage from "./pages/causeareas/CauseAreas";
import OrganizationsPage from "./pages/organizations/Organizations";
import { APP_LOCALE } from "../config/config";

export const AdminPanel: React.FunctionComponent = () => {
  const locale = APP_LOCALE;

  //TODO: Move someplace where it is run only once
  const dispatch = useDispatch();
  const causeAreas = useSelector((state: AppState) => state.causeareas.active);

  useEffect(() => {
    if (!causeAreas) dispatch(fetchActiveCauseareasAction.started(undefined));
  }, [causeAreas, dispatch]);

  const allCauseAreas = useSelector((state: AppState) => state.causeareas.all);

  useEffect(() => {
    if (!allCauseAreas) dispatch(fetchAllCauseareasAction.started(undefined));
  }, [allCauseAreas, dispatch]);

  const allReferrals = useSelector((state: AppState) => state.referrals.all);
  useEffect(() => {
    if (!allReferrals) dispatch(fetchAllCauseareasAction.started(undefined));
  }, [allReferrals, dispatch]);
  const activeReferrals = useSelector((state: AppState) => state.referrals.active);
  useEffect(() => {
    if (!activeReferrals) dispatch(fetchActiveCauseareasAction.started(undefined));
  }, [activeReferrals, dispatch]);

  return (
    <div>
      <AdminPanelWrapper>
        <MainNavigation locale={locale}></MainNavigation>
        <Routes>
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/distributions" element={<DistributionsPageComponent />} />
          <Route path="/distributions/:id" element={<DistributionComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/register/process" element={<ProcessDonations />} />
          <Route path="/graphing" element={<GraphingPageComponent />} />
          <Route path="/reports" element={<ReportsComponent />} />
          <Route path="/donors" element={<DonorsPageComponent />} />
          <Route path="/donors/:id" element={<DonorPage />} />
          <Route path="/donations" element={<DonationsPageComponent />} />
          <Route path="/donations/:id" element={<DonationPageComponent />} />
          <Route path="/settings" element={<div>Settings</div>} />

          <Route path="/logs" element={<LogsPageComponent />} />
          <Route path="/logs/:id" element={<LogEntryComponent />} />

          <Route path="/vipps/agreements" element={<VippsAgreementsPageComponent />} />
          <Route path="/vipps/agreement/:id" element={<VippsAgreementPageComponent />} />
          <Route
            path="/vipps/agreements/charges"
            element={<VippsAgreementChargesPageComponent />}
          />
          <Route path="/vipps/matchingrules" element={<VippsMatchingRulesPage />} />

          <Route path="/avtalegiro" element={<AvtaleGiroPage />} />
          <Route path="/avtalegiro/:id" element={<AvtaleGiroAgreement />} />
          <Route path="/avtalegiro/validation/:date" element={<AvtaleGiroValidationPage />} />

          <Route path="/autogiro" element={<AutoGiroPage />} />
          <Route path="/autogiro/mandates/" element={<AutoGiroMandatesPage />} />
          <Route path="/autogiro/:id" element={<AutoGiroAgreement />} />

          <Route path="/fundraisers" element={<FundraisersPage />} />
          <Route path="/referraltypes" element={<ReferralTypesPage />} />
          <Route path="/causeareas" element={<CauseAreasPage />} />
          <Route path="/causeareas/:causeAreaId/organizations" element={<OrganizationsPage />} />
          <Route path="/organizations" element={<OrganizationsPage />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AdminPanelWrapper>
      {/* General overlay elements */}
      <EffektToastContainer />
      <DonorSelectionDialog></DonorSelectionDialog>
    </div>
  );
};
