import React from 'react'

import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { Link } from 'react-router-dom';
import { EffektButton } from '../../style/elements/button.style';

export const VippsPage: React.FunctionComponent = () => {
    return (
        <Page>
            <MainHeader>Vipps agreements</MainHeader>
            <Link to="vipps/agreements">See all agreements</Link>
            <br />
            <Link to="vipps/charges">See all charges</Link>
        </Page>
    )
}