import React from 'react'
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { DistributionsList } from '../../modules/distribution/list/DistributionsList';

export const DistributionsPageComponent: React.FunctionComponent = () => (
    <Page>
        <MainHeader>Distributions</MainHeader>
        <DistributionsList></DistributionsList>
    </Page>
)