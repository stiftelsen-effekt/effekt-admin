import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../../models/state'
import { ReportContent, ReportHeader, ReportWrapper } from '../../shared/report/Report.style'
import { setLogsPaginationAction } from '../list/logs-list.actions'
import { LogsList } from '../list/LogsList'

export const LogsReport = () => {
  const dispatch = useDispatch()

  const pagination = useSelector((state: AppState) => state.logs.pagination)
  useEffect(() => {
    dispatch(setLogsPaginationAction({ ...pagination, limit: 10 }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  
  return (
    <ReportWrapper>
      <ReportHeader>Import logs</ReportHeader>
      <ReportContent>
        <LogsList showPagination={false} />
      </ReportContent>
    </ReportWrapper>
  )
}