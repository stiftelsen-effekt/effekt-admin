import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { Link } from 'react-router-dom';
import { fetchAgreementsReportAction } from '../../../store/vipps/vipps.actions';
import { AppState, VippsAgreementsState } from '../../../models/state';

export const VippsPage: React.FunctionComponent = () => {
    const agreements: VippsAgreementsState = useSelector((state: AppState) => state.vippsAgreements)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAgreementsReportAction.started(undefined));
    }, [dispatch])

    return (
        <Page>
            <MainHeader>Vipps agreements</MainHeader>
            <p>Active agreements: {agreements.activeAgreementCount}</p>
            <p>Median agreement sum: {agreements.medianAgreementSum} kr</p>
            <p>Average agreement sum: {agreements.averageAgreementSum} kr</p>
            <p>Total agreement sum: {agreements.totalAgreementSum} kr</p>
            <Link to="vipps/agreements">See all agreements</Link>
            <br />
            <Link to="vipps/charges">See all charges</Link>
        </Page>
    )
}