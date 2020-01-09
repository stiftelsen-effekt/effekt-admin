import React from 'react';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';

export const HomeComponent: React.FunctionComponent = (props) => {
    return (
        <Page>
            <MainHeader>Home</MainHeader>
        </Page>
    )
}
