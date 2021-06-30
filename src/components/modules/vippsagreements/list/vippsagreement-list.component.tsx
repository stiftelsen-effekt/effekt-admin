import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVippsAgreementsAction, setVippsAgreementsPagination } from './vippsagreement-list.actions';
import { AppState } from '../../../../models/state';
import { shortDate } from '../../../../util/formatting';
import { DateTime } from 'luxon';
import { Redirect } from 'react-router';
// import { DonationsFilterComponent } from './filters/filters.component';

export const VippsAgreementList: React.FunctionComponent = () => {
    const state = useSelector((state: AppState) => state.vippsAgreements)
    console.log(state)
    const data = useSelector((state: AppState) => state.vippsAgreements.agreements)
    const pages = useSelector((state: AppState) => state.vippsAgreements.pages)
    const loading = useSelector((state: AppState) => state.vippsAgreements.loading)
    const pagination = useSelector((state: AppState) => state.vippsAgreements.pagination)
    const filter = useSelector((state: AppState) => state.vippsAgreements.filter)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchVippsAgreementsAction.started(undefined));
    }, [pagination, filter, dispatch])

    const columnDefinitions = [
        {
            Header: "ID",
            accessor: "ID",
            id: "id"
        },
        {
            Header: "Donor",
            accessor: "donorID"
        },
        {
            Header: "Status",
            accessor: "status"
        }, 
        {
            Header: "Charge day",
            accessor: "monthly_charge_day",
            id: "chargeDay"
        },
        {
            Header: "KID",
            accessor: "KID",
            id: "kid"
        },
        {
            Header: "Timestamp",
            accessor: "timestamp_created",
            id: "created"
        }
    ]

    const defaultSorting = [
        {id: "timestamp", desc: true}
    ]

    let [agreement, setAgreement] = useState<number | null>(null);
    const trProps = (tableState: any, rowInfo: any) => {
        if (rowInfo && rowInfo.row) {
            return {
                onDoubleClick: (e: any) => {
                    setAgreement(rowInfo.original.id)
                }
            }
        } 
        return {}
    }

    if (agreement !== null) return (<Redirect to={"/"}></Redirect>)
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
                onPageChange={(page) => dispatch(setVippsAgreementsPagination({ ...pagination, page }))}
                onSortedChange={(sorted) => dispatch(setVippsAgreementsPagination({ ...pagination, sort: sorted[0] }))}
                onPageSizeChange={(pagesize) => dispatch(setVippsAgreementsPagination({ ...pagination, limit: pagesize }))}
                getTrProps={trProps}
                />
        </div>
    )
}