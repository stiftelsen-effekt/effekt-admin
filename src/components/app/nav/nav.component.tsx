import React from 'react'

import { MainNav } from './nav.component.style'

export const MainNavigation: React.FunctionComponent<any> = () => {
    return (
        <MainNav>
            <h3>main </h3>
            <ul>
                <li>Home</li>
                <li>Graphing</li>
                <li>Reports</li>
                <li>Register</li>
                <li>Donors</li>
                <li>Settings</li>
            </ul>

            <h2>Logout</h2>
        </MainNav>
    )
}