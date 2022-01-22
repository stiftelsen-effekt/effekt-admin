/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react'
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, CurrentDistributionState } from '../../../models/state';
import { DistributionGraphComponent } from '../../modules/distribution/Graph';
import { ResourceHeader, ResourceSubHeader, SubHeader } from '../../style/elements/headers.style';
import { Page } from '../../style/elements/page.style';
import { HorizontalPanel } from '../donations/Donation.style';
import { fetchDistributionAction } from '../../../store/distributions/distribution.actions';
import { DistributionKeyInfo } from './DistributionKeyInfo';

interface IParams {
    id: string
}

export const DistributionComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({ match }: RouteComponentProps<IParams>) => {
    const current: CurrentDistributionState | undefined = useSelector((state: AppState) => state.distributions.current)
    const KID = match.params.id
    const dispatch = useDispatch()
    
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
                <SubHeader>Meta</SubHeader>
                <NavLink to={`/donors/${current.distribution.donor.id}`}>Go to donor</NavLink>
                <br />
                <NavLink to={`/distributions`}>See all distributions</NavLink>
            </Page>
        )
    }
    else {
        return (<Page>Loading...</Page>)
    }
}