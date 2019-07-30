import React, { useState } from 'react'
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonationsAction } from './donations-list.actions';
import { AppState } from '../../../../../models/state';
import { shortDate } from '../../../../../util/formatting';
import { DateTime } from 'luxon';
import { Redirect } from 'react-router';

export const DonationsList: React.FunctionComponent = () => {
    const data = useSelector((state: AppState) => state.donations.donations)
    const pages = useSelector((state: AppState) => state.donations.pages)

    const dispatch = useDispatch()

    const columnDefinitions = [
        {
            Header: "ID",
            accessor: "id"
        },
        {
            Header: "Donor",
            accessor: "donor"
        },
        {
            Header: "Method",
            accessor: "paymentMethod"
        }, 
        {
            Header: "Sum",
            accessor: "sum"
        },
        {
            Header: "Transaction cost",
            accessor: "transactionCost"
        }, 
        {
            Header: "KID",
            accessor: "kid"
        },
        {
            Header: "Timestamp",
            id: "timestamp",
            accessor: (res:any) => shortDate(DateTime.fromISO(res.timestamp))
        }
    ]

    const defaultSorting = [
        {id: "timestamp", desc: true}
    ]

    let [donation, setDonation] = useState<number | null>(null);
    const trProps = (tableState: any, rowInfo: any) => {
        if (rowInfo && rowInfo.row) {
            return {
                onDoubleClick: (e: any) => {
                    setDonation(rowInfo.original.id)
                }
            }
        } 
        return {}
    }

    if (donation !== null) return (<Redirect to={`/donations/${donation}`}></Redirect>)
    return (
        <div>
            <ReactTable
                data={data}
                pages={pages}
                loading={false}
                columns={columnDefinitions}
                defaultSorted={defaultSorting}
                manual
                onFetchData={(state, instance) => {
                    dispatch(fetchDonationsAction.started({
                        sort: state.sorted[0],
                        page: state.page,
                        limit: state.pageSize
                    }))
                }}
                getTrProps={trProps}
                />
        </div>
    )
}