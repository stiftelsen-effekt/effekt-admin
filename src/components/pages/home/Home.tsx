import React from 'react';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';

export const HomeComponent: React.FunctionComponent = (props) => {
    return (
        <Page>
            <MainHeader>Home</MainHeader>
            <div>
                <iframe 
                    width="1100" 
                    height="3500"
                    title="Scorecard"
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS6Wiw_6vcspIHq6J2byvqmlDFadG5sF4cFQvwhm2z21ZYbfBW0tQknixlu2hV6lDi_TV16iwUYcJ3W/pubhtml?gid=880180721&amp;single=true&amp;widget=true&amp;headers=false&amp;scrolling=no">
                </iframe>
            </div>
        </Page>
    )
}
