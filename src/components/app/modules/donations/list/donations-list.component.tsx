import React, { useState } from 'react'
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonationsAction } from './donations-list.actions';
import { AppState } from '../../../../../models/state';
import { shortDate } from '../../../../../util/formatting';
import { DateTime } from 'luxon';

export const DonationsList: React.FunctionComponent = () => {
    const data = useSelector((state: AppState) => state.donations.donations)
    const [loading, setLoading] = useState<boolean>(false)
    const [pages, setPages] = useState<number>(-1)

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

    return (
        <div>
            <span>Donations list</span>
            
            <ReactTable
                data={data} // should default to []
                pages={pages} // should default to -1 (which means we don't know how many pages we have)
                loading={loading}
                columns={columnDefinitions}
                manual // informs React Table that you'll be handling sorting and pagination server-side
                onFetchData={(state, instance) => {
                    // show the loading overlay
                    setLoading(true)
                    console.log(state.sorted[0])
                    dispatch(fetchDonationsAction.started({
                        sort: state.sorted[0],
                        cursor: null,
                        limit: 10
                    }))
                }}
                />
        </div>
    )
}