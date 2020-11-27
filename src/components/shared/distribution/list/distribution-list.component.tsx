import React, { useState } from 'react'
import ReactTable from 'react-table';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../store/state';
import { DistributionsFiltersComponent } from './filters/filters.component';
import { DistributionListWrapper } from './distribution-list.component.style';
import { fetchDistributionsAction, setDistributionPagination } from '../../../../store/distributions/list/distribution-list.actions';

export const DistributionsList: React.FunctionComponent = () => {
    const data = useSelector((state: AppState) => state.distributions.searchResult)
    const pages = useSelector((state: AppState) => state.distributions.pages)
    const loading = useSelector((state: AppState) => state.distributions.loading)

    const dispatch = useDispatch()

    const columnDefinitions = [
        {
            Header: "KID",
            accessor: "KID"
        },
        {
            Header: "Name",
            accessor: "full_name"
        },
        {
            Header: "Email",
            accessor: "email"
        }, 
        {
            Header: "Total sum",
            id: "sum",
            accessor: (res: any) => {
                if (res.sum) return res.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                else return ""
            }
        },
        {
            Header: "Antall donasjoner",
            accessor: "count"
        }
    ]

    const defaultSorting = [
        {id: "KID", desc: true}
    ]

    let [distribution, setDistribution] = useState<number | null>(null);
    const trProps = (tableState: any, rowInfo: any) => {
        if (rowInfo && rowInfo.row) {
            return {
                onDoubleClick: (e: any) => {
                    setDistribution(rowInfo.original.KID)
                }
            }
        } 
        return {}
    }

    if (distribution !== null) return (<Redirect to={`/distributions/${distribution}`}></Redirect>)
    return (
        <DistributionListWrapper>
            <ReactTable
                data={data}
                pages={pages}
                loading={loading}
                columns={columnDefinitions}
                defaultSorted={defaultSorting}
                manual
                onFetchData={(state, instance) => {
                    dispatch(setDistributionPagination({
                        sort: state.sorted[0],
                        page: state.page,
                        limit: state.pageSize
                    }))
                    dispatch(fetchDistributionsAction.started(undefined))
                }}
                getTrProps={trProps}
                />

            <DistributionsFiltersComponent></DistributionsFiltersComponent>
        </DistributionListWrapper>
    )
}