import { DateTime } from "luxon"
import React from "react"
import JSONTree from 'react-json-tree'
import { useDispatch, useSelector } from "react-redux"
import { RouteComponentProps } from "react-router-dom"
import { AppState } from "../../../models/state"
import { clearCurrentLogEntry, fetchLogEntryAction } from "../../../store/logs/logs.actions"
import { longDateTime } from "../../../util/formatting"
import { ResourceHeader, ResourceSubHeader } from "../../style/elements/headers.style"
import { Page } from "../../style/elements/page.style"

interface IParams {
  id: string
}

export const LogEntryComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({ match }: RouteComponentProps<IParams>) => {
  const entryId = parseInt(match.params.id)

  const entry = useSelector((state: AppState) => state.logs.currentEntry)
  const dispatch = useDispatch()

  if (entry && entry.ID !== entryId)  {
    dispatch(clearCurrentLogEntry())
    dispatch(fetchLogEntryAction.started({ id: entryId }))
  }
  else if (!entry) {
    dispatch(fetchLogEntryAction.started({ id: entryId }))
  }

  if (entry) {
    return (<Page>
      <ResourceHeader hasSubHeader={true}>Log entry {entry.ID} | {entry.label}</ResourceHeader>
      <ResourceSubHeader>{longDateTime(DateTime.fromISO(entry.timestamp))}</ResourceSubHeader>

      <JSONTree
        data={entry.result} 
        valueRenderer={(value, valueActual, keyPath, ) => keyPath === 'file' ? <span style={{ fontFamily: 'monospace', whiteSpace: 'pre', display: 'block' }}>{value}</span> : <span>{value}</span>}
        shouldExpandNode={(keyPath, data, level) => true}/>
    </Page>)
  }
  else {
      return (<Page>Loading...</Page>)
  }
}