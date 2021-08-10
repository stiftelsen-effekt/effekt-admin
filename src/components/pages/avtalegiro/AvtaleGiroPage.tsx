import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { Link } from 'react-router-dom';
import { AppState, VippsAgreementsState } from '../../../models/state';
import { RightTD } from './AvtaleGiroPage.style';
import { fetchAvtaleGiroReportAction } from '../../../store/avtalegiro/avtalegiro.actions';

export const AvtaleGiroPage: React.FunctionComponent = () => {
    const agreements: VippsAgreementsState = useSelector((state: AppState) => state.avtaleGiroAgreements)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAvtaleGiroReportAction.started(undefined));
    }, [dispatch])

    return (
        <Page>
            <MainHeader>AvtaleGiro</MainHeader>
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
                </tbody>
            </table>
            <br />
            <Link to="avtalegiro/agreements">See all agreements</Link>
        </Page>
    )
}