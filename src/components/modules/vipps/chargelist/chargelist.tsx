import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { shortDate } from '../../../../util/formatting';
import { DateTime } from 'luxon';
import { Redirect } from 'react-router';
import { fetchVippsAgreementChargesAction, setVippsAgreementsPagination } from '../../../../store/vipps/vipps.actions';
import { ChargeListWrapper } from './chargelist.style';

export const VippsAgreementChargeList: React.FunctionComponent = () => {
    const state = useSelector((state: AppState) => state.vippsAgreementCharges)
    console.log(state)
    const data = useSelector((state: AppState) => state.vippsAgreementCharges.charges)
    const pages = useSelector((state: AppState) => state.vippsAgreementCharges.pages)
    const loading = useSelector((state: AppState) => state.vippsAgreementCharges.loading)
    const pagination = useSelector((state: AppState) => state.vippsAgreementCharges.pagination)
    const filter = useSelector((state: AppState) => state.vippsAgreementCharges.filter)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchVippsAgreementChargesAction.started(undefined));
        console.log("here")
    }, [pagination, filter, dispatch])

    const columnDefinitions = [
        {
            Header: "Agreement ID",
            accessor: "agreementID"
        },
        {
            Header: "Charge ID",
            accessor: "chargeID"
        },
        {
            Header: "Donor",
            accessor: "full_name"
        },
        {
            Header: "Status",
            accessor: "status"
        },
        {
            Header: "Sum",
            accessor: "amountNOK"
        },
        {
            Header: "KID",
            accessor: "KID",
            id: "kid"
        },
        {
            Header: "Due/charge date",
            accessor: "dueDate"
        },
        {
            Header: "Created",
            id: "created",
            accessor: (res:any) => shortDate(DateTime.fromISO(res.timestamp_created))
        }
    ]

    const defaultSorting = [
        {id: "timestamp", desc: true}
    ]

    let [agreement, setAgreement] = useState<string | null>(null);
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

    if (agreement !== null) return (<Redirect to={`/vipps/agreement/${agreement}`}></Redirect>)
    return (
        <ChargeListWrapper>
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
        </ChargeListWrapper>
    )
}