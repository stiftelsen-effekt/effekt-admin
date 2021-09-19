import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppState,VippsAgreementsState } from '../../../../models/state'
import { fetchAgreementsReportAction } from '../../../../store/vipps/vipps.actions'
import { ReportContent, ReportHeader, ReportWrapper } from '../../shared/report/Report.style'

export const VippsReport = () => {
  const agreements: VippsAgreementsState = useSelector((state: AppState) => state.vippsAgreements)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchAgreementsReportAction.started(undefined));
  }, [dispatch])

  const thousandize = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

  return (
    <ReportWrapper>
      <ReportHeader>Vipps</ReportHeader>
      <ReportContent>
      <h4>There are currently {agreements.activeAgreementCount} active agreements</h4>
        <table width="300px">
            <tbody>
                <tr>
                    <td>Median agreement sum</td>
                    <td>{thousandize(agreements.medianAgreementSum)} kr</td>
                </tr>
                <tr>
                    <td>Average agreement sum</td>
                    <td>{thousandize(agreements.averageAgreementSum)} kr</td>
                </tr>
                <tr>
                    <td>Total agreement sum</td>
                    <td>{thousandize(agreements.totalAgreementSum)} kr</td>
                </tr>
            </tbody>
        </table>
        <h4>Changes this month</h4>
        <table width="300px">
            <tbody>
                <tr>
                    <td>Agreements started</td>
                    <td>{agreements.startedThisMonth}</td>
                </tr>
                <tr>
                    <td>Agreements stopped</td>
                    <td>{agreements.stoppedThisMonth}</td>
                </tr>
            </tbody>
        </table>
        <br />
        <Link to="vipps/agreements">See all agreements</Link>
        <br />
        <Link to="vipps/charges">See all charges</Link>
      </ReportContent>
    </ReportWrapper>
  )
}