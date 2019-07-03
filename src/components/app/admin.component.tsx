import React from 'react'
import { Switch, Route } from "react-router";
import HomeComponent from "./pages/home/home.component";
import MainNavigation from "./nav/nav.component";

export const AdminPanel: React.FunctionComponent = () => {
    return (
        <div>
            <MainNavigation></MainNavigation>
            <Switch>
                <Route match="/" component={HomeComponent}></Route>
                <Route match="/register" render={() => (<div>register</div>)}></Route>
            </Switch>
        </div>
    )
}