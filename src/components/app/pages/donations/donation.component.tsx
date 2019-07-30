import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Page } from '../../style/elements/page.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { IDonation } from '../../../../models/types';
import { fetchDonationAction, clearCurrentDonation } from '../../../../store/donations/donation.actions';
import { DistributionGraphComponent } from '../../modules/distribution/graph.component';
import { ResourceHeader, ResourceSubHeader, SubHeader } from '../../style/elements/headers.style';
import { HorizontalPanel } from './donation.component.style';

interface IParams {
    id: string
}

export const DonationPageComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({ match }: RouteComponentProps<IParams>) => {
    const donationID = parseInt(match.params.id)
    const dispatch = useDispatch()

    const donation: IDonation | undefined = useSelector((state: AppState) => state.donations.currentDonation)

    if (donation && donation.id !== donationID)  {
        dispatch(clearCurrentDonation())
        dispatch(fetchDonationAction.started({ id: donationID }))
    } 
    else if (!donation) {
        dispatch(fetchDonationAction.started({ id: donationID }))
    }

    const getDistributionGraph = () => {
        if (donation && donation.distribution) {
            return <DistributionGraphComponent distribution={donation.distribution}></DistributionGraphComponent>
        }
    }

    if (donation) {
        return (
            <Page>
                <ResourceHeader hasSubHeader={true}>Donation {donation.id}</ResourceHeader>
                <ResourceSubHeader>KID {donation.KID}</ResourceSubHeader>

                <SubHeader>Keyinfo</SubHeader>
                <HorizontalPanel>
                    <div style={{ width: '400px', height: '380px' }}>
                        {getDistributionGraph()}
                    </div>
                </HorizontalPanel>

                <SubHeader>Meta</SubHeader>
            </Page>
        )
    }
    else {
        return (<Page>Loading...</Page>)
    }
}