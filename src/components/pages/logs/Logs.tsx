import React from 'react';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { LogsList } from '../../modules/logs/list/LogsList';

export const LogsPageComponent: React.FunctionComponent = (props) => {
    return (
        <Page>
            <MainHeader>Import logs</MainHeader>
            <LogsList></LogsList>
        </Page>
    )
}
