import React from 'react'
import { Switch, Route, Redirect } from "react-router";
import HomeComponent from "./pages/home/home.component";
import MainNavigation from "./nav/nav.component";
import { AdminPanelWrapper } from './admin.component.style';
import RegisterComponent from './pages/register/register.component';

export const AdminPanel: React.FunctionComponent = () => {
    return (
        <AdminPanelWrapper>
            <MainNavigation></MainNavigation>
            <Switch>
                <Route exact path="/home" component={HomeComponent}></Route>
                <Route exact path="/register" component={RegisterComponent}></Route>
                <Route path="/" render={() => <Redirect to="/home"></Redirect>}></Route>
            </Switch>
        </AdminPanelWrapper>
    )
}