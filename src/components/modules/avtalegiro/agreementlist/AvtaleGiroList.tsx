import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { shortDate } from '../../../../util/formatting';
import { DateTime } from 'luxon';
import { Redirect } from 'react-router';
import { AvtaleGiroFilter } from './AvtaleGiroFilter';
import { Link } from 'react-router-dom';
import { AvtaleGiroListWrapper } from './AvtaleGiroList.style';
import { fetchAvtaleGiroAgreementsAction, setAvtaleGiroPagination } from '../../../../store/avtalegiro/avtalegiro.actions';

export const AvtaleGiroList: React.FunctionComponent = () => {
    const state = useSelector((state: AppState) => state.avtaleGiroAgreements)
    const data = useSelector((state: AppState) => state.avtaleGiroAgreements.agreements)
    const pages = useSelector((state: AppState) => state.avtaleGiroAgreements.pages)
    const loading = useSelector((state: AppState) => state.avtaleGiroAgreements.loading)
    const pagination = useSelector((state: AppState) => state.avtaleGiroAgreements.pagination)
    const filter = useSelector((state: AppState) => state.avtaleGiroAgreements.filter)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAvtaleGiroAgreementsAction.started(undefined));
    }, [pagination, filter, dispatch])

    const columnDefinitions = [
        {
            Header: "AvtaleGiro ID",
            accessor: "ID",
            id: "id"
        },
        {
            Header: "Donor",
            accessor: "full_name"
        },
        {
            Header: "Status",
            id: "active",
            accessor: (res:any) => res.active === 1 ? "ACTIVE" : "STOPPED"
        },
        {
            Header: "Notify charge",
            id: "notice",
            accessor: (res:any) => res.notice === 1 ? "YES" : "NO"
        },
        {
            Header: "Sum",
            accessor: "amount"
        }, 
        {
            Header: "Charge day",
            accessor: "payment_date",
            id: "paymentDate"
        },
        {
            Header: "KID",
            accessor: "KID",
            id: "kid"
        },
        {
            Header: "Draft date",
            id: "created",
            accessor: (res:any) => shortDate(DateTime.fromISO(res.created))
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
                    setAgreement(rowInfo.original.ID)
                }
            }
        } 
        return {}
    }

    if (agreement !== null) return (<Redirect to={`/avtalegiro`}></Redirect>)
    return (
        <AvtaleGiroListWrapper>
            <Link to="/avtalegiro">Go back</Link>
            <br />
            <br />
            <ReactTable
                manual
                data={data}
                page={pagination.page}
                pages={pages}
                pageSize={pagination.limit}
                loading={loading}
                columns={columnDefinitions}
                defaultSorted={defaultSorting}
                onPageChange={(page) => dispatch(setAvtaleGiroPagination({ ...pagination, page }))}
                onSortedChange={(sorted) => dispatch(setAvtaleGiroPagination({ ...pagination, sort: sorted[0] }))}
                onPageSizeChange={(pagesize) => dispatch(setAvtaleGiroPagination({ ...pagination, limit: pagesize }))}
                getTrProps={trProps}
                />
                <AvtaleGiroFilter />
        </AvtaleGiroListWrapper>
    )
}