import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { Link } from 'react-router-dom';
import { fetchAgreementsReportAction } from '../../../store/vipps/vipps.actions';
import { AppState, VippsAgreementsState } from '../../../models/state';
import { RightTD } from './Vipps.style';

export const VippsPage: React.FunctionComponent = () => {
    const agreements: VippsAgreementsState = useSelector((state: AppState) => state.vippsAgreements)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAgreementsReportAction.started(undefined));
    }, [dispatch])

    return (
        <Page>
            <MainHeader>Vipps agreements</MainHeader>
            <h4>There are currently {agreements.activeAgreementCount} active agreements</h4>
            <table width="300px">
                <tbody>
                    <tr>
                        <td>Median agreement sum</td>
                        <RightTD>{agreements.medianAgreementSum} kr</RightTD>
                    </tr>
                    <tr>
                        <td>Average agreement sum</td>
                        <RightTD>{agreements.averageAgreementSum} kr</RightTD>
                    </tr>
                    <tr>
                        <td>Total agreement sum</td>
                        <RightTD>{agreements.totalAgreementSum} kr</RightTD>
                    </tr>
                </tbody>
            </table>
            <h4>Changes this month</h4>
            <table width="300px">
                <tbody>
                    <tr>
                        <td>Agreements started</td>
                        <RightTD>{agreements.startedThisMonth}</RightTD>
                    </tr>
                    <tr>
                        <td>Agreements stopped</td>
                        <RightTD>{agreements.stoppedThisMonth}</RightTD>
                    </tr>
                </tbody>
            </table>
            <br />
            <Link to="vipps/agreements">See all agreements</Link>
            <br />
            <Link to="vipps/charges">See all charges</Link>
        </Page>
    )
}