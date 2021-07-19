import React from 'react'
import { Switch, Route, Redirect } from "react-router";
import { HomeComponent } from "./pages/home/home.component";
import MainNavigation from "./nav.component";
import { AdminPanelWrapper } from './admin.component.style';
import { RegisterComponent } from './pages/register/register.component'
import DonorSelectionDialog from './modules/donors/selection/donor-selection-dialog.component';
import { DonorsPageComponent } from './pages/donors/donors.component';
import { EffektToastContainer } from './style/elements/toast/toast.style';
import { ProcessDonations } from './pages/process/process.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveOrganizationsAction } from '../store/organizations/organizations.action';
import { AppState } from '../models/state';
import { DonationsPageComponent } from './pages/donations/donations.component';
import { DonationPageComponent } from './pages/donations/donation.component';
import { GraphingPageComponent } from './pages/graphing/graphing.component';
import { DistributionsPageComponent } from './pages/distributions/distributions.component';
import { LogsPageComponent } from './pages/logs/logs.component';
import { LogEntryComponent } from './pages/logs/log-entry.component';
import { VippsAgreementsPageComponent } from './pages/vippsagreements/vippsagreements.component';
import { VippsAgreementChargesPageComponent } from './pages/vippsagreementcharges/vippsagreementcharges.component';
import { VippsPage } from './pages/vipps/vipps.component';
import { VippsAgreementPageComponent } from './pages/vippsagreements/vippsagreement';
import { VippsAgreementChargePageComponent } from './pages/vippsagreementcharges/vippsagreementcharge';

export const AdminPanel: React.FunctionComponent = () => {
    //TODO: Move someplace where it is run only once
    const dispatch = useDispatch()
    const organizations = useSelector((state: AppState) => state.organizations.active)
    if (!organizations) dispatch(fetchActiveOrganizationsAction.started())
    
    return (
        <div>
            <AdminPanelWrapper>
                <MainNavigation></MainNavigation>
                <Switch>
                    <Route exact path="/home" component={HomeComponent}></Route>
                    <Route exact path="/distributions" component={DistributionsPageComponent}></Route>
                    <Route exact path="/register" component={RegisterComponent}></Route>
                        <Route exact path="/register/process" component={ProcessDonations}></Route>
                    <Route exact path="/graphing" component={GraphingPageComponent}></Route>
                    <Route exact path="/reports" component={ReportsComponent}></Route>
                    <Route exact path="/donors" component={DonorsPageComponent}></Route>
                    <Route exact path="/donations" component={DonationsPageComponent}></Route>
                        <Route exact path="/donations/:id" component={DonationPageComponent}></Route>
                    <Route exact path="/settings" render={() => <div>Settings</div>}></Route>

                    <Route exact path="/logs" component={LogsPageComponent}></Route>
                        <Route exact path="/logs/:id" component={LogEntryComponent}></Route>
                    <Route exact path="/vipps" component={VippsPage}></Route>
                        <Route exact path="/vipps/agreements" component={VippsAgreementsPageComponent}></Route>
                        <Route exact path="/vipps/agreement/:id" component={VippsAgreementPageComponent}></Route>
                        <Route exact path="/vipps/charges" component={VippsAgreementChargesPageComponent}></Route>
                        <Route exact path="/vipps/charge/:id" component={VippsAgreementChargePageComponent}></Route>
                    <Route path="/" render={() => <Redirect to="/home"></Redirect>}></Route>
                </Switch> 
            </AdminPanelWrapper>
            {/* General overlay elements */}
            <EffektToastContainer />
            <DonorSelectionDialog></DonorSelectionDialog>
        </div>
    )
}