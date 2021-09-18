import React from 'react';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { AvtaleGiroReport } from '../../modules/avtalegiro/report/AvtalegiroReport';
import { HomeGrid } from './Home.style';
import { VippsReport } from '../../modules/vipps/report/VippsReport';
import { LogsReport } from '../../modules/logs/report/AvtalegiroReport';
import { MonthlyDonationsReport } from '../graphing/MonthlyDonationsReport';

export const HomeComponent: React.FunctionComponent = (props) => {
    return (
        <Page>
            <MainHeader>Home</MainHeader>
            <HomeGrid>
                <AvtaleGiroReport />
                <VippsReport />
                <MonthlyDonationsReport />
                <LogsReport />
            </HomeGrid>
        </Page>
    )
}
