/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react'
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IDistribution } from '../../../models/types';
import { AppState } from '../../../models/state';
import { DistributionGraphComponent } from '../../modules/distribution/Graph';
import { ResourceHeader, ResourceSubHeader, SubHeader } from '../../style/elements/headers.style';
import { Page } from '../../style/elements/page.style';
import { HorizontalPanel } from '../donations/Donation.style';

interface IParams {
    id: string
}

export const DistributionComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({ match }: RouteComponentProps<IParams>) => {
    const distribution: IDistribution | undefined = useSelector((state: AppState) => state.distributions.current)
    const KID = match.params.id
    const dispatch = useDispatch()
    
    useEffect(() => {
        // TODO: Create fetchDistributionAction
        //dispatch(fetchDistributionAction.started({ kid: KID }))
      }, [KID, dispatch]);

    if (distribution) {
        return (
            <Page>
                <ResourceHeader hasSubHeader={true}>Distribution KID: {KID}</ResourceHeader>
                <ResourceSubHeader>{distribution.donor}</ResourceSubHeader>

                <SubHeader>Key info</SubHeader>
                <HorizontalPanel>
                    <div style={{ width: '400px', height: '380px' }}>
                        <DistributionGraphComponent distribution={distribution.shares}></DistributionGraphComponent>
                    </div>
                
                    {/* <AvtaleGiroKeyInfo agreement={avtaleGiro}></AvtaleGiroKeyInfo> */}
                </HorizontalPanel>
                <SubHeader>Meta</SubHeader>
                <NavLink to={`/distributions`}>See all distributions</NavLink>
            </Page>
        )
    }
    else {
        return (<Page>Loading...</Page>)
    }
}