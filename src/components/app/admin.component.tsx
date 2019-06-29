import React from 'react'
import { Switch, Route } from "react-router";
import homeComponent from "./pages/home/home.component";
import { MainNavigation } from "./nav/nav.component";

export const AdminPanel: React.FunctionComponent = () => {
    return (
        <div>
            <MainNavigation></MainNavigation>
            <Switch>
                <Route match="/" component={homeComponent}></Route>
                <Route match="/register" render={() => (<div>register</div>)}></Route>
            </Switch>
        </div>
    )
}