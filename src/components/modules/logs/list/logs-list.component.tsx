import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogsAction, setLogsPaginationAction } from './logs-list.actions';
import { AppState } from '../../../../models/state';
import { longDateTime } from '../../../../util/formatting';
import { DateTime } from 'luxon';
import { Redirect } from 'react-router';

export const LogsList: React.FunctionComponent = () => {
    const data = useSelector((state: AppState) => state.logs.entries)
    const pages = useSelector((state: AppState) => state.logs.pages)
    const loading = useSelector((state: AppState) => state.logs.loading)
    const pagination = useSelector((state: AppState) => state.logs.pagination)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLogsAction.started());
    }, [pagination, dispatch])

    const columnDefinitions = [
        {
            Header: "ID",
            accessor: "ID"
        },
        {
          Header: "Label",
          accessor: "label"
        },
        {
            Header: "Timestamp",
            id: "timestamp",
            accessor: (res:any) => longDateTime(DateTime.fromISO(res.timestamp, { zone: "Europe/Oslo" }))
        }
    ]

    const defaultSorting = [
        {id: "timestamp", desc: true}
    ]

    let [entry, setEntry] = useState<number | null>(null);
    const trProps = (tableState: any, rowInfo: any) => {
      if (rowInfo && rowInfo.row) {
        return {
          onDoubleClick: (e: any) => {
            setEntry(rowInfo.original.ID)
          }
        }
      } 
      return {}
    }

    console.log(pagination.page)

    if (entry !== null) return (<Redirect to={`/logs/${entry}`}></Redirect>)
    return (
      <div>
        <ReactTable
            manual
            data={data}
            page={pagination.page}
            pages={pages}
            pageSize={pagination.limit}
            loading={loading}
            columns={columnDefinitions}
            defaultSorted={defaultSorting}
            onPageChange={(page) => dispatch(setLogsPaginationAction({ ...pagination, page }))}
            onSortedChange={(sorted) => dispatch(setLogsPaginationAction({ ...pagination, sort: sorted[0] }))}
            onPageSizeChange={(pagesize) => dispatch(setLogsPaginationAction({ ...pagination, limit: pagesize }))}
            getTrProps={trProps}
            />
      </div>
    )
}