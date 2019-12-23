import React from 'react';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';

export const HomeComponent: React.FunctionComponent = (props) => {
    return (
        <Page>
            <MainHeader>Home</MainHeader>
            <div>
                <iframe 
                    style={
                        {
                            maxWidth: '1024px',
                            width: '100%',
                            height: '1800px'
                        }
                    } 
                    title="Scorecard" 
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTHfRf7Zzh3YUSKs2g2Mim6GkRYR5yRUuoPQa1b61Ul4y1dxEGVempdlYpwte0yrahyvoqqWrbOxAkC/pubhtml?gid=880180721&amp;single=true&amp;widget=true&amp;headers=false"> 
                    </iframe>
            </div>
        </Page>
    )
}
