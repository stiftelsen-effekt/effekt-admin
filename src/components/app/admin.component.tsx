import React from 'react'
import { Switch, Route, Redirect } from "react-router";
import HomeComponent from "./pages/home/home.component";
import MainNavigation from "./nav/nav.component";
import { AdminPanelWrapper } from './admin.component.style';
import RegisterComponent from './pages/register/register.component'
import DonorSelectionDialog from './modules/donors/donor-selection-dialog.component';

export const AdminPanel: React.FunctionComponent = () => {
    return (
        <div>
            <AdminPanelWrapper>
                <MainNavigation></MainNavigation>
                <Switch>
                    <Route exact path="/home" component={HomeComponent}></Route>
                    <Route exact path="/register" component={RegisterComponent}></Route>
                    <Route exact path="/graphing" render={() => <div>Graphing</div>}></Route>
                    <Route exact path="/reports" render={() => <div>Reports</div>}></Route>
                    <Route path="/" render={() => <Redirect to="/home"></Redirect>}></Route>
                    <Route exact path="/donors" render={() => <div>Donors</div>}></Route>
                    <Route exact path="/settings" render={() => <div>Settings</div>}></Route>
                </Switch>
            </AdminPanelWrapper>
            {/* General overlay elements */}
            <DonorSelectionDialog></DonorSelectionDialog>
        </div>
    )
}