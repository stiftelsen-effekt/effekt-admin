import React from 'react'
import { Page } from '../../shared/elements/page.style';
import { MainHeader } from '../../shared/elements/headers.style';
import { DistributionsList } from '../../shared/distribution/list/distribution-list.component';

export const DistributionsPageComponent: React.FunctionComponent = () => (
    <Page>
        <MainHeader>Distributions</MainHeader>
        <DistributionsList></DistributionsList>
    </Page>
)