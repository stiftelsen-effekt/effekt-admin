import { AppState } from "../../../../../models/state";
import React, { ChangeEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import '../../../style/elements/react-table/table.css'
import ReactTable from "react-table";
import { searchDonorAction, setSelectedDonor } from "./donor-selection.actions";
import { IDonor } from "../../../../../models/types";
import { EffektInput } from "../../../style/elements/input.style";
import { orange50 } from "../../../style/colors";
import { shortDate } from "../../../../../util/formatting";

interface IDonorTableState {
    sorted: Array<any>,
    page: number,
    pageSize: number,
    expanded: any,
    resized: any,
    filtered: any,
    selected: any
}

export const DonorSelectionComponent: React.FunctionComponent = (props) => {
    const getDefaultState = (): IDonorTableState => {
        return {
            sorted: [],
            page: 0,
            pageSize: 10,
            expanded: {},
            resized: [],
            filtered: [],
            selected: null
        }
    }
    
    const [state, setState] = useState<IDonorTableState>(getDefaultState())
    const dispatch = useDispatch()
    const searchResult = useSelector((state: AppState) => state.donorSelector.searchResult)

    if (!searchResult) dispatch(searchDonorAction.started(""))

    const search = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            selected: null
        })
        dispatch(searchDonorAction.started(event.target.value))
    }

    const columnDefinitions = [
        {
            Header: "ID",
            accessor: "id"
        },
        {
            Header: "name",
            accessor: "name"
        },
        {
            Header: "email",
            accessor: "email"
        },
        {
            id: "registered",
            Header: "registered",
            accessor: (donor: IDonor) => shortDate(donor.registered)
        }
    ]

    const rowClick = (rowInfo: any) => {
        console.log(rowInfo)
        setState({
            ...state,
            selected: rowInfo.index
        })
        dispatch(setSelectedDonor(rowInfo.original))
    }

    const rowDoubleClick = (donorID: number) => {
        console.log("GOTO DONOR:", donorID);
    }

    const rowStyle = (rowIndex: number, selectedIndex: number) => {
        console.log(rowIndex, selectedIndex)
        return {
            background: rowIndex === selectedIndex ? orange50 : '',
            color: rowIndex === selectedIndex ? 'white' : ''
        }
    }

    const trProps = (tableState: any, rowInfo: any) => {
        if (rowInfo && rowInfo.row) {
            return {
                onClick: (e: React.MouseEvent) => rowClick(rowInfo),
                onDoubleClick: (e: any) => rowDoubleClick(rowInfo.original.id),
                style: rowStyle(rowInfo.index, state.selected)
            }
        } else{
            return {}
        }
    }

    return (
        <div>
            <EffektInput type="text" onChange={search} placeholder="søk" style={{ width: '100%', marginBottom: '20px' }}></EffektInput>
            <ReactTable
                data={searchResult}
                columns={columnDefinitions}
                    defaultPageSize={10}
                    onSortedChange={sorted => setState({ ...state, sorted })}
                    onPageChange={page => setState({ ...state, page })}
                    onPageSizeChange={(pageSize, page) => setState({ ...state, page, pageSize })}
                    onExpandedChange={expanded => setState({ ...state, expanded })}
                    onResizedChange={resized => setState({ ...state, resized })}
                    onFilteredChange={filtered => setState({ ...state, filtered })}
                    getTrProps={trProps}
            ></ReactTable>
        </div>
    )
}