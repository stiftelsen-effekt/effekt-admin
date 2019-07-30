import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Page } from '../../style/elements/page.style';

interface IParams {
    id: string
}

export const DonationPageComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({ match }: RouteComponentProps<IParams>) => {


    return (
        <Page>
            <div>{match.params.id}</div>
        </Page>
    )
}