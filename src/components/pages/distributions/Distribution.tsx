/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, CurrentDistributionState } from '../../../models/state';
import { DistributionGraphComponent } from '../../modules/distribution/Graph';
import { ResourceHeader, ResourceSubHeader, SubHeader } from '../../style/elements/headers.style';
import { Page } from '../../style/elements/page.style';
import { HorizontalPanel } from '../donations/Donation.style';
import { fetchDistributionAction } from '../../../store/distributions/distribution.actions';
import { DistributionKeyInfo } from './DistributionKeyInfo';
import { DonationsList } from '../../modules/donations/list/DonationsList';
import { EffektButton } from '../../style/elements/button.style';
import { PieChart, User } from 'react-feather';
import { useHistory } from 'react-router';
import { EffektButtonsWrapper } from '../../style/elements/buttons-wrapper/EffektButtonsWrapper.style';

interface IParams {
    id: string
}

export const DistributionComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({ match }: RouteComponentProps<IParams>) => {
    const current: CurrentDistributionState | undefined = useSelector((state: AppState) => state.distributions.current)
    const KID = match.params.id
    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(() => {
        dispatch(fetchDistributionAction.started({ kid: KID }))
    }, [KID, dispatch]);
    
    // TEMPORARY
    useEffect(() => {
        console.log(current)
    }, [current]);

    if (current && current.distribution && current.distribution.shares) {
        return (
            <Page>
                <ResourceHeader hasSubHeader={true}>Distribution {KID}</ResourceHeader>
                <ResourceSubHeader></ResourceSubHeader>

                <SubHeader>Key info</SubHeader>
                <HorizontalPanel>
                    <div style={{ width: '400px', height: '380px' }}>
                        <DistributionGraphComponent distribution={current.distribution.shares}></DistributionGraphComponent>
                    </div>
                
                    <DistributionKeyInfo distribution={current}></DistributionKeyInfo>
                </HorizontalPanel>
                <SubHeader>Donations</SubHeader>
                <DonationsList donations={current.affiliatedDonations} hideDeleteButton={true} hideDonorName={true} hideKID={true} defaultPageSize={10} />
                <SubHeader>Meta</SubHeader>

                <EffektButtonsWrapper>
                    <EffektButton onClick={() => {
                        history.push('/donors/' + current.distribution?.donor.id)
                    }}>
                        <User size={16} />Donor
                    </EffektButton>
                    <EffektButton onClick={() => {
                        history.push('/distributions')
                    }}>
                        <PieChart size={16} />All Distributions
                    </EffektButton>
                </EffektButtonsWrapper>
            </Page>
        )
    }
    else {
        return (<Page>Loading...</Page>)
    }
}