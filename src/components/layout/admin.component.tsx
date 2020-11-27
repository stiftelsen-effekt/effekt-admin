import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { fetchActiveOrganizationsAction } from '../../store/organizations/organizations.action';
import { AppState } from '../../store/state';
import { DistributionsPageComponent } from '../pages/distributions/distributions.component';
import { DonationsPageComponent } from '../pages/donations/donations.component';
import { DonorsPageComponent } from '../pages/donors/donors.component';
import { GraphingPageComponent } from '../pages/graphing/graphing.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProcessDonations } from '../pages/process/process.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ReportsComponent } from '../pages/reports/reports.component';
import { DonorSelectionDialog } from '../shared/donors/selection/donor-selection-dialog.component';
import { EffektToastContainer } from '../shared/elements/toast/toast.style';
import { AdminPanelWrapper } from './admin.component.style';
import { MainNavigation } from './nav.component';

export const AdminPanel: React.FunctionComponent = () => {
  // TODO: Move someplace where it is run only once
  const dispatch = useDispatch();
  const organizations = useSelector(
    (state: AppState) => state.organizations.active,
  );
  if (!organizations)
    dispatch(fetchActiveOrganizationsAction.started(undefined));

  return (
    <div>
      <AdminPanelWrapper>
        <MainNavigation />
        <Switch>
          <Route exact path="/home" component={HomeComponent} />
          <Route
            exact
            path="/distributions"
            component={DistributionsPageComponent}
          />
          <Route exact path="/register" component={RegisterComponent} />
          <Route exact path="/register/process" component={ProcessDonations} />
          <Route exact path="/graphing" component={GraphingPageComponent} />
          <Route exact path="/reports" component={ReportsComponent} />
          <Route exact path="/donors" component={DonorsPageComponent} />
          <Route exact path="/donations" component={DonationsPageComponent} />
          <Route
            exact
            path="/donations/:id"
            component={DonationsPageComponent}
          />
          <Route exact path="/settings" render={() => <div>Settings</div>} />

          <Route path="/" render={() => <Redirect to="/home" />} />
        </Switch>
      </AdminPanelWrapper>
      {/* General overlay elements */}
      <EffektToastContainer />
      <DonorSelectionDialog />
    </div>
  );
};
