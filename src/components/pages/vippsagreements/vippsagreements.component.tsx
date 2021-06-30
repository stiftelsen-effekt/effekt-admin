import React from 'react'

import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { VippsAgreementList } from '../../modules/vippsagreements/list/vippsagreement-list.component';

export const VippsAgreementsPageComponent: React.FunctionComponent = () => {
    return (
        <Page>
            <MainHeader>Vipps agreements</MainHeader>
            <VippsAgreementList />
        </Page>
    )
}