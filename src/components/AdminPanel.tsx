import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router";
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
import { AdminPanelLocale } from "../models/locale";
import { FundraisersPage } from "./pages/fundraisers/Fundraisers";
import { VippsMatchingRulesPage } from "./pages/vippsmatchingrules/VippsMatchingRules";
import ReferralTypesPage from "./pages/referraltypes/ReferralTypes";
import CauseAreasPage from "./pages/causeareas/CauseAreas";
import OrganizationsPage from "./pages/organizations/Organizations";

export const AdminPanel: React.FunctionComponent = () => {
  const locale = process.env.REACT_APP_LOCALE as AdminPanelLocale;

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
        <Switch>
          <Route exact path="/home" component={HomeComponent}></Route>
          <Route exact path="/distributions" component={DistributionsPageComponent}></Route>
          <Route exact path="/distributions/:id" component={DistributionComponent}></Route>
          <Route exact path="/register" component={RegisterComponent}></Route>
          <Route exact path="/register/process" component={ProcessDonations}></Route>
          <Route exact path="/graphing" component={GraphingPageComponent}></Route>
          <Route exact path="/reports" component={ReportsComponent}></Route>
          <Route exact path="/donors" component={DonorsPageComponent}></Route>
          <Route exact path="/donors/:id" component={DonorPage}></Route>
          <Route exact path="/donations" component={DonationsPageComponent}></Route>
          <Route exact path="/donations/:id" component={DonationPageComponent}></Route>
          <Route exact path="/settings" render={() => <div>Settings</div>}></Route>

          <Route exact path="/logs" component={LogsPageComponent}></Route>
          <Route exact path="/logs/:id" component={LogEntryComponent}></Route>

          <Route exact path="/vipps/agreements" component={VippsAgreementsPageComponent}></Route>
          <Route exact path="/vipps/agreement/:id" component={VippsAgreementPageComponent}></Route>
          <Route
            exact
            path="/vipps/agreements/charges"
            component={VippsAgreementChargesPageComponent}
          ></Route>
          <Route exact path="/vipps/matchingrules" component={VippsMatchingRulesPage}></Route>

          <Route exact path="/avtalegiro" component={AvtaleGiroPage}></Route>
          <Route exact path="/avtalegiro/:id" component={AvtaleGiroAgreement}></Route>

          <Route
            exact
            path="/avtalegiro/validation/:date"
            component={AvtaleGiroValidationPage}
          ></Route>

          <Route exact path="/autogiro" component={AutoGiroPage}></Route>
          <Route exact path="/autogiro/mandates/" component={AutoGiroMandatesPage}></Route>
          <Route exact path="/autogiro/:id" component={AutoGiroAgreement}></Route>

          <Route exact path="/fundraisers" component={FundraisersPage}></Route>

          <Route exact path="/referraltypes" component={ReferralTypesPage}></Route>

          <Route exact path="/causeareas" component={CauseAreasPage}></Route>
          <Route
            exact
            path="/causeareas/:causeAreaId/organizations"
            component={OrganizationsPage}
          ></Route>
          <Route exact path="/organizations" component={OrganizationsPage}></Route>

          <Route path="/" render={() => <Redirect to="/home"></Redirect>}></Route>
        </Switch>
      </AdminPanelWrapper>
      {/* General overlay elements */}
      <EffektToastContainer />
      <DonorSelectionDialog></DonorSelectionDialog>
    </div>
  );
};
