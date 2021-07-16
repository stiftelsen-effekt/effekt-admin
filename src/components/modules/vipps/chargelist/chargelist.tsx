import React, { useEffect } from 'react'
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { shortDate } from '../../../../util/formatting';
import { DateTime } from 'luxon';
import { fetchVippsAgreementChargesAction, setVippsChargesPagination } from '../../../../store/vipps/vipps.actions';
import { ChargeListWrapper } from './chargelist.style';
import { VippsChargeFilter } from './chargefilter';
import { Link } from 'react-router-dom';

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
    }, [pagination, filter, dispatch])

    const columnDefinitions = [
        {
            Header: "Due date",
            id: "dueDate",
            accessor: (res:any) => shortDate(DateTime.fromISO(res.dueDate))
        },
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
            Header: "Created",
            id: "created",
            accessor: (res:any) => shortDate(DateTime.fromISO(res.timestamp_created))
        }
    ]

    const defaultSorting = [
        {id: "timestamp", desc: true}
    ]

    return (
        <ChargeListWrapper>
            <Link to="/vipps">Back to Vipps overview</Link>
            <br />
            <Link to="/vipps/agreements">See all agreements</Link>
            <ReactTable
                manual
                data={data}
                page={pagination.page}
                pages={pages}
                pageSize={pagination.limit}
                loading={loading}
                columns={columnDefinitions}
                defaultSorted={defaultSorting}
                onPageChange={(page) => dispatch(setVippsChargesPagination({ ...pagination, page }))}
                onSortedChange={(sorted) => dispatch(setVippsChargesPagination({ ...pagination, sort: sorted[0] }))}
                onPageSizeChange={(pagesize) => dispatch(setVippsChargesPagination({ ...pagination, limit: pagesize }))}
            />
            <VippsChargeFilter />
        </ChargeListWrapper>
    )
}