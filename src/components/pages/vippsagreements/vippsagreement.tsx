import React from 'react'
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { Page } from '../../style/elements/page.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../models/state';
import { IVippsAgreement } from '../../../models/types';
import { ResourceHeader, ResourceSubHeader, SubHeader } from '../../style/elements/headers.style';
import { HorizontalPanel } from '../donations/donation.component.style';
import { fetchVippsAgreementAction } from '../../../store/vipps/vipps.actions';

interface IParams {
    id: string
}

export const VippsAgreementPageComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({ match }: RouteComponentProps<IParams>) => {
    const agreementID = match.params.id
    const dispatch = useDispatch()

    const agreement: IVippsAgreement | undefined = useSelector((state: AppState) => state.vippsAgreements.currentAgreement)
    
    if (agreement && agreement.id !== agreementID)  {
        //dispatch(clearCurrentDonation())
        dispatch(fetchVippsAgreementAction.started({ id: agreementID }))
    } 
    else if (!agreement) {
        dispatch(fetchVippsAgreementAction.started({ id: agreementID }))
    }

    if (agreement) {
        return (
            <Page>
                <ResourceHeader hasSubHeader={true}>Agreement {agreementID}</ResourceHeader>
                <ResourceSubHeader>KID {agreement.KID}</ResourceSubHeader>

                <SubHeader>Keyinfo</SubHeader>
                <HorizontalPanel>
     
                </HorizontalPanel>

                <SubHeader>Meta</SubHeader>
            </Page>
        )
    }
    else {
        return (<Page>Loading agreement {agreementID}</Page>)
    }
}